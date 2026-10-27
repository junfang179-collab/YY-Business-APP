import type { ReactNode, RefObject } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Calendar03Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

/**
 * The "Select Date" sheet + its trigger label, shared by E-Attendance List and
 * History so both pages filter dates the exact same way.
 */

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]

/** "2026-11-02" → "Nov 2" */
export function shortDate(iso: string) {
  const [, month, day] = iso.split("-").map(Number)
  return `${MONTHS[month - 1]}${day}日`
}

/** Small wording for the toolbar trigger. */
export function dateRangeLabel(start: string, end: string) {
  if (start && end) return `${shortDate(start)} – ${shortDate(end)}`
  if (start) return `由 ${shortDate(start)}`
  if (end) return `至 ${shortDate(end)}`
  return "所有日期"
}

export function DateRangeDialog({
  dialogRef,
  title = "選擇日期",
  start,
  end,
  onStart,
  onEnd,
  onReset,
  onClose,
}: {
  dialogRef: RefObject<HTMLDialogElement | null>
  /** 标题可换（History 的 Summary 按钮复用同一张弹窗） */
  title?: string
  start: string
  end: string
  onStart: (value: string) => void
  onEnd: (value: string) => void
  onReset: () => void
  onClose: () => void
}) {
  return (
    <dialog
      ref={dialogRef}
      tabIndex={-1}
      className="attendance-dialog e-date-dialog"
      aria-labelledby="e-date-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="attendance-dialog-content">
        <button className="attendance-dialog-close" aria-label="關閉" onClick={onClose}>
          <HugeiconsIcon icon={Cancel01Icon} size={26} strokeWidth={2} color="currentColor" />
        </button>
        <h2 id="e-date-title">{title}</h2>

        <div className="e-date-fields">
          <DateField label="開始日期" value={start} onChange={onStart} max={end || undefined} />
          <DateField label="結束日期" value={end} onChange={onEnd} min={start || undefined} />
        </div>

        <div className="attendance-prompt-actions">
          <button className="attendance-soft-button" onClick={onReset}>
            
            重設
          </button>
          <button className="attendance-blue-button" onClick={onClose}>
            
            套用
          </button>
        </div>
      </div>
    </dialog>
  )
}

function DateField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: string
  min?: string
  max?: string
  onChange: (value: string) => void
}): ReactNode {
  const year = value ? value.slice(0, 4) : ""
  return (
    <label className="e-date-field">
      <span className="e-date-label">{label}</span>
      <span className={`e-date-value${value ? " is-set" : ""}`}>
        {value ? `${shortDate(value)}, ${year}` : "選擇日期"}
        <HugeiconsIcon icon={Calendar03Icon} size={20} strokeWidth={1.9} color="currentColor" />
      </span>
      {/* 透明覆盖在整行之上：点击任意位置都会唤起原生日期选择器 */}
      <input
        className="e-date-native"
        type="date"
        aria-label={label}
        value={value}
        min={min}
        max={max}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  )
}
