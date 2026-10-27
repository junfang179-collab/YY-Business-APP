import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  PlusSignIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { AddStaffForm, AttendanceDialog } from "./AddStaffForm"
import AttendanceCheck from "./AttendanceCheck"
import { BatchSignatureSheet, Caret, SignatureSheet, TimeSheet } from "./AttendancePage"
import { StaffProfileDialog } from "./StaffProfileDialog"
import {
  setEditJobOrigin,
  setEditJobTargets,
  takeEditJobResult,
} from "./editJobStore"
import { buildLogTarget, setLogOrigin, setLogTarget } from "./logStore"
import BackIcon from "../BackIcon"
import "../e-attendance.css"

/** 从 History 列表带过来的一张已提交单据 */
export type HistorySheet = { iso: string; date: string }

/** Action 三种结果：已申請 / 未到場 / 已取消，与 9月24日 那页同款 */
type Action = "已申請" | "未到場" | "已取消"
const ACTIONS: Action[] = ["已申請", "未到場", "已取消"]
const ACTION_CLASS: Record<Action, string> = {
  已申請: "is-applied",
  未到場: "is-no-show",
  已取消: "is-cancelled",
}

type Row = {
  id: number
  name: string
  nric: string
  /** 時薪 */
  price: number
  /** 職位 */
  job: string
  start: string
  end: string
  timeIn: string
  timeOut: string
  action: Action
  remark: string
}

const rows: Row[] = [
  { id: 1, name: "HARRY\nPOTTER", nric: "YYSG13\n5268", price: 50, job: "測試發布工作 shijian", start: "19:00", end: "22:00", timeIn: "18:56", timeOut: "22:07", action: "已申請", remark: "宴會廳加開兩桌，延後收工。" },
  { id: 2, name: "LIANG\nJUNXIN", nric: "YYSG13\n5266", price: 50, job: "測試發布工作 shijian222", start: "19:00", end: "22:00", timeIn: "19:02", timeOut: "22:04", action: "已申請", remark: "由樓面調往宴會廳支援。" },
  { id: 3, name: "MUSTAFA", nric: "YYSG13\n5270", price: 45, job: "宴會服務員", start: "19:00", end: "22:00", timeIn: "", timeOut: "", action: "已申請", remark: "尚未簽到，待主管確認。" },
  { id: 4, name: "XIN\nYUAN", nric: "YYSG11\n8420", price: 42, job: "清潔員", start: "18:00", end: "22:00", timeIn: "", timeOut: "", action: "未到場", remark: "當日缺席，已通知部門主管。" },
]

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

/** "2026-10-21" → "Oct 21" */
function dayLabel(sheet: HistorySheet | null) {
  if (!sheet) return "10月21日"
  const [, month, day] = sheet.iso.split("-").map(Number)
  return `${MONTHS[month - 1]}${day}日`
}

/** "18:56" → 1136，用来算合计 */
const minutesOf = (time: string) => {
  const [hour, minute = "0"] = time.split(":")
  return Number(hour) * 60 + Number(minute)
}

/** 批量簽到 / 簽退的記錄時間：當下時刻（和 9月24日 那頁同一寫法） */
function nowTime() {
  const now = new Date()
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
}

