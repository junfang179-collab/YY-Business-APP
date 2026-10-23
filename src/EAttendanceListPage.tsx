import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft02Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons"
import { DateRangeDialog, dateRangeLabel } from "./DateRangePicker"
import "./e-attendance.css"

type Mode = "Per Hour" | "Per Room"

type AttendanceRecord = {
  id: number
  iso: string
  date: string
  mode: Mode
  confirmed: number
  total: number
  employer: string
}

/** Mock log of the E-Attendance submissions the employer has collected. */
const records: AttendanceRecord[] = [
  { id: 1, iso: "2026-11-02", date: "Mon, Nov 2, 2026", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group" },
  { id: 2, iso: "2026-11-01", date: "Sun, Nov 1, 2026", mode: "Per Room", confirmed: 0, total: 5, employer: "Hong Ye Group" },
  { id: 3, iso: "2026-10-24", date: "Sat, Oct 24, 2026", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
  { id: 4, iso: "2026-10-23", date: "Fri, Oct 23, 2026", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
  { id: 5, iso: "2026-10-22", date: "Thu, Oct 22, 2026", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
]

export default function EAttendanceListPage({
  onBack,
  onOpenRecord,
}: {
  onBack: () => void
  onOpenRecord: (record: { iso: string; date: string }) => void
}) {
  const [notice, setNotice] = useState("")
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

  const visible = records.filter((record) => {
    if (startDate && record.iso < startDate) return false
    if (endDate && record.iso > endDate) return false
    return true
  })

  const rangeLabel = dateRangeLabel(startDate, endDate)

  function closeDate() {
    setDateOpen(false)
  }

  function resetRange() {
    setStartDate("")
    setEndDate("")
  }

  return (
    <main className="attendance-page e-att-page">
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
              <HugeiconsIcon icon={ArrowLeft02Icon} size={26} strokeWidth={2} color="currentColor" />
            </button>
          </nav>
          <h1>E-Attendance List</h1>
        </div>
        <div className="attendance-toolbar" role="toolbar" aria-label="List actions">
          <button
            className={`attendance-soft-button e-date-trigger is-icon${startDate || endDate ? " is-set" : ""}`}
            onClick={() => setDateOpen(true)}
            aria-label={`Select date range, currently ${rangeLabel}`}
            title={rangeLabel}
          >
            <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={1.8} color="currentColor" />
          </button>
        </div>
      </header>

      <section className="attendance-panel e-att-panel" aria-label="E-Attendance records">
        <div className="e-att-head" aria-hidden="true">
          <span>Date</span>
          <span>Type</span>
          <span>Confirmed</span>
          <span>Employer</span>
          <span />
        </div>

        <ul className="e-att-rows">
          {visible.map((record) => {
            const complete = record.confirmed >= record.total
            return (
              <li
                key={record.id}
                className="e-att-row is-clickable"
                role="button"
                tabIndex={0}
                aria-label={`Open E-Attendance list for ${record.date}`}
                onClick={() => onOpenRecord({ iso: record.iso, date: record.date })}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault()
                    onOpenRecord({ iso: record.iso, date: record.date })
                  }
                }}
              >
                <span className="e-att-date">{record.date}</span>
                <span className={`e-att-mode${record.mode === "Per Room" ? " is-room" : ""}`}>
                  {record.mode}
                </span>
                <span className="e-att-progress">
                  <b>{record.confirmed}</b>
                  <i>/</i>
                  {record.total}
                </span>
                <span className="e-att-employer">{record.employer}</span>
                <button
                  className={`e-att-send${complete ? " is-done" : ""}`}
                  aria-label={
                    complete
                      ? `Attendance for ${record.date} is complete`
                      : `Send a reminder for ${record.date}`
                  }
                  onClick={(event) => {
                    event.stopPropagation()
                    setNotice(
                      complete
                        ? `Attendance for ${record.date} is already complete.`
                        : `A reminder was sent to ${record.employer} for ${record.date}.`,
                    )
                  }}
                >
                  <HugeiconsIcon
                    icon={complete ? CheckmarkCircle02Icon : MailSend01Icon}
                    size={26}
                    strokeWidth={1.8}
                    color="currentColor"
                  />
                </button>
              </li>
            )
          })}
        </ul>

        <p className="e-att-end">
          {visible.length ? "No More Data." : "No records in this date range."}
        </p>
      </section>

      {notice && (
        <div className="attendance-toast" role="status">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={26} strokeWidth={1.8} color="currentColor" />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Dismiss notification">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}

      {dateOpen && (
        <DateRangeDialog
          dialogRef={dialog}
          start={startDate}
          end={endDate}
          onStart={setStartDate}
          onEnd={setEndDate}
          onReset={resetRange}
          onClose={closeDate}
        />
      )}
    </main>
  )
}
