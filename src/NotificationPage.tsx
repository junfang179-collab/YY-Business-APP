import { useState } from "react"
import BackIcon from "./BackIcon"
import "./employer.css"

type Notice = {
  title: string
  time: string
  body: string
}

/* 参考稿的五条通知：前四条是同一个候选人的线索提醒，最后一条是职位申请完成 */
const NOTICES: Notice[] = [
  {
    title: "New Candidate Available",
    time: "13:59 pm. Wed, 14/10/2026",
    body: "You have a new candidate applying for 20261014-003. Please click to check the details.",
  },
  {
    title: "New Candidate Available",
    time: "15:43 pm. Wed, 30/09/2026",
    body: "You have a new candidate applying for 20260910-Instru-BBBB. Please click to check the details.",
  },
  {
    title: "New Candidate Available",
    time: "15:36 pm. Wed, 30/09/2026",
    body: "You have a new candidate applying for 20260910-Instru-BBBB. Please click to check the details.",
  },
  {
    title: "New Candidate Available",
    time: "15:33 pm. Wed, 30/09/2026",
    body: "You have a new candidate applying for 20260910-Instru-BBBB. Please click to check the details.",
  },
  {
    title: "Job Fully Applied",
    time: "15:33 pm. Wed, 30/09/2026",
    body: "The job 20260908-Instru-AAAA has reached its headcount. No further applications are needed.",
  },
]

export default function NotificationPage({ onBack }: { onBack: () => void }) {
  const [readAll, setReadAll] = useState(false)

  return (
    <main className="employer-page notice-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="Back" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>Notification</h1>
        <button
          type="button"
          className="notice-readall"
          onClick={() => setReadAll(true)}
          disabled={readAll}
        >
          Read All
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
