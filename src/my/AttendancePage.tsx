import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type PointerEvent,
  type ReactNode,
} from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  CalendarCheckIcon,
  ChartUpIcon,
  UserCheck02Icon,
} from "@hugeicons/core-free-icons"
import { AddStaffForm } from "./AddStaffForm"
import AttendanceCheck from "./AttendanceCheck"
import { StaffProfileDialog } from "./StaffProfileDialog"
import PageStateSwitcher, { type PageState } from "../PageStateSwitcher"
import "../attendance.css"

type AttendanceIconName = "back" | "team-checkin" | "calendar-checkout" | "work-hours" | "search" | "edit" | "confirm" | "plus" | "close"

/**
 * Summary card glyphs come from Hugeicons (https://hugeicons.com) so the
 * dashboard uses one consistent icon family instead of hand-drawn paths.
 */
type HugeIconName = "team-checkin" | "calendar-checkout" | "work-hours"
const hugeIconMap: Record<HugeIconName, IconSvgElement> = {
  "team-checkin": UserCheck02Icon,
  "calendar-checkout": CalendarCheckIcon,
  "work-hours": ChartUpIcon,
}
const isHugeIconName = (name: AttendanceIconName): name is HugeIconName =>
  name in hugeIconMap

/**
 * UI labels for the editable staff fields. `nric` stays as the data key
 * (it is the identifier the mock records already use) but reads
 * "ID Number" wherever the user sees it.
 */
const staffFieldLabels = {
  name: "Name",
  nric: "ID Number",
  start: "Start time",
  end: "End time",
  remark: "Remark",
} as const

/**
 * A remark counts as "written" only when it holds real text. The mock rows use
 * an em dash to mean "nothing recorded", so that must read as empty here too.
 */
const hasRemark = (value: string) => {
  const text = value.trim()
  return text !== "" && text !== "—"
}

/** The minimum a downstream page (reviews / write-review) needs to know. */
export type StaffRef = { id: number; name: string; nric: string }

type Staff = {
  id: number
  name: string
  nric: string
  start: string
  end: string
  timeIn: string
  timeOut: string
  inMethod: "signature" | "qr"
  outMethod: "signature" | "qr"
  breakHours: number
  /** Per Room 计费时的房间数 */
  rooms: number
  total: number
  status: string
  remark: string
  active: boolean
  department?: string
  signature?: string
  outSignature?: string
}
type Modal = "qr" | "add" | {
  id: number
  direction: "in" | "out"
} | null

const initialStaff: Staff[] = [
  {
    id: 1,
    name: "Tina\nFang",
    nric: "S5486\n1256",
    start: "8:00",
    end: "22:00",
    timeIn: "7:58",
    timeOut: "23:03",
    inMethod: "signature",
    outMethod: "signature",
    breakHours: 1,
    rooms: 3,
    total: 15,
    status: "Applied",
    remark: "Very\nGood!",
    active: true,
  },
  {
    id: 2,
    name: "Xin\nYuan",
    nric: "S1435\n8752",
    start: "10:30",
    end: "18:00",
    timeIn: "10:27",
    timeOut: "18:12",
    inMethod: "qr",
    outMethod: "qr",
    breakHours: 0,
    rooms: 2,
    total: 7.5,
    status: "Applied",
    remark: "Nothing",
    active: false,
  },
  {
    id: 3,
    name: "Yin feng\nMeng",
    nric: "S5486\n1256",
    start: "11:00",
    end: "19:30",
    timeIn: "",
    timeOut: "19:46",
    inMethod: "signature",
    outMethod: "qr",
    breakHours: -2,
    rooms: 1,
    total: 6.5,
    status: "Applied",
    remark: "Good!",
    active: true,
  },
  {
    id: 4,
    name: "Wei\nJun",
    nric: "S6734\n2891",
    start: "09:00",
    end: "18:00",
    timeIn: "08:54",
    timeOut: "18:06",
    inMethod: "qr",
    outMethod: "qr",
    breakHours: 1,
    rooms: 2,
    total: 8,
    status: "Applied",
    remark: "Good!",
    active: false,
  },
  {
    id: 5,
    name: "Sarah\nLim",
    nric: "S8246\n5378",
    start: "08:30",
    end: "17:30",
    timeIn: "08:27",
    timeOut: "17:35",
    inMethod: "signature",
    outMethod: "signature",
    breakHours: 1,
    rooms: 3,
    total: 8,
    status: "Applied",
    remark: "Very\nGood!",
    active: true,
  },
  {
    id: 6,
    name: "Daniel\nTan",
    nric: "S3981\n6240",
    start: "12:00",
    end: "21:00",
    timeIn: "11:52",
    timeOut: "21:04",
    inMethod: "qr",
    outMethod: "qr",
    breakHours: 1,
    rooms: 1,
    total: 8,
    status: "No Show",
    remark: "—",
    active: false,
  },
  {
    id: 7,
    name: "Aisyah\nRahman",
    nric: "S7165\n9432",
    start: "10:00",
    end: "19:00",
    timeIn: "09:58",
    timeOut: "19:03",
    inMethod: "signature",
    outMethod: "signature",
    breakHours: 1,
    rooms: 2,
    total: 8,
    status: "Applied",
    remark: "Good!",
    active: true,
  },
]

/**
 * 加载骨架：行数按一屏能看到的行数给，列宽按真实列比例略微错开，
 * 看起来才像在加载真实数据而不是一排灰条。
 */
const SKELETON_ROWS = [0, 1, 2, 3, 4, 5, 6]
const SKELETON_CELLS = [
  "16px",
  "24%",
  "58%",
  "70%",
  "38%",
  "56%",
  "38%",
  "56%",
  "32%",
  "38%",
  "70%",
  "62%",
]

