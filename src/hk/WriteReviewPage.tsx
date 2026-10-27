import { useState, type FormEvent } from "react"
import { staffPhoto } from "../staffPhoto"
import BackIcon from "../BackIcon"
import "../write-review.css"

/* 三个维度与批量評價页保持一致（参考旧系统的「服務評價」口径） */
const labels = ["態度", "完成度", "是否準時"]

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
  /** 單人評價沒有「略過」按鈕，這個參數只為和另外兩個地區的導出結構對齊 */
  onSkip: () => void
}) {
  const [ratings, setRatings] = useState([5, 4, 5])
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
        <button aria-label="返回員工評價" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>員工評價</p>
          <h1>撰寫評價</h1>
        </div>
        <div className="write-review-actions">
          <button type="submit" form="write-review-form" className="is-submit">
            
            提交
          </button>
        </div>
      </header>
      <form id="write-review-form" className="write-review-content" onSubmit={submit}>
        <section className="write-review-card">
          <div className="write-review-staff">
            <img src={staffPhoto(staff.id)} alt={`${staff.name} profile`} />
            <div>
              <p>評價員工</p>
              <h2>{staff.name}</h2>
              <div className="write-review-score">
                <div className="write-review-stars" aria-hidden="true">
                  {"★★★★"}
                  <em>★</em>
                </div>
                <strong>
                  {score.toFixed(1)} · {reviewCount}  則評價
                </strong>
              </div>
            </div>
          </div>
          <div className="write-review-id">
            <span>身份證號碼</span>
            <strong>{maskedId(staff.nric)}</strong>
          </div>
          <div className="write-review-project">
            <label>
              
              工作 / 項目
              <input
                defaultValue="半島酒店 · 宴會"
                aria-label="工作或項目"
              />
            </label>
          </div>
          <div className="write-review-form-grid">
            <div className="write-review-ratings">
              <h3>評價這次班次</h3>
              {labels.map((label, index) => (
                <div key={label}>
                  <span>{label}</span>
                  <div role="radiogroup" aria-label={`${label}評分`}>
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
              <span>備註</span>
              <textarea
                required
                placeholder="分享此員工的表現備註。"
              />
            </label>
          </div>
        </section>
      </form>
    </main>
  )
}
