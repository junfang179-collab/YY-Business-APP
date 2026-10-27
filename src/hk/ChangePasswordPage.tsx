import { useEffect, useRef, useState, type FormEvent } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"
import "../change-password.css"

/** 输入框左侧那枚锁，和表单控件同一套描边风格 */
function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4.2" y="10.4" width="15.6" height="9.8" rx="2.8" />
      <path d="M8.2 10.4V7.6a3.8 3.8 0 0 1 7.6 0v2.8" />
      <path d="M12 14.4v2.2" />
    </svg>
  )
}

/**
 * Change Password：信息结构参考稿是「返回 + 标题 + 三个密码框 + 底部确认」。
 * 视觉沿用 Customer Feedback 那套白卡 + 纯色主按钮，不用参考稿的拟物黄按钮。
 */
export default function ChangePasswordPage({ onBack }: { onBack: () => void }) {
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [done, setDone] = useState(false)
  const timer = useRef<number | null>(null)

  const mismatch = confirmPassword !== "" && confirmPassword !== newPassword
  const ready =
    oldPassword !== "" && newPassword.length >= 8 && confirmPassword === newPassword

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
    },
    [],
  )

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!ready) return
    setDone(true)
    timer.current = window.setTimeout(onBack, 1500)
  }

  const fields = [
    {
      id: "cp-old",
      label: "舊密碼",
      value: oldPassword,
      set: setOldPassword,
      hint: "",
    },
    {
      id: "cp-new",
      label: "新密碼",
      value: newPassword,
      set: setNewPassword,
      hint: newPassword !== "" && newPassword.length < 8 ? "至少使用 8 個字元。" : "",
    },
    {
      id: "cp-confirm",
      label: "確認密碼",
      value: confirmPassword,
      set: setConfirmPassword,
      hint: mismatch ? "兩次輸入的密碼不一致。" : "",
    },
  ]

  return (
    <main className="employer-page cp-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="返回" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>更改密碼</h1>
        <span />
      </header>

      <section className="cp-panel">
        {done ? (
          <div className="cp-done" role="status">
            <svg viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <circle cx="24" cy="24" r="21" fill="#e7f7ee" />
              <circle cx="24" cy="24" r="15.5" fill="#3ec46d" />
              <path
                d="m17 24.6 4.8 4.8 9.2-9.6"
                stroke="#fff"
                strokeWidth="3.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h2>密碼已更改</h2>
            <p>你的密碼已更新。</p>
          </div>
        ) : (
          <form className="cp-form" onSubmit={submit}>
            {fields.map((field) => (
              <label className="cp-field" key={field.id}>
                <span className="cp-label">{field.label}</span>
                <span className="cp-input-wrap">
                  <LockIcon />
                  <input
                    id={field.id}
                    type="password"
                    className="cp-input"
                    value={field.value}
                    onChange={(event) => field.set(event.target.value)}
                    placeholder={field.label}
                    aria-label={field.label}
                    autoComplete="new-password"
                  />
                </span>
                {field.hint && <span className="cp-hint">{field.hint}</span>}
              </label>
            ))}

            <button type="submit" className="cp-submit" disabled={!ready}>
              
              確認
            </button>
          </form>
        )}
      </section>
    </main>
  )
}
