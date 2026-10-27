import { useState } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"

type Notice = {
  title: string
  time: string
  body: string
}

/* 参考稿的五条通知：前四条是同一个候选人的线索提醒，最后一条是职位申请完成 */
const NOTICES: Notice[] = [
  {
    title: "有新求職者",
    time: "2026年10月14日（週三）13:59",
    body: "有新求職者申請 20261014-003，請點擊查看詳情。",
  },
  {
    title: "有新求職者",
    time: "2026年9月30日（週三）15:43",
    body: "有新求職者申請 20260910-Instru-BBBB，請點擊查看詳情。",
  },
  {
    title: "有新求職者",
    time: "2026年9月30日（週三）15:36",
    body: "有新求職者申請 20260910-Instru-BBBB，請點擊查看詳情。",
  },
  {
    title: "有新求職者",
    time: "2026年9月30日（週三）15:33",
    body: "有新求職者申請 20260910-Instru-BBBB，請點擊查看詳情。",
  },
  {
    title: "職位已招滿",
    time: "2026年9月30日（週三）15:33",
    body: "職位 20260908-Instru-AAAA 已達招聘人數，暫無需更多申請。",
  },
]

export default function NotificationPage({ onBack }: { onBack: () => void }) {
  const [readAll, setReadAll] = useState(false)

  return (
    <main className="employer-page notice-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="返回" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>通知</h1>
        <button
          type="button"
          className="notice-readall"
          onClick={() => setReadAll(true)}
          disabled={readAll}
        >
          
          全部已讀
        </button>
      </header>

      <section className="notice-panel">
        {NOTICES.map((notice, index) => (
          <article className="notice-row" key={`${notice.time}-${index}`}>
            <span className="notice-avatar" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="#d9edff" stroke="#1689eb" strokeWidth="2.8" strokeLinejoin="round">
                <rect x="8" y="14" width="32" height="22" rx="5" />
                <path d="M10 17.5 24 27l14-9.5" fill="#f3fbff" />
              </svg>
            </span>
            <div className="notice-copy">
              <div className="notice-head">
                <strong className={readAll ? "" : "is-unread"}>{notice.title}</strong>
                <time>{notice.time}</time>
              </div>
              <p>{notice.body}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
