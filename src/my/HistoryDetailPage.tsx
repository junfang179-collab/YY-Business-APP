import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  PlusSignIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { AddStaffForm, AttendanceDialog } from "./AddStaffForm"
import AttendanceCheck from "./AttendanceCheck"
import { Caret, HoursSheet, SignatureSheet, TimeSheet } from "./AttendancePage"
import { StaffProfileDialog } from "./StaffProfileDialog"
import BackIcon from "../BackIcon"
import "../e-attendance.css"

/** 从 History 列表带过来的一张已提交单据 */
export type HistorySheet = { iso: string; date: string }

/** Action 只有两种结果：已申请 / 未到场 */
type Action = "Applied" | "No Show"
const ACTIONS: Action[] = ["Applied", "No Show"]

type Row = {
  id: number
  name: string
  nric: string
  start: string
  end: string
  timeIn: string
  timeOut: string
  breakHours: number
  /** 「+/- Hours」批量调整出来的增量，叠加在(end - start - break)之上 */
  adjust: number
  action: Action
  remark: string
}

const rows: Row[] = [
  { id: 1, name: "HARRY\nPOTTER", nric: "YYSG13\n5268", start: "20:00", end: "23:00", timeIn: "20:02", timeOut: "23:05", breakHours: 0, adjust: 0, action: "Applied", remark: "" },
  { id: 2, name: "LIANG\nJUNXIN", nric: "YYSG13\n5266", start: "20:00", end: "23:00", timeIn: "19:58", timeOut: "23:11", breakHours: 0, adjust: 0, action: "Applied", remark: "" },
  { id: 3, name: "MUSTAFA", nric: "YYSG13\n5270", start: "20:00", end: "23:00", timeIn: "20:07", timeOut: "23:02", breakHours: 0, adjust: 0, action: "Applied", remark: "" },
  { id: 4, name: "XIN\nYUAN", nric: "YYSG11\n8420", start: "20:00", end: "23:00", timeIn: "19:55", timeOut: "23:04", breakHours: 0, adjust: 0, action: "No Show", remark: "" },
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2026-10-21" → "Oct 21" */
function dayLabel(sheet: HistorySheet | null) {
  if (!sheet) return "Oct 21"
  const [, month, day] = sheet.iso.split("-").map(Number)
  return `${MONTHS[month - 1]} ${day}`
}

/** "23:00" → 23，用来算 Total */
const hourOf = (time: string) => Number(time.split(":")[0])

/** 单行工时：区间 - 休息 + 手动调整，最低 0 */
const totalOf = (row: Row) =>
  Math.max(0, hourOf(row.end) - hourOf(row.start) - row.breakHours + row.adjust)

/**
 * History 单条明细：一张 Sign In / Sign Out 单据的完整打卡记录。
 * 外壳、表头、表格样式全部沿用 E-Attendance 系列，多出的列用 local grid。
 */
export default function HistoryDetailPage({
  sheet,
  onBack,
  onSubmitted,
  onWriteReview,
}: {
  sheet: HistorySheet | null
  onBack: () => void
  /** 经理签完名 → 带一条成功提示 + 这一天回 History 列表 */
  onSubmitted: (message: string, iso: string) => void
  /** 人物卡里点 Reviews → 该员工 Staff Reviews 页（再从那页点 Write a review 写评价） */
  onWriteReview: (
    staff: { id: number; name: string; nric: string },
    target?: "reviews" | "write-review",
  ) => void
}) {
  const [query, setQuery] = useState("")
  const [staff, setStaff] = useState<Row[]>(rows)
  const [menuFor, setMenuFor] = useState<number | null>(null)
  /* 点 Break Hours 打开滚轮，改成多少就是多少 */
  const [breakFor, setBreakFor] = useState<number | null>(null)
  const [signOpen, setSignOpen] = useState(true)
  const [notice, setNotice] = useState("")
  const [remarkFor, setRemarkFor] = useState<number | null>(null)
  const [remarkDraft, setRemarkDraft] = useState("")
  /** 点 Name / NRIC 打开的人物卡 */
  const [profileFor, setProfileFor] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editing, setEditing] = useState(false)
  const [bulkSheet, setBulkSheet] = useState<"hours" | "in" | "out" | null>(null)
  /** 右下角悬浮的加人弹窗 */
  const [addOpen, setAddOpen] = useState(false)
  /** 点 Revise 的二次确认弹窗 */
  const [reviseOpen, setReviseOpen] = useState(false)
  /** 确认后接着签经理签名（和 Sign In / Sign Out 同一套签名板） */
  const [signSheetOpen, setSignSheetOpen] = useState(false)
  /** 签好的经理签名路径，签完直接替换左下角那条示例笔迹 */
  const [managerSign, setManagerSign] = useState("")

  const needle = query.trim().toLowerCase()
  const visible = staff.filter(
    (row) =>
      !needle ||
      row.name.replace(/\s/g, " ").toLowerCase().includes(needle) ||
      row.nric.replace(/\s/g, "").toLowerCase().includes(needle),
  )

  const totalHours = visible.reduce((sum, row) => sum + totalOf(row), 0)

  function setAction(id: number, action: Action) {
    setStaff((current) => current.map((row) => (row.id === id ? { ...row, action } : row)))
    setMenuFor(null)
    setNotice(`Action updated to ${action}.`)
  }

  function toggleSelected(id: number) {
    setSelectedIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function applyToSelected(patch: Partial<Row>) {
    setStaff((current) =>
      current.map((row) => (selectedIds.includes(row.id) ? { ...row, ...patch } : row)),
    )
  }

  return (
    <main className="attendance-page e-att-page h-det-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="Page navigation">
            <button className="attendance-back" onClick={onBack} aria-label="Back to History">
              <BackIcon />
            </button>
          </nav>
          <h1>History - Sign In / Sign Out ({dayLabel(sheet)})</h1>
        </div>

        <div className="attendance-toolbar h-det-toolbar" role="toolbar" aria-label="History actions">
          <button
            className={`attendance-soft-button${editing ? " is-editing" : ""}`}
            aria-pressed={editing}
            disabled={!editing && selectedIds.length === 0}
            onClick={() => {
              if (editing) {
                setEditing(false)
                setSelectedIds([])
                setMenuFor(null)
                return
              }
              setEditing(true)
              setMenuFor(null)
            }}
          >
            <ToolIcon name="edit" />
            <span>{editing ? "Done" : "Edit"}</span>
          </button>
          <button
            className="attendance-blue-button"
            onClick={() => setReviseOpen(true)}
          >
            <ToolIcon name="confirm" />
            <span>Revise</span>
          </button>
        </div>
      </header>

      <div className={`h-det-bar${editing ? " is-editing" : ""}`}>
        {editing ? (
          <div className="attendance-editbar" role="group" aria-label="Edit attendance">
            <button className="attendance-chip is-blue" onClick={() => setBulkSheet("hours")}>
              <span>+/- Hours</span>
              <Caret color="#3b81be" />
            </button>
            <button className="attendance-chip is-amber" onClick={() => setBulkSheet("in")}>
              <span>Time In</span>
              <Caret color="#a78331" />
            </button>
            <button className="attendance-chip is-amber" onClick={() => setBulkSheet("out")}>
              <span>Time Out</span>
              <Caret color="#a78331" />
            </button>
          </div>
        ) : (
          <p className="h-det-hours">
            <span>Total Hours:</span>
            <b>{totalHours.toFixed(1)}</b>
          </p>
        )}
        {!editing && (
          <label className="e-att-search h-det-search">
            <HugeiconsIcon icon={Search01Icon} size={22} strokeWidth={1.9} color="currentColor" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search NRIC"
              aria-label="Search staff by name or NRIC"
            />
          </label>
        )}
      </div>

      <section className="attendance-panel e-att-detail-panel h-det-panel" aria-label="Sign in and out records">
        <div className="attendance-table-scroll">
          <table className="attendance-table e-att-detail-table h-det-table">
            <colgroup>
              {[3.4, 6, 8.6, 9, 5.5, 11.5, 5.5, 11.5, 5, 6, 12, 16].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="attendance-check-cell">
                  <AttendanceCheck
                    label="Select every staff member"
                    checked={visible.length > 0 && visible.every((row) => selectedIds.includes(row.id))}
                    onChange={(checked) =>
                      setSelectedIds(checked ? visible.map((row) => row.id) : [])
                    }
                  />
                </th>
                <th scope="col">NO</th>
                <th scope="col">Name</th>
                <th scope="col">NRIC</th>
                <th scope="col">
                  Start
                  <br />
                  Time
                </th>
                <th scope="col">
                  Time In
                </th>
                <th scope="col">
                  End
                  <br />
                  Time
                </th>
                <th scope="col">
                  Time Out
                </th>
                <th scope="col">
                  Break
                  <br />
                  Hours
                </th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
                <th scope="col">Remark</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, index) => (
                <tr key={row.id} className={selectedIds.includes(row.id) ? "is-selected" : undefined}>
                  <td className="attendance-check-cell">
                    <AttendanceCheck
                      label={`Select ${row.name.replace("\n", " ")}`}
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelected(row.id)}
                    />
                  </td>
                  <td>
                    {/* 序号圆牌：和 Sign In 页一样单数行绿色、双数行灰色 */}
                    <span className={`attendance-number${index % 2 === 0 ? " is-active" : ""}`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="attendance-blue-text">
                    <button
                      className="attendance-profile-link attendance-cell-text"
                      onClick={() => setProfileFor(row.id)}
                      aria-label={`Open the profile of ${row.name.replace("\n", " ")}`}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="attendance-blue-text">
                    <button
                      className="attendance-profile-link attendance-cell-text"
                      onClick={() => setProfileFor(row.id)}
                      aria-label={`Open the profile of ${row.name.replace("\n", " ")}`}
                    >
                      {row.nric}
                    </button>
                  </td>
                  <td>{row.start}</td>
                  <td>
                    <div className="attendance-time-card">
                      {row.timeIn !== "—" && <SignatureMark variant={index % 2 === 0 ? 1 : 2} />}
                      <span>{row.timeIn}</span>
                    </div>
                  </td>
                  <td>{row.end}</td>
                  <td>
                    <div className="attendance-time-card">
                      {row.timeOut !== "—" && <SignatureMark variant={index % 2 === 0 ? 2 : 1} />}
                      <span>{row.timeOut}</span>
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="attendance-break-value attendance-break-button h-det-break"
                      aria-label={`Break hours for ${row.name.replace("\n", " ")}: ${row.breakHours}. Tap to set.`}
                      onClick={() => setBreakFor(row.id)}
                    >
                      {row.breakHours > 0 ? "+" : ""}
                      {row.breakHours}
                    </button>
                  </td>
                  <td>{totalOf(row)}</td>
                  <td>
                    <div className="attendance-action-wrap">
                      <button
                        className={`attendance-status attendance-blue-button h-det-status is-${row.action
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        aria-haspopup="listbox"
                        aria-expanded={menuFor === row.id}
                        onClick={() => setMenuFor(menuFor === row.id ? null : row.id)}
                      >
                        {row.action}
                        <Caret color="#fff" />
                      </button>
                      {menuFor === row.id && (
                        <div
                          className={`attendance-status-menu h-det-menu${index >= 2 ? "" : " is-down"}`}
                          role="listbox"
                          aria-label="Action"
                        >
                          {ACTIONS.map((option) => (
                            <button
                              key={option}
                              role="option"
                              aria-pressed={option === row.action}
                              onClick={() => setAction(row.id, option)}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-remark-button${row.remark ? " is-set" : ""}`}
                      aria-label={
                        row.remark
                          ? `View remark for ${row.name.replace("\n", " ")}`
                          : `Add a remark for ${row.name.replace("\n", " ")}`
                      }
                      onClick={() => {
                        setRemarkFor(row.id)
                        setRemarkDraft(row.remark)
                      }}
                    >
                      {row.remark ? (
                        <>
                          <span>View Remark</span>
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path
                              d="M3.6 8h8.1M8.4 4.7 11.7 8l-3.3 3.3"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 16 16" aria-hidden="true">
                            <path
                              d="M8 3.6v8.8M3.6 8h8.8"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.7"
                              strokeLinecap="round"
                            />
                          </svg>
                          <span>Remark</span>
                        </>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length && <p className="e-att-empty">No staff match that NRIC.</p>}
        </div>
      </section>

      {/* 右下角悬浮加人按钮：与 Sign In / Sign Out 同一颗，弹窗表单也同一套 */}
      <button
        className="attendance-add-button attendance-blue-button"
        aria-label="Add new staff to this sheet"
        onClick={() => setAddOpen(true)}
      >
        <HugeiconsIcon icon={PlusSignIcon} size={26} strokeWidth={2.4} color="currentColor" />
      </button>

      {addOpen && (
        <AttendanceDialog title="Personal information" onClose={() => setAddOpen(false)}>
          <AddStaffForm
            onAdd={(values) => {
              setStaff((current) => [
                ...current,
                {
                  id: Math.max(...current.map((row) => row.id)) + 1,
                  name: values.name.toUpperCase(),
                  nric: values.nric,
                  start: values.shift.split("-")[0],
                  end: values.shift.split("-")[1],
                  timeIn: "—",
                  timeOut: "—",
                  breakHours: 0,
                  adjust: 0,
                  action: "No Show",
                  remark: "",
                },
              ])
              setQuery("")
              setAddOpen(false)
              setNotice("Staff added to the list.")
            }}
          />
        </AttendanceDialog>
      )}

      {/* Revise 的二次确认：标题 + 居中问句 + No / Yes，层级和 Confirm attendance 一致 */}
      {reviseOpen && (
        <AttendanceDialog title="Revise e-attendance list" onClose={() => setReviseOpen(false)}>
          <p className="attendance-prompt-text is-compact h-det-revise-text">
            Are you sure to submit revised{" "}
            <span className="attendance-nowrap">e-attendance</span> list?
          </p>
          <div className="attendance-prompt-actions">
            <button className="attendance-soft-button" onClick={() => setReviseOpen(false)}>
              No
            </button>
            <button
              className="attendance-blue-button"
              onClick={() => {
                setReviseOpen(false)
                setSignSheetOpen(true)
              }}
            >
              Yes
            </button>
          </div>
        </AttendanceDialog>
      )}

      {/* 确认提交后签经理签名：与 Sign In / Sign Out 同一块签名板，签完才算提交 */}
      {signSheetOpen && (
        <SignatureSheet
          name="Manager's Signature"
          idNumber=""
          direction="out"
          kicker={`Revise · ${dayLabel(sheet)}`}
          onClose={() => setSignSheetOpen(false)}
          onSave={(path) => {
            setManagerSign(path)
            setSignSheetOpen(false)
            setEditing(false)
            setSelectedIds([])
            setMenuFor(null)
            onSubmitted("E-attendance list revised successfully.", sheet?.iso ?? "2026-10-21")
          }}
        />
      )}

      {/* Manager's Signature：左下角浮层，可收起 */}
      <div className={`h-sign${signOpen ? "" : " is-closed"}`}>
        {signOpen ? (
          <>
            <button
              className="h-sign-toggle"
              onClick={() => setSignOpen(false)}
              aria-label="Hide manager's signature"
              aria-expanded
            >
              <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={2.4} color="currentColor" />
            </button>
            <svg
              className="h-sign-mark"
              viewBox={managerSign ? "0 0 680 300" : "0 0 220 96"}
              fill="none"
              aria-hidden="true"
            >
              <path
                d={
                  managerSign ||
                  "M24 76c14-22 21-42 26-54 4-9 8-14 12-14 6 0 5 12 2 25-3 14-9 33-9 33s11-19 21-29c8-8 15-12 18-8 4 5-2 19 1 27 3 7 10 6 16 2 9-6 14-14 22-14 9 0 3 17 10 17 8 0 16-9 25-9 7 0 11 4 16 9"
                }
                stroke="#1b2733"
                strokeWidth={managerSign ? 9 : 3}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="h-sign-caption">Manager's Signature</span>
          </>
        ) : (
          <button className="h-sign-handle" onClick={() => setSignOpen(true)} aria-expanded={false}>
            <span>Manager's Signature</span>
            <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={2.4} color="currentColor" />
          </button>
        )}
      </div>

      {breakFor !== null && (
        <HoursSheet
          mode="set"
          title="Break Hours"
          initial={staff.find((row) => row.id === breakFor)?.breakHours ?? 0}
          note="Sets the break hours deducted for this staff member."
          onCancel={() => setBreakFor(null)}
          onConfirm={(value) => {
            const id = breakFor
            setStaff((current) =>
              current.map((row) =>
                row.id === id ? { ...row, breakHours: value } : row,
              ),
            )
            setBreakFor(null)
            const who = staff.find((row) => row.id === id)
            setNotice(
              `Break hours set to ${value} for ${who ? who.name.replace("\n", " ") : "this staff"}`,
            )
          }}
        />
      )}

      {bulkSheet === "hours" && (
        <HoursSheet
          note="Adjusts the recorded hours for every selected staff member."
          onCancel={() => setBulkSheet(null)}
          onConfirm={(delta) => {
            setStaff((current) =>
              current.map((row) =>
                selectedIds.includes(row.id)
                  ? { ...row, adjust: Number((row.adjust + delta).toFixed(2)) }
                  : row,
              ),
            )
            setBulkSheet(null)
            setNotice(`Hours updated for ${selectedIds.length} staff.`)
          }}
        />
      )}

      {bulkSheet === "in" && (
        <TimeSheet
          title="Time In"
          initial="20:00"
          onCancel={() => setBulkSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ timeIn: value })
            setBulkSheet(null)
            setNotice(`Time in updated for ${selectedIds.length} staff.`)
          }}
        />
      )}

      {bulkSheet === "out" && (
        <TimeSheet
          title="Time Out"
          withDate
          initial="23:00"
          onCancel={() => setBulkSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ timeOut: value })
            setBulkSheet(null)
            setNotice(`Time out updated for ${selectedIds.length} staff.`)
          }}
        />
      )}

      {(() => {
        const person = profileFor === null ? null : staff.find((row) => row.id === profileFor)
        if (!person) return null
        return (
          <StaffProfileDialog
            person={{ id: person.id, name: person.name, nric: person.nric }}
            onClose={() => setProfileFor(null)}
            onWriteReview={(target) => {
              setProfileFor(null)
              onWriteReview({ id: person.id, name: person.name, nric: person.nric }, target)
            }}
          />
        )
      })()}

      {remarkFor !== null && (
        <RemarkDialog
          name={staff.find((row) => row.id === remarkFor)?.name.replace("\n", " ") ?? "this staff"}
          initial={remarkDraft}
          onClose={() => setRemarkFor(null)}
          onSave={(value) => {
            setStaff((current) =>
              current.map((row) => (row.id === remarkFor ? { ...row, remark: value } : row)),
            )
            setRemarkFor(null)
            setNotice("Remark saved.")
          }}
        />
      )}

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
    </main>
  )
}

