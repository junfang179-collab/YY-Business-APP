import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  CalendarCheckIcon,
  Clock01Icon,
  UserCheck02Icon,
} from "@hugeicons/core-free-icons"
import { AttendanceDialog, AttendanceIcon, QrMark, SignatureSheet } from "./AttendancePage"
import { QrArt } from "./QrCodePage"
import BackIcon from "../BackIcon"
import "../attendance.css"

/**
 * 門衛打卡（香港）。
 *
 * 資訊架構照客戶舊系統：頂部返回 + 標題 + 右上 QR Code、右側一個 IC 搜尋框，
 * 表格六列「姓名 / 開始時間 / 簽到 / 結束時間 / 簽出 / 職位」。
 * 未打卡時那格是一顆按鈕（簽到藍、簽出琥珀），打完之後換成「簽名縮圖 + 時間」，
 * 兩個方向都走同一個簽名板（左上取消、右上確認、中間簽名區、左下清除）。
 * 視覺沿用考勤頁那套玻璃藍。
 */

type Direction = "in" | "out"

type GateStaff = {
  id: number
  name: string
  latin: string
  nric: string
  start: string
  end: string
  timeIn: string
  timeOut: string
  signature: string
  outSignature: string
  jobTitle: string
}

const initialStaff: GateStaff[] = [
  {
    id: 1,
    name: "徐利霞",
    latin: "XU LI XIA",
    nric: "S54861256",
    start: "19:00",
    end: "22:00",
    timeIn: "10:16",
    timeOut: "",
    signature: "",
    outSignature: "",
    jobTitle: "測試發布工作shijian",
  },
  {
    id: 2,
    name: "陳嘉豪",
    latin: "CHAN KA HO",
    nric: "S14358752",
    start: "09:00",
    end: "18:00",
    timeIn: "",
    timeOut: "",
    signature: "",
    outSignature: "",
    jobTitle: "宴會服務員",
  },
  {
    id: 3,
    name: "李美玲",
    latin: "LI MEI LING",
    nric: "S78213644",
    start: "10:30",
    end: "20:00",
    timeIn: "",
    timeOut: "",
    signature: "",
    outSignature: "",
    jobTitle: "樓面接待",
  },
  {
    id: 4,
    name: "黃志強",
    latin: "WONG CHI KEUNG",
    nric: "S22984715",
    start: "11:00",
    end: "19:30",
    timeIn: "",
    timeOut: "",
    signature: "",
    outSignature: "",
    jobTitle: "廚房助理",
  },
  {
    id: 5,
    name: "林曉彤",
    latin: "LAM HIU TUNG",
    nric: "S66301827",
    start: "14:00",
    end: "23:00",
    timeIn: "",
    timeOut: "",
    signature: "",
    outSignature: "",
    jobTitle: "宴會服務員",
  },
  {
    id: 6,
    name: "何俊傑",
    latin: "HO CHUN KIT",
    nric: "S90417258",
    start: "18:00",
    end: "23:00",
    timeIn: "",
    timeOut: "",
    signature: "",
    outSignature: "",
    jobTitle: "保安員",
  },
]

/** 已簽名的縮圖：有畫過就還原筆跡，沒有（示範資料）就畫一段示意簽名 */
function SignedMark({ path }: { path?: string }) {
  if (path)
    return (
      <svg
        className="attendance-signature is-drawn"
        viewBox="0 0 680 300"
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  return (
    <svg
      className="attendance-signature"
      viewBox="0 0 280 90"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path
        strokeWidth="2.2"
        d="M20 63c21-18 65-26 93-21 16 3 4 11-17 14-24 4-61 5-74 3-16-3-8-8 10-10 34-4 73-2 104-1 40 0 83 0 111 5M16 64c25 0 52-7 74-10"
      />
      <path strokeWidth="3.7" d="M96 40c14-8 30-12 44-11" />
    </svg>
  )
}

function SearchGlyph() {
  return <AttendanceIcon name="search" />
}

function CloseGlyph() {
  return <AttendanceIcon name="close" />
}

function nowTime() {
  return new Date().toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  })
}

