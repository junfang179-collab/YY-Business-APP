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

import BackIcon from "./BackIcon"
import "./attendance.css"

import "./labour.css"

/** 单子按天开：先选日期，再填班次人手 */

const BASE_DAY = new Date(2026, 9, 22)

const JOB_TITLES = [
  "Banquet Server",

  "Banquet Captain",

  "F&B Service Crew",

  "Kitchen Helper",

  "Housekeeping Attendant",

  "Steward",
]

function dayLabel(offset: number) {
  const day = new Date(BASE_DAY)

  day.setDate(day.getDate() + offset)

  return day.toLocaleDateString("en-US", {
    weekday: "short",

    month: "short",

    day: "numeric",

    year: "numeric",
  })
}

/** 一周的日期范围，给左栏顶部用 */

function rangeLabel(offset: number) {
  const start = new Date(BASE_DAY)

  start.setDate(start.getDate() + offset)

  const end = new Date(start)

  end.setDate(end.getDate() + 6)

  const fmt = (date: Date) =>
    date.toLocaleDateString("en-US", { month: "short", day: "numeric" })

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

  status: "Draft" | "Submitted"
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
        text: "Please complete every field before submitting.",

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

        status: "Draft",
      },
    ])

    setNotice({
      text: `Labour requisition saved as draft for ${department || "Hong Ye Group"} on ${day}.`,

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
      current.map((request) => ({ ...request, status: "Submitted" })),
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
          <nav className="attendance-navigation" aria-label="Page navigation">
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
                  ? "Back to requisition list"
                  : "Back to workspace"
              }
            >
              <BackIcon />
            </button>
          </nav>
          <h1>
            {view === "confirm"
              ? "Labour Requisition Confirmation"
              : "Labour Requisition Form"}
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
              Confirm
            </button>
          </div>
        )}
      </header>

      <div
        className={`lr-layout${view === "confirm" ? " lr-layout-confirm" : ""}`}
      >
        {view !== "confirm" && (
          <aside className="lr-dates" aria-label="Choose a date">
            <div className="lr-week">
              <button
                className="lr-week-button"
                aria-label="Previous week"
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
                <span>Week</span>
                <strong>{rangeLabel(weekStart)}</strong>
              </div>
              <button
                className="lr-week-button"
                aria-label="Next week"
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
              ? "Labour requisition confirmation"
              : view === "list"
                ? "Labour requisitions"
                : view === "detail"
                  ? "Labour requisition details"
                  : "Labour requisition form"
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
                  <span className="lr-confirm-title">Remarks</span>
                </div>
                <textarea
                  className="lr-confirm-textarea"
                  aria-label="Remarks"
                  placeholder="Add any notes for the agency…"
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
                  <span className="lr-confirm-title">Sign Here</span>
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
                      Signature
                    </span>
                  )}
                  <button
                    type="button"
                    className="lr-confirm-clear"
                    onClick={clearSignature}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          ) : view === "list" ? (
            <div className="lr-list">
              <div className="lr-list-head" aria-hidden="true">
                <span>Date</span>
                <span>Shift time</span>
                <span>Position</span>
                <span>Staff</span>
                <span>Status</span>
                <span />
              </div>
              <ul className="lr-list-rows">
                {requests.map((request) => (
                  <li key={request.id}>
                    <button
                      type="button"
                      className="lr-list-row is-clickable"
                      aria-label={`View the labour requisition for ${request.date}`}
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
                          request.status === "Submitted" ? " is-submitted" : ""
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
                  Add More
                </button>
                <button
                  type="button"
                  className="lr-submit"
                  onClick={() => setConfirmOpen(true)}
                >
                  Submit
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
                      detail.status === "Submitted" ? " is-submitted" : ""
                    }`}
                  >
                    {detail.status}
                  </span>
                </div>

                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">Shift time</span>
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
                        <span className="lr-slot-label">Start</span>
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
                        <span className="lr-slot-label">End</span>
                        <strong>{detail.end}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lr-fieldset">
                  <span className="lr-label">Position</span>
                  <div className="lr-readonly">
                    <strong>{detail.position}</strong>
                  </div>
                </div>

                <div className="lr-fieldset">
                  <span className="lr-label">No. of staff needed</span>
                  <div className="lr-readonly">
                    <strong>{detail.headcount} staff</strong>
                  </div>
                </div>

                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">Department</span>
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
                    Back
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form className="lr-form" onSubmit={submit}>
              <div className="lr-form-main">
                <div className="lr-fieldset lr-fieldset-wide">
                  <span className="lr-label">Shift time</span>
                  <div className="lr-time-row">
                    <button
                      type="button"
                      className={`lr-slot${startTime ? "" : " is-empty"}`}
                      aria-label={`Start time, ${startTime || "not set"}`}
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
                        <span className="lr-slot-label">Start</span>
                        <strong>{startTime || "--:--"}</strong>
                      </span>
                    </button>

                    <span className="lr-slot-sep" aria-hidden="true" />

                    <button
                      type="button"
                      className={`lr-slot${endTime ? "" : " is-empty"}`}
                      aria-label={`End time, ${endTime || "not set"}`}
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
                        <span className="lr-slot-label">End</span>
                        <strong>{endTime || "--:--"}</strong>
                      </span>
                    </button>
                  </div>
                </div>

                <div className="lr-fieldset">
                  <span className="lr-label">Position</span>
                  <SelectMenu
                    ariaLabel="Position"
                    value={jobTitle}
                    placeholder="Select the position"
                    options={JOB_TITLES}
                    onChange={setJobTitle}
                    className="lr-select"
                  />
                </div>

                <div className="lr-fieldset">
                  <label className="lr-label" htmlFor="lr-staff">
                    No. of staff needed
                  </label>
                  <div className="lr-stepper">
                    <button
                      type="button"
                      className="lr-step"
                      aria-label="Remove one staff member"
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
                    <span className="lr-step-unit">staff</span>
                    <button
                      type="button"
                      className="lr-step"
                      aria-label="Add one staff member"
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
                  <span className="lr-label">Department</span>
                  <div className="lr-readonly">
                    <span className="lr-readonly-icon">
                      <HugeiconsIcon
                        icon={Building02Icon}
                        size={20}
                        strokeWidth={1.8}
                        color="currentColor"
                      />
                    </span>
                    <strong>{department || "Not selected"}</strong>
                  </div>
                </div>

                <div className="lr-actions">
                  <button type="button" className="lr-cancel" onClick={onBack}>
                    Cancel
                  </button>
                  <button type="submit" className="lr-submit">
                    Submit request
                  </button>
                </div>
              </div>
            </form>
          )}
        </section>
      </div>

      {sheet && (
        <TimeSheet
          title={sheet === "start" ? "Start Time" : "End Time"}
          initial={
            sheet === "start" ? startTime || "09:00" : endTime || "18:00"
          }
          note="The shift you need the requested staff to cover."
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
          title="Submit requisition"
          onClose={() => setConfirmOpen(false)}
        >
          <p className="attendance-prompt-text is-compact">
            Are you sure you want to submit the labour requisition?
          </p>
          <div className="attendance-prompt-actions">
            <button
              className="attendance-soft-button"
              onClick={() => setConfirmOpen(false)}
            >
              No
            </button>
            <button className="attendance-blue-button" onClick={confirmSubmit}>
              Yes
            </button>
          </div>
        </AttendanceDialog>
      )}

      {submitOpen && (
        <AttendanceDialog
          title="Submit requisition"
          onClose={() => setSubmitOpen(false)}
        >
          <p className="attendance-prompt-text is-compact">
            Are you sure you want to submit all labour requisitions?
          </p>
          <div className="attendance-prompt-actions">
            <button
              className="attendance-soft-button"
              onClick={() => setSubmitOpen(false)}
            >
              No
            </button>
            <button
              className="attendance-blue-button"
              onClick={() => {
                setSubmitOpen(false)
                finalize()
              }}
            >
              Yes
            </button>
          </div>
        </AttendanceDialog>
      )}

      {successOpen && (
        <AttendanceDialog
          title="Success"
          onClose={() => setSuccessOpen(false)}
        >
          <p className="attendance-prompt-text">
            Thank you for your requisition. The attendance list will be sent to
            YY Part Time jobs. We will contact you soon.
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
            aria-label="Dismiss notification"
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
