import { useEffect, useRef, useState, type FormEvent } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"
import "../customer-feedback.css"

/**
 * Customer Feedback：信息结构参考稿是「返回 + 标题 + 一张白卡」，
 * 卡里 Title / Content 两个必填字段，右下角 Submit。
 * 视觉沿用现有玻璃面板 + 蓝色主按钮，不用参考稿里的拟物黄按钮。
 */
export default function CustomerFeedbackPage({ onBack }: { onBack: () => void }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [sent, setSent] = useState(false)
  const timer = useRef<number | null>(null)
  const ready = title.trim() !== "" && content.trim() !== ""

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!ready) return
    setSent(true)
    timer.current = window.setTimeout(onBack, 1500)
  }

  return (
    <main className="employer-page cf-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="返回" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>客戶意見</h1>
        <span />
      </header>

      <section className="cf-panel">
        {sent ? (
          <div className="cf-done" role="status">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="21" fill="#e7f7ee" />
              <circle cx="24" cy="24" r="15.5" fill="#3ec46d" />
              <path
                d="m17 24.6 4.8 4.8 9.2-9.6"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>謝謝！</h2>
            <p>你的意見已提交至 Hong Ye Group。</p>
          </div>
        ) : (
          <form className="cf-form" onSubmit={submit}>
            <label className="cf-field">
              <span className="cf-label">
                
                標題
                <em aria-hidden="true">*</em>
              </span>
              <input
                className="cf-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="輸入標題"
                aria-label="意見標題"
                maxLength={120}
              />
            </label>

            <label className="cf-field is-grow">
              <span className="cf-label">
                
                內容
                <em aria-hidden="true">*</em>
              </span>
              <textarea
                className="cf-textarea"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="請在此分享你的意見。"
                aria-label="意見內容"
              />
            </label>

            <div className="cf-actions">
              <button type="submit" className="cf-submit" disabled={!ready}>
                
                提交
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
