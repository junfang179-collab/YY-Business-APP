import { useState } from "react"
import { staffPhoto } from "../staffPhoto"
import BackIcon from "../BackIcon"
import "../reviews.css"

/** 每條歷史評價的維度與「撰寫評價」保持一致：態度 / 完成度 / 是否準時 */
const labels = ["態度", "完成度", "是否準時"]

const entries = [
  {
    project: "半島酒店 · 宴會",
    date: "2019年11月22日 17:09",
    feedback:
      "此員工可靠細心，建議安排固定接待客人的班次。",
    scores: [5, 4, 5],
  },
  {
    project: "文華東方酒店 · 主廚房",
    date: "2019年11月22日 17:09",
    feedback:
      "準時可靠，熟悉日常營運流程。",
    scores: [4, 4, 5],
  },
  {
    project: "香港會議展覽中心 · 餐飲服務",
    date: "2019年11月18日 09:45",
    feedback:
      "與團隊合作順暢，整場活動均符合客戶服務標準。",
    scores: [5, 5, 4],
  },
]

/** 頭部總分與星數都由歷史評價算出，避免和下面三張卡對不上 */
const allScores = entries.flatMap((entry) => entry.scores)
const average =
  allScores.reduce((sum, score) => sum + score, 0) / allScores.length
const Search = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <circle cx="17" cy="17" r="10" />
    <path d="m24 24 9 9" />
  </svg>
)
function Stars({ score }: { score: number }) {
  return (
    <span className="review-stars" aria-label={`${score} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span className={star <= score ? "filled" : ""} key={star}>
          ★
        </span>
      ))}
    </span>
  )
}

export default function ReviewPage({
  staff,
  onBack,
  onWrite,
  onWorkRecord,
}: {
  staff: { id: number, name: string }
  onBack: () => void
  onWrite: () => void
  /** 右上「工作記錄」→ 該員工的工作記錄頁 */
  onWorkRecord: () => void
}) {
  const [query, setQuery] = useState("")
  const shown = entries.filter((entry) =>
    `${entry.project} ${entry.feedback}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  return (
    <main className="reviews-page">
      <div className="reviews-landscape" aria-hidden="true" />
      <header className="reviews-header">
        <button aria-label="返回考勤" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>員工資料</p>
          <h1>員工評價</h1>
        </div>
        <div className="review-header-actions">
          <button className="review-record" onClick={onWorkRecord}>
            工作記錄
          </button>
          <button className="review-write" onClick={onWrite}>
            撰寫評價
          </button>
        </div>
      </header>
      <section className="reviews-content">
        <div className="review-summary">
          <img src={staffPhoto(staff.id)} alt={`${staff.name} profile`} />
          <div>
            <p>員工</p>
            <h2>{staff.name}</h2>
            <Stars score={Math.round(average)} />
            <strong>
              {average.toFixed(1)}{" "}
              <span>· {entries.length} 則評價</span>
            </strong>
          </div>
          <label>
            <Search />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜尋評價"
              aria-label="搜尋員工評價"
            />
          </label>
        </div>
        <h3>最近評價</h3>
        <div className="review-list">
          {shown.map((entry) => (
            <article key={entry.project}>
              <header>
                <h4>{entry.project}</h4>
                <time>{entry.date}</time>
              </header>
              <div className="review-body">
                <dl>
                  {entry.scores.map((score, index) => (
                    <div key={labels[index]}>
                      <dt>{labels[index]}</dt>
                      <dd>
                        <Stars score={score} />
                      </dd>
                    </div>
                  ))}
                </dl>
                <div className="review-feedback">
                  <strong>備註</strong>
                  <p>{entry.feedback}</p>
                </div>
              </div>
            </article>
          ))}
          {shown.length === 0 && (
            <p className="review-empty">沒有符合的評價「{query}」</p>
          )}
        </div>
      </section>
    </main>
  )
}
