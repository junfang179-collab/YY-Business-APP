import { staffPhoto } from "./staffPhoto"
import BackIcon from "./BackIcon"
import "./reviews.css"

/**
 * Work Record — 一名員工在哪些場地做過、各做了多少次。
 * 從 Staff Reviews 頁右上角的「Work Record」進入，返回原位。
 * 信息架構參考客戶舊系統：頭像 + 姓名，下面是「場地 —— 次數」的清單。
 */
const records = [
  { site: "Singapore Swimming Club", times: 5 },
  { site: "HONG YE GROUP PTE LTD", times: 2 },
  { site: "dian xiao er", times: 2 },
  { site: "GRAND HYATT SINGAPORE (BANQUET)", times: 1 },
  { site: "HONG YE GROUP PTE LTD (GRAND HYATT SINGAPORE)", times: 1 },
  { site: "Shangri-La's Rasa Sentosa Resort & Spa (Banquet)", times: 1 },
]

export default function WorkRecordPage({
  staff,
  onBack,
}: {
  staff: { id: number; name: string }
  onBack: () => void
}) {
  return (
    <main className="reviews-page work-record-page">
      <div className="reviews-landscape" aria-hidden="true" />
      <header className="reviews-header">
        <button aria-label="Back to staff reviews" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>Staff profile</p>
          <h1>Work Record</h1>
        </div>
        <span className="review-header-spacer" aria-hidden="true" />
      </header>

      <section className="reviews-content work-record-content">
        <div className="work-record-card">
          <div className="work-record-person">
            <img src={staffPhoto(staff.id)} alt={`${staff.name} profile`} />
            <h2>{staff.name}</h2>
          </div>
          <ul className="work-record-list">
            {records.map((record) => (
              <li key={record.site}>
                <span>{record.site}</span>
                <strong>
                  {record.times} Times
                </strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
