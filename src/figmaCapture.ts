const CAPTURE_SCRIPT_SRC = "/capture.js"

type CaptureResult = {
  success?: boolean
  error?: string
}

type FigmaCaptureApi = {
  captureForDesign?: (options: {
    selector: string
    extractSourceData?: boolean
    verbose?: boolean
  }) => Promise<CaptureResult>
}

declare global {
  interface Window {
    figma?: FigmaCaptureApi
  }
}

let captureScriptPromise: Promise<void> | null = null

function ensureCaptureScript() {
  if (window.figma?.captureForDesign) return Promise.resolve()
  if (captureScriptPromise) return captureScriptPromise

  captureScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement("script")
    script.src = `${CAPTURE_SCRIPT_SRC}?v=${Date.now()}`
    script.async = true
    script.addEventListener("load", () => {
      if (window.figma?.captureForDesign) resolve()
      else reject(new Error("Figma capture is not available on this page."))
    })
    script.addEventListener("error", () => {
      reject(new Error("Failed to load the Figma capture script."))
    })
    document.head.appendChild(script)
  })

  return captureScriptPromise
}

/**
 * `::backdrop` 是伪元素，不在 DOM 树里，抓取脚本遍历不到 —— 于是复制到 Figma 时
 * 弹窗底下那层半透明遮罩整个消失。这里读一下当前打开 dialog 的 ::backdrop 颜色，
 * 用一个真实 div 顶上去。
 * （`backdrop-filter` 的模糊烘不进去，Figma 侧不支持，只还原颜色。）
 */
function injectModalScrim(root: HTMLElement) {
  const modal = Array.from(document.querySelectorAll("dialog")).find(
    (dialog) => dialog.open && dialog.matches(":modal"),
  )
  if (!modal) return null

  const { backgroundColor } = getComputedStyle(modal, "::backdrop")
  if (!backgroundColor || backgroundColor === "rgba(0, 0, 0, 0)" || backgroundColor === "transparent") {
    return null
  }

  const restorePosition = root.style.position
  if (getComputedStyle(root).position === "static") root.style.position = "relative"

  const scrim = document.createElement("div")
  scrim.setAttribute("aria-hidden", "true")
  scrim.style.cssText = [
    "position:absolute",
    "inset:0",
    "z-index:9999",
    `background:${backgroundColor}`,
    "pointer-events:none",
  ].join(";")

  /* dialog 在浏览器里靠 top layer 盖住一切，本身没有 z-index；h2d 会把 z-index 写进样式，
     所以这里给它补一个更高的值，免得 Figma 侧按数值排序时遮罩跑到弹窗上面 */
  const dialogZIndex = modal.style.zIndex
  modal.style.zIndex = "10000"

  /* 插在弹窗所在的「root 直接子级」之前：Figma 导入基本按 DOM 顺序堆叠，
     放到后面反而会把弹窗盖住 */
  let anchor: HTMLElement | null = modal
  while (anchor && anchor.parentElement !== root) anchor = anchor.parentElement
  if (anchor) root.insertBefore(scrim, anchor)
  else root.appendChild(scrim)

  return () => {
    scrim.remove()
    modal.style.zIndex = dialogZIndex
    root.style.position = restorePosition
  }
}

/**
 * 把当前界面抓成 Figma 的 h2d 结构，**返回 HTML 载荷而不写剪贴板**。
 * 之所以不直接写：按钮长在 iPad 外壳上（父页面），真正要抓的内容在内嵌 frame 里，
 * 由 frame 产出载荷、父页面统一写入剪贴板，能拿到父页面的用户手势。
 */
export async function captureScreenHtml(selector = "main") {
  const root = document.querySelector<HTMLElement>(selector)
  const clipboard = navigator.clipboard as
    | (Clipboard & {
        write: (items: ClipboardItems) => Promise<void>
        writeText: (text: string) => Promise<void>
      })
    | undefined
  const originalWrite = clipboard?.write?.bind(clipboard)
  const originalWriteText = clipboard?.writeText?.bind(clipboard)

  let payload = ""
  let resolvePayload: (value: string) => void = () => {}
  const captured = new Promise<string>((resolve) => {
    resolvePayload = resolve
  })

  /* 必须在加载抓取脚本之前接管剪贴板：脚本内部若在初始化时就绑定了
     navigator.clipboard.write，晚了就拦不到，会去走需要用户手势的原生写入 */
  if (clipboard) {
    clipboard.write = async (items: ClipboardItems) => {
      for (const item of items) {
        if (item.types.includes("text/html")) {
          payload = await (await item.getType("text/html")).text()
        }
      }
      if (!payload) {
        for (const item of items) {
          if (item.types.includes("text/plain")) {
            payload = await (await item.getType("text/plain")).text()
          }
        }
      }
      resolvePayload(payload)
    }
    clipboard.writeText = async (text: string) => {
      payload = text
      resolvePayload(text)
    }
  }

  /* 官方脚本在写剪贴板前会 document.hasFocus() —— 不成立就一直等 focus 事件。
     我们是从父页面（iPad 外壳）点按钮触发的，焦点在父页面上，frame 里恒为 false，
     于是永久挂住。这里直接让它在“已聚焦”状态下继续。 */
  const focusedDoc = document as Document & { hasFocus: () => boolean }
  const originalHasFocus = focusedDoc.hasFocus
  focusedDoc.hasFocus = () => true

  let removeScrim: (() => void) | null = null

  try {
    await ensureCaptureScript()
    if (!window.figma?.captureForDesign) {
      throw new Error("Figma capture is not available on this page.")
    }

    if (root) removeScrim = injectModalScrim(root)
    root?.classList.add("is-figma-capturing")
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    })

    const result = window.figma.captureForDesign({
      selector,
      extractSourceData: false,
      verbose: true,
    })
    void result.catch(() => undefined)

    return await Promise.race([
      captured,
      result.then((value) => {
        if (value?.success === false) {
          throw new Error(value.error || "Figma capture failed.")
        }
        return captured
      }),
    ])
  } finally {
    removeScrim?.()
    root?.classList.remove("is-figma-capturing")
    if (clipboard && originalWrite) clipboard.write = originalWrite
    if (clipboard && originalWriteText) clipboard.writeText = originalWriteText
    focusedDoc.hasFocus = originalHasFocus
  }
}