/** 单行工时：实际签到到签退的小时数 + 手动调整；没签到 / 签退就是 0 */
const totalOf = (row: Row) =>
  row.timeIn && row.timeOut
    ? Math.max(0, (minutesOf(row.timeOut) - minutesOf(row.timeIn)) / 60)
    : 0

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
  /** 人物卡里点評價 → 先看評價列表，再看寫評價頁 */
  onWriteReview: (
    staff: { id: number; name: string; nric: string },
    target?: "reviews" | "write-review",
  ) => void
}) {
  const [query, setQuery] = useState("")
  const [staff, setStaff] = useState<Row[]>(rows)
  const [menuFor, setMenuFor] = useState<number | null>(null)
  /** 表格里点「簽到 / 簽退」：先签一张名，再把当下时间写进那一格 */
  const [signFor, setSignFor] = useState<{ id: number; direction: "in" | "out" } | null>(null)
  const [signOpen, setSignOpen] = useState(true)
  const [notice, setNotice] = useState("")
  /** 点 Name 打开的人物卡 */
  const [profileFor, setProfileFor] = useState<number | null>(null)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editing, setEditing] = useState(false)
  const [bulkSheet, setBulkSheet] = useState<"in" | "out" | null>(null)
  /** 頂欄「簽到 / 簽退」：一次簽名把當下時間套用到所有已勾選的人 */
  const [batchSign, setBatchSign] = useState<"in" | "out" | null>(null)
  /** 右下角悬浮的加人弹窗 */
  const [addOpen, setAddOpen] = useState(false)
  /** 点 Revise 的二次确认弹窗 */
  const [reviseOpen, setReviseOpen] = useState(false)
  /** 确认后接着签经理签名（和 Sign In / Sign Out 同一套签名板） */
  const [signSheetOpen, setSignSheetOpen] = useState(false)
  /** 签好的经理签名路径，签完直接替换左下角那条示例笔迹 */
  const [managerSign, setManagerSign] = useState("")

  /* 從「編輯工作」頁返回：把那一頁填的欄位套用到當時勾選的人（結果取一次即清） */
  useEffect(() => {
    const result = takeEditJobResult()
    if (!result || result.ids.length === 0) return
    setStaff((current) =>
      current.map((row) =>
        result.ids.includes(row.id)
          ? {
              ...row,
              ...(result.jobTitle ? { job: result.jobTitle } : null),
              ...(result.start ? { start: result.start } : null),
              ...(result.end ? { end: result.end } : null),
              ...(result.price !== undefined ? { price: result.price } : null),
            }
          : row,
      ),
    )
    setNotice(`已更新 ${result.ids.length} 位員工的工作資料。`)
  }, [])

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
    setNotice(`狀態已更新為 ${action}。`)
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

  /** 签完名 → 把当下时间写进签到 / 签退那一格 */
  function stampTime(id: number, direction: "in" | "out") {
    const now = new Date()
    const value = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
    setStaff((current) =>
      current.map((row) =>
        row.id === id ? { ...row, [direction === "in" ? "timeIn" : "timeOut"]: value } : row,
      ),
    )
    const who = staff.find((row) => row.id === id)
    setNotice(
      `${who ? who.name.replace("\n", " ") : "此員工"} 已${direction === "in" ? "簽到" : "簽退"}（${value}）。`,
    )
  }

  /** 簽到 / 簽退那两格：有时间就是白卡片 + 笔迹，没时间就是一颗蓝按钮（和 9月24日 一样） */
  function renderTime(row: Row, index: number, direction: "in" | "out") {
    const time = direction === "in" ? row.timeIn : row.timeOut
    if (!time) {
      return (
        <button
          className={`attendance-in-button attendance-blue-button${direction === "out" ? " is-out" : ""}`}
          aria-label={`為 ${row.name.replace("\n", " ")} ${direction === "in" ? "簽到" : "簽退"}`}
          onClick={() => setSignFor({ id: row.id, direction })}
        >
          {direction === "in" ? "簽到" : "簽退"}
        </button>
      )
    }
    return (
      <div className="attendance-time-card">
        <SignatureMark variant={index % 2 === 0 ? 1 : 2} />
        <span>{time}</span>
      </div>
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
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button className="attendance-back" onClick={onBack} aria-label="返回記錄">
              <BackIcon />
            </button>
          </nav>
          <h1>記錄 · 簽到／簽退（{dayLabel(sheet)}）</h1>
        </div>

        <div className="attendance-toolbar h-det-toolbar" role="toolbar" aria-label="記錄操作">
          {/* 批量簽到 / 簽退：先勾人，再簽一次名，時間套用到整批 */}
          <button
            className="attendance-soft-button"
            disabled={selectedIds.length === 0}
            onClick={() => setBatchSign("in")}
          >
            <ToolIcon name="signin" />
            <span>簽到</span>
          </button>
          <button
            className="attendance-soft-button"
            disabled={selectedIds.length === 0}
            onClick={() => setBatchSign("out")}
          >
            <ToolIcon name="signout" />
            <span>簽退</span>
          </button>
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
            <span>{editing ? "完成" : "編輯"}</span>
          </button>
          <button
            className="attendance-blue-button"
            onClick={() => setReviseOpen(true)}
          >
            <ToolIcon name="confirm" />
            <span>修改</span>
          </button>
        </div>
      </header>

      <div className={`h-det-bar${editing ? " is-editing" : ""}`}>
        {editing ? (
          <div className="attendance-editbar" role="group" aria-label="編輯考勤">
            <button className="attendance-chip is-amber" onClick={() => setBulkSheet("in")}>
              <span>簽到時間</span>
              <Caret color="#a78331" />
            </button>
            <button className="attendance-chip is-amber" onClick={() => setBulkSheet("out")}>
              <span>簽退時間</span>
              <Caret color="#a78331" />
            </button>
            {/* 部門 / 職位 / 班次時間統一收到「編輯工作」整頁裡批量改 */}
            <button
              className="attendance-chip is-blue edit-job-entry"
              disabled={selectedIds.length === 0}
              onClick={() => {
                setEditJobTargets(selectedIds)
                setEditJobOrigin("history-detail")
                window.location.hash = "edit-job"
              }}
            >
              <span>編輯工作</span>
              <svg className="edit-job-arrow" viewBox="0 0 16 16" aria-hidden="true">
                <path
                  d="m6 2.6 5.4 5.4L6 13.4"
                  fill="none"
                  stroke="#3b81be"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <p className="h-det-hours">
            <span>總時數：</span>
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
              placeholder="搜尋姓名"
              aria-label="以姓名或身份證號碼搜尋員工"
            />
          </label>
        )}
      </div>

      <section className="attendance-panel e-att-detail-panel h-det-panel" aria-label="簽到簽退記錄">
        <div className="attendance-table-scroll">
          <table className="attendance-table e-att-detail-table h-det-table">
            <colgroup>
              {[3.3, 4.0, 9.8, 8, 8, 10.8, 8, 10.8, 5.5, 12, 15.1, 4.7].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="attendance-check-cell">
                  <AttendanceCheck
                    label="選取所有員工"
                    checked={visible.length > 0 && visible.every((row) => selectedIds.includes(row.id))}
                    onChange={(checked) =>
                      setSelectedIds(checked ? visible.map((row) => row.id) : [])
                    }
                  />
                </th>
                <th scope="col">序號</th>
                <th scope="col">姓名</th>
                <th scope="col">單價</th>
                <th scope="col">
                  開始
                  <br />
                  時間
                </th>
                <th scope="col">
                  簽到
                  <br />
                  時間
                </th>
                <th scope="col">
                  結束
                  <br />
                  時間
                </th>
                <th scope="col">
                  簽退
                  <br />
                  時間
                </th>
                <th scope="col">合計</th>
                <th scope="col">操作</th>
                <th scope="col">職位</th>
                <th scope="col">日誌</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, index) => (
                <tr key={row.id} className={selectedIds.includes(row.id) ? "is-selected" : undefined}>
                  <td className="attendance-check-cell">
                    <AttendanceCheck
                      label={`選取 ${row.name.replace("\n", " ")}`}
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
                  <td className="attendance-blue-text attendance-name-cell">
                    <button
                      className="attendance-profile-link attendance-cell-text"
                      onClick={() => setProfileFor(row.id)}
                      aria-label={`開啟 ${row.name.replace("\n", " ")} 的資料`}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td>
                    <span className="attendance-cell-text attendance-price">
                      ${row.price}
                      <span className="attendance-price-unit">/小時</span>
                    </span>
                  </td>
                  <td>{row.start}</td>
                  <td>{renderTime(row, index, "in")}</td>
                  <td>{row.end}</td>
                  <td>{renderTime(row, index, "out")}</td>
                  <td>
                    <span className="attendance-total-value">{totalOf(row).toFixed(2)}</span>
                  </td>
                  <td>
                    <div className="attendance-action-wrap">
                      <button
                        className={`attendance-status ${ACTION_CLASS[row.action]}`}
                        aria-label={`${row.name.replace("\n", " ")} 的狀態：${row.action}`}
                        aria-haspopup="listbox"
                        aria-expanded={menuFor === row.id}
                        onClick={() => setMenuFor(menuFor === row.id ? null : row.id)}
                      >
                        <span className="attendance-status-label">{row.action}</span>
                        <Caret color={row.action === "已取消" ? "#7d8fa6" : "#fff"} />
                      </button>
                      {menuFor === row.id && (
                        <div
                          className={`attendance-status-menu h-det-menu${index >= 2 ? "" : " is-down"}`}
                          role="listbox"
                          aria-label="操作"
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
                  <td className="attendance-job-text">{row.job}</td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-log-button${row.remark ? " is-set" : ""}`}
                      aria-label={`查看 ${row.name.replace("\n", " ")} 的日誌`}
                      onClick={() => {
                        setLogOrigin("history-detail")
                        setLogTarget(
                          buildLogTarget({
                            id: row.id,
                            name: row.name,
                            department: "宴會部",
                            jobTitle: row.job,
                            start: row.start,
                            end: row.end,
                            timeIn: row.timeIn,
                            timeOut: row.timeOut,
                            inMethod: "signature",
                            outMethod: "signature",
                            status: row.action,
                            remark: row.remark,
                          }),
                        )
                        window.location.hash = "log"
                      }}
                    >
                      <svg viewBox="0 0 20 20" aria-hidden="true">
                        <rect
                          x="3.4"
                          y="2.4"
                          width="13.2"
                          height="15.2"
                          rx="3.2"
                          fill={row.remark ? "#1689eb" : "#e7f2fb"}
                          stroke={row.remark ? "#1689eb" : "#b6d6ef"}
                          strokeWidth="1.2"
                        />
                        <path
                          d="M6.8 7.2h6.4M6.8 10.1h6.4M6.8 13h4.2"
                          fill="none"
                          stroke={row.remark ? "#ffffff" : "#8ab4d4"}
                          strokeWidth="1.4"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length && <p className="e-att-empty">沒有符合的員工</p>}
        </div>
      </section>

      {/* 右下角悬浮加人按钮：与 Sign In / Sign Out 同一颗，弹窗表单也同一套 */}
      <button
        className="attendance-add-button attendance-blue-button"
        aria-label="新增員工至本表"
        onClick={() => setAddOpen(true)}
      >
        <HugeiconsIcon icon={PlusSignIcon} size={26} strokeWidth={2.4} color="currentColor" />
      </button>

      {addOpen && (
        <AttendanceDialog title="個人資料" onClose={() => setAddOpen(false)}>
          <AddStaffForm
            onAdd={(values) => {
              setStaff((current) => [
                ...current,
                {
                  id: Math.max(...current.map((row) => row.id)) + 1,
                  name: values.name.toUpperCase(),
                  nric: values.nric,
                  price: 45,
                  job: "宴會服務員",
                  start: values.shift.split("-")[0],
                  end: values.shift.split("-")[1],
                  timeIn: "",
                  timeOut: "",
                  action: "已申請",
                  remark: "",
                },
              ])
              setQuery("")
              setAddOpen(false)
              setNotice("員工已加入名單。")
            }}
          />
        </AttendanceDialog>
      )}

      {/* Revise 的二次确认：标题 + 居中问句 + No / Yes，层级和 Confirm attendance 一致 */}
      {reviseOpen && (
        <AttendanceDialog title="修改電子考勤列表" onClose={() => setReviseOpen(false)}>
          <p className="attendance-prompt-text is-compact h-det-revise-text">
            
            確定提交已修改的{" "}
            <span className="attendance-nowrap">電子考勤</span>  列表？
          </p>
          <div className="attendance-prompt-actions">
            <button className="attendance-soft-button" onClick={() => setReviseOpen(false)}>
              
              否
            </button>
            <button
              className="attendance-blue-button"
              onClick={() => {
                setReviseOpen(false)
                setSignSheetOpen(true)
              }}
            >
              
              是
            </button>
          </div>
        </AttendanceDialog>
      )}

      {/* 确认提交后签经理签名：与 Sign In / Sign Out 同一块签名板，签完才算提交 */}
      {signSheetOpen && (
        <SignatureSheet
          name="主管簽名"
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
            onSubmitted("電子考勤列表已修改成功。", sheet?.iso ?? "2026-10-21")
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
              aria-label="隱藏主管簽名"
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
            <span className="h-sign-caption">主管簽名</span>
          </>
        ) : (
          <button className="h-sign-handle" onClick={() => setSignOpen(true)} aria-expanded={false}>
            <span>主管簽名</span>
            <HugeiconsIcon icon={ArrowDown01Icon} size={18} strokeWidth={2.4} color="currentColor" />
          </button>
        )}
      </div>

      {bulkSheet === "in" && (
        <TimeSheet
          title="簽到時間"
          initial="20:00"
          onCancel={() => setBulkSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ timeIn: value })
            setBulkSheet(null)
            setNotice(`已更新 ${selectedIds.length} 位員工的簽到時間。`)
          }}
        />
      )}

      {bulkSheet === "out" && (
        <TimeSheet
          title="簽退時間"
          withDate
          initial="23:00"
          onCancel={() => setBulkSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ timeOut: value })
            setBulkSheet(null)
            setNotice(`已更新 ${selectedIds.length} 位員工的簽退時間。`)
          }}
        />
      )}

      {/* 批量簽到 / 簽退：簽一次名，當下時間寫進所有已勾選的人 */}
      {batchSign && (
        <BatchSignatureSheet
          direction={batchSign}
          total={selectedIds.length}
          time={nowTime()}
          date={dayLabel(sheet)}
          onClose={() => setBatchSign(null)}
          onSave={() => {
            const stamp = nowTime()
            const isIn = batchSign === "in"
            applyToSelected(isIn ? { timeIn: stamp } : { timeOut: stamp })
            setBatchSign(null)
            setNotice(
              `已為 ${selectedIds.length} 位員工記錄${isIn ? "簽到" : "簽退"}時間 ${stamp}，簽名已儲存。`,
            )
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

      {/* 表格里点「簽到 / 簽退」：和 9月24日 一样先签一张名，签完把时间落进那一格 */}
      {signFor && (
        <SignatureSheet
          name={staff.find((row) => row.id === signFor.id)?.name.replace("\n", " ") ?? ""}
          idNumber={staff.find((row) => row.id === signFor.id)?.nric.replace(/\s/g, "") ?? ""}
          direction={signFor.direction}
          kicker={`記錄 · ${dayLabel(sheet)}`}
          onClose={() => setSignFor(null)}
          onSave={() => {
            stampTime(signFor.id, signFor.direction)
            setSignFor(null)
          }}
        />
      )}

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

/**
 * 顶栏工具的图标，直接沿用 Sign In / Sign Out 那套自绘 SVG（36×36、stroke 2.2），
 * 保证 Edit 的铅笔和 Confirm 的勾选框与那一页的图标完全同形。
 */
function ToolIcon({ name }: { name: "edit" | "confirm" | "signin" | "signout" }) {
  const paths = {
    edit: <path d="m6 25-2 8 8-2L32 11l-6-6L6 25ZM22 9l6 6M6 25l6 6" />,
    confirm: (
      <>
        <path d="M30 21v9H5V8h15M12 15l8 8L33 7" />
        <path d="M7 4h11" />
      </>
    ),
    /* 簽到：箭頭穿進右側的門；簽退：箭頭離開左側的門 */
    signin: (
      <>
        <path d="M21 5h9v26h-9" />
        <path d="M4 18h13M12 13l5 5-5 5" />
      </>
    ),
    signout: (
      <>
        <path d="M15 5H6v26h9" />
        <path d="M32 18H19M24 13l-5 5 5 5" />
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
