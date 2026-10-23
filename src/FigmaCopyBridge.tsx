import { useEffect } from "react"
import { captureScreenHtml } from "./figmaCapture"

export const FIGMA_COPY_REQUEST = "yy-figma-copy"
export const FIGMA_COPY_RESULT = "yy-figma-copy-result"
export const FIGMA_COPY_ERROR = "yy-figma-copy-error"

/**
 * 挂在真实页面里（iframe 内）的桥：父页面点 Copy 时发消息过来，
 * 这里把 `main` 抓成载荷再回传，剪贴板由父页面写。
 */
export default function FigmaCopyBridge() {
  useEffect(() => {
    const onMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return
      if ((event.data as { type?: string } | null)?.type !== FIGMA_COPY_REQUEST) return

      const source = event.source as Window | null
      try {
        const html = await captureScreenHtml("main")
        source?.postMessage({ type: FIGMA_COPY_RESULT, html }, event.origin)
      } catch (error) {
        source?.postMessage(
          {
            type: FIGMA_COPY_ERROR,
            message: error instanceof Error ? error.message : String(error),
          },
          event.origin,
        )
      }
    }

    window.addEventListener("message", onMessage)
    return () => window.removeEventListener("message", onMessage)
  }, [])

  return null
}
