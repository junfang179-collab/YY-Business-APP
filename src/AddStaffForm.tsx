import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

/**
 * Shared "Add staff" pieces. The Sign In / Sign Out screen and the
 * E-Attendance detail sheet both open the same dialog so the flow and the
 * styling stay identical.
 */

export function AttendanceDialog({
  title,
  children,
  onClose,
}: {
  /** 允许传 ReactNode，长问句里可以用 nowrap 包住不该断的单词 */
  title: ReactNode
  children: ReactNode
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.showModal()
    node.focus()
  }, [])
  return (
    <dialog
      ref={ref}
      tabIndex={-1}
      className="attendance-dialog"
      aria-labelledby="add-staff-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="attendance-dialog-content">
        <button className="attendance-dialog-close" aria-label="Close dialog" onClick={onClose}>
          <HugeiconsIcon icon={Cancel01Icon} size={26} strokeWidth={2} color="currentColor" />
        </button>
        <h2 id="add-staff-title">{title}</h2>
        {children}
      </div>
    </dialog>
  )
}

type StaffProfile = { name: string; gender: string; birth: string }

/**
 * Hiring records already on file. In the live app this is a lookup against the
 * staff database; here the NRIC resolves to a fixed profile, and unknown
 * IDs fall back to a stable entry so the form always shows a filled card.
 */
const DIRECTORY = [
  { nric: "YYSG135174", name: "ARIEL", gender: "Woman", birth: "2008-07-29" },
  { nric: "YYSG120883", name: "TINA FANG", gender: "Woman", birth: "1996-03-14" },
  { nric: "YYSG118420", name: "XIN YUAN", gender: "Woman", birth: "1999-11-02" },
  { nric: "YYSG131776", name: "WEI JUN", gender: "Man", birth: "1994-06-21" },
  { nric: "S245836589", name: "DANIEL TAN", gender: "Man", birth: "1991-01-08" },
  { nric: "S882014637", name: "SARAH LIM", gender: "Woman", birth: "1997-09-30" },
]

export function lookupStaffProfile(nric: string): StaffProfile | null {
  return lookupProfile(nric)
}

function lookupProfile(nric: string): StaffProfile | null {
  const key = nric.trim().toUpperCase()
  if (key.length < 4) return null
  const hit = DIRECTORY.find((row) => row.nric === key)
  if (hit) return { name: hit.name, gender: hit.gender, birth: hit.birth }
  let hash = 0
  for (const char of key) hash = (hash * 31 + char.charCodeAt(0)) % 100000
  const fallback = DIRECTORY[hash % DIRECTORY.length]
  return { name: fallback.name, gender: fallback.gender, birth: fallback.birth }
}

export function AddStaffForm({
  onAdd,
}: {
  onAdd: (values: {
    name: string
    nric: string
    gender: string
    department: string
    shift: string
  }) => void
}) {
  const [profile, setProfile] = useState<StaffProfile | null>(null)
  const [department, setDepartment] = useState("")
  const [shift, setShift] = useState("09:00-18:00")
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const nric = String(data.get("nric")).trim()
    const person = lookupProfile(nric)
    if (!person) return
    onAdd({
      name: person.name,
      nric,
      gender: person.gender,
      department,
      shift,
    })
  }
  return (
    <form className="attendance-add-form" onSubmit={submit}>
      <label>
        NRIC
        <input
          name="nric"
          placeholder="e.g. S245836589"
          required
          minLength={4}
          pattern=".*\S.*"
          autoComplete="off"
          onChange={(event) => setProfile(lookupProfile(event.target.value))}
        />
      </label>
      <label>
        Full name
        <span className={`attendance-readonly${profile ? "" : " is-empty"}`}>
          {profile ? profile.name : "Auto-filled from NRIC"}
        </span>
      </label>
      <label>
        Gender
        <span className={`attendance-readonly${profile ? "" : " is-empty"}`}>
          {profile ? profile.gender : "Auto-filled from NRIC"}
        </span>
      </label>
      <IpadPicker label="Department" value={department} placeholder="Select department" options={["Banquet", "F&B Service", "Kitchen", "Housekeeping"]} onChange={setDepartment} />
      <IpadPicker label="Shift time" value={shift} options={["08:00-17:00", "09:00-18:00", "10:00-19:00", "12:00-21:00"]} onChange={setShift} />
      <button type="submit" className="attendance-blue-button">Add staff to list</button>
    </form>
  )
}

export function IpadPicker({ label, value, placeholder, options, onChange }: { label: string; value: string; placeholder?: string; options: string[]; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false)
  const display = value.includes("-") ? value.replace("-", " – ") : value
  return <label className="attendance-ipad-picker">
    <span>{label}</span>
    <button type="button" aria-label={`Choose ${label}`} aria-expanded={open} onClick={() => setOpen(!open)} className={value ? "" : "is-placeholder"}>{value ? display : placeholder}<span className="attendance-picker-chevron" /></button>
    {open && <div className="attendance-picker-menu" role="listbox" aria-label={label}>{options.map((option) => <button type="button" role="option" aria-selected={value === option} key={option} onClick={() => { onChange(option); setOpen(false) }}>{option.includes("-") ? option.replace("-", " – ") : option}</button>)}</div>}
  </label>
}