export default function GateCheckinPage({ onBack }: { onBack: () => void }) {
  const [staff, setStaff] = useState<GateStaff[]>(initialStaff)
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const [qrOpen, setQrOpen] = useState(false)
  const [signing, setSigning] = useState<{ id: number; direction: Direction } | null>(
    null,
  )

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 3600)
    return () => window.clearTimeout(timer)
  }, [notice])

  const visibleStaff = staff.filter((person) =>
    `${person.nric}${person.name}${person.latin}`
      .replace(/\s/g, "")
      .toLowerCase()
      .includes(query.replace(/\s/g, "").toLowerCase()),
  )

  const signingStaff =
    signing === null ? null : (staff.find((person) => person.id === signing.id) ?? null)

  const signedIn = staff.filter((person) => person.timeIn).length
  const signedOut = staff.filter((person) => person.timeOut).length
  const pending = staff.filter((person) => !person.timeIn).length

  function renderCell(person: GateStaff, direction: Direction) {
    const time = direction === "in" ? person.timeIn : person.timeOut
    if (!time) {
      return (
        <button
          type="button"
          className={`gate-action ${direction === "in" ? "is-in" : "is-out"}`}
          aria-label={`為 ${person.name} ${direction === "in" ? "簽到" : "簽出"}`}
          onClick={() => setSigning({ id: person.id, direction })}
        >
          {direction === "in" ? "簽到" : "簽出"}
        </button>
      )
    }
    return (
      <div className="attendance-time-card gate-time-card">
        <SignedMark
          path={direction === "in" ? person.signature : person.outSignature}
        />
        <span>{time}</span>
      </div>
    )
  }

  return (
    <main className="attendance-page gate-page">
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
              aria-label="返回部門主頁"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>門衛簽到 / 簽退（10月27日）</h1>
        </div>
        <div className="attendance-toolbar" role="toolbar" aria-label="門衛打卡操作">
          <button
            type="button"
            className="attendance-soft-button"
            onClick={() => setQrOpen(true)}
          >
            <QrMark />
            <span>二維碼</span>
          </button>
        </div>
      </header>

      <section className="attendance-panel gate-panel" aria-label="門衛簽到簽退">
        {/* 摘要列和考勤页同一套：左三张统计卡、右搜索框（四列网格） */}
        <div className="attendance-summary">
          <div className="attendance-stat-card">
            <span className="attendance-stat-icon">
              <HugeiconsIcon
                icon={UserCheck02Icon}
                size={24}
                strokeWidth={1.5}
                color="currentColor"
                aria-hidden="true"
              />
            </span>
            <div>
              <p>簽到：</p>
              <strong>{signedIn}</strong>
            </div>
          </div>
          <div className="attendance-stat-card">
            <span className="attendance-stat-icon">
              <HugeiconsIcon
                icon={CalendarCheckIcon}
                size={24}
                strokeWidth={1.5}
                color="currentColor"
                aria-hidden="true"
              />
            </span>
            <div>
              <p>簽出：</p>
              <strong>{signedOut}</strong>
            </div>
          </div>
          <div className="attendance-stat-card">
            <span className="attendance-stat-icon">
              <HugeiconsIcon
                icon={Clock01Icon}
                size={24}
                strokeWidth={1.5}
                color="currentColor"
                aria-hidden="true"
              />
            </span>
            <div>
              <p>待簽到：</p>
              <strong>{pending}</strong>
            </div>
          </div>
          <label className="attendance-search">
            <SearchGlyph />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="搜尋身份證號碼或員工姓名"
              placeholder="搜尋身份證號碼"
            />
          </label>
        </div>

        <div className="attendance-table-scroll gate-table-scroll">
          <table className="attendance-table gate-table">
            <colgroup>
              {[25, 13, 14, 13, 14, 21].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col">姓名</th>
                <th scope="col">開始時間</th>
                <th scope="col">簽到</th>
                <th scope="col">結束時間</th>
                <th scope="col">簽出</th>
                <th scope="col">職位</th>
              </tr>
            </thead>
            <tbody>
              {visibleStaff.map((person) => (
                <tr key={person.id}>
                  <td className="attendance-blue-text">
                    <span className="attendance-cell-text">
                      {`${person.name}\n${person.latin}`}
                    </span>
                  </td>
                  <td>{person.start}</td>
                  <td>{renderCell(person, "in")}</td>
                  <td>{person.end}</td>
                  <td>{renderCell(person, "out")}</td>
                  <td className="gate-job">{person.jobTitle}</td>
                </tr>
              ))}
              <tr className="gate-end-row">
                <td colSpan={6}>
                  {visibleStaff.length === 0 ? "沒有符合的記錄" : "沒有更多記錄"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {notice && (
        <div className="attendance-toast" role="status">
          <AttendanceIcon name="confirm" />
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="關閉通知">
            <CloseGlyph />
          </button>
        </div>
      )}

      {qrOpen && (
        <AttendanceDialog title="簽到 / 簽退" onClose={() => setQrOpen(false)}>
          <div className="gate-qr">
            <div className="gate-qr-card">
              <QrArt />
            </div>
            <p className="gate-qr-hint">請員工掃描二維碼完成簽到 / 簽退。</p>
          </div>
        </AttendanceDialog>
      )}

      {signing && signingStaff && (
        <SignatureSheet
          name={signingStaff.name}
          idNumber={signingStaff.nric}
          direction={signing.direction}
          kicker={`門衛${signing.direction === "in" ? "簽到" : "簽出"} · 10月27日`}
          onClose={() => setSigning(null)}
          onSave={(path) => {
            const time = nowTime()
            const direction = signing.direction
            const person = signingStaff
            setStaff((current) =>
              current.map((item) =>
                item.id === person.id
                  ? {
                      ...item,
                      ...(direction === "in"
                        ? { timeIn: time, signature: path }
                        : { timeOut: time, outSignature: path }),
                    }
                  : item,
              ),
            )
            setSigning(null)
            setNotice(
              `${person.name} ${direction === "in" ? "簽到" : "簽出"}成功（${time}）`,
            )
          }}
        />
      )}
    </main>
  )
}
