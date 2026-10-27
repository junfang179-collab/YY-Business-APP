import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Download04Icon,
  MailSend01Icon,
} from "@hugeicons/core-free-icons"
import { DateRangeDialog, dateRangeLabel } from "./DateRangePicker"
import type { HistorySheet } from "./HistoryDetailPage"
import BackIcon from "./BackIcon"
import "./e-attendance.css"

/**
 * History — every E-Attendance list that has already been confirmed, with the
 * revision state and a direct line to the employer. Same shell, header and
 * panel as E-Attendance List so the two read as one family.
 */

type Mode = "Per Hour" | "Per Room"
type Status = "Sent" | "Revised" | "Pending"

type HistoryRecord = {
  id: number
  iso: string
  date: string
  mode: Mode
  confirmed: number
  total: number
  employer: string
  status: Status
  /** 状态下方那行小字：Revised 是修改时间，Sent 是发出时间 */
  stamp?: string
}

const records: HistoryRecord[] = [
  { id: 1, iso: "2026-10-21", date: "Wed, Oct 21, 2026", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group", status: "Revised", stamp: "Oct 21, 2026 09:50" },
  { id: 2, iso: "2026-10-20", date: "Tue, Oct 20, 2026", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group", status: "Pending" },
  { id: 3, iso: "2026-10-15", date: "Thu, Oct 15, 2026", mode: "Per Hour", confirmed: 1, total: 10, employer: "Hong Ye Group", status: "Sent", stamp: "Oct 16, 2026 10:12" },
  { id: 4, iso: "2026-10-15", date: "Thu, Oct 15, 2026", mode: "Per Room", confirmed: 1, total: 15, employer: "Hong Ye Group", status: "Pending" },
  { id: 5, iso: "2026-10-14", date: "Wed, Oct 14, 2026", mode: "Per Room", confirmed: 1, total: 5, employer: "Hong Ye Group", status: "Sent", stamp: "Oct 15, 2026 08:35" },
]

const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** 修订完成的时间戳，格式与列表里其他 stamp 一致：Oct 21, 2026 16:02 */
function nowStamp() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, "0")
  return `${SHORT_MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} ${pad(
    now.getHours(),
  )}:${pad(now.getMinutes())}`
}

const STATUS_FILTERS = ["All", "Sent", "Revised", "Pending"] as const

type StatusFilter = (typeof STATUS_FILTERS)[number]

