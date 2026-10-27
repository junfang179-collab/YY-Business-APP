import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  Calendar03Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Download04Icon,
  Pdf01Icon,
} from "@hugeicons/core-free-icons"
import { DateRangeDialog, dateRangeLabel } from "./DateRangePicker"
import { EditSheet, WheelColumn } from "./AttendancePage"
import BackIcon from "../BackIcon"
import "../e-attendance.css"

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
  { id: 1, iso: "2026-11-02", date: "2026年11月2日 週一", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group" },
  { id: 2, iso: "2026-11-01", date: "2026年11月1日 週日", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
  { id: 3, iso: "2026-10-24", date: "2026年10月24日 週六", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
  { id: 4, iso: "2026-10-23", date: "2026年10月23日 週五", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
  { id: 5, iso: "2026-10-22", date: "2026年10月22日 週四", mode: "Per Hour", confirmed: 0, total: 5, employer: "Hong Ye Group" },
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
  const [pickOpen, setPickOpen] = useState(false)
  /** 要下載哪一天的考勤表（行內按鈕與頂部日期彈窗都走這一張） */
  const [downloadTarget, setDownloadTarget] = useState<{
    date: string
    employer: string
  } | null>(null)
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
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button
              className="attendance-back"
              onClick={onBack}
              aria-label="返回工作台"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>電子考勤列表</h1>
        </div>
        <div className="attendance-toolbar" role="toolbar" aria-label="列表操作">
          {/* 不指定某一行时，先选日期再下載 / 發送 */}
          <button
            className="attendance-soft-button e-att-export"
            onClick={() => setPickOpen(true)}
            aria-label="下載 / 發送指定日期的考勤表"
          >
            <HugeiconsIcon icon={Download04Icon} size={24} strokeWidth={1.8} color="currentColor" />
            <span>下載 / 發送</span>
          </button>
          <button
            className={`attendance-soft-button e-date-trigger is-icon${startDate || endDate ? " is-set" : ""}`}
            onClick={() => setDateOpen(true)}
            aria-label={`選擇日期範圍，目前為 ${rangeLabel}`}
            title={rangeLabel}
          >
            <HugeiconsIcon icon={Calendar03Icon} size={24} strokeWidth={1.8} color="currentColor" />
          </button>
        </div>
      </header>

      <section className="attendance-panel e-att-panel" aria-label="電子考勤記錄">
        <div className="e-att-head" aria-hidden="true">
          <span>日期</span>
          <span>類型</span>
          <span>已確認</span>
          <span>僱主</span>
          <span />
        </div>

        <ul className="e-att-rows">
          {visible.map((record) => {
            return (
              <li
                key={record.id}
                className="e-att-row is-clickable"
                role="button"
                tabIndex={0}
                aria-label={`開啟 ${record.date} 的電子考勤列表`}
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
                  {record.mode === "Per Room" ? "按房間" : "按小時"}
                </span>
                <span className="e-att-progress">
                  <b>{record.confirmed}</b>
                  <i>/</i>
                  {record.total}
                </span>
                <span className="e-att-employer">{record.employer}</span>
                <button
                  className="e-att-send"
                  aria-label={`下載 / 發送 ${record.date} 的考勤表`}
                  onClick={(event) => {
                    event.stopPropagation()
                    setDownloadTarget({
                      date: record.date.split(" ")[0],
                      employer: record.employer,
                    })
                  }}
                >
                  <span>下載 / 發送</span>
                </button>
              </li>
            )
          })}
        </ul>

        <p className="e-att-end">
          {visible.length ? "沒有更多資料。" : "此日期範圍沒有記錄。"}
        </p>
      </section>

      {notice && (
        <div className="attendance-toast" role="status">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={26} strokeWidth={1.8} color="currentColor" />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="關閉通知">
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

      {pickOpen && (
        <ExportDateSheet
          onCancel={() => setPickOpen(false)}
          onConfirm={(iso) => {
            setPickOpen(false)
            // 選完日期接著選要下載哪幾份（信息架构参考客户的旧系统）
            setDownloadTarget({ date: longDate(iso), employer: records[0].employer })
          }}
        />
      )}

      {downloadTarget && (
        <DownloadDialog
          date={downloadTarget.date}
          onClose={() => setDownloadTarget(null)}
          onConfirm={(departments) => {
            const { date, employer } = downloadTarget
            setDownloadTarget(null)
            setNotice(
              `已下載 ${departments.join("、")}（${date}），可發送給 ${employer}。`,
            )
          }}
        />
      )}
    </main>
  )
}

/** 香港只有兩種考勤表：部門匯總與保安部（信息架构参考客户的旧系统） */
const DEPARTMENTS = ["部門下載", "保安部下載"]

const pad2 = (value: number) => String(value).padStart(2, "0")
const YEAR_OPTIONS = ["2024", "2025", "2026", "2027", "2028"]
const MONTH_OPTIONS = Array.from({ length: 12 }, (_, index) => pad2(index + 1))

/** 某年某月有多少天（month 传 1–12） */
function daysInMonth(year: string, month: string) {
  return new Date(Number(year), Number(month), 0).getDate()
}

/** "2026-11-02" → "2026年11月2日" */
export function longDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return `${year}年${month}月${day}日`
}

/** 顶部「下載 / 發送」：先滚轮选日期，再下載當日的兩份考勤表。記錄頁共用同一張 */
export function ExportDateSheet({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: (iso: string) => void
}) {
  const today = new Date()
  const [year, setYear] = useState(
    String(Math.min(Math.max(today.getFullYear(), 2024), 2028)),
  )
  const [month, setMonth] = useState(pad2(today.getMonth() + 1))
  const [day, setDay] = useState(pad2(today.getDate()))

  const maxDay = daysInMonth(year, month)
  const dayOptions = Array.from({ length: maxDay }, (_, index) => pad2(index + 1))
  const dayValue = Number(day) > maxDay ? pad2(maxDay) : day
  const iso = `${year}-${month}-${dayValue}`

  return (
    <EditSheet
      title="下載 / 發送"
      onCancel={onCancel}
      onConfirm={() => onConfirm(iso)}
    >
      <div className="e-att-wheel-labels" aria-hidden="true">
        <span>年</span>
        <span>月</span>
        <span>日</span>
      </div>
      <div className="attendance-wheel">
        <WheelColumn items={YEAR_OPTIONS} value={year} onChange={setYear} />
        <WheelColumn items={MONTH_OPTIONS} value={month} onChange={setMonth} />
        <WheelColumn items={dayOptions} value={dayValue} onChange={setDay} />
      </div>
      <p className="attendance-preview-note">
        {longDate(iso)} · 部門考勤表與保安部考勤表
      </p>
    </EditSheet>
  )
}

export function DownloadDialog({
  date,
  options = DEPARTMENTS,
  onClose,
  onConfirm,
}: {
  /** 已格式化的日期，例如「2026年11月1日」 */
  date: string
  /** 可勾選的項目；記錄頁會多一項「發送財務」排在最前 */
  options?: string[]
  onClose: () => void
  onConfirm: (departments: string[]) => void
}) {
  const [picked, setPicked] = useState<string[]>(options)
  const sheet = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const node = sheet.current
    if (!node) return
    node.showModal()
    node.focus()
  }, [])

  function toggle(department: string) {
    setPicked((current) =>
      current.includes(department)
        ? current.filter((item) => item !== department)
        : [...current, department],
    )
  }

  return (
    <dialog
      ref={sheet}
      tabIndex={-1}
      className="attendance-dialog e-dl-dialog"
      aria-labelledby="e-dl-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="attendance-dialog-content">
        <button className="attendance-dialog-close" aria-label="關閉" onClick={onClose}>
          <HugeiconsIcon icon={Cancel01Icon} size={26} strokeWidth={2} color="currentColor" />
        </button>
        <h2 id="e-dl-title">下載（{date}）</h2>
        <p className="e-dl-hint">勾選需要下載的考勤表，可同時下載多份。</p>

        <div className="e-dl-options">
          {options.map((department, index) => {
            const on = picked.includes(department)
            return (
              <button
                key={department}
                type="button"
                role="checkbox"
                aria-checked={on}
                /* 三個選項時第一項佔滿一行，其餘兩項照舊並排 */
                className={`e-dl-option${on ? " is-on" : ""}${
                  index === 0 && options.length === 3 ? " is-wide" : ""
                }`}
                onClick={() => toggle(department)}
              >
                <span className="e-dl-file">
                  <HugeiconsIcon icon={Pdf01Icon} size={26} strokeWidth={1.8} color="currentColor" />
                </span>
                <span className="e-dl-name">{department}</span>
                <span className="e-dl-check" aria-hidden="true">
                  {on && (
                    <svg viewBox="0 0 24 24" fill="none">
                      <path
                        d="m5 12.5 4.4 4.4L19 7.2"
                        stroke="#fff"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </button>
            )
          })}
        </div>

        <div className="attendance-prompt-actions is-single e-dl-actions">
          <button
            className="attendance-blue-button e-dl-submit"
            disabled={!picked.length}
            onClick={() => onConfirm(picked)}
          >
            下載
          </button>
        </div>
      </div>
    </dialog>
  )
}
