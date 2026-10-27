import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { DateRangeDialog, dateRangeLabel } from "./DateRangePicker"
import BackIcon from "../BackIcon"
import "../attendance.css"
import "../e-attendance.css"
import "../staff-clothing.css"

type ClothingRequest = {
  id: number
  iso: string
  date: string
  time: string
  jobTitle: string
  employees: number
  company: string
}

/** 雇主这边提交过的服装申领记录 */
const requests: ClothingRequest[] = [
  { id: 1, iso: "2026-10-20", date: "2026年10月20日 週二", time: "10:11:01", jobTitle: "招聘清潔員", employees: 20, company: "HONG YE GROUP LIMITED" },
  { id: 2, iso: "2026-10-18", date: "2026年10月18日 週日", time: "09:24:37", jobTitle: "招聘清潔員", employees: 12, company: "HONG YE GROUP LIMITED" },
  { id: 3, iso: "2026-10-15", date: "2026年10月15日 週四", time: "14:02:18", jobTitle: "宴會制服套裝", employees: 8, company: "HONG YE GROUP LIMITED" },
  { id: 4, iso: "2026-10-12", date: "2026年10月12日 週一", time: "11:48:05", jobTitle: "廚房制服", employees: 6, company: "HONG YE GROUP LIMITED" },
]

export default function StaffClothingPage({
  onBack,
  onOpenRequest,
}: {
  onBack: () => void
  /** 点某一行 → 进这一单的服装尺码明细 */
  onOpenRequest: (request: { date: string; time: string; jobTitle: string }) => void
}) {
  const [query, setQuery] = useState("")
  const [dateOpen, setDateOpen] = useState(false)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const dialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!dateOpen) return
    const node = dialog.current
    if (!node) return
    node.showModal()
    node.focus()
  }, [dateOpen])

  const needle = query.trim().toLowerCase()
  const visible = requests.filter((request) => {
    if (startDate && request.iso < startDate) return false
    if (endDate && request.iso > endDate) return false
    if (!needle) return true
    return [request.date, request.jobTitle, request.company, request.time].some(
      (value) => value.toLowerCase().includes(needle),
    )
  })

  const range = dateRangeLabel(startDate, endDate)

  return (
    <main className="attendance-page e-att-page sc-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button
              className="attendance-back"
              onClick={onBack}
              aria-label="返回工作台"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>員工制服</h1>
        </div>
      </header>

      <div className="sc-toolbar">
        <button
          className={`sc-date${startDate || endDate ? " is-set" : ""}`}
          onClick={() => setDateOpen(true)}
          aria-label={`選擇日期範圍，目前為 ${range}`}
          title={range}
        >
          <HugeiconsIcon
            icon={Calendar03Icon}
            size={24}
            strokeWidth={1.8}
            color="currentColor"
          />
          <span>{startDate || endDate ? range : "日期"}</span>
        </button>

        <label className="sc-search">
          <HugeiconsIcon
            icon={Search01Icon}
            size={24}
            strokeWidth={1.8}
            color="currentColor"
          />
          <input
            type="search"
            value={query}
            placeholder="搜尋職位、公司或日期"
            aria-label="搜尋制服申請"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <section className="attendance-panel e-att-panel sc-panel" aria-label="員工制服申請">
        <div className="sc-head" aria-hidden="true">
          <span>日期</span>
          <span>時間</span>
          <span>職位</span>
          <span>申請員工</span>
          <span>公司</span>
        </div>

        <ul className="sc-rows">
          {visible.map((request) => (
            <li
              key={request.id}
              className="sc-row is-clickable"
              role="button"
              tabIndex={0}
              aria-label={`開啟 ${request.date} ${request.jobTitle} 的制服尺碼列表`}
              onClick={() => onOpenRequest(request)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onOpenRequest(request)
                }
              }}
            >
              <span className="sc-date-cell">{request.date}</span>
              <span className="sc-time">{request.time}</span>
              <span className="sc-job">
                <button type="button" tabIndex={-1}>
                  {request.jobTitle}
                </button>
              </span>
              <span className="sc-employees">{request.employees}</span>
              <span className="sc-company">{request.company}</span>
            </li>
          ))}
        </ul>

        <p className="e-att-end">
          {visible.length ? "沒有更多資料。" : "此期間沒有申請。"}
        </p>
      </section>

      {dateOpen && (
        <DateRangeDialog
          dialogRef={dialog}
          start={startDate}
          end={endDate}
          onStart={setStartDate}
          onEnd={setEndDate}
          onReset={() => {
            setStartDate("")
            setEndDate("")
          }}
          onClose={() => setDateOpen(false)}
        />
      )}
    </main>
  )
}
