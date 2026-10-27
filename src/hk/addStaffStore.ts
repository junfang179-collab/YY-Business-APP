/**
 * 添加新員工：考勤页右下角「加人」→ 整页候选人列表（路由 #add-staff）。
 * 选中的人先攒在本页 state，再整批写进 sessionStorage，回考勤页时由
 * AttendancePage 取出来接到 staff 末尾（同 editJobStore 的交接方式）。
 */

export type Candidate = {
  id: number
  /** 中文名，進表時用它（表格姓名列很窄，英文全名會折行） */
  nameZh: string
  /** 英文全名，選擇列表裡跟中文名並排顯示 */
  nameEn: string
  nric: string
  phone: string
  gender: "男" | "女"
  /** 常用部門 / 常用班次，兼作篩選維度 */
  department: string
  /** 進表時的職位（職位和部門不是一回事，例如 房務部 的 清潔員） */
  job: string
  start: string
  end: string
  price: number
}

export const CANDIDATES: Candidate[] = [
  {
    id: 1,
    nameZh: "陳國平",
    nameEn: "CHAN KWOK PING",
    nric: "F3409123",
    phone: "+85291234567",
    gender: "男",
    department: "宴會部",
    job: "宴會服務員",
    start: "08:00",
    end: "18:00",
    price: 65,
  },
  {
    id: 2,
    nameZh: "練滿平",
    nameEn: "LIN MAN PING",
    nric: "M4370218",
    phone: "+85262223456",
    gender: "女",
    department: "餐飲服務",
    job: "樓面接待",
    start: "09:00",
    end: "21:00",
    price: 70,
  },
  {
    id: 3,
    nameZh: "馮灶旺",
    nameEn: "FUNG CHO WONG",
    nric: "M5218904",
    phone: "+85291288734",
    gender: "男",
    department: "廚房部",
    job: "廚房助理",
    start: "14:00",
    end: "23:00",
    price: 68,
  },
  {
    id: 4,
    nameZh: "姜嘉欣",
    nameEn: "KEUNG KA YAN",
    nric: "F6123457",
    phone: "+85263349812",
    gender: "女",
    department: "宴會部",
    job: "宴會服務員",
    start: "09:00",
    end: "21:00",
    price: 65,
  },
  {
    id: 5,
    nameZh: "黃志明",
    nameEn: "WONG CHI MING",
    nric: "M3087456",
    phone: "+85296781234",
    gender: "男",
    department: "房務部",
    job: "清潔員",
    start: "08:00",
    end: "18:00",
    price: 60,
  },
  {
    id: 6,
    nameZh: "李婉婷",
    nameEn: "LEE YUEN TING",
    nric: "F7245093",
    phone: "+85254889012",
    gender: "女",
    department: "餐飲服務",
    job: "樓面接待",
    start: "14:00",
    end: "23:00",
    price: 62,
  },
  {
    id: 7,
    nameZh: "何俊傑",
    nameEn: "HO CHUN KIT",
    nric: "M4890231",
    phone: "+85267123456",
    gender: "男",
    department: "廚房部",
    job: "廚房助理",
    start: "08:00",
    end: "18:00",
    price: 66,
  },
]

export const DEPARTMENTS = ["全部部門", "宴會部", "餐飲服務", "廚房部", "房務部"]
export const SHIFTS = [
  "全部時間段",
  "08:00 – 18:00",
  "09:00 – 21:00",
  "14:00 – 23:00",
]

/** 身份證留前 5 位、手機留前 8 位，跟旧系统一样打星号 */
export function maskNric(nric: string) {
  return `${nric.slice(0, 5)}***`
}
export function maskPhone(phone: string) {
  return `${phone.slice(0, 8)}****`
}

const KEY = "hk-pending-adds"
const FROM_KEY = "hk-add-staff-from"

/**
 * 「加人」现在有两个入口：簽到 / 簽退（9月24日）和電子考勤列表（11月2日）。
 * 进来时记下来源路由，返回按钮据此原路返回。
 */
export function setAddStaffOrigin(hash: string) {
  try {
    window.sessionStorage.setItem(FROM_KEY, hash)
  } catch {
    /* 無痕模式寫不進去就退回預設 */
  }
}

/** 讀一次就清；沒有記錄時當作從簽到 / 簽退頁進來 */
export function takeAddStaffOrigin() {
  try {
    const raw = window.sessionStorage.getItem(FROM_KEY)
    if (!raw) return "attendance"
    window.sessionStorage.removeItem(FROM_KEY)
    return raw
  } catch {
    return "attendance"
  }
}


export function setPendingStaff(list: Candidate[]) {
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(list))
  } catch {
    /* 無痕模式寫不進去就當沒加，不影響瀏覽 */
  }
}

/** 讀一次就清，避免反覆返回時重複加人 */
export function takePendingStaff(): Candidate[] {
  try {
    const raw = window.sessionStorage.getItem(KEY)
    if (!raw) return []
    window.sessionStorage.removeItem(KEY)
    return JSON.parse(raw) as Candidate[]
  } catch {
    return []
  }
}
