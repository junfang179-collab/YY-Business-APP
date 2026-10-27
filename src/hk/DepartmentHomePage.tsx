import { useEffect, useRef, useState, type ReactNode } from "react"
import { AttendanceDialog } from "./AttendancePage"
import "../employer.css"

type DeptIconName = "scan" | "mail" | "settings" | "close"

/**
 * 三个入口图标统一成「蓝色粗描边 + 浅蓝填充」的两段式画法：
 * 与 Employer 页右上服装图标同一套圆角风格，比原来的细线图标更有体积感。
 */
function DeptIcon({ name }: { name: DeptIconName }) {
  const paths: Record<DeptIconName, ReactNode> = {
    close: <path d="m14 14 16 16M30 14 14 30" />,    scan: (
      <>
        <path d="M7 15V9.5A2.5 2.5 0 0 1 9.5 7H15M29 7h5.5A2.5 2.5 0 0 1 37 9.5V15M37 29v5.5a2.5 2.5 0 0 1-2.5 2.5H29M15 37H9.5A2.5 2.5 0 0 1 7 34.5V29" />
        <rect x="17" y="17" width="10" height="10" rx="2.4" fill="#d9edff" strokeWidth="2.6" />
      </>
    ),
    mail: (
      <>
        <rect x="6.5" y="11" width="31" height="23" rx="5.5" fill="#d9edff" />
        <path d="m8.5 14.5 13.5 9.5 13.5-9.5" />
      </>
    ),
    settings: (
      <>
        {/* 齿轮：8 枚圆角齿 + 圆盘 + 中心孔，描边/填充与另两枚保持同一套画法 */}
        <g fill="#d9edff" stroke="currentColor" strokeWidth="2.7" strokeLinejoin="round">
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <rect
              key={deg}
              x="18.5"
              y="4.6"
              width="7"
              height="7"
              rx="2"
              transform={`rotate(${deg} 22 22)`}
            />
          ))}
          <circle cx="22" cy="22" r="13.6" />
        </g>
        <circle cx="22" cy="22" r="5.4" fill="#fbfdff" stroke="currentColor" strokeWidth="2.7" />
      </>
    ),
  }

  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

type DeptModuleId = "attendance" | "gate" | "adhoc" | "company"

/** 部门主页的入口：E-Attendance 进工作台；adhoc / company 暂时隐藏，恢复时放开注释即可 */
const DEPT_MODULES: {
  id: DeptModuleId
  title: string
  description: string
  image: string
}[] = [
  {
    id: "attendance",
    title: "電子考勤",
    description: "查看員工的簽到簽退。",
    image: "/assets/icon-e-attendance.png",
  },
  {
    id: "gate",
    title: "門衛打卡",
    description: "查看員工的門禁打卡。",
    image: "/assets/icon-gate-checkin.png",
  },
  /*
  {
    id: "adhoc",
    title: "Ad-hoc Staff Request",
    description: "Request extra manpower at short notice.",
    image: "/assets/icon-adhoc-request.png",
  },
  {
    id: "company",
    title: "Company Information",
    description: "Review and update your company profile.",
    image: "/assets/icon-company-info.png",
  },
  */
]

/**
 * 部门主页：登录之后的第一个落脚点。
 * 信息结构参考稿：左上企业 LOGO + 部门名，右上扫码 / 消息 / 设置，
 * 下方是该部门可用的模块入口（目前只放 E-Attendance），
 * 视觉沿用 Employer 页的玻璃卡片体系。
 */
