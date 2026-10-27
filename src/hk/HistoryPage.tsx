import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Calendar03Icon,
  CheckmarkCircle02Icon,
  Download04Icon,
} from "@hugeicons/core-free-icons"
import { DateRangeDialog, dateRangeLabel } from "./DateRangePicker"
import {
  DownloadDialog,
  ExportDateSheet,
  longDate,
} from "./EAttendanceListPage"
import type { HistorySheet } from "./HistoryDetailPage"
import BackIcon from "../BackIcon"
import "../e-attendance.css"

/**
 * History — every E-Attendance list that has already been confirmed, with the
 * revision state and a direct line to the employer. Same shell, header and
 * panel as E-Attendance List so the two read as one family.
 */

type Mode = "Per Hour" | "Per Room"
type Status = "已發送" | "已修改" | "待處理"

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
  { id: 1, iso: "2026-10-21", date: "2026年10月21日 週三", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group", status: "已修改", stamp: "2026年10月21日 09:50" },
  { id: 2, iso: "2026-10-20", date: "2026年10月20日 週二", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group", status: "待處理" },
  { id: 3, iso: "2026-10-15", date: "2026年10月15日 週四", mode: "Per Hour", confirmed: 1, total: 10, employer: "Hong Ye Group", status: "已發送", stamp: "2026年10月16日 10:12" },
  { id: 4, iso: "2026-10-15", date: "2026年10月15日 週四", mode: "Per Hour", confirmed: 1, total: 15, employer: "Hong Ye Group", status: "待處理" },
  { id: 5, iso: "2026-10-14", date: "2026年10月14日 週三", mode: "Per Hour", confirmed: 1, total: 5, employer: "Hong Ye Group", status: "已發送", stamp: "2026年10月15日 08:35" },
]

/** 狀態 → 配色 class（與新加坡 / 馬來西亞同一套：已發送藍、已修改綠、待處理琥珀） */
const STATUS_CLASS: Record<Status, string> = {
  已發送: "is-sent",
  已修改: "is-revised",
  待處理: "is-pending",
}

const MONTHS_ZH = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

/** 修订完成的时间戳，格式与列表里其他 stamp 一致：Oct 21, 2026 16:02 */
function nowStamp() {
  const now = new Date()
  const pad = (value: number) => String(value).padStart(2, "0")
  return `${now.getFullYear()}年${MONTHS_ZH[now.getMonth()]}${now.getDate()}日 ${pad(
    now.getHours(),
  )}:${pad(now.getMinutes())}`
}

const STATUS_FILTERS = ["全部", "已發送", "已修改", "待處理"] as const

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
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("全部")
  const [notice, setNotice] = useState(incomingNotice ?? "")
  /** 右边那颗日历图标和 Summary 按钮打开的是同一张弹窗，只是标题不同 */
  const [dateDialog, setDateDialog] = useState<"filter" | "summary" | null>(null)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  /** 顶栏「下載 / 發送」：先滚轮选日期，再勾选要下载哪几份（与電子考勤列表同一套弹窗） */
  const [exportOpen, setExportOpen] = useState(false)
  /** 要下載哪一天的考勤表：顶栏弹窗与行内文字按钮都走这一张 */
  const [downloadTarget, setDownloadTarget] = useState<{
    date: string
    employer: string
  } | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  const rangeLabel = dateRangeLabel(startDate, endDate)
  const hasRange = Boolean(startDate || endDate)

  const visible = rows.filter((record) => {
    if (startDate && record.iso < startDate) return false
    if (endDate && record.iso > endDate) return false
    if (statusFilter !== "全部" && record.status !== statusFilter) return false
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
        record.iso === revisedIso ? { ...record, status: "已修改", stamp: nowStamp() } : record,
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
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button className="attendance-back" onClick={onBack} aria-label="返回工作台">
              <BackIcon />
            </button>
          </nav>
          <h1>記錄</h1>
        </div>

        <div className="attendance-toolbar e-hist-toolbar" role="toolbar" aria-label="記錄操作">
          <button
            className="attendance-soft-button e-att-export"
            onClick={() => setExportOpen(true)}
            aria-label="下載 / 發送指定日期的考勤表"
          >
            <HugeiconsIcon icon={Download04Icon} size={24} strokeWidth={1.8} color="currentColor" />
            <span>下載 / 發送</span>
          </button>
          <button
            className={`attendance-soft-button e-hist-summary${hasRange ? " is-set" : ""}`}
            onClick={() => setDateDialog("summary")}
            aria-haspopup="dialog"
            aria-label={`摘要，目前 ${rangeLabel}`}
          >
            <span>{hasRange ? rangeLabel : "摘要"}</span>
            <HugeiconsIcon icon={Calendar03Icon} size={22} strokeWidth={2} color="currentColor" />
          </button>
          <ToolbarPicker
            label="狀態"
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

      <section className="attendance-panel e-att-panel" aria-label="考勤記錄">
        <div className="e-hist-head" aria-hidden="true">
          <span>日期</span>
          <span>類型</span>
          <span>已確認</span>
          <span>僱主</span>
          <span>狀態</span>
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
              aria-label={`開啟 ${record.date} 的簽到簽退記錄`}
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
              <span className={`e-hist-status ${STATUS_CLASS[record.status]}`}>
                {record.status}
                {record.stamp && <em>{record.stamp}</em>}
              </span>
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
          ))}
        </ul>

        <p className={`e-att-end${visible.length ? "" : " is-empty"}`}>
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

      {exportOpen && (
        <ExportDateSheet
          onCancel={() => setExportOpen(false)}
          onConfirm={(iso) => {
            setExportOpen(false)
            setDownloadTarget({ date: longDate(iso), employer: records[0].employer })
          }}
        />
      )}

      {downloadTarget && (
        <DownloadDialog
          date={downloadTarget.date}
          options={["發送財務", "部門下載", "保安部下載"]}
          onClose={() => setDownloadTarget(null)}
          onConfirm={(departments) => {
            const { date, employer } = downloadTarget
            setDownloadTarget(null)
            setNotice(`已下載 ${departments.join("、")}（${date}），可發送給 ${employer}。`)
          }}
        />
      )}

      {dateDialog && (
        <DateRangeDialog
          dialogRef={dialog}
          title={dateDialog === "summary" ? "摘要" : "選擇日期"}
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
