import { useEffect, useRef, useState, type ReactNode } from "react"
import { SelectMenu } from "./SelectMenu"
import "../employer.css"

type ModuleId = "requisition" | "attendance" | "list" | "history"
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
    id: "requisition",
    title: "Labour Requisition",
    description: "Create and manage manpower requests.",
    image: "/assets/icon-requisition.png",
  },
  {
    id: "attendance",
    title: "Sign In / Sign Out",
    description: "Review today’s staff attendance.",
    image: "/assets/icon-attendance.png",
  },
  {
    id: "list",
    title: "E-Attendance List",
    description: "Browse team attendance records.",
    image: "/assets/icon-list.png",
  },
  {
    id: "history",
    title: "History",
    description: "View past attendance activity.",
    image: "/assets/icon-history.png",
  },
]

/** 建单前必须先落到一个部门：与 Add Staff 表单用的是同一份清单 */
const DEPARTMENTS = ["Banquet", "F&B Service", "Kitchen", "Housekeeping"]

export default function EmployerPage({
  onBack,
  onBillingMethod,
  onAttendanceList,
  onHistory,
  onRequisition,
  onClothing,
}: {
  onBack: () => void
  /** Sign In / Sign Out：先选计费方式（Per Hour / Per Room） */
  onBillingMethod: () => void
  /** E-Attendance List：直接进列表 */
  onAttendanceList: () => void
  onHistory: () => void
  /** 选完部门进建单页 */
  onRequisition: (department: string) => void
  /** 右上角服装图标 → Staff Clothing 列表 */
  onClothing: () => void
}) {
  const [notice, setNotice] = useState("")
  /** Labour Requisition：先弹窗选部门，再往下走建单流程 */
  const [deptOpen, setDeptOpen] = useState(false)
  const [department, setDepartment] = useState("")
  const deptDialog = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!deptOpen) return
    const node = deptDialog.current
    if (!node) return
    node.showModal()
    node.focus()
  }, [deptOpen])

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
    if (id === "requisition") {
      setDeptOpen(true)
      return
    }
    setNotice(`${title} will be available soon.`)
  }

  return (
    <main className="employer-page">
      <div className="employer-landscape" aria-hidden="true" />
      <header className="employer-header">
        <button
          className="employer-back"
          onClick={onBack}
          aria-label="Back to Department"
        >
          <EmployerIcon name="back" />
        </button>
        <div>
          <p>Hong Ye Group</p>
          <h1>E-Attendance</h1>
        </div>
        <div className="employer-size-control">
          <button
            className="employer-size-button"
            aria-label="Open Staff Clothing"
            onClick={onClothing}
          >
            <EmployerIcon name="shirt" />
          </button>
        </div>
      </header>
      <section
        className="employer-content"
        aria-labelledby="employer-menu-title"
      >
        <div className="employer-heading">
          <p>Workspace</p>
          <h2 id="employer-menu-title">What would you like to manage?</h2>
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
            aria-label="Dismiss notification"
            onClick={() => setNotice("")}
          >
            <EmployerIcon name="close" />
          </button>
        </div>
      )}
      {/* Labour Requisition 的第一步：先选部门。外壳沿用签名板那套（左 X、中标题、右勾） */}
      {deptOpen && (
        <dialog
          ref={deptDialog}
          className="employer-dept-dialog"
          aria-labelledby="employer-dept-title"
          onCancel={() => setDeptOpen(false)}
          onClick={(event) => {
            if (event.target === event.currentTarget) setDeptOpen(false)
          }}
        >
          <header className="employer-dept-head">
            <button
              className="employer-dept-close"
              aria-label="Close"
              onClick={() => setDeptOpen(false)}
            >
              <EmployerIcon name="close" />
            </button>
            <strong id="employer-dept-title">Select</strong>
            <button
              className="employer-dept-confirm"
              aria-label="Confirm department"
              disabled={!department}
              onClick={() => {
                const picked = department
                setDeptOpen(false)
                setDepartment("")
                onRequisition(picked)
              }}
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
          <div className="employer-dept-body">
            <p>Please select the department you want to create the request.</p>
            <div className={`employer-dept-select${department ? " is-set" : ""}`}>
              <SelectMenu
                ariaLabel="Select the Department"
                value={department}
                placeholder="Select the Department"
                options={DEPARTMENTS}
                onChange={setDepartment}
              />
            </div>
          </div>
        </dialog>
      )}
    </main>
  )
}