export default function DepartmentHomePage({
  onOpenAttendance,
  onOpenNotifications,
  onOpenScan,
  onOpenVerify,
  onOpenFeedback,
  onOpenChangePassword,
  onOpenCompanyInfo,
}: {
  onOpenAttendance: () => void
  onOpenNotifications: () => void
  onOpenScan: () => void
  onOpenVerify: () => void
  onOpenFeedback: () => void
  onOpenChangePassword: () => void
  onOpenCompanyInfo: () => void
}) {
  const [openMenu, setOpenMenu] = useState<"scan" | "settings" | null>(null)
  const [confirmLogout, setConfirmLogout] = useState(false)
  /** 还没做的模块点进来的提示 */
  const [notice, setNotice] = useState("")
  const actionsRef = useRef<HTMLDivElement>(null)

  /* 点面板外部或按 Esc 收起，和注册页的区号下拉保持同一套交互 */
  useEffect(() => {
    if (!openMenu) return
    const onPointerDown = (event: MouseEvent) => {
      if (!actionsRef.current?.contains(event.target as Node)) setOpenMenu(null)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenMenu(null)
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [openMenu])

  return (
    <main className="employer-page dept-home">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="dept-header">
        {/* LOGO + 企业名整块可点：进 Company Information（参考稿的 Employer Info） */}
        <button
          type="button"
          className="dept-brand"
          onClick={onOpenCompanyInfo}
          aria-label="開啟公司資料"
        >
          <span className="dept-logo">
            <img src="/favicon.png" alt="Hong Ye Group 標誌" />
          </span>
          <span className="dept-brand-name">Hong Ye Group</span>
        </button>
        <div className="dept-actions" ref={actionsRef}>
          <div className="dept-scan">
            <button
              type="button"
              aria-label="掃描"
              aria-expanded={openMenu === "scan"}
              onClick={() => setOpenMenu(openMenu === "scan" ? null : "scan")}
            >
              <DeptIcon name="scan" />
            </button>
            {openMenu === "scan" && (
              <div className="dept-menu">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null)
                    onOpenScan()
                  }}
                >
                  
                  掃描
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null)
                    onOpenVerify()
                  }}
                >
                  
                  驗證
                </button>
              </div>
            )}
          </div>
          {/* 气泡必须放在按钮外面：按钮是圆形，Figma 会把超出圆角/边框的子节点裁掉 */}
          <div className="dept-mail">
            <button
              type="button"
              aria-label="收件匣，10 則未讀"
              onClick={onOpenNotifications}
            >
              <DeptIcon name="mail" />
            </button>
            <span className="dept-badge">10</span>
          </div>
          <div className="dept-settings">
            <button
              type="button"
              aria-label="設定"
              aria-expanded={openMenu === "settings"}
              onClick={() => setOpenMenu(openMenu === "settings" ? null : "settings")}
            >
              <DeptIcon name="settings" />
            </button>
            {openMenu === "settings" && (
              <div className="dept-menu dept-menu-wide">
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null)
                    onOpenFeedback()
                  }}
                >
                  
                  意見
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null)
                    onOpenChangePassword()
                  }}
                >
                  
                  更改密碼
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenMenu(null)
                    setConfirmLogout(true)
                  }}
                >
                  
                  登出
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <section className="dept-content" aria-label="Hong Ye Group 工作台">
        <div className="employer-grid">
          {DEPT_MODULES.map((module) => (
            <button
              key={module.id}
              className="employer-module dept-module"
              onClick={() => {
                if (module.id === "attendance") {
                  onOpenAttendance()
                  return
                }
                if (module.id === "gate") {
                  window.location.hash = "gate-checkin"
                  return
                }
                if (module.id === "company") {
                  onOpenCompanyInfo()
                  return
                }
                setNotice(`${module.title} 即將推出。`)
              }}
            >
              <span className="employer-module-icon">
                {/* 首页 E-Attendance 用手机 + 指纹 + 时钟的独立插图；
                    Employer 工作台里的 Sign In / Sign Out 仍用 icon-attendance.png，两者不复用 */}
                <img src={module.image} alt="" aria-hidden="true" />
              </span>
              <span className="employer-module-copy">
                <strong>{module.title}</strong>
                <small>{module.description}</small>
              </span>
              <span className="employer-module-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
      </section>

      {notice && (
        <div className="employer-notice" role="status">
          <span>{notice}</span>
          <button
            type="button"
            aria-label="關閉通知"
            onClick={() => setNotice("")}
          >
            <DeptIcon name="close" />
          </button>
        </div>
      )}

      {confirmLogout && (
        <AttendanceDialog title="登出" onClose={() => setConfirmLogout(false)}>
          <p className="attendance-prompt-text is-compact">
            
            確定要登出嗎？
          </p>
          <div className="attendance-prompt-actions">
            <button
              type="button"
              className="attendance-soft-button"
              onClick={() => setConfirmLogout(false)}
            >
              
              否
            </button>
            <button
              type="button"
              className="attendance-blue-button"
              onClick={() => {
                setConfirmLogout(false)
                window.location.hash = ""
              }}
            >
              
              是
            </button>
          </div>
        </AttendanceDialog>
      )}
    </main>
  )
}
