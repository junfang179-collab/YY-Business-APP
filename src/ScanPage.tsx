import { useEffect } from "react"
import BackIcon from "./BackIcon"
import "./employer.css"

/* 扫码页：信息结构参考稿是「返回 + 居中标题 + 方形取景框」，
   这里保留同样的结构，取景框与提示文案改用现有玻璃质感，并加一道上下往复的扫描线 */
export default function ScanPage({ onBack }: { onBack: () => void }) {
  /* 掃描 3 秒後視為已讀到兌換碼，自動跳到兌換頁 */
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.hash = "redeem"
    }, 3000)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main className="employer-page scan-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="Back" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>Scan</h1>
        <span />
      </header>

      <section className="scan-stage">
        <div className="scan-frame">
          <span className="scan-corner scan-corner-tl" />
          <span className="scan-corner scan-corner-tr" />
          <span className="scan-corner scan-corner-bl" />
          <span className="scan-corner scan-corner-br" />
          <svg className="scan-glyph" viewBox="0 0 48 48" fill="none" stroke="#a9cdf0" strokeWidth="2.4" strokeLinejoin="round">
            <rect x="9" y="9" width="12" height="12" rx="3" />
            <rect x="27" y="9" width="12" height="12" rx="3" />
            <rect x="9" y="27" width="12" height="12" rx="3" />
            <path d="M27 27h5v5h-5zM36 36h3v3h-3zM27 36h3v3h-3z" fill="#a9cdf0" stroke="none" />
          </svg>
          <span className="scan-line" />
        </div>
        <p className="scan-hint">Align the QR code within the frame</p>
      </section>
    </main>
  )
}
