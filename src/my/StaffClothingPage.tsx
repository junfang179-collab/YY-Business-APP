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
  { id: 1, iso: "2026-10-20", date: "Tue, Oct 20, 2026", time: "10:11:01", jobTitle: "Recruitment of cleaners", employees: 20, company: "HONG YE GROUP PTE LTD" },
  { id: 2, iso: "2026-10-18", date: "Sun, Oct 18, 2026", time: "09:24:37", jobTitle: "Recruitment of cleaners", employees: 12, company: "HONG YE GROUP PTE LTD" },
  { id: 3, iso: "2026-10-15", date: "Thu, Oct 15, 2026", time: "14:02:18", jobTitle: "Banquet uniform set", employees: 8, company: "HONG YE GROUP PTE LTD" },
  { id: 4, iso: "2026-10-12", date: "Mon, Oct 12, 2026", time: "11:48:05", jobTitle: "Kitchen whites", employees: 6, company: "HONG YE GROUP PTE LTD" },
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
          <nav className="attendance-navigation" aria-label="Page navigation">
            <button
              className="attendance-back"
              onClick={onBack}
              aria-label="Back to workspace"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>Staff Clothing</h1>
        </div>
      </header>

      <div className="sc-toolbar">
        <button
          className={`sc-date${startDate || endDate ? " is-set" : ""}`}
          onClick={() => setDateOpen(true)}
          aria-label={`Select date range, currently ${range}`}
          title={range}
        >
          <HugeiconsIcon
            icon={Calendar03Icon}
            size={24}
            strokeWidth={1.8}
            color="currentColor"
          />
          <span>{startDate || endDate ? range : "Date"}</span>
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
            placeholder="Search job title, company or date"
            aria-label="Search clothing requests"
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>

      <section className="attendance-panel e-att-panel sc-panel" aria-label="Staff clothing requests">
        <div className="sc-head" aria-hidden="true">
          <span>Date</span>
          <span>Time</span>
          <span>Job Title</span>
          <span>Request Employee</span>
          <span>Company</span>
        </div>

        <ul className="sc-rows">
          {visible.map((request) => (
            <li
              key={request.id}
              className="sc-row is-clickable"
              role="button"
              tabIndex={0}
              aria-label={`Open the clothing size list for ${request.jobTitle} on ${request.date}`}
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
          {visible.length ? "No More Data." : "No requests in this range."}
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
