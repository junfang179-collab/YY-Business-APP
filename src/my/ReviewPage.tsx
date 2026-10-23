import { useState } from "react"
import { staffPhoto } from "../staffPhoto"
import "../reviews.css"

const entries = [
  {
    project: "Shangri-La Hotel · Banquet",
    date: "17:09 · 22 Nov, 2019",
    feedback:
      "This staff is reliable and attentive. Please assign the staff to regular client-facing shifts.",
    scores: [5, 4, 5, 4],
  },
  {
    project: "Sofitel Hotel · Main Kitchen",
    date: "17:09 · 22 Nov, 2019",
    feedback:
      "Strong punctuality and a good understanding of the daily operating routine.",
    scores: [4, 4, 4, 5],
  },
  {
    project: "Marina Bay Event · F&B Service",
    date: "09:45 · 18 Nov, 2019",
    feedback:
      "Worked well with the team and followed guest service standards throughout the event.",
    scores: [5, 5, 4, 5],
  },
]
const labels = ["Attitude", "Performance", "Experience", "Grooming"]
const Back = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <path d="m26 8-12 12 12 12" />
  </svg>
)
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
}: {
  staff: { id: number, name: string }
  onBack: () => void
  onWrite: () => void
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
        <button aria-label="Back to attendance" onClick={onBack}>
          <Back />
        </button>
        <div>
          <p>Staff profile</p>
          <h1>Staff Reviews</h1>
        </div>
        <button className="review-write" onClick={onWrite}>
          Write a review
        </button>
      </header>
      <section className="reviews-content">
        <div className="review-summary">
          <img src={staffPhoto(staff.id)} alt={`${staff.name} profile`} />
          <div>
            <p>Staff member</p>
            <h2>{staff.name}</h2>
            <Stars score={5} />
            <strong>
              4.6 <span>· {entries.length} reviews</span>
            </strong>
          </div>
          <label>
            <Search />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search reviews"
              aria-label="Search staff reviews"
            />
          </label>
        </div>
        <h3>Recent reviews</h3>
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
                  <strong>Feedback</strong>
                  <p>{entry.feedback}</p>
                </div>
              </div>
            </article>
          ))}
          {shown.length === 0 && (
            <p className="review-empty">No reviews match “{query}”.</p>
          )}
        </div>
      </section>
    </main>
  )
}
