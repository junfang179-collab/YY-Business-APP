import { useState } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"
import "../customer-feedback.css"
import { SelectMenu } from "./SelectMenu"
import {
  CANDIDATES,
  DEPARTMENTS,
  SHIFTS,
  maskNric,
  maskPhone,
  setPendingStaff,
  type Candidate,
} from "./addStaffStore"

/**
 * 添加新員工整页。两个入口共用：簽到 / 簽退（9月24日）与
 * 電子考勤列表（11月2日）右下角的「加人」。返回时按进来的来源原路回去
 * （来源由 `setAddStaffOrigin` 写入，`App.tsx` 的 onBack 读出来）。
 * 信息结构参考客户的旧系统：返回栏 + 一排筛选（部門 / 時間段 / 搜尋）
 * + 一张白卡，卡里是候选人列表，每行右侧一个「添加」。
 * 版式沿用「客戶意見 / 日誌」那套（玻璃圆返回 + 白卡）。
 */
export default function AddStaffPage({ onBack }: { onBack: () => void }) {
  const [department, setDepartment] = useState("全部部門")
  const [shift, setShift] = useState("全部時間段")
  const [query, setQuery] = useState("")
  /* 已点过添加的人：本页内不再可点，返回时一并带去考勤页 */
  const [picked, setPicked] = useState<Candidate[]>([])

  const keyword = query.trim().toLowerCase()
  const visible = CANDIDATES.filter((person) => {
    if (department !== "全部部門" && person.department !== department) return false
    if (shift !== "全部時間段" && `${person.start} – ${person.end}` !== shift) return false
    if (!keyword) return true
    return (
      person.nameZh.includes(keyword) ||
      person.nameEn.toLowerCase().includes(keyword) ||
      person.nric.toLowerCase().includes(keyword) ||
      person.phone.includes(keyword)
    )
  })

  function add(person: Candidate) {
    const next = [...picked, person]
    setPicked(next)
    setPendingStaff(next)
  }

  return (
    <main className="employer-page cf-page add-staff-page">
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
        <h1>添加新員工</h1>
        <span />
      </header>

      <section className="cf-panel add-staff-panel" aria-label="添加新員工">
        <div className="add-staff-toolbar">
          <SelectMenu
            ariaLabel="選擇部門"
            className="add-staff-filter"
            value={department}
            placeholder="全部部門"
            options={DEPARTMENTS}
            onChange={setDepartment}
          />
          <SelectMenu
            ariaLabel="選擇時間段"
            className="add-staff-filter"
            value={shift}
            placeholder="全部時間段"
            options={SHIFTS}
            onChange={setShift}
          />
          <div className="add-staff-search">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="手機號 / 身份證號 / 姓名"
              aria-label="搜尋手機號、身份證號或姓名"
            />
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <circle
                cx="8.8"
                cy="8.8"
                r="5.6"
                fill="none"
                stroke="#8fb2d2"
                strokeWidth="1.8"
              />
              <path
                d="m13.2 13.2 4 4"
                fill="none"
                stroke="#8fb2d2"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {visible.length === 0 ? (
          <div className="add-staff-empty">
            <svg viewBox="0 0 96 96" aria-hidden="true">
              <circle cx="48" cy="48" r="40" fill="#eaf4ff" />
              <circle
                cx="43"
                cy="43"
                r="15"
                fill="#fff"
                stroke="#a7c6e2"
                strokeWidth="3.4"
              />
              <path
                d="m54 54 12 12"
                fill="none"
                stroke="#a7c6e2"
                strokeWidth="4.2"
                strokeLinecap="round"
              />
            </svg>
            <h2>暫無記錄</h2>
            <p>試試更換部門或時間段，或換個搜尋關鍵字。</p>
          </div>
        ) : (
          <div className="add-staff-list">
            {visible.map((person) => {
              const isPicked = picked.some((item) => item.id === person.id)
              return (
                <div className="add-staff-row" key={person.id}>
                  <div className="add-staff-info">
                    <p className="add-staff-name">
                      {person.nameZh} {person.nameEn}
                    </p>
                    <p className="add-staff-meta">
                      <span>
                        身份證號：<b>{maskNric(person.nric)}</b>
                      </span>
                      <span>
                        手機號：<b>{maskPhone(person.phone)}</b>
                      </span>
                      <span>
                        性別：<b>{person.gender}</b>
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="add-staff-add"
                    disabled={isPicked}
                    onClick={() => add(person)}
                  >
                    {isPicked ? "已添加" : "添加"}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