function AttendanceIcon({ name }: { name: AttendanceIconName }) {
  if (isHugeIconName(name)) {
    return (
      <HugeiconsIcon
        icon={hugeIconMap[name]}
        size={24}
        strokeWidth={1.5}
        color="currentColor"
        aria-hidden="true"
      />
    )
  }

  const paths: Record<Exclude<AttendanceIconName, HugeIconName>, ReactNode> = {
    back: <path d="m20 6-10 12 10 12" />,
    search: (
      <>
        <circle cx="15.5" cy="15.5" r="11.5" />
        <path d="m24 24 9 9" />
      </>
    ),
    edit: (
      <>
        <path d="m6 25-2 8 8-2L32 11l-6-6L6 25ZM22 9l6 6M6 25l6 6" />
      </>
    ),
    confirm: (
      <>
        <path d="M30 21v9H5V8h15M12 15l8 8L33 7" />
        <path d="M7 4h11" />
      </>
    ),
    plus: <path d="M18 6v24M6 18h24" />,
    close: <path d="m9 9 18 18M27 9 9 27" />,
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

function QrMark() {
  return (
    <svg
      className="attendance-qr-mark"
      viewBox="0 0 33 33"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M1 1h13v13H1V1Zm2 2v9h9V3H3Zm2 2h5v5H5V5ZM19 1h13v13H19V1Zm2 2v9h9V3h-9Zm2 2h5v5h-5V5ZM1 19h13v13H1V19Zm2 2v9h9v-9H3Zm2 2h5v5H5v-5Z"
      />
      <path d="M16 1h1v5h-1zM16 9h2v8h-2zM1 16h7v2H1zM10 16h4v2h-4zM19 16h5v3h-5zM26 16h6v2h-6zM16 21h3v6h-3zM21 21h4v3h-4zM25 19h3v3h-3zM29 23h3v4h-3zM21 27h5v5h-3v-2h-2zM28 29h4v3h-4zM16 30h3v2h-3z" />
    </svg>
  )
}

/** Shared coordinate space for the pad and every saved signature thumbnail. */
const SIGNATURE_WIDTH = 680
const SIGNATURE_HEIGHT = 300

function Signature({ path }: { path?: string }) {
  if (path)
    return (
      <svg
        className="attendance-signature is-drawn"
        viewBox={`0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}`}
        aria-hidden="true"
      >
        <path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
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
      <path
        strokeWidth="3.7"
        d="M96 41c-11-18-24 8-17 18 9 14 28-7 35-23 9-21 19-47 14-34-7 15-16 39-17 61M100 51c9-1 24-4 33-5M133 27c-4 14-8 29-4 31 4 3 11-20 15-18 4 1-2 14 2 15 5 1 9-15 13-15 4 0-2 14 1 16 4 3 12-12 14-13 3-2-3 13 1 13 5 1 9-9 12-11M126 62l-5-28M187 31h.5"
      />
    </svg>
  )
}

/**
 * 下拉小三角。
 * 原本是 CSS border 三角（border-left/right transparent + border-top solid），
 * Figma 导入时 border 三角不是图形，会被整块丢掉 —— 换成内联 SVG 才复制得过去。
 *
 * 注意：Figma 只稳定识别「描边式」path（本项目其它图标都是 stroke），
 * 纯 fill 的 path 会被吃掉。所以这里 fill + stroke 同时给，两条路径都能画出三角；
 * 也不能靠 CSS opacity 做淡色（会跟着一起丢），淡色请直接传具体的十六进制。
 */
export function Caret({ color = "#fff" }: { color?: string }) {
  return (
    <svg
      className="attendance-caret-icon"
      viewBox="0 0 16 9"
      xmlns="http://www.w3.org/2000/svg"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M0.9 1.1h14.2L8 7.9z"
        fill={color}
        stroke={color}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function AttendanceDialog({
  title,
  children,
  onClose,
}: {
  title: string
  children: ReactNode
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.showModal()
    /*
     * showModal() 会把焦点甩给第一个可聚焦元素（这里是右上角关闭按钮），
     * 键盘判定下那枚按钮会带一圈 focus-visible 描边。把焦点收回到弹窗本身，
     * 视觉上更干净，Tab 也仍然能正常走进去。
     */
    node.focus()
  }, [])
  return (
    <dialog
      ref={ref}
      tabIndex={-1}
      className="attendance-dialog"
      aria-labelledby="attendance-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="attendance-dialog-content">
        <button
          className="attendance-dialog-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          <AttendanceIcon name="close" />
        </button>
        <h2 id="attendance-dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  )
}

/**
 * Bulk edit controls: four pill triggers in the summary row, each opening a
 * wheel picker sheet (cancel / confirm in the header, same glass language as
 * the other sheets).
 */
const WHEEL_ITEM_HEIGHT = 54
const HOUR_OPTIONS = Array.from({ length: 24 }, (_, index) =>
  String(index).padStart(2, "0"),
)
const COUNT_OPTIONS = Array.from({ length: 101 }, (_, index) => String(index))
const MINUTE_OPTIONS = ["00", "15", "30", "45"]
const DEPARTMENT_OPTIONS = ["Banquet", "F&B Service", "Kitchen", "Housekeeping"]
const DATE_OPTIONS = Array.from({ length: 2 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
})

function WheelColumn({
  items,
  value,
  onChange,
}: {
  items: string[]
  value: string
  onChange: (value: string) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const index = Math.max(0, items.indexOf(value))
    if (ref.current) ref.current.scrollTop = index * WHEEL_ITEM_HEIGHT
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div
      className="attendance-wheel-col"
      ref={ref}
      onScroll={(event) => {
        const index = Math.round(
          event.currentTarget.scrollTop / WHEEL_ITEM_HEIGHT,
        )
        const next =
          items[Math.min(Math.max(index, 0), items.length - 1)] ?? value
        if (next !== value) onChange(next)
      }}
    >
      <div className="attendance-wheel-pad" />
      {items.map((item, index) => (
        <button
          key={item}
          type="button"
          className={`attendance-wheel-item${item === value ? " is-active" : ""}`}
          onClick={() => {
            onChange(item)
            ref.current?.scrollTo({
              top: index * WHEEL_ITEM_HEIGHT,
              behavior: "smooth",
            })
          }}
        >
          {item}
        </button>
      ))}
      <div className="attendance-wheel-pad" />
    </div>
  )
}

function EditSheet({
  title,
  onCancel,
  onConfirm,
  children,
}: {
  title: string
  onCancel: () => void
  onConfirm: () => void
  children: ReactNode
}) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    ref.current?.showModal()
  }, [])
  return (
    <dialog ref={ref} className="attendance-edit-sheet" onCancel={onCancel}>
      <header className="attendance-edit-sheet-head">
        <button className="attendance-sheet-text" onClick={onCancel}>
          Cancel
        </button>
        <strong>{title}</strong>
        <button
          className="attendance-sheet-text is-primary"
          onClick={onConfirm}
        >
          Confirm
        </button>
      </header>
      <div className="attendance-edit-sheet-body">{children}</div>
    </dialog>
  )
}

export function HoursSheet({
  onCancel,
  onConfirm,
  note = "Adjusts the recorded hours for every selected staff member.",
  mode = "delta",
  initial = 0,
  title = "+/- Hours",
}: {
  onCancel: () => void
  /** delta 模式传增减量；set 模式传改成之后的总时长 */
  onConfirm: (value: number) => void
  note?: string
  /** set = 直接设成多少，不做叠加 */
  mode?: "delta" | "set"
  /** set 模式下的初始时长（小时，可带小数） */
  initial?: number
  title?: string
}) {
  const isSet = mode === "set"
  const initialMinutes = Math.round((Math.max(0, initial) % 1) * 60)
  const startHour = isSet
    ? String(Math.min(23, Math.floor(Math.max(0, initial)))).padStart(2, "0")
    : "02"
  const startMinute = isSet
    ? MINUTE_OPTIONS.reduce((closest, option) =>
        Math.abs(Number(option) - initialMinutes) <
        Math.abs(Number(closest) - initialMinutes)
          ? option
          : closest,
      )
    : "00"
  const [sign, setSign] = useState("-")
  const [hour, setHour] = useState(startHour)
  const [minute, setMinute] = useState(startMinute)
  return (
    <EditSheet
      title={title}
      onCancel={onCancel}
      onConfirm={() =>
        onConfirm(
          isSet
            ? Number((Number(hour) + Number(minute) / 60).toFixed(2))
            : (sign === "-" ? -1 : 1) * (Number(hour) + Number(minute) / 60),
        )
      }
    >
      <div className={`attendance-wheel${isSet ? " is-compact" : ""}`}>
        {!isSet && (
          <WheelColumn items={["-", "+"]} value={sign} onChange={setSign} />
        )}
        <WheelColumn items={HOUR_OPTIONS} value={hour} onChange={setHour} />
        <WheelColumn items={MINUTE_OPTIONS} value={minute} onChange={setMinute} />
      </div>
      <p className="attendance-preview-note">{note}</p>
    </EditSheet>
  )
}

/** Per Room 计费下的房间数选择：单列滚轮，0–100 */
export function CountSheet({
  title,
  initial,
  note,
  onCancel,
  onConfirm,
}: {
  title: string
  initial: number
  note?: string
  onCancel: () => void
  onConfirm: (value: number) => void
}) {
  const [value, setValue] = useState(String(Math.max(0, Math.min(100, initial))))
  return (
    <EditSheet
      title={title}
      onCancel={onCancel}
      onConfirm={() => onConfirm(Number(value))}
    >
      <div className="attendance-wheel is-compact is-single">
        <WheelColumn items={COUNT_OPTIONS} value={value} onChange={setValue} />
      </div>
      {note && <p className="attendance-preview-note">{note}</p>}
    </EditSheet>
  )
}

function SubmitSuccessDialog({
  onClose,
  onCheckHistory,
}: {
  onClose: () => void
  onCheckHistory: () => void
}) {
  return (
    <AttendanceDialog title="Success" onClose={onClose}>
      <p className="attendance-prompt-text is-compact">
        Thank you for submitting attendance list to YY Group. Have a nice day!
      </p>
      <div className="attendance-prompt-actions is-single">
        <button className="attendance-blue-button" onClick={onCheckHistory}>
          Check History
        </button>
      </div>
    </AttendanceDialog>
  )
}

function SubmitPromptDialog({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <AttendanceDialog title="Submit attendance" onClose={onCancel}>
      <p className="attendance-prompt-text is-compact">
        Are you sure you want to submit the E-Attendance list? Please ensure
        that you have deducted break time if applicable.
      </p>
      <div className="attendance-prompt-actions">
        <button className="attendance-soft-button" onClick={onCancel}>
          No
        </button>
        <button className="attendance-blue-button" onClick={onConfirm}>
          Yes
        </button>
      </div>
    </AttendanceDialog>
  )
}

function ReviewPromptDialog({
  onReview,
  onSkip,
}: {
  onReview: () => void
  onSkip: () => void
}) {
  return (
    <AttendanceDialog title="Confirm attendance" onClose={onSkip}>
      <p className="attendance-prompt-text is-compact">
        Providing the staff review will help us deploy the best staff to you.
      </p>
      <div className="attendance-prompt-actions">
        <button className="attendance-blue-button" onClick={onReview}>
          Review Staff
        </button>
        <button className="attendance-soft-button" onClick={onSkip}>
          Skip
        </button>
      </div>
    </AttendanceDialog>
  )
}

function RemarkSheet({
  name,
  initial,
  onCancel,
  onConfirm,
}: {
  name: string
  initial: string
  onCancel: () => void
  onConfirm: (value: string) => void
}) {
  const [value, setValue] = useState(initial === "—" ? "" : initial)
  const areaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const node = areaRef.current
    if (!node) return
    node.focus()
    node.setSelectionRange(node.value.length, node.value.length)
  }, [])

  /* 和 History - Sign In / Sign Out (Oct 21) 的 Remark 弹窗保持同一套：
     圆角卡 + 标题 + 右上关闭 + Cancel / Save，而不是 EditSheet 的顶部三段式 */
  return (
    <AttendanceDialog title="Remark" onClose={onCancel}>
      <textarea
        ref={areaRef}
        className="attendance-remark-editor"
        rows={3}
        value={value}
        placeholder={`Write a remark for ${name}`}
        aria-label={`Remark for ${name}`}
        onChange={(event) => setValue(event.target.value)}
      />
      <div className="attendance-prompt-actions">
        <button className="attendance-soft-button" onClick={onCancel}>
          Cancel
        </button>
        <button
          className="attendance-blue-button"
          onClick={() => onConfirm(value.trim() || "—")}
        >
          Save
        </button>
      </div>
    </AttendanceDialog>
  )
}

