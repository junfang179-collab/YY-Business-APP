import { useState } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"
import "../customer-feedback.css"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon } from "@hugeicons/core-free-icons"
import { SelectMenu } from "./SelectMenu"
import { TimeSheet } from "./AttendancePage"
import { readEditJobTargets, setEditJobResult } from "./editJobStore"

const DEPARTMENTS = ["宴會部", "餐飲服務", "廚房部", "房務部"]
const JOBS = ["宴會服務員", "樓面接待", "廚房助理", "清潔員", "傳菜員"]

/**
 * 批量編輯工作：把进来时带过来的那批人一次改掉部門、職位與班次時間。
 * 两个入口共用：簽到 / 簽退（9月24日）的批量編輯欄（勾選的人）、
 * 電子考勤列表（11月2日）標題右側的「編輯工作」（整份名單）。
 * 四个字段都可留空 —— 留空表示该项不动，只提交填了的。
 * 版式与「客戶意見」一致：返回栏 + 一张白卡，卡里 label + 输入框，右下提交。
 */
export default function EditJobPage({ onBack }: { onBack: () => void }) {
  const [targets] = useState(readEditJobTargets)
  const [department, setDepartment] = useState("")
  const [jobTitle, setJobTitle] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  /* 结束时间落到哪一天：空 = 今天，否则是 YYYY-MM-DD */
  const [endDate, setEndDate] = useState("")
  /* 单价：选了工作才出现，可以留空（留空表示不改时薪） */
  const [price, setPrice] = useState("")
  const [picking, setPicking] = useState<"start" | "end" | null>(null)
  const canSubmit = Boolean(department || jobTitle || start || end || price)

  const today = (() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  })()
  const endText = end
    ? `${endDate && endDate !== today ? "明天" : "今天"} ${end}`
    : ""

  function submit() {
    setEditJobResult({
      ids: targets,
      department: department || undefined,
      jobTitle: jobTitle || undefined,
      start: start || undefined,
      end: end || undefined,
      endDate: end ? endDate || today : undefined,
      price: price ? Number(price) : undefined,
    })
    onBack()
  }

  return (
    <main className="employer-page cf-page edit-job-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button
          type="button"
          className="notice-back"
          aria-label="返回"
          onClick={onBack}
        >
          <BackIcon />
        </button>
        <h1>編輯工作</h1>
        <span />
      </header>

      {/* 卡片高度按内容收，再在剩余空间里垂直居中：上下留白对称，不会像撑满时那样空一大片 */}
      <div className="edit-job-body">
        <section className="cf-panel edit-job-panel" aria-label="批量編輯工作">
          <form
            className="cf-form"
            onSubmit={(event) => {
              event.preventDefault()
              if (canSubmit) submit()
            }}
          >
            <div className="edit-job-grid">
              <div className="cf-field">
                <span className="cf-label">部門</span>
                <SelectMenu
                  ariaLabel="選擇部門"
                  className="edit-job-control"
                  value={department}
                  placeholder="選擇部門"
                  options={DEPARTMENTS}
                  onChange={setDepartment}
                />
              </div>

              <div className="cf-field">
                <span className="cf-label">工作</span>
                <SelectMenu
                  ariaLabel="選擇工作"
                  className="edit-job-control"
                  value={jobTitle}
                  placeholder="選擇工作"
                  options={JOBS}
                  onChange={(value) => {
                    setJobTitle(value)
                    /* 清空工作时单价字段会消失，顺手把值也清掉，避免提交出没有职位的单价 */
                    if (!value) setPrice("")
                  }}
                />
              </div>

              <div className="cf-field">
                <span className="cf-label">開始時間</span>
                <button
                  type="button"
                  className="edit-job-time"
                  onClick={() => setPicking("start")}
                  aria-label={
                    start ? `開始時間 ${start}，點擊修改` : "選擇開始時間"
                  }
                >
                  <span className={start ? undefined : "is-empty"}>
                    {start || "選擇時間"}
                  </span>
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={24}
                    strokeWidth={1.8}
                    color="currentColor"
                  />
                </button>
              </div>

              <div className="cf-field">
                <span className="cf-label">結束時間</span>
                <button
                  type="button"
                  className="edit-job-time"
                  onClick={() => setPicking("end")}
                  aria-label={
                    endText ? `結束時間 ${endText}，點擊修改` : "選擇結束時間"
                  }
                >
                  <span className={end ? undefined : "is-empty"}>
                    {endText || "選擇時間"}
                  </span>
                  <HugeiconsIcon
                    icon={Clock01Icon}
                    size={24}
                    strokeWidth={1.8}
                    color="currentColor"
                  />
                </button>
              </div>

              {/* 单价：选了工作才出现，跟上面字段同宽同高，留空表示不改时薪 */}
              {jobTitle && (
                <div className="cf-field edit-job-price">
                  <span className="cf-label">單價</span>
                  <div className="edit-job-money">
                    <span className="edit-job-money-symbol">$</span>
                    <input
                      className="edit-job-money-input"
                      inputMode="decimal"
                      value={price}
                      onChange={(event) =>
                        setPrice(
                          event.target.value.replace(/[^\d.]/g, "").slice(0, 7),
                        )
                      }
                      placeholder="0"
                      aria-label="每小時單價"
                    />
                    <span className="edit-job-money-unit">/ 小時</span>
                  </div>
                </div>
              )}
            </div>

            <div className="cf-actions">
              <button type="submit" className="cf-submit" disabled={!canSubmit}>
                <span>提交</span>
              </button>
            </div>
          </form>
        </section>
      </div>

      {picking && (
        <TimeSheet
          title={picking === "start" ? "開始時間" : "結束時間"}
          withDate={picking === "end"}
          initialDate={picking === "end" && endDate ? endDate : undefined}
          initial={(picking === "start" ? start : end) || "09:00"}
          note=""
          onCancel={() => setPicking(null)}
          onConfirm={(value, date) => {
            if (picking === "start") setStart(value)
            else {
              setEnd(value)
              setEndDate(date ?? today)
            }
            setPicking(null)
          }}
        />
      )}
    </main>
  )
}
