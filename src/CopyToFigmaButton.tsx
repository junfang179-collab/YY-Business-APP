import { useEffect, useRef, useState, type RefObject } from "react"
import {
  FIGMA_COPY_ERROR,
  FIGMA_COPY_REQUEST,
  FIGMA_COPY_RESULT,
} from "./FigmaCopyBridge"

/** 父页面（iPad 外壳）里把载荷写进剪贴板 */
async function writeHtmlToClipboard(html: string) {
  try {
    const item = new ClipboardItem({
      "text/html": new Blob([html], { type: "text/html" }),
      "text/plain": new Blob(["YY Business App · Figma payload"], {
        type: "text/plain",
      }),
    })
    await navigator.clipboard.write([item])
    return
  } catch {
    /* 退回到 execCommand 的方式 */
  }

  const onCopy = (event: ClipboardEvent) => {
    if (!event.clipboardData) return
    event.preventDefault()
    event.clipboardData.setData("text/html", html)
    event.clipboardData.setData("text/plain", "YY Business App · Figma payload")
  }
  document.addEventListener("copy", onCopy)
  try {
    if (!document.execCommand("copy")) {
      throw new Error("Browser blocked the copy command.")
    }
  } finally {
    document.removeEventListener("copy", onCopy)
  }
}

/**
 * 右下角的 Copy：长在 iPad 外壳外面，不影响里面的设计稿。
 * 真正被复制的是 iframe 里当前那一屏。
 */
export default function CopyToFigmaButton({
  frame,
}: {
  frame: RefObject<HTMLIFrameElement | null>
}) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "failed">("idle")
  const [errorMessage, setErrorMessage] = useState("")
  const resetTimer = useRef<number | null>(null)
  const timeoutTimer = useRef<number | null>(null)

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      const data = event.data as { type?: string; html?: string; message?: string } | null
      if (data?.type === FIGMA_COPY_RESULT && typeof data.html === "string") {
        void finishCopy(data.html)
      }
      if (data?.type === FIGMA_COPY_ERROR) {
        failCopy(data.message || "Figma copy failed.")
      }
    }

    window.addEventListener("message", onMessage)
    return () => {
      window.removeEventListener("message", onMessage)
      if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
      if (timeoutTimer.current !== null) window.clearTimeout(timeoutTimer.current)
    }
  }, [])

  const finishCopy = async (html: string) => {
    if (timeoutTimer.current !== null) window.clearTimeout(timeoutTimer.current)
    try {
      await writeHtmlToClipboard(html)
      setStatus("copied")
    } catch (error) {
      failCopy(error instanceof Error ? error.message : String(error))
      return
    }
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => {
      setStatus("idle")
      setErrorMessage("")
    }, 1800)
  }

  const failCopy = (message: string) => {
    if (timeoutTimer.current !== null) window.clearTimeout(timeoutTimer.current)
    setStatus("failed")
    setErrorMessage(message)
    if (resetTimer.current !== null) window.clearTimeout(resetTimer.current)
    resetTimer.current = window.setTimeout(() => {
      setStatus("idle")
      setErrorMessage("")
    }, 2400)
  }

  const handleCopy = () => {
    if (status === "copying") return
    const win = frame.current?.contentWindow
    if (!win) {
      failCopy("The preview is still loading.")
      return
    }

    frame.current?.focus()
    setStatus("copying")
    setErrorMessage("")
    win.postMessage({ type: FIGMA_COPY_REQUEST }, window.location.origin)
    if (timeoutTimer.current !== null) window.clearTimeout(timeoutTimer.current)
    timeoutTimer.current = window.setTimeout(() => {
      failCopy("Figma copy timed out. Please try again.")
    }, 20000)
  }

  const label =
    status === "copying"
      ? "Copying…"
      : status === "copied"
        ? "Copied"
        : status === "failed"
          ? "Copy failed"
          : "Copy"

  return (
    <button
      className={`copy-float${status === "copied" ? " is-done" : ""}`}
      type="button"
      onClick={handleCopy}
      disabled={status === "copying"}
      aria-label="Copy current screen to Figma"
      title={errorMessage || "Copy this screen as editable layers and paste into Figma Design"}
    >
      {status === "copied" ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12l4.5 4.5L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="8" y="8" width="11" height="11" rx="2" />
          <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
        </svg>
      )}
      <span>{label}</span>
    </button>
  )
}
