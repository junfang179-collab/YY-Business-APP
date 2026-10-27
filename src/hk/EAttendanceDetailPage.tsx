import { useEffect, useRef, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  PlusSignIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { StaffProfileDialog } from "./StaffProfileDialog"
import { AttendanceIcon, Caret } from "./AttendancePage"
import { setAddStaffOrigin, takePendingStaff } from "./addStaffStore"
import {
  setEditJobOrigin,
  setEditJobTargets,
  takeEditJobResult,
} from "./editJobStore"
import { buildLogTarget, setLogOrigin, setLogTarget } from "./logStore"
import BackIcon from "../BackIcon"
import "../e-attendance.css"

export type AttendanceSheet = { iso: string; date: string }

/**
 * 已提交的電子考勤列表明細。
 * 信息架構照客戶舊系統（No. / 姓名 / 單價 / 開始 / 結束 / 操作 / 職位 / 日誌），
 * 去掉該系統的 Time In / Time Out / +/-Hours 三列；視覺沿用「簽到 / 簽退」那一張表。
 */
/**
 * 明細頁的操作只有兩種：申請中（藍）與已拒絕（紅）。
 * 9 月 24 日那張簽到表用「已申請 / 未到場 / 已取消」，跟這裡不是同一套，所以各留一份。
 */
const ACTION_OPTIONS = ["已申請", "拒絕"] as const
type Action = (typeof ACTION_OPTIONS)[number]
const ACTION_CLASS: Record<Action, string> = {
  已申請: "is-applied",
  拒絕: "is-rejected",
}

type Row = {
  id: number
  /** 中文姓名（表格裡第一行） */
  name: string
  /** 英文姓名（第二行） */
  latin: string
  nric: string
  /** 時薪 */
  price: number
  job: string
  start: string
  end: string
  timeIn: string
  timeOut: string
  status: Action
  remark: string
}

const rows: Row[] = [
  { id: 1, name: "鄭迦晉", latin: "CHENG KA CHUN", nric: "YYSG135174", price: 40, job: "測試發布工作 shijian", start: "09:00", end: "17:00", timeIn: "09:02", timeOut: "17:06", status: "已申請", remark: "" },
  { id: 2, name: "陳嘉豪", latin: "CHAN KA HO", nric: "YYSG131776", price: 45, job: "宴會服務員", start: "20:00", end: "23:00", timeIn: "", timeOut: "", status: "拒絕", remark: "當日人手已滿" },
  { id: 3, name: "林佩珊", latin: "LAM PUI SHAN", nric: "YYSG120883", price: 42, job: "清潔員", start: "09:00", end: "18:00", timeIn: "08:56", timeOut: "", status: "已申請", remark: "" },
  { id: 4, name: "黃志明", latin: "WONG CHI MING", nric: "YYSG118420", price: 38, job: "廚房助理", start: "10:00", end: "19:00", timeIn: "", timeOut: "", status: "拒絕", remark: "職位已由其他人補上" },
]

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

/** "2026-11-02" → "11月2日" */
function sheetLabel(sheet: AttendanceSheet | null) {
  if (!sheet) return "11月2日"
  const [, month, day] = sheet.iso.split("-").map(Number)
  return `${MONTHS[month - 1]}${day}日`
}

export default function EAttendanceDetailPage({
  sheet,
  onBack,
  onWriteReview,
}: {
  sheet: AttendanceSheet | null
  onBack: () => void
  onWriteReview: (
    staff: { id: number; name: string; nric: string },
    target?: "reviews" | "write-review",
  ) => void
}) {
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const [staff, setStaff] = useState<Row[]>(rows)
  const [profileFor, setProfileFor] = useState<number | null>(null)
  const [openAction, setOpenAction] = useState<number | null>(null)
  const actionRoot = useRef<HTMLDivElement>(null)

  /* 从整页回来时接两笔交接（都读一次即清）：
     1. 「添加新員工」选好的人 → 接到表格末尾；
     2. 「編輯工作」提交的部门 / 工作 / 班次 / 单价 → 套到当时带过去的那批人。 */
  useEffect(() => {
    const added = takePendingStaff()
    const edited = takeEditJobResult()
    const notices: string[] = []

    if (added.length) {
      setStaff((current) => {
        const base = current.length ? Math.max(...current.map((row) => row.id)) : 0
        return [
          ...current,
          ...added.map((person, index) => ({
            id: base + index + 1,
            name: person.nameZh,
            latin: person.nameEn,
            nric: person.nric,
            price: person.price,
            job: person.job,
            start: person.start,
            end: person.end,
            timeIn: "",
            timeOut: "",
            status: "已申請" as Action,
            remark: "",
          })),
        ]
      })
      notices.push(`已加入 ${added.length} 位員工`)
    }

    if (edited && edited.ids.length) {
      const targets = new Set(edited.ids)
      setStaff((current) =>
        current.map((row) =>
          targets.has(row.id)
            ? {
                ...row,
                job: edited.jobTitle ?? row.job,
                price: edited.price ?? row.price,
                start: edited.start ?? row.start,
                end: edited.end ?? row.end,
              }
            : row,
        ),
      )
      notices.push(`已更新 ${edited.ids.length} 位員工的工作資料`)
    }

    if (notices.length) setNotice(`${notices.join("，")}。`)
  }, [])

  useEffect(() => {
    if (openAction === null) return
    const onPointerDown = (event: PointerEvent) => {
      if (!actionRoot.current?.contains(event.target as Node)) setOpenAction(null)
    }
    document.addEventListener("pointerdown", onPointerDown)
    return () => document.removeEventListener("pointerdown", onPointerDown)
  }, [openAction])

  const needle = query.trim().toLowerCase()
  const visible = staff.filter(
    (row) =>
      !needle ||
      row.name.toLowerCase().includes(needle) ||
      row.latin.toLowerCase().includes(needle) ||
      row.nric.toLowerCase().includes(needle),
  )

  function changeStatus(id: number, status: Action) {
    setStaff((current) =>
      current.map((row) => (row.id === id ? { ...row, status } : row)),
    )
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
            <button className="attendance-back" onClick={onBack} aria-label="返回電子考勤列表">
              <BackIcon />
            </button>
          </nav>
          <h1>電子考勤列表（{sheetLabel(sheet)}）</h1>
        </div>
        <div className="attendance-toolbar e-att-head-tools">
          {/* 跟「簽到 / 簽退」里同功能的按钮，进整页批量改；返回时回本页 */}
          <button
            type="button"
            className="attendance-soft-button e-att-editjob"
            aria-label="編輯本頁員工的工作資料"
            onClick={() => {
              setEditJobTargets(staff.map((row) => row.id))
              setEditJobOrigin("e-attendance-detail")
              window.location.hash = "edit-job"
            }}
          >
            <AttendanceIcon name="edit" />
            <span>編輯工作</span>
          </button>
          <label className="e-att-search">
            <HugeiconsIcon icon={Search01Icon} size={22} strokeWidth={1.9} color="currentColor" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜尋姓名或身份證號碼"
              aria-label="以姓名或身份證號碼搜尋員工"
            />
          </label>
        </div>
      </header>

      <section className="attendance-panel e-att-detail-panel" aria-label="已提交的考勤列表">
        <div className="attendance-table-scroll">
          <table className="attendance-table e-att-detail-table">
            <colgroup>
              {[5, 21, 12, 11, 11, 15, 18, 7].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col">序號</th>
                <th scope="col">姓名</th>
                <th scope="col">單價</th>
                <th scope="col">
                  開始
                  <br />
                  時間
                </th>
                <th scope="col">
                  結束
                  <br />
                  時間
                </th>
                <th scope="col">操作</th>
                <th scope="col">職位</th>
                <th scope="col">日誌</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <span className={`attendance-number${row.id === 1 ? " is-active" : ""}`}>
                      {row.id}
                    </span>
                  </td>
                  <td className="attendance-blue-text attendance-name-cell">
                    <button
                      className="attendance-profile-link attendance-cell-text"
                      onClick={() => setProfileFor(row.id)}
                      aria-label={`開啟 ${row.name} 的資料`}
                    >
                      {[row.name, row.latin].filter(Boolean).join("\n")}
                    </button>
                  </td>
                  <td>
                    <span className="attendance-cell-text attendance-price">
                      ${row.price}
                      <span className="attendance-price-unit">/小時</span>
                    </span>
                  </td>
                  <td>{row.start}</td>
                  <td>{row.end}</td>
                  <td>
                    <div
                      className="attendance-action-wrap"
                      ref={openAction === row.id ? actionRoot : undefined}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setOpenAction(null)
                      }}
                    >
                      <button
                        className={`attendance-status ${ACTION_CLASS[row.status]}`}
                        aria-label={`${row.name} 的狀態：${row.status}`}
                        aria-expanded={openAction === row.id}
                        aria-controls={`e-att-status-${row.id}`}
                        onClick={() =>
                          setOpenAction(openAction === row.id ? null : row.id)
                        }
                      >
                        <span className="attendance-status-label">{row.status}</span>
                        <Caret color="#fff" />
                      </button>
                      {openAction === row.id && (
                        <div
                          /* 第一行往上开会被表格容器的 overflow 裁掉，改成往下开 */
                          className={`attendance-status-menu${index === 0 ? " is-below" : ""}`}
                          id={`e-att-status-${row.id}`}
                        >
                          {ACTION_OPTIONS.map((status) => (
                            <button
                              key={status}
                              aria-pressed={row.status === status}
                              onClick={() => {
                                changeStatus(row.id, status)
                                setOpenAction(null)
                              }}
                            >
                              {status}
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
                      aria-label={`查看 ${row.name} 的日誌`}
                      onClick={() => {
                        setLogOrigin("e-attendance-detail")
                        setLogTarget(
                          buildLogTarget({
                            ...row,
                            department: "宴會部",
                            jobTitle: row.job,
                            inMethod: "signature",
                            outMethod: "signature",
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

      <button
        className="attendance-add-button attendance-blue-button"
        aria-label="新增員工至名單"
        onClick={() => {
          /* 跟簽到 / 簽退页共用同一张「添加新員工」整页，返回时回到本页 */
          setAddStaffOrigin("e-attendance-detail")
          window.location.hash = "add-staff"
        }}
      >
        <HugeiconsIcon icon={PlusSignIcon} size={26} strokeWidth={2.4} color="currentColor" />
      </button>

      {(() => {
        const person = profileFor === null ? null : staff.find((row) => row.id === profileFor)
        if (!person) return null
        return (
          <StaffProfileDialog
            person={{
              id: person.id,
              name: `${person.name} ${person.latin}`,
              nric: person.nric,
            }}
            onClose={() => setProfileFor(null)}
            onWriteReview={(target) => {
              setProfileFor(null)
              onWriteReview({ id: person.id, name: person.name, nric: person.nric }, target)
            }}
          />
        )
      })()}

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
