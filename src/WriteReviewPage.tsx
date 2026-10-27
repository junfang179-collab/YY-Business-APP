import { useState, type FormEvent } from "react"
import { staffPhoto } from "./staffPhoto"
import BackIcon from "./BackIcon"
import "./write-review.css"

const labels = ["Attitude", "Performance", "Experience", "Grooming"]

/** Same masking rule as the attendance profile card: first letter + last four. */
export function maskedId(nric?: string) {
  if (!nric) return "—"
  const clean = nric.replace(/\s/g, "")
  return `${clean.slice(0, 1)}••••${clean.slice(-4)}`
}

export default function WriteReviewPage({
  staff,
  onBack,
  onSubmit,
}: {
  staff: { id: number; name: string; nric?: string }
  onBack: () => void
  onSubmit: () => void
  /** 单人评价没有「Skip」按钮，这个参数只为和另外两个地区的导出结构对齐 */
  onSkip: () => void
}) {
  const [ratings, setRatings] = useState([5, 4, 5, 4])
  const score = 4.6
  const reviewCount = 3

  function submit(event: FormEvent) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <main className="write-review-page">
      <div className="write-review-landscape" aria-hidden="true" />
      <header className="write-review-header">
        <button aria-label="Back to staff reviews" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>Staff feedback</p>
          <h1>Write a Review</h1>
        </div>
        <div className="write-review-actions">
          <button type="submit" form="write-review-form" className="is-submit">
            Submit
          </button>
        </div>
      </header>
      <form id="write-review-form" className="write-review-content" onSubmit={submit}>
        <section className="write-review-card">
          <div className="write-review-staff">
            <img src={staffPhoto(staff.id)} alt={`${staff.name} profile`} />
            <div>
              <p>Reviewing staff member</p>
              <h2>{staff.name}</h2>
              <div className="write-review-score">
                <div className="write-review-stars" aria-hidden="true">
                  {"★★★★"}
                  <em>★</em>
                </div>
                <strong>
                  {score.toFixed(1)} · {reviewCount} reviews
                </strong>
              </div>
            </div>
          </div>
          <div className="write-review-id">
            <span>NRIC</span>
            <strong>{maskedId(staff.nric)}</strong>
          </div>
          <div className="write-review-project">
            <label>
              Assignment / project
              <input
                defaultValue="Shangri-La Hotel · Banquet"
                aria-label="Assignment or project"
              />
            </label>
          </div>
          <div className="write-review-form-grid">
            <div className="write-review-ratings">
              <h3>Rate this shift</h3>
              {labels.map((label, index) => (
                <div key={label}>
                  <span>{label}</span>
                  <div role="radiogroup" aria-label={`${label} rating`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        className={star <= ratings[index] ? "selected" : ""}
                        aria-label={`${star} stars`}
                        aria-pressed={star === ratings[index]}
                        onClick={() =>
                          setRatings(
                            ratings.map((rating, position) =>
                              position === index ? star : rating,
                            ),
                          )
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <label className="write-review-feedback">
              <span>Feedback</span>
              <textarea
                required
                placeholder="Share feedback about this staff member and their performance."
              />
            </label>
          </div>
        </section>
      </form>
    </main>
  )
}
