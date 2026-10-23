import { useEffect, useRef, useState, type FormEvent } from "react"
import "./employer.css"
import "./customer-feedback.css"

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
        <button type="button" className="notice-back" aria-label="Back" onClick={onBack}>
          <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m27 9-13 14 13 14" />
          </svg>
        </button>
        <h1>Customer Feedback</h1>
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
            <h2>Thank you!</h2>
            <p>Your feedback has been submitted to Hong Ye Group.</p>
          </div>
        ) : (
          <form className="cf-form" onSubmit={submit}>
            <label className="cf-field">
              <span className="cf-label">
                Title
                <em aria-hidden="true">*</em>
              </span>
              <input
                className="cf-input"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Key in your title here"
                aria-label="Feedback title"
                maxLength={120}
              />
            </label>

            <label className="cf-field is-grow">
              <span className="cf-label">
                Content
                <em aria-hidden="true">*</em>
              </span>
              <textarea
                className="cf-textarea"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Please share your feedback here."
                aria-label="Feedback content"
              />
            </label>

            <div className="cf-actions">
              <button type="submit" className="cf-submit" disabled={!ready}>
                Submit
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
