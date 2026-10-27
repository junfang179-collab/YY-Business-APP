import { useState, type ReactNode } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"

type ModuleId = "attendance" | "list" | "history"
type EmployerIconName = "back" | "close" | "shirt"

function EmployerIcon({ name }: { name: EmployerIconName }) {
  const paths: Record<EmployerIconName, ReactNode> = {
    back: <path d="m27 9-13 14 13 14" />,
    close: <path d="m12 12 20 20M32 12 12 32" />,
    shirt: (
      <path
        d="m15 7 7 5 7-5 9 7-5 9-5-3v17H16V20l-5 3-5-9 9-7Z"
        fill="#d9edff"
        strokeWidth="2.8"
      />
    ),
  }
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

const modules: { id: ModuleId, title: string, description: string, image: string }[] = [
  {
    id: "attendance",
    title: "簽到 / 簽退",
    description: "查看員工今日的簽到簽退。",
    image: "/assets/icon-attendance.png",
  },
  {
    id: "list",
    title: "電子考勤列表",
    description: "瀏覽團隊的考勤記錄。",
    image: "/assets/icon-list.png",
  },
  {
    id: "history",
    title: "記錄",
    description: "查看過往的考勤記錄。",
    image: "/assets/icon-history.png",
  },
]

export default function EmployerPage({
  onBack,
  onBillingMethod,
  onAttendanceList,
  onHistory,
}: {
  onBack: () => void
  /** Sign In / Sign Out：先选计费方式（Per Hour / Per Room） */
  onBillingMethod: () => void
  /** E-Attendance List：直接进列表 */
  onAttendanceList: () => void
  onHistory: () => void
  /** 香港暂不提供 Labour Requisition 与 Staff Clothing 入口；
      这两个参数只为和 SG 版保持同一套 props（App.tsx 对三地区传同一份） */
  onRequisition: (department: string) => void
  onClothing: () => void
}) {
  const [notice, setNotice] = useState("")

  function selectModule(id: ModuleId, title: string) {
    /* Sign In / Sign Out 先过一次计费方式选择 */
    if (id === "attendance") {
      onBillingMethod()
      return
    }
    if (id === "list") {
      onAttendanceList()
      return
    }
    if (id === "history") {
      onHistory()
      return
    }
    setNotice(`${title} 即將推出。`)
  }

  return (
    <main className="employer-page">
      <div className="employer-landscape" aria-hidden="true" />
      <header className="employer-header">
        <button
          className="employer-back"
          onClick={onBack}
          aria-label="返回部門"
        >
          <BackIcon />
        </button>
        <div>
          <p>Hong Ye Group</p>
          <h1>電子考勤</h1>
        </div>
      </header>
      <section
        className="employer-content"
        aria-labelledby="employer-menu-title"
      >
        <div className="employer-heading">
          <p>工作台</p>
          <h2 id="employer-menu-title">你想管理哪一項？</h2>
        </div>
        <div className="employer-grid">
          {modules.map((module) => (
            <button
              key={module.id}
              className={`employer-module${
                module.id === "attendance" ? " employer-module-primary" : ""
              }`}
              onClick={() => selectModule(module.id, module.title)}
            >
              <span className="employer-module-icon">
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
            aria-label="關閉通知"
            onClick={() => setNotice("")}
          >
            <EmployerIcon name="close" />
          </button>
        </div>
      )}
    </main>
  )
}
