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
import { setEditJobOrigin, setEditJobTargets, takeEditJobResult } from "./editJobStore"
import { buildLogTarget, setLogOrigin, setLogTarget } from "./logStore"
import { setAddStaffOrigin, takePendingStaff } from "./addStaffStore"
import PageStateSwitcher, { type PageState } from "../PageStateSwitcher"
import BackIcon from "../BackIcon"
import "../attendance.css"

export type AttendanceIconName = "back" | "team-checkin" | "calendar-checkout" | "work-hours" | "search" | "edit" | "confirm" | "plus" | "close" | "signin" | "signout"

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
  name: "姓名",
  nric: "身份證號碼",
  start: "開始時間",
  end: "結束時間",
  remark: "備註",
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

/** 操作列的三种狀態；颜色靠 class 区分，三个都要在 hk.css 里有对应底色 */
export const STATUS_OPTIONS = ["已申請", "未到場", "已取消"] as const
export type Status = (typeof STATUS_OPTIONS)[number]
export const STATUS_CLASS: Record<Status, string> = {
  已申請: "is-applied",
  未到場: "is-no-show",
  已取消: "is-cancelled",
}

type Staff = {
  id: number
  name: string
  nric: string
  /** 時薪（香港只按小時計費） */
  price: number
  /** 職位 */
  jobTitle: string
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
  status: Status
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
    price: 65,
    jobTitle: "宴會服務員",
    start: "8:00",
    end: "22:00",
    timeIn: "7:58",
    timeOut: "23:03",
    inMethod: "signature",
    outMethod: "signature",
    breakHours: 1,
    rooms: 3,
    total: 15,
    status: "已申請",
    remark: "Very\nGood!",
    active: true,
  },
  {
    id: 2,
    name: "Xin\nYuan",
    nric: "S1435\n8752",
    price: 70,
    jobTitle: "樓面接待",
    start: "10:30",
    end: "18:00",
    timeIn: "10:27",
    timeOut: "18:12",
    inMethod: "qr",
    outMethod: "qr",
    breakHours: 0,
    rooms: 2,
    total: 7.5,
    status: "已申請",
    remark: "Nothing",
    active: false,
  },
  {
    id: 3,
    name: "Yin feng\nMeng",
    nric: "S5486\n1256",
    price: 60,
    jobTitle: "樓面接待",
    start: "11:00",
    end: "19:30",
    timeIn: "",
    timeOut: "19:46",
    inMethod: "signature",
    outMethod: "qr",
    breakHours: -2,
    rooms: 1,
    total: 6.5,
    status: "已申請",
    remark: "很好！",
    active: true,
  },
  {
    id: 4,
    name: "Wei\nJun",
    nric: "S6734\n2891",
    price: 60,
    jobTitle: "廚房助理",
    start: "09:00",
    end: "18:00",
    timeIn: "08:54",
    timeOut: "18:06",
    inMethod: "qr",
    outMethod: "qr",
    breakHours: 1,
    rooms: 2,
    total: 8,
    status: "已取消",
    remark: "很好！",
    active: false,
  },
  {
    id: 5,
    name: "Sarah\nLim",
    nric: "S8246\n5378",
    price: 65,
    jobTitle: "宴會服務員",
    start: "08:30",
    end: "17:30",
    timeIn: "08:27",
    timeOut: "17:35",
    inMethod: "signature",
    outMethod: "signature",
    breakHours: 1,
    rooms: 3,
    total: 8,
    status: "已申請",
    remark: "Very\nGood!",
    active: true,
  },
  {
    id: 6,
    name: "Daniel\nTan",
    nric: "S3981\n6240",
    price: 60,
    jobTitle: "清潔員",
    start: "12:00",
    end: "21:00",
    timeIn: "11:52",
    timeOut: "21:04",
    inMethod: "qr",
    outMethod: "qr",
    breakHours: 1,
    rooms: 1,
    total: 8,
    status: "未到場",
    remark: "—",
    active: false,
  },
  {
    id: 7,
    name: "Aisyah\nRahman",
    nric: "S7165\n9432",
    price: 60,
    jobTitle: "宴會服務員",
    start: "10:00",
    end: "19:00",
    timeIn: "09:58",
    timeOut: "19:03",
    inMethod: "signature",
    outMethod: "signature",
    breakHours: 1,
    rooms: 2,
    total: 8,
    status: "已申請",
    remark: "很好！",
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

/** 考勤页的图标集；门卫打卡页复用（搜索 / 关闭 / 勾），保证两页图标同一套画法 */
export function AttendanceIcon({ name }: { name: AttendanceIconName }) {
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
    /* 簽到：箭頭穿進右側的門；簽退：箭頭離開左側的門（與記錄明細頁同一段） */
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

/** 工具列上的二维码小图标；门卫打卡页复用同一枚，两页按钮视觉一致 */
export function QrMark() {
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
          aria-label="關閉對話框"
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
const DEPARTMENT_OPTIONS = ["宴會部", "餐飲服務", "廚房部", "房務部"]
const DATE_OPTIONS = Array.from({ length: 2 }, (_, index) => {
  const date = new Date()
  date.setDate(date.getDate() + index)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
})

/** 结束时间可以跨到明天，滚轮里写「今天 10月26日」比裸 ISO 好认 */
function dateLabel(value: string) {
  const [, month, day] = value.split("-").map(Number)
  return `${value === DATE_OPTIONS[0] ? "今天" : "明天"} ${month}月${day}日`
}

/** 批量簽到 / 簽退的默认时间：当前时刻向下取整到刻钟（滚轮只有 00/15/30/45） */
function nowTime() {
  const now = new Date()
  const minute = Math.floor(now.getMinutes() / 15) * 15
  return `${String(now.getHours()).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
}

/** 单列滚轮，也供电子考勤列表的「下載 / 發送」日期弹窗复用 */
export function WheelColumn({
  items,
  value,
  onChange,
  formatLabel,
}: {
  items: string[]
  value: string
  onChange: (value: string) => void
  /** 只影响显示，值仍是原始字符串（日期列要显示成「今天 10月26日」） */
  formatLabel?: (item: string) => string
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
          {formatLabel ? formatLabel(item) : item}
        </button>
      ))}
      <div className="attendance-wheel-pad" />
    </div>
  )
}

/** 取消 / 标题 / 確認 的滚轮弹窗外壳；也供其它页面拼自己的滚轮内容 */
export function EditSheet({
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
          
          取消
        </button>
        <strong>{title}</strong>
        <button
          className="attendance-sheet-text is-primary"
          onClick={onConfirm}
        >
          
          確認
        </button>
      </header>
      <div className="attendance-edit-sheet-body">{children}</div>
    </dialog>
  )
}

export function HoursSheet({
  onCancel,
  onConfirm,
  note = "調整每位已選員工的記錄工時。",
  mode = "delta",
  initial = 0,
  title = "加減時數",
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
    <AttendanceDialog title="成功" onClose={onClose}>
      <p className="attendance-prompt-text is-compact">
        
        感謝你向 YY Group 提交考勤列表，祝你愉快！
      </p>
      <div className="attendance-prompt-actions is-single">
        <button className="attendance-blue-button" onClick={onCheckHistory}>
          
          查看記錄
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
    <AttendanceDialog title="提交考勤" onClose={onCancel}>
      <p className="attendance-prompt-text is-compact">
        
        確定提交電子考勤列表？如適用，請先確認已扣除休息時間。
      </p>
      <div className="attendance-prompt-actions">
        <button className="attendance-soft-button" onClick={onCancel}>
          
          否
        </button>
        <button className="attendance-blue-button" onClick={onConfirm}>
          
          是
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
    <AttendanceDialog title="確認考勤" onClose={onSkip}>
      <p className="attendance-prompt-text is-compact">
        
        提供員工評價，有助我們為你安排最合適的人手。
      </p>
      <div className="attendance-prompt-actions">
        <button className="attendance-blue-button" onClick={onReview}>
          
          評價員工
        </button>
        <button className="attendance-soft-button" onClick={onSkip}>
          
          略過
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
      title="部門"
      onCancel={onCancel}
      onConfirm={() => onConfirm(value)}
    >
      <div className={`attendance-edit-select${open ? " is-open" : ""}`}>
        <button
          type="button"
          aria-expanded={open}
          aria-label="選擇部門"
          onClick={() => setOpen(!open)}
        >
          {value}
          <Caret color="#7d9cbc" />
        </button>
        {open && (
          <div className="attendance-edit-options" role="listbox" aria-label="部門">
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
        
        套用於所有已選員工。
      </p>
    </EditSheet>
  )
}

export function TimeSheet({
  title,
  withDate,
  initial,
  initialDate,
  note = "套用於所有已選員工。",
  onCancel,
  onConfirm,
}: {
  title: string
  withDate?: boolean
  initial: string
  /** 带日期时滚轮停在哪一天（YYYY-MM-DD），默认今天 */
  initialDate?: string
  /** 底部说明；传空字符串就不显示（例如建单页只改这一张单的班次） */
  note?: string
  onCancel: () => void
  /** 带日期时第二个参数回传选中的日期（YYYY-MM-DD） */
  onConfirm: (value: string, date?: string) => void
}) {
  const [hour, minute] = initial.split(":")
  const [date, setDate] = useState(
    initialDate && DATE_OPTIONS.includes(initialDate)
      ? initialDate
      : DATE_OPTIONS[0],
  )
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
      onConfirm={() =>
        onConfirm(`${hourValue}:${minuteValue}`, withDate ? date : undefined)
      }
    >
      <div className="attendance-wheel">
        {withDate && (
          <WheelColumn
            items={DATE_OPTIONS}
            value={date}
            onChange={setDate}
            formatLabel={dateLabel}
          />
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
          aria-label="取消簽名"
          onClick={onClose}
        >
          <AttendanceIcon name="close" />
        </button>
        <div className="attendance-signature-identity">
          <span className="attendance-signature-kicker">
            {kicker ?? `${direction === "in" ? "簽到" : "簽退"} · 9月24日`}
          </span>
          <strong id="attendance-signature-name">{name}</strong>
          {maskedId && (
            <span className="attendance-signature-id">{maskedId}</span>
          )}
        </div>
        <button
          className="attendance-sheet-confirm"
          aria-label="確認簽名"
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
          aria-label={`${name} 的簽名板`}
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
          <span className="attendance-signature-placeholder">簽名</span>
        )}
        <button
          className="attendance-signature-clear"
          disabled={!path}
          onClick={() => setPath("")}
        >
          清除
        </button>
      </div>
    </dialog>
  )
}

/**
 * 批量簽到 / 簽退的簽名視窗：一次簽名套用到所有已勾選的員工。
 * 資訊架構照客戶舊系統（左上取消、右上確認、中間一整塊簽名板、左下清除），
 * 視覺沿用本專案的玻璃藍；身份區改成「方向 + 日期 / 人數 / 記錄時間」。
 */
export function BatchSignatureSheet({
  direction,
  total,
  time,
  date = "9月24日",
  onClose,
  onSave,
}: {
  direction: "in" | "out"
  total: number
  time: string
  date?: string
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

  return (
    <dialog
      ref={ref}
      className="attendance-signature-sheet is-batch"
      tabIndex={-1}
      aria-labelledby="attendance-batch-signature-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <header className="attendance-signature-head">
        <button
          className="attendance-sheet-close"
          aria-label="取消簽名"
          onClick={onClose}
        >
          <AttendanceIcon name="close" />
        </button>
        <div className="attendance-signature-identity">
          <span className="attendance-signature-kicker">
            {direction === "in" ? "簽到" : "簽退"} · {date} · {time}
          </span>
          <strong id="attendance-batch-signature-title">{total} 位員工</strong>
        </div>
        <button
          className="attendance-sheet-confirm"
          aria-label="確認簽名"
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
      <div className="attendance-signature-surface is-batch">
        <svg
          viewBox={`0 0 ${SIGNATURE_WIDTH} ${SIGNATURE_HEIGHT}`}
          className="attendance-signature-pad"
          role="img"
          aria-label={`${total} 位員工的簽名板`}
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
          <span className="attendance-signature-placeholder">簽名</span>
        )}
        <button
          className="attendance-signature-clear"
          disabled={!path}
          onClick={() => setPath("")}
        >
          清除
        </button>
      </div>
      <p className="attendance-signature-caption">
        簽名將套用於已選的 {total} 位員工，確認後記錄此次
        {direction === "in" ? "簽到" : "簽退"}。
      </p>
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
  onWriteReview: (staff: StaffRef, target?: "reviews" | "write-review") => void
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
    "checkin" | "checkout" | "department" | "start" | "end" | null
  >(
    null,
  )
  const [modal, setModal] = useState<Modal>(null)
  const [profileFor, setProfileFor] = useState<number | null>(null)
  const [reviewPrompt, setReviewPrompt] = useState(false)
  const [submitPrompt, setSubmitPrompt] = useState(false)
  const [submitSignature, setSubmitSignature] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [reviewTargets, setReviewTargets] = useState<number[]>([])
  const [notice, setNotice] = useState("")
  const [openAction, setOpenAction] = useState<number | null>(null)
  const actionRoot = useRef<HTMLDivElement>(null)

  /* 从「編輯工作」页返回：把那一页填的字段套用到当时勾选的人。
     结果放在 sessionStorage 里（两页是独立 route），取一次即清。 */
  useEffect(() => {
    /* 添加新員工整页选好的人：接在表格末尾，状态先给「未到場」 */
    const added = takePendingStaff()
    if (added.length) {
      setStaff((current) => {
        const base = current.length ? Math.max(...current.map((p) => p.id)) : 0
        return [
          ...current,
          ...added.map((person, index) => ({
            id: base + index + 1,
            name: person.nameZh,
            nric: person.nric,
            price: person.price,
            jobTitle: person.job,
            start: person.start,
            end: person.end,
            timeIn: "",
            timeOut: "",
            inMethod: "signature" as const,
            outMethod: "signature" as const,
            breakHours: 0,
            rooms: 0,
            total: 0,
            status: "未到場" as const,
            remark: "—",
            active: false,
            department: person.department,
          })),
        ]
      })
      setNotice(`已添加 ${added.length} 位員工`)
    }
  }, [])

  useEffect(() => {
    const result = takeEditJobResult()
    if (!result || result.ids.length === 0) return
    setStaff((current) =>
      current.map((person) => {
        if (!result.ids.includes(person.id)) return person
        return {
          ...person,
          ...(result.department ? { department: result.department } : null),
          ...(result.jobTitle ? { jobTitle: result.jobTitle } : null),
          ...(result.start ? { start: result.start } : null),
          ...(result.end ? { end: result.end } : null),
          ...(result.price !== undefined ? { price: result.price } : null),
        }
      }),
    )
    setNotice(`已更新 ${result.ids.length} 位員工的工作資料`)
  }, [])

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
          aria-label={`為 ${person.name.replace("\n", " ")} ${direction === "in" ? "簽到" : "簽退"}`}
          onClick={() => setModal({ id: person.id, direction })}
        >
          {direction === "in" ? "簽到" : "簽退"}
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
          aria-label={`開啟 ${person.name.replace("\n", " ")} 的資料`}
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
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button
              className="attendance-back"
              onClick={onBack}
              aria-label="返回登入"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>簽到 / 簽退（9月24日）</h1>
        </div>
        <div
          className="attendance-toolbar"
          role="toolbar"
          aria-label="考勤操作"
        >
          <button
            className="attendance-soft-button"
            onClick={() => {
              /* 香港的二维码是整页展示（给员工拿这台 iPad 扫），不再用弹窗 */
              window.location.hash = "qr-code"
            }}
          >
            <QrMark />
            <span>二維碼</span>
          </button>
          {/* 批量簽到 / 簽退：先勾人，再簽一次名，時間套用到整批 */}
          <button
            className="attendance-soft-button"
            disabled={listUnavailable || selectedIds.length === 0}
            onClick={() => setEditSheet("checkin")}
          >
            <AttendanceIcon name="signin" />
            <span>簽到</span>
          </button>
          <button
            className="attendance-soft-button"
            disabled={listUnavailable || selectedIds.length === 0}
            onClick={() => setEditSheet("checkout")}
          >
            <AttendanceIcon name="signout" />
            <span>簽退</span>
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
            <span>{editing ? "完成" : "編輯"}</span>
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
            <span>確認</span>
          </button>
        </div>
      </header>
      <section className="attendance-panel" aria-label="員工考勤">
        <div className={`attendance-summary${editing ? " is-editing" : ""}`}>
          {editing ? (
            <div className="attendance-editbar" role="group" aria-label="編輯考勤">
              {/* 批量改部門 / 班次時間（與新加坡同一個信息架構）；職位 / 單價仍走「編輯工作」整頁 */}
              <button
                className="attendance-chip is-blue"
                onClick={() => setEditSheet("department")}
              >
                <span>部門</span>
                <Caret color="#3b81be" />
              </button>
              <button
                className="attendance-chip is-amber"
                onClick={() => setEditSheet("start")}
              >
                <span>開始時間</span>
                <Caret color="#a78331" />
              </button>
              <button
                className="attendance-chip is-amber"
                onClick={() => setEditSheet("end")}
              >
                <span>結束時間</span>
                <Caret color="#a78331" />
              </button>
              <button
                className="attendance-chip is-blue edit-job-entry"
                disabled={selectedIds.length === 0}
                onClick={() => {
                  setEditJobTargets(selectedIds)
                  setEditJobOrigin("attendance")
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
            <>
              <div className="attendance-stat-card">
                <span className="attendance-stat-icon">
                  <AttendanceIcon name="team-checkin" />
                </span>
                <div>
                  <p>簽到：</p>
                  {renderStat(checkIns)}
                </div>
              </div>
              <div className="attendance-stat-card">
                <span className="attendance-stat-icon">
                  <AttendanceIcon name="calendar-checkout" />
                </span>
                <div>
                  <p>簽退：</p>
                  {renderStat(checkOuts)}
                </div>
              </div>
              <div className="attendance-stat-card">
                <span className="attendance-stat-icon">
                  <AttendanceIcon name="work-hours" />
                </span>
                <div>
                  <p>{isRoom ? "總房間數：" : "總時數："}</p>
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
              aria-label="搜尋身份證號碼或員工姓名"
              placeholder="搜尋身份證號碼"
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
              title="9月24日尚無考勤記錄"
              description="今日尚未有人簽到或簽退。員工簽到後，記錄會顯示在這裡。"
              primaryLabel="Add Staff"
              onPrimary={() => setModal("add")}
              secondaryLabel="重新整理"
              onSecondary={retryLoad}
            />
          ) : isFailure ? (
            <AttendanceStateView
              illustration={pageState === "offline" ? "offline" : "error"}
              tone="danger"
              title={
                pageState === "offline"
                  ? "你目前離線"
                  : "無法載入考勤記錄"
              }
              description={
                pageState === "offline"
                  ? "請檢查網絡連線後再試。已儲存的名單仍會保留在此裝置。"
                  : "載入今日記錄時發生問題，請稍後再試。"
              }
              primaryLabel="重試"
              onPrimary={retryLoad}
              secondaryLabel="Contact Support"
              onSecondary={() => setNotice("已將支援請求發送至 Hong Ye Group")}
            />
          ) : (
            <>
          <table className="attendance-table">
            <colgroup>
              {[
                3.3, 4.2, 11.5, 9, 8, 10.8, 8, 10.8, 5.8, 12.6, 11, 5.0,
              ].map((width, index) => (
                <col key={index} style={{ width: `${width}%` }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                <th scope="col" className="attendance-check-cell">
                  <AttendanceCheck
                    label="選取所有員工"
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
                      label={`選取 ${person.name.replace("\n", " ")}`}
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
                  <td className="attendance-blue-text attendance-name-cell">
                    {editable(person, "name")}
                  </td>
                  <td>
                    <span className="attendance-cell-text attendance-price">
                      ${person.price}
                      <span className="attendance-price-unit">/小時</span>
                    </span>
                  </td>
                  <td>{editable(person, "start")}</td>
                  <td>{renderTime(person, "in")}</td>
                  <td>{editable(person, "end")}</td>
                  <td>{renderTime(person, "out")}</td>
                  <td>
                    <span className="attendance-total-value">{person.total}</span>
                  </td>
                  <td>
                    <div
                      className="attendance-action-wrap"
                      ref={openAction === person.id ? actionRoot : undefined}
                      onKeyDown={(event) => {
                        if (event.key === "Escape") setOpenAction(null)
                      }}
                    >
                      <button
                        className={`attendance-status ${STATUS_CLASS[person.status] ?? "is-applied"}`}
                        aria-label={`${person.name.replace("\n", " ")} 的狀態：${person.status}`}
                        aria-expanded={openAction === person.id}
                        aria-controls={`staff-status-${person.id}`}
                        onClick={() =>
                          setOpenAction(
                            openAction === person.id ? null : person.id,
                          )
                        }
                      >
                        {person.status}
                        <Caret color={person.status === "已取消" ? "#7d8fa6" : "#fff"} />
                      </button>
                      {openAction === person.id && (
                        <div
                          className="attendance-status-menu"
                          id={`staff-status-${person.id}`}
                        >
                          {STATUS_OPTIONS.map((status) => (
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
                  <td className="attendance-job-text">{person.jobTitle}</td>
                  <td>
                    <button
                      type="button"
                      className={`attendance-log-button${
                        hasRemark(person.remark) ? " is-set" : ""
                      }`}
                      aria-label={`查看 ${person.name.replace("\n", " ")} 的日誌`}
                      onClick={() => {
                        setLogOrigin("attendance")
                        setLogTarget(buildLogTarget(person))
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
                          fill={hasRemark(person.remark) ? "#1689eb" : "#e7f2fb"}
                          stroke={hasRemark(person.remark) ? "#1689eb" : "#b6d6ef"}
                          strokeWidth="1.2"
                        />
                        <path
                          d="M6.8 7.2h6.4M6.8 10.1h6.4M6.8 13h4.2"
                          fill="none"
                          stroke={hasRemark(person.remark) ? "#ffffff" : "#8ab4d4"}
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
          {visibleStaff.length === 0 && (
            <AttendanceStateView
              illustration="search"
              tone="muted"
              compact
              title="沒有符合的員工"
              description={`沒有符合「${query}」的結果，請試試其他姓名或身份證號碼。`}
              primaryLabel="清除搜尋"
              onPrimary={() => changePageState("default")}
            />
          )}
            </>
          )}
        </div>
      </section>
      <button
        className="attendance-add-button attendance-blue-button"
        aria-label="新增員工"
        onClick={() => {
          setAddStaffOrigin("attendance")
          window.location.hash = "add-staff"
        }}
      >
        <AttendanceIcon name="plus" />
      </button>
      {notice && (
        <div className="attendance-toast" role="status">
          <AttendanceIcon name="confirm" />
          <span>{notice}</span>
          <button
            onClick={() => setNotice("")}
            aria-label="關閉通知"
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
              `已於 ${time} ${direction === "in" ? "簽到" : "簽退"}`,
            )
          }}
        />
      )}
      {(modal === "add" || modal === "qr") && (
        <AttendanceDialog
          title={modal === "add" ? "個人資料" : "二維碼"}
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
                    /* 香港按小時計費：新人默认时薪 60，職位先取表单里选的部門 */
                    price: 60,
                    jobTitle: values.department || "宴會服務員",
                    timeIn: "",
                    timeOut: "",
                    inMethod: "signature",
                    outMethod: "qr",
                    breakHours: 0,
                    rooms: 0,
                    total: 0,
                    status: "未到場",
                    remark: "—",
                    active: false,
                  },
                ])
                setQuery("")
                setModal(null)
                setNotice(
                  "員工已加入名單。",
                )
              }}
            />
          ) : (
            <div className="attendance-qr-preview">
              <QrMark />
              <h3>簽到 / 簽退</h3>
              <p>9月24日 · Hong Ye Group</p>
              <p className="attendance-preview-note">
                
                員工掃描此碼即可簽到或簽退。
              </p>
              <button
                className="attendance-blue-button"
                onClick={() => setModal(null)}
              >
                
                完成
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
          kicker="簽名處 · 9月24日"
          name="電子考勤列表"
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
          onWriteReview={(target) => {
            setProfileFor(null)
            onWriteReview(
              {
                id: profileStaff.id,
                name: profileStaff.name.replace("\n", " "),
                nric: profileStaff.nric.replace(/\s/g, ""),
              },
              target,
            )
          }}
        />
      )}
      {(editSheet === "checkin" || editSheet === "checkout") && (
        <BatchSignatureSheet
          direction={editSheet === "checkin" ? "in" : "out"}
          total={selectedIds.length}
          time={nowTime()}
          onClose={() => setEditSheet(null)}
          onSave={() => {
            const stamp = nowTime()
            const isIn = editSheet === "checkin"
            applyToSelected(isIn ? { timeIn: stamp } : { timeOut: stamp })
            setEditSheet(null)
            setNotice(
              `已為 ${selectedIds.length} 位員工記錄${isIn ? "簽到" : "簽退"}時間 ${stamp}，簽名已儲存`,
            )
          }}
        />
      )}
      {editSheet === "department" && (
        <DepartmentSheet
          initial={
            staff.find((person) => selectedIds.includes(person.id))?.department ??
            DEPARTMENT_OPTIONS[0]
          }
          onCancel={() => setEditSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ department: value })
            setEditSheet(null)
            setNotice(`已將 ${selectedIds.length} 位員工的部門設為 ${value}`)
          }}
        />
      )}
      {editSheet === "start" && (
        <TimeSheet
          title="開始時間"
          initial={
            staff.find((person) => selectedIds.includes(person.id))?.start ?? "08:00"
          }
          onCancel={() => setEditSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ start: value })
            setEditSheet(null)
            setNotice(`已將 ${selectedIds.length} 位員工的開始時間設為 ${value}`)
          }}
        />
      )}
      {/* 班次可以跨到明天，結束時間的滾輪多一列日期 */}
      {editSheet === "end" && (
        <TimeSheet
          title="結束時間"
          withDate
          initial={
            staff.find((person) => selectedIds.includes(person.id))?.end ?? "17:00"
          }
          onCancel={() => setEditSheet(null)}
          onConfirm={(value) => {
            applyToSelected({ end: value })
            setEditSheet(null)
            setNotice(`已將 ${selectedIds.length} 位員工的結束時間設為 ${value}`)
          }}
        />
      )}
    </main>
      {/* 状态切换器刻意放在 <main> 外面：Copy to Figma 只抓 main，所以它不会进设计稿 */}
      <PageStateSwitcher value={pageState} onChange={changePageState} />
    </>
  )
}