/** 打卡时留下的手写签名，套 Sign In / Sign Out 那颗时间卡里的笔迹规格 */
function SignatureMark({ variant }: { variant: 1 | 2 }) {
  const path =
    variant === 1
      ? "M4 34c5-2 9-7 12-13 3-6 5-12 8-12 4 0 2 10 0 16-2 5-4 10-3 10 3 0 8-8 12-13 3-4 6-6 8-4 2 3-1 10 2 12 4 3 9-2 13-6"
      : "M4 30c6 1 12-6 17-14 4-6 7-11 9-9 2 2-2 12-5 18-2 5-3 8-1 8 5 0 10-5 15-5 4 0 4 5 8 5 3 0 7-2 11-2"
  return (
    <svg className="attendance-signature" viewBox="0 0 70 44" fill="none" aria-hidden="true">
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

/** Remark 单元格点开的小弹窗，外壳和 Select Date 同一套 */
function RemarkDialog({
  name,
  initial,
  onSave,
  onClose,
}: {
  name: string
  initial: string
  onSave: (value: string) => void
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [value, setValue] = useState(initial)

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    node.showModal()
  }, [])

  return (
    <dialog
      ref={dialog}
      tabIndex={-1}
      className="attendance-dialog"
      aria-labelledby="h-det-remark-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="attendance-dialog-content">
        <button className="attendance-dialog-close" aria-label="Close" onClick={onClose}>
          <HugeiconsIcon icon={Cancel01Icon} size={26} strokeWidth={2} color="currentColor" />
        </button>
        <h2 id="h-det-remark-title">Remark</h2>
        <textarea
          className="attendance-remark-editor h-det-remark-editor"
          rows={3}
          value={value}
          placeholder={`Write a remark for ${name}`}
          aria-label={`Remark for ${name}`}
          onChange={(event) => setValue(event.target.value)}
        />
        <div className="attendance-prompt-actions">
          <button className="attendance-soft-button" onClick={onClose}>
            Cancel
          </button>
          <button className="attendance-blue-button" onClick={() => onSave(value.trim())}>
            Save
          </button>
        </div>
      </div>
    </dialog>
  )
}

/**
 * 顶栏工具的图标，直接沿用 Sign In / Sign Out 那套自绘 SVG（36×36、stroke 2.2），
 * 保证 Edit 的铅笔和 Confirm 的勾选框与那一页的图标完全同形。
 */
function ToolIcon({ name }: { name: "edit" | "confirm" }) {
  const paths = {
    edit: <path d="m6 25-2 8 8-2L32 11l-6-6L6 25ZM22 9l6 6M6 25l6 6" />,
    confirm: (
      <>
        <path d="M30 21v9H5V8h15M12 15l8 8L33 7" />
        <path d="M7 4h11" />
      </>
    ),
  }
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}
