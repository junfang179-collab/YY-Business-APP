import { staffPhoto } from "../staffPhoto"
import BackIcon from "../BackIcon"
import "../reviews.css"

/**
 * 工作記錄 — 一名員工在哪些場地做過、各做了多少次。
 * 從員工評價頁右上角的「工作記錄」進入，返回原位。
 * 信息架構參考客戶舊系統：頭像 + 姓名，下面是「場地 —— 次數」的清單。
 */
const records = [
  { site: "Hong Kong Convention Centre", times: 5 },
  { site: "HONG YE GROUP LIMITED", times: 2 },
  { site: "dian xiao er", times: 2 },
  { site: "GRAND HYATT HONG KONG (BANQUET)", times: 1 },
  { site: "HONG YE GROUP LIMITED (GRAND HYATT HONG KONG)", times: 1 },
  { site: "Shangri-La Hotel Hong Kong (Banquet)", times: 1 },
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
        <button aria-label="返回員工評價" onClick={onBack}>
          <BackIcon />
        </button>
        <div>
          <p>員工資料</p>
          <h1>工作記錄</h1>
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
                <strong>{record.times} 次</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  )
}