export default function HistoryPage({
  onBack,
  onOpenRecord,
  notice: incomingNotice,
  revisedIso,
  onNoticeShown,
}: {
  onBack: () => void
  onOpenRecord: (record: HistorySheet) => void
  /** 明细页提交修订后带过来的成功提示 */
  notice?: string
  /** 刚签完名的单据日期：回来时把这一条标成 Revised */
  revisedIso?: string
  /** 提示已经显示过，通知外层清掉，免得下次进来又弹 */
  onNoticeShown?: () => void
}) {
  const [rows, setRows] = useState<HistoryRecord[]>(records)
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All")
  const [notice, setNotice] = useState(incomingNotice ?? "")
  /** 右边那颗日历图标和 Summary 按钮打开的是同一张弹窗，只是标题不同 */
  const [dateDialog, setDateDialog] = useState<"filter" | "summary" | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const dialog = useRef<HTMLDialogElement>(null)

  const rangeLabel = dateRangeLabel(startDate, endDate)
  const hasRange = Boolean(startDate || endDate)

  const visible = rows.filter((record) => {
    if (startDate && record.iso < startDate) return false
    if (endDate && record.iso > endDate) return false
    if (statusFilter !== "All" && record.status !== statusFilter) return false
    return true
  })

  useEffect(() => {
    if (!dateDialog) return
    const node = dialog.current
    if (!node) return
    node.showModal()
    node.focus()
  }, [dateDialog])

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 4000)
    return () => window.clearTimeout(timer)
  }, [notice])

  /** 明细页刚签完名回来：把这一条翻成 Revised 并盖上当前时间 */
  useEffect(() => {
    if (!revisedIso) return
    setRows((current) =>
      current.map((record) =>
        record.iso === revisedIso ? { ...record, status: "Revised", stamp: nowStamp() } : record,
      ),
    )
  }, [revisedIso])

  /** 提示交给本页显示后，外层就不用再记着它了 */
  useEffect(() => {
    if (incomingNotice) onNoticeShown?.()
  }, [incomingNotice, onNoticeShown])

  return (
    <main className="attendance-page e-att-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="Page navigation">
            <button className="attendance-back" onClick={onBack} aria-label="Back to workspace">
              <BackIcon />
            </button>
          </nav>
          <h1>History</h1>
        </div>

        <div className="attendance-toolbar e-hist-toolbar" role="toolbar" aria-label="History actions">
          <button
            className="attendance-blue-button e-hist-export"
            onClick={() => setNotice("Attendance history exported as CSV.")}
          >
            <HugeiconsIcon icon={Download04Icon} size={24} strokeWidth={1.9} color="currentColor" />
            <span>Export</span>
          </button>
          <button
            className={`attendance-soft-button e-hist-summary${hasRange ? " is-set" : ""}`}
            onClick={() => setDateDialog("summary")}
            aria-haspopup="dialog"
            aria-label={`Summary, currently ${rangeLabel}`}
          >
            <span>{hasRange ? rangeLabel : "Summary"}</span>
            <HugeiconsIcon icon={Calendar03Icon} size={22} strokeWidth={2} color="currentColor" />
          </button>
          <ToolbarPicker
            label="Status"
            value={statusFilter}
            options={[...STATUS_FILTERS]}
            onChange={(value) => setStatusFilter(value as StatusFilter)}
          />
          <button
            className={`attendance-soft-button e-date-trigger is-icon${hasRange ? " is-set" : ""}`}
            onClick={() => setDateDialog("filter")}
            aria-label={`Filter by date, currently ${rangeLabel}`}
            title={rangeLabel}
          >
            <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={1.8} color="currentColor" />
          </button>
        </div>
      </header>

      <section className="attendance-panel e-att-panel" aria-label="Attendance history">
        <div className="e-hist-head" aria-hidden="true">
          <span>Date</span>
          <span>Type</span>
          <span>Confirmed</span>
          <span>Employer</span>
          <span>Status</span>
          <span />
        </div>

        <ul className="e-att-rows">
          {visible.map((record) => (
            <li
              className="e-hist-row"
              key={record.id}
              role="button"
              tabIndex={0}
              onClick={() => onOpenRecord({ iso: record.iso, date: record.date })}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onOpenRecord({ iso: record.iso, date: record.date })
                }
              }}
              aria-label={`Open the sign in and out records of ${record.date}`}
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
              <span className={`e-hist-status is-${record.status.toLowerCase()}`}>
                {record.status}
                {record.stamp && <em>{record.stamp}</em>}
              </span>
              <button
                className="e-att-send"
                aria-label={`Send a reminder to ${record.employer} for ${record.date}`}
                onClick={(event) => {
                  event.stopPropagation()
                  setNotice(`A reminder was sent to ${record.employer} for ${record.date}.`)
                }}
              >
                <HugeiconsIcon icon={MailSend01Icon} size={26} strokeWidth={1.8} color="currentColor" />
              </button>
            </li>
          ))}
        </ul>

        <p className={`e-att-end${visible.length ? "" : " is-empty"}`}>
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

      {dateDialog && (
        <DateRangeDialog
          dialogRef={dialog}
          title={dateDialog === "summary" ? "Summary" : "Select Date"}
          start={startDate}
          end={endDate}
          onStart={setStartDate}
          onEnd={setEndDate}
          onReset={() => {
            setStartDate("")
            setEndDate("")
          }}
          onClose={() => setDateDialog(null)}
        />
      )}
    </main>
  )
}

function ToolbarPicker({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function onPointerDown(event: MouseEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [open])

  return (
    <div className="e-hist-picker" ref={root}>
      <button
        className="attendance-soft-button e-hist-picker-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${value}`}
        onClick={() => setOpen(!open)}
      >
        <span>{value}</span>
        <HugeiconsIcon icon={ArrowDown01Icon} size={22} strokeWidth={2} color="currentColor" />
      </button>
      {open && (
        <div className="e-hist-menu" role="listbox" aria-label={label}>
          {options.map((option) => (
            <button
              key={option}
              role="option"
              aria-selected={option === value}
              onClick={() => {
                onChange(option)
                setOpen(false)
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
