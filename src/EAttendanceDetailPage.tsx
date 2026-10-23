import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  PlusSignIcon,
  Search01Icon,
} from "@hugeicons/core-free-icons"
import { AddStaffForm, AttendanceDialog } from "./AddStaffForm"
import { StaffProfileDialog } from "./StaffProfileDialog"
import "./e-attendance.css"

export type AttendanceSheet = { iso: string; date: string }

type Row = {
  id: number
  name: string
  nric: string
  start: string
  end: string
}

/** Roster snapshot of a single submitted list. */
const rows: Row[] = [
  { id: 1, name: "ARIEL", nric: "YYSG135174", start: "20:00", end: "23:00" },
  { id: 2, name: "TINA FANG", nric: "YYSG120883", start: "09:00", end: "18:00" },
  { id: 3, name: "XIN YUAN", nric: "YYSG118420", start: "10:00", end: "19:00" },
  { id: 4, name: "WEI JUN", nric: "YYSG131776", start: "12:00", end: "21:00" },
]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** "2026-11-02" → "Nov 02" */
function sheetLabel(sheet: AttendanceSheet | null) {
  if (!sheet) return "Nov 02"
  const [, month, day] = sheet.iso.split("-").map(Number)
  return `${MONTHS[month - 1]} ${String(day).padStart(2, "0")}`
}

export default function EAttendanceDetailPage({
  sheet,
  onBack,
  onWriteReview,
}: {
  sheet: AttendanceSheet | null
  onBack: () => void
  onWriteReview: (staff: { id: number; name: string; nric: string }) => void
}) {
  const [query, setQuery] = useState("")
  const [notice, setNotice] = useState("")
  const [staff, setStaff] = useState<Row[]>(rows)
  const [addOpen, setAddOpen] = useState(false)
  const [profileFor, setProfileFor] = useState<number | null>(null)

  const needle = query.trim().toLowerCase()
  const visible = staff.filter(
    (row) => !needle || row.name.toLowerCase().includes(needle) || row.nric.toLowerCase().includes(needle),
  )

  return (
    <main className="attendance-page e-att-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="Page navigation">
            <button className="attendance-back" onClick={onBack} aria-label="Back to E-Attendance List">
              <HugeiconsIcon icon={ArrowLeft02Icon} size={26} strokeWidth={2} color="currentColor" />
            </button>
          </nav>
          <h1>E-Attendance List ({sheetLabel(sheet)})</h1>
        </div>
        <label className="e-att-search">
          <HugeiconsIcon icon={Search01Icon} size={22} strokeWidth={1.9} color="currentColor" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search IC No."
            aria-label="Search staff by name or ID number"
          />
        </label>
      </header>

      <section className="attendance-panel e-att-detail-panel" aria-label="Submitted attendance list">
        <div className="attendance-table-scroll">
          <table className="attendance-table e-att-detail-table">
            <colgroup>
              {[8, 24, 22, 23, 23].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col">NO</th>
                <th scope="col">Name</th>
                <th scope="col">ID Number</th>
                <th scope="col">
                  Start
                  <br />
                  Time
                </th>
                <th scope="col">
                  End
                  <br />
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {visible.map((row, index) => (
                <tr key={row.id}>
                  <td>
                    <span className={`attendance-number${index % 2 === 0 ? " is-active" : ""}`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="attendance-blue-text">
                    <button
                      className="attendance-profile-link attendance-cell-text"
                      onClick={() => setProfileFor(row.id)}
                      aria-label={`Open the profile of ${row.name}`}
                    >
                      {row.name}
                    </button>
                  </td>
                  <td className="attendance-blue-text">
                    <button
                      className="attendance-profile-link attendance-cell-text"
                      onClick={() => setProfileFor(row.id)}
                      aria-label={`Open the profile of ${row.name}`}
                    >
                      {row.nric}
                    </button>
                  </td>
                  <td>{row.start}</td>
                  <td>{row.end}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length && <p className="e-att-empty">No staff match that IC No.</p>}
        </div>
      </section>

      <button
        className="attendance-add-button attendance-blue-button"
        aria-label="Add new staff to list"
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
                },
              ])
              setAddOpen(false)
              setNotice(`${values.name} was added to this list.`)
            }}
          />
        </AttendanceDialog>
      )}

      {(() => {
        const person = profileFor === null ? null : staff.find((row) => row.id === profileFor)
        if (!person) return null
        return (
          <StaffProfileDialog
            person={{
              id: person.id,
              name: person.name,
              nric: person.nric,
            }}
            onClose={() => setProfileFor(null)}
            onWriteReview={() => {
              setProfileFor(null)
              onWriteReview({ id: person.id, name: person.name, nric: person.nric })
            }}
          />
        )
      })()}

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
