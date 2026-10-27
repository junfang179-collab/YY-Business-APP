import { useEffect, useMemo, useState } from "react"
import { maskedId } from "./WriteReviewPage"
import { staffPhoto } from "./staffPhoto"
import BackIcon from "./BackIcon"
import "./write-review.css"
import "./batch-review.css"

const labels = ["Attitude", "Performance", "Experience", "Grooming"]

type StaffRef = { id: number; name: string; nric: string }
type Draft = { ratings: number[]; feedback: string }

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round">
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 4.5 4.5" />
  </svg>
)

/* 與全項目彈窗的關閉按鈕同一段：36 視框、2.2 描邊、圓頭圓角 */
const CloseIcon = () => (
  <svg
    viewBox="0 0 36 36"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m9 9 18 18M27 9 9 27" />
  </svg>
)

const average = (ratings: number[]) =>
  ratings.reduce((sum, value) => sum + value, 0) / ratings.length

/** 逐人評分彈窗：視覺沿用香港那套（外層漸層卡 + 內層白卡），遮罩用真實元素（不靠 ::backdrop） */
function RatingDialog({
  staff,
  draft,
  onCancel,
  onSave,
}: {
  staff: StaffRef
  draft?: Draft
  onCancel: () => void
  onSave: (draft: Draft) => void
}) {
  const [ratings, setRatings] = useState(draft?.ratings ?? [5, 5, 5, 5])
  const [feedback, setFeedback] = useState(draft?.feedback ?? "")

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onCancel])

  return (
    <div className="batch-dialog-layer">
      <button
        type="button"
        className="batch-dialog-scrim"
        aria-label="Close"
        onClick={onCancel}
      />
      <section
        className="batch-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Review ${staff.name}`}
      >
        <header className="batch-dialog-head">
          <button
            type="button"
            className="batch-dialog-close"
            aria-label="Cancel"
            onClick={onCancel}
          >
            <CloseIcon />
          </button>
          <strong>{staff.name}</strong>
          <button
            type="button"
            className="batch-dialog-save"
            onClick={() => onSave({ ratings, feedback })}
          >
            Save
          </button>
        </header>
        <div className="batch-dialog-body">
          {labels.map((label, index) => (
            <div className="batch-dialog-row" key={label}>
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
          <label className="batch-dialog-feedback">
            <span>Feedback</span>
            <textarea
              value={feedback}
              placeholder="Optional note for this staff member."
              onChange={(event) => setFeedback(event.target.value)}
            />
          </label>
        </div>
      </section>
    </div>
  )
}

export default function BatchReviewPage({
  staffList,
  onBack,
  onSubmit,
  onSkip,
}: {
  staffList: StaffRef[]
  onBack: () => void
  onSubmit: () => void
  onSkip: () => void
}) {
  const [query, setQuery] = useState("")
  const [drafts, setDrafts] = useState<Record<number, Draft>>({})
  const [editing, setEditing] = useState<StaffRef | null>(null)

  const visible = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return staffList
    return staffList.filter(
      (person) =>
        person.name.toLowerCase().includes(keyword) ||
        person.nric.toLowerCase().includes(keyword),
    )
  }, [query, staffList])

  const reviewedCount = staffList.filter((person) => drafts[person.id]).length

  return (
    <main className="write-review-page batch-review-page">
      <div className="write-review-landscape" aria-hidden="true" />
      <header className="write-review-header">
        <button aria-label="Back to attendance" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>Staff feedback</p>
          <h1>Write Reviews</h1>
        </div>
        <div className="write-review-actions">
          <button type="button" className="is-skip" onClick={onSkip}>
            Skip
          </button>
          <button type="button" className="is-submit" onClick={onSubmit}>
            Submit
          </button>
        </div>
      </header>

      <div className="write-review-content">
        <label className="batch-search">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search staff by name or NRIC"
            aria-label="Search staff to review"
          />
          {query && (
            <button
              type="button"
              className="batch-search-clear"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              ×
            </button>
          )}
        </label>

        <p className="batch-progress" role="status">
          {reviewedCount} of {staffList.length} reviewed
        </p>

        <div className="batch-list">
          {visible.map((person) => {
            const draft = drafts[person.id]
            return (
              <article className="batch-row" key={person.id}>
                <img src={staffPhoto(person.id)} alt="" />
                <div className="batch-row-main">
                  <h3>{person.name}</h3>
                  <p>NRIC · {maskedId(person.nric)}</p>
                </div>
                <div className="batch-row-state">
                  {draft ? (
                    <span className="is-done">
                      ★ {average(draft.ratings).toFixed(1)}
                    </span>
                  ) : (
                    <span className="is-pending">Not reviewed</span>
                  )}
                </div>
                <button
                  type="button"
                  className={`batch-rate${draft ? " is-edit" : ""}`}
                  onClick={() => setEditing(person)}
                >
                  {draft ? "Edit" : "Rate"}
                </button>
              </article>
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="batch-empty">No staff found for “{query}”</p>
        )}
      </div>

      {editing && (
        <RatingDialog
          staff={editing}
          draft={drafts[editing.id]}
          onCancel={() => setEditing(null)}
          onSave={(draft) => {
            setDrafts((current) => ({ ...current, [editing.id]: draft }))
            setEditing(null)
          }}
        />
      )}
    </main>
  )
}