function DepartmentSheet({
  initial,
  onCancel,
  onConfirm,
}: {
  initial: string
  onCancel: () => void
  onConfirm: (value: string) => void
}) {
  const [value, setValue] = useState(initial)
  const [open, setOpen] = useState(false)
  return (
    <EditSheet
      title="Department"
      onCancel={onCancel}
      onConfirm={() => onConfirm(value)}
    >
      <div className={`attendance-edit-select${open ? " is-open" : ""}`}>
        <button
          type="button"
          aria-expanded={open}
          aria-label="Choose department"
          onClick={() => setOpen(!open)}
        >
          {value}
          <Caret color="#7d9cbc" />
        </button>
        {open && (
          <div className="attendance-edit-options" role="listbox" aria-label="Department">
            {DEPARTMENT_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  setValue(option)
                  setOpen(false)
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
      <p className="attendance-preview-note">
        Applies to every selected staff member.
      </p>
    </EditSheet>
  )
}

export function TimeSheet({
  title,
  withDate,
  initial,
  note = "Applies to every selected staff member.",
  onCancel,
  onConfirm,
}: {
  title: string
  withDate?: boolean
  initial: string
  /** 底部说明；传空字符串就不显示（例如建单页只改这一张单的班次） */
  note?: string
  onCancel: () => void
  onConfirm: (value: string) => void
}) {
  const [hour, minute] = initial.split(":")
  const [date, setDate] = useState(DATE_OPTIONS[0])
  const [hourValue, setHourValue] = useState(
    HOUR_OPTIONS.includes(hour?.padStart(2, "0")) ? hour.padStart(2, "0") : "09",
  )
  const [minuteValue, setMinuteValue] = useState(
    MINUTE_OPTIONS.includes(minute) ? minute : "00",
  )
  return (
    <EditSheet
      title={title}
      onCancel={onCancel}
      onConfirm={() => onConfirm(`${hourValue}:${minuteValue}`)}
    >
      <div className="attendance-wheel">
        {withDate && (
          <WheelColumn items={DATE_OPTIONS} value={date} onChange={setDate} />
        )}
        <WheelColumn
          items={HOUR_OPTIONS}
          value={hourValue}
          onChange={setHourValue}
        />
        <WheelColumn
          items={MINUTE_OPTIONS}
          value={minuteValue}
          onChange={setMinuteValue}
        />
      </div>
      {note && <p className="attendance-preview-note">{note}</p>}
    </EditSheet>
  )
}

/**
 * Sign in / sign out sheet. Same flow as the reference (identity across the
 * top, one large signing surface, clear bottom-left, confirm on the right)
 * rendered in this dashboard's glassy blue language.
 * 也用于 History 明细页的 Revise 签名，所以对外导出。
 */
export function SignatureSheet({
  name,
  idNumber,
  direction,
  kicker,
  onClose,
  onSave,
}: {
  name: string
  idNumber: string
  direction: "in" | "out"
  kicker?: string
  onClose: () => void
  onSave: (path: string) => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [path, setPath] = useState("")
  const drawing = useRef(false)

  useEffect(() => {
    ref.current?.showModal()
    ref.current?.focus()
  }, [])

  const point = (event: PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    return `${(((event.clientX - rect.left) / rect.width) * SIGNATURE_WIDTH).toFixed(1)} ${(((event.clientY - rect.top) / rect.height) * SIGNATURE_HEIGHT).toFixed(1)}`
  }

  const digits = idNumber.replace(/[\s•]/g, "")
  const maskedId =
    digits.length > 5 ? `${digits.slice(0, 1)}••••${digits.slice(-4)}` : digits

  return (
    <dialog
      ref={ref}
      className="attendance-signature-sheet"
      tabIndex={-1}
      aria-labelledby="attendance-signature-name"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <header className="attendance-signature-head">
        <button
          className="attendance-sheet-close"
          aria-label="Cancel signature"
          onClick={onClose}
        >
          <AttendanceIcon name="close" />
        </button>
        <div className="attendance-signature-identity">
          <span className="attendance-signature-kicker">
            {kicker ?? `${direction === "in" ? "Sign in" : "Sign out"} · Sep 24`}
          </span>
          <strong id="attendance-signature-name">{name}</strong>
          {maskedId && (
            <span className="attendance-signature-id">{maskedId}</span>
          )}
        </div>
        <button
          className="attendance-sheet-confirm"
          aria-label="Confirm signature"
          disabled={!path}
          onClick={() => onSave(path)}
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 12.6 9.6 17.2 19 7"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </header>
      <div className="attendance-signature-surface">
        <svg
          viewBox={`0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}`}
          className="attendance-signature-pad"
          role="img"
          aria-label={`Signature pad for ${name}`}
          onPointerDown={(event) => {
            event.preventDefault()
            drawing.current = true
            event.currentTarget.setPointerCapture(event.pointerId)
            const start = point(event)
            setPath((old) => `${old} M${start} L${start}`)
          }}
          onPointerMove={(event) => {
            if (drawing.current) {
              const next = point(event)
              setPath((old) => `${old} L${next}`)
            }
          }}
          onPointerUp={() => {
            drawing.current = false
          }}
          onPointerCancel={() => {
            drawing.current = false
          }}
        >
          <path
            d={path}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {path ? null : (
          <span className="attendance-signature-placeholder">Signature</span>
        )}
        <button
          className="attendance-signature-clear"
          disabled={!path}
          onClick={() => setPath("")}
        >
          Clear
        </button>
      </div>
    </dialog>
  )
}

/**
 * 空数据 / 加载失败 / 断网 / 搜索无结果的插图。
 * 和页面里其它图标一样是「描边式 path + 内联 SVG」——Figma 只稳定识别这类画法，
 * 纯 fill 的图形容易被解析掉。
 */
function StateIllustration({
  name,
}: {
  name: "empty" | "error" | "offline" | "search"
}) {
  const common = {
    viewBox: "0 0 64 64",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  }
  if (name === "empty")
    return (
      <svg {...common}>
        <rect x="10" y="12" width="44" height="42" rx="7" />
        <path d="M10 24h44M22 8v8M42 8v8" />
        <path d="M24 37h9M24 46h15" />
        <path d="M44 32v12M38 38h12" />
      </svg>
    )
  if (name === "error")
    return (
      <svg {...common}>
        <path d="M32 10 56 54H8L32 10Z" />
        <path d="M32 26v10" />
        <path d="M32 45.5h.01" strokeWidth="3.6" />
      </svg>
    )
  if (name === "offline")
    return (
      <svg {...common}>
        <path d="M19 46h23a10.5 10.5 0 0 0 1.3-20.9A14.5 14.5 0 0 0 17.9 26A9.6 9.6 0 0 0 19 46Z" />
        <path d="m13 11 38 42" />
      </svg>
    )
  return (
    <svg {...common}>
      <circle cx="27" cy="27" r="16" />
      <path d="m39 39 13 13" />
      <path d="m21 21 12 12M33 21 21 33" />
    </svg>
  )
}

/** 表格区的空态 / 错误态：一张居中的说明 + 一到两个动作 */
function AttendanceStateView({
  illustration,
  tone,
  title,
  description,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  compact = false,
}: {
  illustration: "empty" | "error" | "offline" | "search"
  tone?: "danger" | "muted"
  title: string
  description: string
  primaryLabel?: string
  onPrimary?: () => void
  secondaryLabel?: string
  onSecondary?: () => void
  compact?: boolean
}) {
  return (
    <div
      className={`attendance-state${tone ? ` is-${tone}` : ""}${
        compact ? " is-compact" : ""
      }`}
    >
      <span className="attendance-state-icon">
        <StateIllustration name={illustration} />
      </span>
      <h2>{title}</h2>
      <p>{description}</p>
      {(primaryLabel || secondaryLabel) && (
        <div className="attendance-state-actions">
          {primaryLabel && (
            <button className="attendance-blue-button" onClick={onPrimary}>
              {primaryLabel}
            </button>
          )}
          {secondaryLabel && (
            <button className="attendance-state-link" onClick={onSecondary}>
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default function AttendancePage({
  onBack,
  onWriteReview,
  onBatchReview,
  onCheckHistory,
  askSubmit,
  onSubmitHandled,
  billing = "hour",
}: {
  onBack: () => void
  onWriteReview: (staff: StaffRef) => void
  onBatchReview: (staff: StaffRef[]) => void
  /** Success 弹窗里的 Check History → 跳 History 列表 */
  onCheckHistory: () => void
  askSubmit: boolean
  onSubmitHandled: () => void
  /** 计费方式：Per Hour 用 Break Hours，Per Room 用 Room 数量 */
  billing?: "hour" | "room"
}) {
  const isRoom = billing === "room"
  const [staff, setStaff] = useState(initialStaff)
  const [query, setQuery] = useState("")
  const [editing, setEditing] = useState(false)
  const [selectedIds, setSelectedIds] = useState<number[]>([])
  const [editSheet, setEditSheet] = useState<
    "hours" | "department" | "start" | "end" | null
  >(null)
  const [modal, setModal] = useState<Modal>(null)
  const [breakSheetFor, setBreakSheetFor] = useState<number | null>(null)
  const [roomSheetFor, setRoomSheetFor] = useState<number | null>(null)
  const [remarkFor, setRemarkFor] = useState<number | null>(null)
  const [profileFor, setProfileFor] = useState<number | null>(null)
  const [reviewPrompt, setReviewPrompt] = useState(false)
  const [submitPrompt, setSubmitPrompt] = useState(false)
  const [submitSignature, setSubmitSignature] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [reviewTargets, setReviewTargets] = useState<number[]>([])
  const [notice, setNotice] = useState("")
  const [openAction, setOpenAction] = useState<number | null>(null)
  const actionRoot = useRef<HTMLDivElement>(null)

  /* 原型用：空数据 / 加载中 / 加载失败 / 断网 / 搜索无结果，由右下角悬浮面板切换 */
  const [pageState, setPageState] = useState<PageState>("default")
  const isLoading = pageState === "loading"
  const isBlank = pageState === "empty"
  const isFailure = pageState === "error" || pageState === "offline"
  const listUnavailable = isLoading || isBlank || isFailure

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 4500)
    return () => window.clearTimeout(timer)
  }, [notice])

  /* Coming back from the batch review flow with Submit: ask the supervisor to
     confirm the attendance list once they are back on this page. */
  useEffect(() => {
    if (askSubmit) setSubmitPrompt(true)
  }, [askSubmit])

  useEffect(() => {
    if (openAction === null) return
    function dismiss(event: globalThis.PointerEvent) {
      if (!actionRoot.current?.contains(event.target as Node))
        setOpenAction(null)
    }
    document.addEventListener("pointerdown", dismiss)
    return () => document.removeEventListener("pointerdown", dismiss)
  }, [openAction])

  function updateStaff(id: number, field: keyof Staff, value: string | number) {
    setStaff((current) =>
      current.map((person) =>
        person.id === id ? { ...person, [field]: value } : person,
      ),
    )
  }

  const filteredStaff = staff.filter((person) =>
    `${person.nric} ${person.name}`
      .replace(/\s/g, "")
      .toLowerCase()
      .includes(query.replace(/\s/g, "").toLowerCase()),
  )
  /* 「搜索无结果」是独立的一种状态：列表本身有数据，只是筛不出来 */
  const visibleStaff = pageState === "no-results" ? [] : filteredStaff
  const checkIns =
    23 +
    staff.filter(
      (person) =>
        person.timeIn &&
        !initialStaff.find((original) => original.id === person.id)?.timeIn,
    ).length
  const checkOuts =
    23 +
    staff.filter(
      (person) =>
        person.timeOut &&
        !initialStaff.find((original) => original.id === person.id)?.timeOut,
    ).length
  const signingStaff =
    typeof modal === "object" && modal !== null
      ? (staff.find((person) => person.id === modal.id) ?? null)
      : null

  function renderTime(person: Staff, direction: "in" | "out") {
    const time = direction === "in" ? person.timeIn : person.timeOut
    const method = direction === "in" ? person.inMethod : person.outMethod
    if (!time)
      return (
        <button
          className="attendance-in-button attendance-blue-button"
          aria-label={`Sign ${person.name.replace("\n", " ")} ${direction}`}
          onClick={() => setModal({ id: person.id, direction })}
        >
          {direction === "in" ? "In" : "Out"}
        </button>
      )
    return (
      <div className="attendance-time-card">
        {method === "signature" ? (
          <Signature
            path={direction === "in" ? person.signature : person.outSignature}
          />
        ) : (
          <QrMark />
        )}
        <span>{time}</span>
      </div>
    )
  }

  function toggleSelected(id: number) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    )
  }

  function applyToSelected(patch: Partial<Staff>) {
    setStaff((current) =>
      current.map((person) =>
        selectedIds.includes(person.id) ? { ...person, ...patch } : person,
      ),
    )
  }

  function finishEditing() {
    setEditing(false)
    setSelectedIds([])
    setOpenAction(null)
  }

  /* 切换状态时顺手收起编辑态的批量条 / 下拉菜单，避免两个状态叠在一起 */
  function changePageState(next: PageState) {
    setPageState(next)
    setEditing(false)
    setSelectedIds([])
    setOpenAction(null)
    setQuery(next === "no-results" ? "Tan Wei" : "")
  }

  /* Retry 先回到加载态，再落回正常列表 —— 和真实请求的节奏一致 */
  function retryLoad() {
    setPageState("loading")
    window.setTimeout(() => setPageState("default"), 1100)
  }

  /* 状态切换时统计数字跟着变：加载中给骨架、空数据给 0、失败给破折号 */
  function renderStat(value: ReactNode, blank: ReactNode = 0) {
    if (isLoading) return <span className="attendance-skeleton is-stat" />
    return <strong>{isFailure ? "—" : isBlank ? blank : value}</strong>
  }

  function editable(
    person: Staff,
    field: "name" | "nric" | "start" | "end" | "remark",
  ) {
    /* Name and ID Number are the single-staff entry point: tapping either one
       opens the person's information card first, and the card's button carries
       on into the one-person review page (bulk reviews start from Confirm). */
    if (field === "name" || field === "nric") {
      return (
        <button
          className="attendance-profile-link attendance-cell-text"
          onClick={() => setProfileFor(person.id)}
          aria-label={`Open the profile of ${person.name.replace("\n", " ")}`}
        >
          {person[field]}
        </button>
      )
    }
    return <span className="attendance-cell-text">{person[field]}</span>
  }

  const profileStaff = profileFor === null ? null : staff.find((person) => person.id === profileFor) ?? null

  return (
    <>
      <main className="attendance-page">
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
              aria-label="Back to Login"
            >
              <AttendanceIcon name="back" />
            </button>
          </nav>
          <h1>Sign In / Sign Out(Sep 24)</h1>
        </div>
        <div
          className="attendance-toolbar"
          role="toolbar"
          aria-label="Attendance actions"
        >
          <button
            className="attendance-soft-button"
            onClick={() => setModal("qr")}
          >
            <QrMark />
            <span>QR Code</span>
          </button>
          <button
            className={`attendance-soft-button${editing ? " is-editing" : ""}`}
            aria-pressed={editing}
            disabled={listUnavailable || (!editing && selectedIds.length === 0)}
            onClick={() => {
              if (editing) {
                finishEditing()
                return
              }
              setEditing(true)
              setOpenAction(null)
            }}
          >
            <AttendanceIcon name="edit" />
            <span>{editing ? "Done" : "Edit"}</span>
          </button>
          <button
            className="attendance-blue-button attendance-confirm"
            disabled={listUnavailable}
            onClick={() => {
              /* Confirming attendance always opens the review flow for the
                 whole roster — selection is only for bulk field edits. */
              setReviewTargets(staff.map((person) => person.id))
              setEditing(false)
              setSelectedIds([])
              setOpenAction(null)
              setReviewPrompt(true)
            }}
          >
            <AttendanceIcon name="confirm" />
            <span>Confirm</span>
          </button>
        </div>
      </header>
      <section className="attendance-panel" aria-label="Staff attendance">
        <div className={`attendance-summary${editing ? " is-editing" : ""}`}>
          {editing ? (
            <div className="attendance-editbar" role="group" aria-label="Edit attendance">
              <button
                className="attendance-chip is-blue"
                onClick={() => setEditSheet("hours")}
              >
                <span>+/- Hours</span>
                <Caret color="#3b81be" />
              </button>
              <button
                className="attendance-chip is-blue"
                onClick={() => setEditSheet("department")}
              >
                <span>Department</span>
                <Caret color="#3b81be" />
              </button>
              <button
                className="attendance-chip is-amber"
                onClick={() => setEditSheet("start")}
              >
                <span>Start Time</span>
                <Caret color="#a78331" />
              </button>
              <button
                className="attendance-chip is-amber"
                onClick={() => setEditSheet("end")}
              >
                <span>End Time</span>
                <Caret color="#a78331" />
              </button>
            </div>
          ) : (
            <>
              <div className="attendance-stat-card">
                <span className="attendance-stat-icon">
                  <AttendanceIcon name="team-checkin" />
                </span>
                <div>
                  <p>Check In:</p>
                  {renderStat(checkIns)}
                </div>
              </div>
              <div className="attendance-stat-card">
                <span className="attendance-stat-icon">
                  <AttendanceIcon name="calendar-checkout" />
                </span>
                <div>
                  <p>Check Out:</p>
                  {renderStat(checkOuts)}
                </div>
              </div>
              <div className="attendance-stat-card">
                <span className="attendance-stat-icon">
                  <AttendanceIcon name="work-hours" />
                </span>
                <div>
                  <p>{isRoom ? "Total Rooms:" : "Total Hours:"}</p>
                  {renderStat(
                    isRoom
                      ? staff.reduce((sum, person) => sum + person.rooms, 0)
                      : "24.5",
                    isRoom ? 0 : "0",
                  )}
                </div>
              </div>
            </>
          )}
          <label className="attendance-search">
            <AttendanceIcon name="search" />
            <input
              type="search"
              value={query}
              disabled={listUnavailable}
              onChange={(event) => setQuery(event.target.value)}
              aria-label="Search ID number or staff name"
              placeholder="Search ID Number"
            />
          </label>
        </div>
        <div
          className={`attendance-table-scroll${
            listUnavailable ? " is-state" : ""
          }`}
        >
          {isBlank ? (
            <AttendanceStateView
              illustration="empty"
              title="No attendance yet for Sep 24"
              description="Nobody has signed in or out today. Once your staff sign in, their records will appear here."
              primaryLabel="Add Staff"
              onPrimary={() => setModal("add")}
              secondaryLabel="Refresh"
              onSecondary={retryLoad}
            />
          ) : isFailure ? (
            <AttendanceStateView
              illustration={pageState === "offline" ? "offline" : "error"}
              tone="danger"
              title={
                pageState === "offline"
                  ? "You're offline"
                  : "Couldn't load attendance"
              }
              description={
                pageState === "offline"
                  ? "Check your internet connection and try again. Your last saved list will stay on this device."
                  : "Something went wrong while loading today's records. Please try again in a moment."
              }
              primaryLabel="Try Again"
              onPrimary={retryLoad}
              secondaryLabel="Contact Support"
              onSecondary={() => setNotice("Support request sent to Hong Ye Group")}
            />
          ) : (
            <>
          <table className="attendance-table">
            <colgroup>
              {[
                3.2, 6, 4.2, 10.8, 5.2, 13.6, 5.4, 11.8, 4.4, 9.4, 11.6, 14.4,
              ].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="attendance-check-cell">
                  <AttendanceCheck
                    label="Select every staff member"
                    checked={
                      visibleStaff.length > 0 &&
                      visibleStaff.every((person) =>
                        selectedIds.includes(person.id),
                      )
                    }
                    onChange={(checked) =>
                      setSelectedIds(
                        checked
                          ? visibleStaff.map((person) => person.id)
                          : [],
                      )
                    }
                  />
                </th>
                <th scope="col">NO</th>
                <th scope="col">Name</th>
                <th scope="col">ID Number</th>
                <th scope="col">
                  Start
                  <br />
                  Time
                </th>
                <th scope="col">
                  Time
                  <br />
                  In
                </th>
                <th scope="col">
                  End
                  <br />
                  Time
                </th>
                <th scope="col">
                  Time
                  <br />
                  Out
                </th>
                <th scope="col">
                  {isRoom ? (
                    "Room"
                  ) : (
                    <>
                      Break
                      <br />
                      Hours
                    </>
                  )}
                </th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
                <th scope="col">Remark</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? SKELETON_ROWS.map((row) => (
                    <tr key={`skeleton-${row}`} className="attendance-skeleton-row">
                      {SKELETON_CELLS.map((width, cell) => (
                        <td
                          key={cell}
                          className={cell === 0 ? "attendance-check-cell" : undefined}
                        >
                          <span
                            className={`attendance-skeleton${
                              cell === 0 ? " is-check" : ""
                            }`}
                            style={{ width }}
                          />
                        </td>
                      ))}
                    </tr>
                  ))
                : visibleStaff.map((person) => (
                <tr
                  key={person.id}
                  className={
                    selectedIds.includes(person.id) ? "is-selected" : undefined
                  }
                >
                  <td className="attendance-check-cell">
                    <AttendanceCheck
                      label={`Select ${person.name.replace("\n", " ")}`}
                      checked={selectedIds.includes(person.id)}
                      onChange={() => toggleSelected(person.id)}
                    />
                  </td>
                  <td>
                    <span
                      className={`attendance-number${
                        person.active ? " is-active" : ""
                      }`}
                    >
                      {person.id}
                    </span>
                  </td>
                  <td className="attendance-blue-text">
                    {editable(person, "name")}
                  </td>
                  <td className="attendance-blue-text">
                    {editable(person, "nric")}
                  </td>
                  <td>{editable(person, "start")}</td>
                  <td>{renderTime(person, "in")}</td>
                  <td>{editable(person, "end")}</td>
                  <td>{renderTime(person, "out")}</td>
                  <td>
                    {isRoom ? (
                      <button
                        type="button"
                        className="attendance-break-value attendance-break-button"
                        aria-label={`Rooms for ${person.name.replace("\n", " ")}: ${person.rooms}. Tap to adjust.`}
                        onClick={() => setRoomSheetFor(person.id)}
                      >
                        {person.rooms}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="attendance-break-value attendance-break-button"
                        aria-label={`Break hours for ${person.name.replace("\n", " ")}: ${person.breakHours}. Tap to adjust.`}
                        onClick={() => setBreakSheetFor(person.id)}
                      >
                        {person.breakHours > 0 ? "+" : ""}
                        {person.breakHours}
                      </button>
                    )}
                  </td>
                  <td>{person.total}</td>
                  <td>
                    <div
                      className="attendance-action-wrap"
                      ref={openAction === person.id ? actionRoot : undefined}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setOpenAction(null)
                      }}
                    >
                      <button
                        className={`attendance-status attendance-blue-button is-${person.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        aria-label={`Status for ${person.name.replace("\n", " ")}: ${person.status}`}
                        aria-expanded={openAction === person.id}
                        aria-controls={`staff-status-${person.id}`}
                        onClick={() =>
                          setOpenAction(
                            openAction === person.id ? null : person.id,
                          )
                        }
                      >
                        {person.status}
                        <Caret color="#fff" />
                      </button>
                      {openAction === person.id && (
                        <div
                          className="attendance-status-menu"
                          id={`staff-status-${person.id}`}
                        >
                          {["Applied", "No Show"].map((status) => (
                            <button
                              key={status}
                              aria-pressed={person.status === status}
                              onClick={() => {
                                updateStaff(person.id, "status", status)
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
                  <td>
                    <button
                      type="button"
                      className={`attendance-remark-button${
                        hasRemark(person.remark) ? " is-set" : ""
                      }`}
                      aria-label={
                        hasRemark(person.remark)
                          ? `View remark for ${person.name.replace("\n", " ")}`
                          : `Add a remark for ${person.name.replace("\n", " ")}`
                      }
                      onClick={() => setRemarkFor(person.id)}
                    >
                      {hasRemark(person.remark) ? (
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
          {visibleStaff.length === 0 && (
            <AttendanceStateView
              illustration="search"
              tone="muted"
              compact
              title="No matching staff"
              description={`Nothing matches “${query}”. Try a different name or ID number.`}
              primaryLabel="Clear Search"
              onPrimary={() => changePageState("default")}
            />
          )}
            </>
          )}
        </div>
      </section>
      <button
        className="attendance-add-button attendance-blue-button"
        aria-label="Add new staff"
        onClick={() => setModal("add")}
      >
        <AttendanceIcon name="plus" />
      </button>
      {notice && (
        <div className="attendance-toast" role="status">
          <AttendanceIcon name="confirm" />
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            <AttendanceIcon name="close" />
          </button>
        </div>
      )}
      {typeof modal === "object" && modal !== null && signingStaff && (
        <SignatureSheet
          name={signingStaff.name.replace(/\n/g, " ")}
          idNumber={signingStaff.nric}
          direction={modal.direction}
          onClose={() => setModal(null)}
          onSave={(path) => {
            const time = new Date().toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })
            const direction = modal.direction
            setStaff((current) =>
              current.map((person) =>
                person.id === signingStaff.id
                  ? {
                      ...person,
                      ...(direction === "in"
                        ? {
                            timeIn: time,
                            signature: path,
                            inMethod: "signature" as const,
                            active: true,
                          }
                        : {
                            timeOut: time,
                            outSignature: path,
                            outMethod: "signature" as const,
                            active: false,
                          }),
                    }
                  : person,
              ),
            )
            setModal(null)
            setNotice(
              `${direction === "in" ? "Signed in" : "Signed out"} at ${time}`,
            )
          }}
        />
      )}
      {(modal === "add" || modal === "qr") && (
        <AttendanceDialog
          title={modal === "add" ? "Personal information" : "QR Code"}
          onClose={() => setModal(null)}
        >
          {modal === "add" ? (
            <AddStaffForm
              onAdd={(values) => {
                setStaff((current) => [
                  ...current,
                  {
                    ...values,
                    start: values.shift.split("-")[0],
                    end: values.shift.split("-")[1],
                    id: Math.max(...current.map((person) => person.id)) + 1,
                    timeIn: "",
                    timeOut: "",
                    inMethod: "signature",
                    outMethod: "qr",
                    breakHours: 0,
                    rooms: 0,
                    total: 0,
                    status: "No Show",
                    remark: "—",
                    active: false,
                  },
                ])
                setQuery("")
                setModal(null)
                setNotice(
                  "Staff added to the list.",
                )
              }}
            />
          ) : (
            <div className="attendance-qr-preview">
              <QrMark />
              <h3>Sign In / Sign Out</h3>
              <p>Sep 24 · Hong Ye Group</p>
              <p className="attendance-preview-note">
                Staff scan this code to sign in or out.
              </p>
              <button
                className="attendance-blue-button"
                onClick={() => setModal(null)}
              >
                Done
              </button>
            </div>
          )}
        </AttendanceDialog>
      )}
      {submitPrompt && (
        <SubmitPromptDialog
          onCancel={() => {
            setSubmitPrompt(false)
            onSubmitHandled()
          }}
          onConfirm={() => {
            setSubmitPrompt(false)
            setSubmitSignature(true)
          }}
        />
      )}
      {submitSignature && (
        <SignatureSheet
          kicker="Sign here · Sep 24"
          name="E-Attendance list"
          idNumber=""
          direction="in"
          onClose={() => {
            setSubmitSignature(false)
            onSubmitHandled()
          }}
          onSave={() => {
            setSubmitSignature(false)
            onSubmitHandled()
            setSubmitSuccess(true)
          }}
        />
      )}
      {submitSuccess && (
        <SubmitSuccessDialog
          onClose={() => setSubmitSuccess(false)}
          onCheckHistory={() => {
            setSubmitSuccess(false)
            onCheckHistory()
          }}
        />
      )}
      {reviewPrompt && (
        <ReviewPromptDialog
          onReview={() => {
            const people = staff.filter((person) =>
              reviewTargets.includes(person.id),
            )
            setReviewPrompt(false)
            if (people.length === 0) return
            const refs: StaffRef[] = people.map((person) => ({
              id: person.id,
              name: person.name.replace("\n", " "),
              nric: person.nric.replace(/\s/g, ""),
            }))
            if (refs.length > 1) onBatchReview(refs)
            else onWriteReview(refs[0])
          }}
          onSkip={() => {
            /* 跳过评论 = 直接进入下一步：打开提交确认弹窗 */
            setReviewPrompt(false)
            setSubmitPrompt(true)
          }}
        />
      )}
      {profileStaff && (
        <StaffProfileDialog
          person={{
            id: profileStaff.id,
            name: profileStaff.name,
            nric: profileStaff.nric,
          }}
          onClose={() => setProfileFor(null)}
          onWriteReview={() => {
            setProfileFor(null)
            onWriteReview({
              id: profileStaff.id,
              name: profileStaff.name.replace("\n", " "),
              nric: profileStaff.nric.replace(/\s/g, ""),
            })
          }}
        />
      )}
      {remarkFor !== null && (
        <RemarkSheet
          name={
            staff
              .find((person) => person.id === remarkFor)
              ?.name.replace("\n", " ") ?? "this staff"
          }
          initial={staff.find((person) => person.id === remarkFor)?.remark ?? ""}
          onCancel={() => setRemarkFor(null)}
          onConfirm={(value) => {
            setStaff((current) =>
              current.map((person) =>
                person.id === remarkFor ? { ...person, remark: value } : person,
              ),
            )
            setRemarkFor(null)
            setNotice("Remark saved")
          }}
        />
      )}
      {breakSheetFor !== null && (
        <HoursSheet
          note="Adjusts the break hours for this staff member."
          onCancel={() => setBreakSheetFor(null)}
          onConfirm={(delta) => {
            setStaff((current) =>
              current.map((person) =>
                person.id === breakSheetFor
                  ? {
                      ...person,
                      breakHours: Number(
                        (person.breakHours + delta).toFixed(2),
                      ),
                      total: Math.max(
                        0,
                        Number((person.total - delta).toFixed(2)),
                      ),
                    }
                  : person,
              ),
            )
            const who = staff.find((person) => person.id === breakSheetFor)
            setBreakSheetFor(null)
            setNotice(
              `Break hours updated for ${who ? who.name.replace("\n", " ") : "this staff"}`,
            )
          }}
        />
      )}
      {roomSheetFor !== null && (() => {
        const person = staff.find((item) => item.id === roomSheetFor)
        return (
          <CountSheet
            title="Rooms"
            initial={person?.rooms ?? 0}
            note="Sets how many rooms this staff member serviced."
            onCancel={() => setRoomSheetFor(null)}
            onConfirm={(rooms) => {
              setStaff((current) =>
                current.map((item) =>
                  item.id === roomSheetFor ? { ...item, rooms } : item,
                ),
              )
              setRoomSheetFor(null)
              setNotice(
                `Rooms updated for ${person ? person.name.replace("\n", " ") : "this staff"}`,
              )
            }}
          />
        )
      })()}
      {editSheet === "hours" && (
        <HoursSheet
          onCancel={() => setEditSheet(null)}
          onConfirm={(delta) => {
            setStaff((current) =>
              current.map((person) =>
                selectedIds.includes(person.id)
                  ? {
                      ...person,
                      total: Math.max(0, Number((person.total + delta).toFixed(2))),
                    }
                  : person,
              ),
            )
            setEditSheet(null)
            setNotice(
              `Hours ${delta > 0 ? "added" : "deducted"} for ${selectedIds.length} staff`,
            )
          }}
        />
      )}
      {editSheet === "department" && (
        <DepartmentSheet
          initial={
            staff.find((person) => selectedIds.includes(person.id))
              ?.department ?? "Banquet"
          }
          onCancel={() => setEditSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ department: value })
            setEditSheet(null)
            setNotice(`Department set to ${value}`)
          }}
        />
      )}
      {editSheet === "start" && (
        <TimeSheet
          title="Start Time"
          initial={
            staff.find((person) => selectedIds.includes(person.id))?.start ??
            "08:00"
          }
          onCancel={() => setEditSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ start: value })
            setEditSheet(null)
            setNotice(`Start time set to ${value}`)
          }}
        />
      )}
      {editSheet === "end" && (
        <TimeSheet
          title="End Time"
          withDate
          initial={
            staff.find((person) => selectedIds.includes(person.id))?.end ??
            "17:00"
          }
          onCancel={() => setEditSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ end: value })
            setEditSheet(null)
            setNotice(`End time set to ${value}`)
          }}
        />
      )}
    </main>
      {/* 状态切换器刻意放在 <main> 外面：Copy to Figma 只抓 main，所以它不会进设计稿 */}
      <PageStateSwitcher value={pageState} onChange={changePageState} />
    </>
  )
}
