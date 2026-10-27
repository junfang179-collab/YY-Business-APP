import { useEffect, useMemo, useState } from "react"
import { maskedId } from "./WriteReviewPage"
import { staffPhoto } from "../staffPhoto"
import BackIcon from "../BackIcon"
import "../write-review.css"
import "../batch-review.css"

/**
 * 香港批量評價：列表 + 逐人評分彈窗。
 * 內容字段沿用參考舊系統後定下的口徑 —— 三個維度（態度 / 完成度 / 是否準時）
 * 加一段「備註」；評分仍然在每人的彈窗裡做，儲存後回寫列表狀態。
 */
const RATING_LABELS = ["態度", "完成度", "是否準時"]

type StaffRef = { id: number; name: string; nric: string }
type Draft = { ratings: number[]; feedback: string }
const EMPTY: Draft = { ratings: [5, 5, 5], feedback: "" }

const average = (ratings: number[]) => {
  const filled = ratings.filter((value) => value > 0)
  if (!filled.length) return 0
  return filled.reduce((sum, value) => sum + value, 0) / filled.length
}

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

/** 逐人評分彈窗：遮罩用真實元素（不靠 ::backdrop），複製到 Figma 也看得到 */
function RatingSheet({
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
  const [ratings, setRatings] = useState<number[]>(draft?.ratings ?? EMPTY.ratings)
  const [feedback, setFeedback] = useState(draft?.feedback ?? "")

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCancel()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onCancel])

  return (
    <div className="review-sheet-layer">
      <button
        type="button"
        className="review-sheet-scrim"
        aria-label="關閉"
        onClick={onCancel}
      />
      <section
        className="review-sheet"
        role="dialog"
        aria-modal="true"
        aria-label={`評價 ${staff.name}`}
      >
        <header className="review-sheet-head">
          <button type="button" className="review-sheet-close" aria-label="關閉" onClick={onCancel}>
            <CloseIcon />
          </button>
          <strong>{staff.name}</strong>
          <button
            type="button"
            className="review-sheet-save"
            onClick={() => onSave({ ratings, feedback })}
          >
            儲存
          </button>
        </header>

        <div className="review-sheet-body">
          <h4 className="review-sheet-title">服務評價</h4>
          <div className="review-sheet-rates">
            {RATING_LABELS.map((label, index) => (
              <div className="review-sheet-rate" key={label}>
                <span>{label}</span>
                <div role="radiogroup" aria-label={`${label}評分`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={star <= ratings[index] ? "is-on" : ""}
                      aria-label={`${label} ${star} 星`}
                      aria-pressed={star === ratings[index]}
                      onClick={() =>
                        setRatings(
                          ratings.map((rating, at) => (at === index ? star : rating)),
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

          <label className="review-sheet-remark">
            <span>備註</span>
            <textarea
              value={feedback}
              placeholder="此員工的表現備註（可選）。"
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

  const reviewedCount = Object.values(drafts).filter((draft) =>
    draft.ratings.some((rating) => rating > 0),
  ).length

  return (
    <main className="write-review-page batch-review-page">
      <div className="write-review-landscape" aria-hidden="true" />
      <header className="write-review-header">
        <button aria-label="返回考勤" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>員工評價</p>
          <h1>撰寫評價</h1>
        </div>
        <div className="write-review-actions">
          <button type="button" className="is-skip" onClick={onSkip}>
            略過
          </button>
          <button type="button" className="is-submit" onClick={onSubmit}>
            提交
          </button>
        </div>
      </header>

      <div className="write-review-content">
        <label className="batch-search">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="以姓名或身份證號碼搜尋員工"
            aria-label="搜尋需要評價的員工"
          />
          {query && (
            <button
              type="button"
              className="batch-search-clear"
              aria-label="清除搜尋"
              onClick={() => setQuery("")}
            >
              ×
            </button>
          )}
        </label>

        <p className="batch-progress" role="status">
          {reviewedCount} ／ {staffList.length} 已評價
        </p>

        <div className="review-list">
          {visible.map((person) => {
            const draft = drafts[person.id]
            const rating = draft ? average(draft.ratings) : 0

            return (
              <button
                type="button"
                className="review-row"
                key={person.id}
                onClick={() => setEditing(person)}
                aria-label={`評價 ${person.name}`}
              >
                <img src={staffPhoto(person.id)} alt="" />
                <span className="review-row-main">
                  <strong>{person.name}</strong>
                  <span>身份證號碼 · {maskedId(person.nric)}</span>
                </span>
                <span className={`review-row-state${draft ? " is-done" : ""}`}>
                  {draft ? (
                    <>
                      <span className="review-row-stars" aria-hidden="true">
                        ★
                      </span>
                      {rating.toFixed(1)}
                    </>
                  ) : (
                    "未評價"
                  )}
                </span>
                <span className={`review-row-action${draft ? " is-edit" : ""}`}>
                  {draft ? "編輯" : "評分"}
                </span>
              </button>
            )
          })}
        </div>

        {visible.length === 0 && (
          <p className="batch-empty">找不到符合的員工「{query}」</p>
        )}
      </div>

      {editing && (
        <RatingSheet
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
