import { useEffect, useRef, useState, type FormEvent } from "react"

import { HugeiconsIcon } from "@hugeicons/react"

import {
  ArrowLeft01Icon,
  AlertCircleIcon,
  ArrowRight01Icon,
  Building02Icon,
  Cancel01Icon,
  Clock01Icon,
  MinusSignIcon,
  Notebook01Icon,
  PlusSignIcon,
  SignatureIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import { AttendanceDialog, TimeSheet } from "./AttendancePage"

import { SelectMenu } from "./SelectMenu"

import BackIcon from "../BackIcon"
import "../attendance.css"

import "../labour.css"

/** 单子按天开：先选日期，再填班次人手 */

const BASE_DAY = new Date(2026, 9, 22)

const JOB_TITLES = [
  "宴會服務員",

  "宴會部長",

  "餐飲服務員",

  "廚房幫工",

  "房務員",

  "Steward",
]

function dayLabel(offset: number) {
  const day = new Date(BASE_DAY)

  day.setDate(day.getDate() + offset)

  const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"]

  return `${day.getFullYear()}年${day.getMonth() + 1}月${day.getDate()}日（週${
    WEEKDAYS[day.getDay()]
  }）`
}

/** 一周的日期范围，给左栏顶部用 */

function rangeLabel(offset: number) {
  const start = new Date(BASE_DAY)

  start.setDate(start.getDate() + offset)

  const end = new Date(start)

  end.setDate(end.getDate() + 6)

  const fmt = (date: Date) => `${date.getMonth() + 1}月${date.getDate()}日`

  return `${fmt(start)} – ${fmt(end)}`
}

/** 提交后留在本页的清单：一条需求一行，状态先固定为 Draft */

type Requisition = {
  id: number

  date: string

  start: string

  end: string

  position: string

  headcount: number

  department: string

  status: "草稿" | "已提交"
}

export default function LabourRequisitionPage({
  department,

  onBack,

  /** 上一步选好的部门，带到单子上 */
}: {
  department: string

  onBack: () => void
}) {
  const [weekStart, setWeekStart] = useState(0)

  const [selected, setSelected] = useState(0)

  const [startTime, setStartTime] = useState("")

  const [endTime, setEndTime] = useState("")

  const [jobTitle, setJobTitle] = useState("")

  const [headcount, setHeadcount] = useState("")

  const [sheet, setSheet] = useState<"start" | "end" | null>(null)

  const [requests, setRequests] = useState<Requisition[]>([])
  const [view, setView] = useState<"form" | "list" | "detail" | "confirm">(
    "form",
  )
  const [detail, setDetail] = useState<Requisition | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [submitOpen, setSubmitOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [remarks, setRemarks] = useState("")
  const [signed, setSigned] = useState(false)
  const signature = useRef<HTMLCanvasElement>(null)
  const drawing = useRef(false)

  const [notice, setNotice] = useState<{
    text: string
    tone: "success" | "error"
  } | null>(null)

  const day = dayLabel(weekStart + selected)

  function stepHeadcount(delta: number) {
    setHeadcount(String(Math.max(1, (Number(headcount) || 0) + delta)))
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!startTime || !endTime || !jobTitle || !headcount) {
      setNotice({
        text: "提交前請填寫所有欄位。",

        tone: "error",
      })

      return
    }

    setRequests((current) => [
      ...current,

      {
        id: Date.now(),

        date: day,

        start: startTime,

        end: endTime,

        position: jobTitle,

        headcount: Number(headcount),

        department: department || "Hong Ye Group",

        status: "草稿",
      },
    ])

    setNotice({
      text: `人手申請已儲存為 ${department || "Hong Ye Group"} 於 ${day} 的草稿。`,

      tone: "success",
    })

    setView("list")
  }

  /** Add More：清空表单，回到同一页继续开单 */

  function addMore() {
    setStartTime("")
    setEndTime("")
    setJobTitle("")
    setHeadcount("")
    setNotice(null)
    setView("form")
  }

  /** 确认弹窗点 Yes：先去确认页写备注、签名 */
  function confirmSubmit() {
    setConfirmOpen(false)
    setView("confirm")
  }

  /** 确认页点 Confirm 的 Yes：提交后回清单，并用成功弹窗替代 toast */
  function finalize() {
    setRequests((current) =>
      current.map((request) => ({ ...request, status: "已提交" })),
    )
    setRemarks("")
    setSigned(false)
    setView("list")
    setSuccessOpen(true)
  }

  /** 签名板尺寸按设备像素比铺开，避免笔画发虚 */
  useEffect(() => {
    const canvas = signature.current
    if (view !== "confirm" || !canvas) return
    const ratio = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = Math.max(1, Math.round(rect.width * ratio))
    canvas.height = Math.max(1, Math.round(rect.height * ratio))
    canvas.getContext("2d")?.scale(ratio, ratio)
  }, [view])

  function signaturePoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    return { x: event.clientX - rect.left, y: event.clientY - rect.top }
  }

  function startSignature(event: React.PointerEvent<HTMLCanvasElement>) {
    const context = event.currentTarget.getContext("2d")
    if (!context) return
    event.currentTarget.setPointerCapture(event.pointerId)
    drawing.current = true
    setSigned(true)
    const point = signaturePoint(event)
    context.beginPath()
    context.moveTo(point.x, point.y)
    context.lineWidth = 2.6
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = "#15619b"
  }

  function moveSignature(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawing.current) return
    const context = event.currentTarget.getContext("2d")
    if (!context) return
    const point = signaturePoint(event)
    context.lineTo(point.x, point.y)
    context.stroke()
  }

  function endSignature() {
    drawing.current = false
  }

  function clearSignature() {
    const canvas = signature.current
    const context = canvas?.getContext("2d")
    if (!canvas || !context) return
    context.clearRect(0, 0, canvas.width, canvas.height)
    setSigned(false)
  }

  /** 点清单某一行：把这条单已填的内容以只读方式摊开 */
  function openDetail(request: Requisition) {
    setDetail(request)
    setView("detail")
  }

  function backToList() {
    setDetail(null)
    setView("list")
  }

  return (
    <main className="attendance-page lr-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button
              className="attendance-back"
              onClick={() => {
                if (view === "confirm") {
                  setView("list")
                  return
                }
                onBack()
              }}
              aria-label={
                view === "confirm"
                  ? "返回申請列表"
                  : "返回工作台"
              }
            >
              <BackIcon />
            </button>
          </nav>
          <h1>
            {view === "confirm"
              ? "人手申請確認"
              : "人手申請表"}
          </h1>
        </div>

        {view === "confirm" && (
          <div className="attendance-toolbar">
            <button
              type="button"
              className="attendance-blue-button attendance-confirm"
              onClick={() => setSubmitOpen(true)}
            >
              <HugeiconsIcon
                icon={Tick02Icon}
                size={24}
                strokeWidth={2.2}
                color="currentColor"
              />
              
              確認
            </button>
          </div>
        )}
      </header>

      <div
        className={`lr-layout${view === "confirm" ? " lr-layout-confirm" : ""}`}
      >
        {view !== "confirm" && (
          <aside className="lr-dates" aria-label="選擇日期">
            <div className="lr-week">
              <button
                className="lr-week-button"
                aria-label="上週"
                onClick={() => {
                  setWeekStart(weekStart - 7)
                  setSelected(0)
                }}
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  size={22}
                  strokeWidth={2.2}
                  color="currentColor"
                />
              </button>
              <div className="lr-week-label">
                <span>週</span>
                <strong>{rangeLabel(weekStart)}</strong>
              </div>
              <button
                className="lr-week-button"
                aria-label="下週"
                onClick={() => {
                  setWeekStart(weekStart + 7)
                  setSelected(0)
                }}
              >
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={22}
                  strokeWidth={2.2}
                  color="currentColor"
                />
              </button>
            </div>

            <ul className="lr-date-list">
              {[0, 1, 2, 3, 4, 5, 6].map((index) => (
                <li key={weekStart + index}>
                  <button
                    className={`lr-date${
                      selected === index ? " is-active" : ""
                    }`}
                    aria-pressed={selected === index}
                    onClick={() => setSelected(index)}
                  >
                    <span>{dayLabel(weekStart + index)}</span>
                    <span className="lr-date-arrow" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        )}

        <section
          className="lr-panel"
          aria-label={
            view === "confirm"
              ? "人手申請確認"
              : view === "list"
                ? "人手申請"
                : view === "detail"
                  ? "人手申請詳情"
                  : "人手申請表"
          }
        >
          {view === "confirm" ? (
            <div className="lr-confirm-main">
              <div className="lr-confirm-card">
                <div className="lr-confirm-head">
                  <span className="lr-slot-icon">
                    <HugeiconsIcon
                      icon={Notebook01Icon}
                      size={22}
                      strokeWidth={1.8}
                      color="currentColor"
                    />
                  </span>
                  <span className="lr-confirm-title">備註</span>
                </div>
                <textarea
                  className="lr-confirm-textarea"
                  aria-label="備註"
                  placeholder="向中介新增備註…"
                  value={remarks}
                  onChange={(event) => setRemarks(event.target.value)}
                />
              </div>

              <div className="lr-confirm-card">
                <div className="lr-confirm-head">
                  <span className="lr-slot-icon">
                    <HugeiconsIcon
                      icon={SignatureIcon}
                      size={22}
                      strokeWidth={1.8}
                      color="currentColor"
                    />
                  </span>
                  <span className="lr-confirm-title">在此簽名</span>
                </div>
                <div className="lr-confirm-pad">
                  <canvas
                    ref={signature}
                    onPointerDown={startSignature}
                    onPointerMove={moveSignature}
                    onPointerUp={endSignature}
                    onPointerLeave={endSignature}
                    onPointerCancel={endSignature}
                  />
                  {!signed && (
                    <span className="lr-confirm-hint" aria-hidden="true">
                      
                      簽名
                    </span>
                  )}
                  <button
                    type="button"
                    className="lr-confirm-clear"
                    onClick={clearSignature}
                  >
                    
                    清除
                  </button>
                </div>
              </div>
            </div>
          ) : view === "list" ? (
            <div className="lr-list">
              <div className="lr-list-head" aria-hidden="true">
                <span>日期</span>
                <span>班次時間</span>
                <span>職位</span>
                <span>員工</span>
                <span>狀態</span>
                <span />
              </div>
              <ul className="lr-list-rows">
                {requests.map((request) => (
                  <li key={request.id}>
                    <button
                      type="button"
                      className="lr-list-row is-clickable"
                      aria-label={`查看 ${request.date} 的人力申請`}
                      onClick={() => openDetail(request)}
                    >
                      <span className="lr-list-date">{request.date}</span>
                      <span className="lr-list-time">
                        {request.start}–{request.end}
                      </span>
                      <span className="lr-list-position">
                        {request.position}
                      </span>
                      <span
                        className="lr-list-staff"
                        aria-label={`${request.headcount} staff`}
                      >
                        {request.headcount}
                      </span>
                      <span
                        className={`lr-list-status${
                          request.status === "已提交" ? " is-submitted" : ""
                        }`}
                      >
                        {request.status}
                      </span>
                      <span className="lr-list-caret" aria-hidden="true" />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="lr-actions lr-list-actions">
                <button type="button" className="lr-cancel" onClick={addMore}>
                  
                  新增更多
                </button>
                <button
                  type="button"
                  className="lr-submit"
                  onClick={() => setConfirmOpen(true)}
                >
                  
                  提交
                </button>
              </div>
            </div>
          ) : view === "detail" && detail ? (
            <div className="lr-form">
              <div className="lr-form-main">
                <div className="lr-detail-head">
                  <span className="lr-detail-date">{detail.date}</span>
                  <span
                    className={`lr-list-status${
                      detail.status === "已提交" ? " is-submitted" : ""
                    }`}
                  >
                    {detail.status}
                  </span>
                </div>

                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">班次時間</span>
                  <div className="lr-time-row">
                    <div className="lr-slot">
                      <span className="lr-slot-icon">
                        <HugeiconsIcon
                          icon={Clock01Icon}
                          size={22}
                          strokeWidth={1.8}
                          color="currentColor"
                        />
                      </span>
                      <span className="lr-slot-body">
                        <span className="lr-slot-label">開始</span>
                        <strong>{detail.start}</strong>
                      </span>
                    </div>

                    <span className="lr-slot-sep" aria-hidden="true" />

                    <div className="lr-slot">
                      <span className="lr-slot-icon">
                        <HugeiconsIcon
                          icon={Clock01Icon}
                          size={22}
                          strokeWidth={1.8}
                          color="currentColor"
                        />
                      </span>
                      <span className="lr-slot-body">
                        <span className="lr-slot-label">結束</span>
                        <strong>{detail.end}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lr-fieldset">
                  <span className="lr-label">職位</span>
                  <div className="lr-readonly">
                    <strong>{detail.position}</strong>
                  </div>
                </div>

                <div className="lr-fieldset">
                  <span className="lr-label">需要人手數目</span>
                  <div className="lr-readonly">
                    <strong>{detail.headcount}  員工</strong>
                  </div>
                </div>

                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">部門</span>
                  <div className="lr-readonly">
                    <span className="lr-readonly-icon">
                      <HugeiconsIcon
                        icon={Building02Icon}
                        size={20}
                        strokeWidth={1.8}
                        color="currentColor"
                      />
                    </span>
                    <strong>{detail.department}</strong>
                  </div>
                </div>

                <div className="lr-actions">
                  <button
                    type="button"
                    className="lr-cancel"
                    onClick={backToList}
                  >
                    
                    返回
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form className="lr-form" onSubmit={submit}>
              <div className="lr-form-main">
                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">班次時間</span>
                  <div className="lr-time-row">
                    <button
                      type="button"
                      className={`lr-slot${startTime ? "" : " is-empty"}`}
                      aria-label={`開始時間：${startTime || "未設定"}`}
                      onClick={() => setSheet("start")}
                    >
                      <span className="lr-slot-icon">
                        <HugeiconsIcon
                          icon={Clock01Icon}
                          size={22}
                          strokeWidth={1.8}
                          color="currentColor"
                        />
                      </span>
                      <span className="lr-slot-body">
                        <span className="lr-slot-label">開始</span>
                        <strong>{startTime || "--:--"}</strong>
                      </span>
                    </button>

                    <span className="lr-slot-sep" aria-hidden="true" />

                    <button
                      type="button"
                      className={`lr-slot${endTime ? "" : " is-empty"}`}
                      aria-label={`結束時間：${endTime || "未設定"}`}
                      onClick={() => setSheet("end")}
                    >
                      <span className="lr-slot-icon">
                        <HugeiconsIcon
                          icon={Clock01Icon}
                          size={22}
                          strokeWidth={1.8}
                          color="currentColor"
                        />
                      </span>
                      <span className="lr-slot-body">
                        <span className="lr-slot-label">結束</span>
                        <strong>{endTime || "--:--"}</strong>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="lr-fieldset">
                  <span className="lr-label">職位</span>
                  <SelectMenu
                    ariaLabel="職位"
                    value={jobTitle}
                    placeholder="選擇職位"
                    options={JOB_TITLES}
                    onChange={setJobTitle}
                    className="lr-select"
                  />
                </div>

                <div className="lr-fieldset">
                  <label className="lr-label" htmlFor="lr-staff">
                    
                    需要人手數目
                  </label>
                  <div className="lr-stepper">
                    <button
                      type="button"
                      className="lr-step"
                      aria-label="移除一位員工"
                      onClick={() => stepHeadcount(-1)}
                    >
                      <HugeiconsIcon
                        icon={MinusSignIcon}
                        size={22}
                        strokeWidth={2.2}
                        color="currentColor"
                      />
                    </button>
                    <input
                      id="lr-staff"
                      className="lr-step-input"
                      inputMode="numeric"
                      value={headcount}
                      placeholder="0"
                      onChange={(event) =>
                        setHeadcount(event.target.value.replace(/[^\d]/g, ""))
                      }
                    />
                    <span className="lr-step-unit">員工</span>
                    <button
                      type="button"
                      className="lr-step"
                      aria-label="新增一位員工"
                      onClick={() => stepHeadcount(1)}
                    >
                      <HugeiconsIcon
                        icon={PlusSignIcon}
                        size={22}
                        strokeWidth={2.2}
                        color="currentColor"
                      />
                    </button>
                  </div>
                </div>
                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">部門</span>
                  <div className="lr-readonly">
                    <span className="lr-readonly-icon">
                      <HugeiconsIcon
                        icon={Building02Icon}
                        size={20}
                        strokeWidth={1.8}
                        color="currentColor"
                      />
                    </span>
                    <strong>{department || "未選擇"}</strong>
                  </div>
                </div>

                <div className="lr-actions">
                  <button type="button" className="lr-cancel" onClick={onBack}>
                    
                    取消
                  </button>
                  <button type="submit" className="lr-submit">
                    
                    提交申請
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </div>

      {sheet && (
        <TimeSheet
          title={sheet === "start" ? "開始時間" : "結束時間"}
          initial={
            sheet === "start" ? startTime || "09:00" : endTime || "18:00"
          }
          note="需要中介安排人手頂替的班次。"
          onCancel={() => setSheet(null)}
          onConfirm={(value) => {
            if (sheet === "start") setStartTime(value)
            else setEndTime(value)

            setSheet(null)
          }}
        />
      )}

      {confirmOpen && (
        <AttendanceDialog
          title="提交申請"
          onClose={() => setConfirmOpen(false)}
        >
          <p className="attendance-prompt-text is-compact">
            
            確定提交這份人力申請？
          </p>
          <div className="attendance-prompt-actions">
            <button
              className="attendance-soft-button"
              onClick={() => setConfirmOpen(false)}
            >
              
              否
            </button>
            <button className="attendance-blue-button" onClick={confirmSubmit}>
              
              是
            </button>
          </div>
        </AttendanceDialog>
      )}

      {submitOpen && (
        <AttendanceDialog
          title="提交申請"
          onClose={() => setSubmitOpen(false)}
        >
          <p className="attendance-prompt-text is-compact">
            
            確定提交所有人力申請？
          </p>
          <div className="attendance-prompt-actions">
            <button
              className="attendance-soft-button"
              onClick={() => setSubmitOpen(false)}
            >
              
              否
            </button>
            <button
              className="attendance-blue-button"
              onClick={() => {
                setSubmitOpen(false)
                finalize()
              }}
            >
              
              是
            </button>
          </div>
        </AttendanceDialog>
      )}

      {successOpen && (
        <AttendanceDialog
          title="成功"
          onClose={() => setSuccessOpen(false)}
        >
          <p className="attendance-prompt-text">
            
            感謝你的申請。考勤列表將發送至 YY Part Time jobs，我們會盡快聯絡你。
          </p>
        </AttendanceDialog>
      )}

      {notice && (
        <div
          className={`attendance-toast${
            notice.tone === "error" ? " is-error" : ""
          }`}
          role="status"
        >
          <HugeiconsIcon
            icon={notice.tone === "error" ? AlertCircleIcon : Tick02Icon}
            size={26}
            strokeWidth={2}
            color="currentColor"
          />
          <span>{notice.text}</span>
          <button
            aria-label="關閉通知"
            onClick={() => setNotice(null)}
          >
            <HugeiconsIcon
              icon={Cancel01Icon}
              size={22}
              strokeWidth={2}
              color="currentColor"
            />
          </button>
        </div>
      )}
    </main>
  )
}
