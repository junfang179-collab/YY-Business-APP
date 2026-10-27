/**
 * 考勤页点「日誌」→ 整页日誌列表（路由 #log）。
 * LogPage 是独立路由，拿不到考勤页的 state，所以和编辑工作一样
 * 用 sessionStorage 交接：点图标时把该员工的日誌整理好写进去，
 * LogPage 直接渲染。刷新后仍在（当天有效）。
 */

export type LogEntry = {
  /** 操作類型：申請工作 / 確認排班 / 提交簽到 … */
  type: string
  /** 發生時間 YYYY-MM-DD HH:mm:ss，列表按這個倒序 */
  time: string
  content: string
}

export type LogTarget = {
  name: string
  department: string
  jobTitle: string
  entries: LogEntry[]
}

const KEY = "hk-log-target"
const FROM_KEY = "hk-log-from"

/** 日誌頁從哪進來：考勤頁（9月24日）、電子考勤明細頁、或記錄明細頁，返回時跟著回 */
export type LogOrigin = "attendance" | "e-attendance-detail" | "history-detail"

export function setLogOrigin(origin: LogOrigin) {
  try {
    window.sessionStorage.setItem(FROM_KEY, origin)
  } catch {
    /* 寫不進去就當作從考勤頁進來的 */
  }
}

/** 讀一次即清，避免下次從別的地方進來還記著上一次的來源 */
export function takeLogOrigin(): LogOrigin {
  try {
    const raw = window.sessionStorage.getItem(FROM_KEY)
    window.sessionStorage.removeItem(FROM_KEY)
    return raw === "e-attendance-detail" || raw === "history-detail" ? raw : "attendance"
  } catch {
    return "attendance"
  }
}

export function setLogTarget(target: LogTarget) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(target))
  } catch {
    /* 無痕模式寫不進去就退化成空列表，不影響主流程 */
  }
}

export function readLogTarget(): LogTarget | null {
  try {
    const raw = window.sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as LogTarget) : null
  } catch {
    return null
  }
}

/** buildLogTarget 只依赖这几个字段，用结构型別避免和 AttendancePage 的 Staff 循环引用 */
type LogSource = {
  id: number
  name: string
  department?: string
  jobTitle: string
  start: string
  end: string
  timeIn: string
  timeOut: string
  inMethod: "signature" | "qr"
  outMethod: "signature" | "qr"
  status: string
  remark: string
}

const METHOD: Record<LogSource["inMethod"], string> = {
  signature: "簽名",
  qr: "二維碼",
}

/** 7:58 → 07:58，日誌里的时间要能直接排字符串序 */
function padTime(value: string) {
  const [hour, minute = "00"] = value.split(":")
  return `${hour.padStart(2, "0")}:${minute}`
}

/**
 * 按这名员工当前的考勤数据反推出一串操作记录：
 * 申请 → 确认排班 → 签到 → 签退 →（改状态）→（写日誌）。
 * 演示数据，顺序与时间固定，不依赖系统时钟。
 */
export function buildLogTarget(person: LogSource): LogTarget {
  const sec = String((person.id * 7) % 60).padStart(2, "0")
  const entries: LogEntry[] = [
    {
      type: "申請工作",
      time: `2026-09-18 10:38:${sec}`,
      content: `申請「${person.jobTitle}」職位（${person.department ?? "宴會部"}）`,
    },
    {
      type: "確認排班",
      time: `2026-09-22 16:04:${sec}`,
      content: `已確認 9月24日 ${person.start} – ${person.end} 的班次`,
    },
  ]

  if (person.timeIn) {
    entries.push({
      type: "提交簽到",
      time: `2026-09-24 ${padTime(person.timeIn)}:${sec}`,
      content: `經${METHOD[person.inMethod]}方式簽到（${person.timeIn}）`,
    })
  }
  if (person.timeOut) {
    entries.push({
      type: "提交簽退",
      time: `2026-09-24 ${padTime(person.timeOut)}:${sec}`,
      content: `經${METHOD[person.outMethod]}方式簽退（${person.timeOut}）`,
    })
  }
  if (person.status !== "已申請") {
    entries.push({
      type: "變更狀態",
      time: `2026-09-24 23:10:${sec}`,
      content: `狀態由「已申請」改為「${person.status}」`,
    })
  }
  if (person.remark && person.remark !== "—") {
    entries.push({
      type: "新增日誌",
      time: `2026-09-25 09:12:${sec}`,
      content: person.remark.replace(/\n/g, " "),
    })
  }

  /* 最近的排最上面 */
  entries.sort((a, b) => (a.time < b.time ? 1 : -1))

  return {
    name: person.name.replace("\n", " "),
    department: person.department ?? "宴會部",
    jobTitle: person.jobTitle,
    entries,
  }
}
