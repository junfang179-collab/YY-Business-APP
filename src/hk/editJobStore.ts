/**
 * 考勤页 → 編輯工作页 之间的批量编辑交接。
 *
 * 两页是各自独立的 route，考勤页的勾选状态不会跟着路由走，所以用
 * sessionStorage 传：进页面时写目标名单，提交时写结果，考勤页挂载时取一次
 * （取完即删，避免下次进来重复套用）。
 */
export type EditJobResult = {
  ids: number[]
  department?: string
  jobTitle?: string
  start?: string
  end?: string
  /** 结束时间落在哪一天（YYYY-MM-DD）；表格只显示时分，日期留给单据用 */
  endDate?: string
  /** 时薪（每小时单价） */
  price?: number
}

const TARGETS_KEY = "hk-edit-job-targets"
const RESULT_KEY = "hk-edit-job-result"
const FROM_KEY = "hk-edit-job-from"

/**
 * 「編輯工作」有兩個入口：簽到 / 簽退（9月24日）的批量編輯欄、電子考勤列表
 * （11月2日）標題右側的按鈕。進來時記下來源路由，返回按原路回去。
 */
export function setEditJobOrigin(hash: string) {
  try {
    sessionStorage.setItem(FROM_KEY, hash)
  } catch {
    /* 無痕模式寫不進去就退回預設 */
  }
}

/** 讀一次就清；沒有記錄時當作從簽到 / 簽退頁進來 */
export function takeEditJobOrigin() {
  try {
    const raw = sessionStorage.getItem(FROM_KEY)
    if (!raw) return "attendance"
    sessionStorage.removeItem(FROM_KEY)
    return raw
  } catch {
    return "attendance"
  }
}

export function setEditJobTargets(ids: number[]) {
  sessionStorage.setItem(TARGETS_KEY, JSON.stringify(ids))
}

export function readEditJobTargets(): number[] {
  try {
    const raw = sessionStorage.getItem(TARGETS_KEY)
    return raw ? (JSON.parse(raw) as number[]) : []
  } catch {
    return []
  }
}

export function setEditJobResult(result: EditJobResult) {
  sessionStorage.setItem(RESULT_KEY, JSON.stringify(result))
}

export function takeEditJobResult(): EditJobResult | null {
  const raw = sessionStorage.getItem(RESULT_KEY)
  if (!raw) return null
  sessionStorage.removeItem(RESULT_KEY)
  try {
    return JSON.parse(raw) as EditJobResult
  } catch {
    return null
  }
}
