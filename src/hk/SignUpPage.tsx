import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  Building02Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  SmartPhone01Icon,
  SquareLock02Icon,
  Ticket01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import BackIcon from "../BackIcon"
import "../signup.css"

/* 业务目前只服务新加坡，区号只保留 +65；其余先注释掉，需要时放开即可 */
const dialCodes = [
  { code: "HK", dial: "+852", label: "中國香港" },
  { code: "SG", dial: "+65", label: "Singapore" },
]

function Checkbox({
  checked,
  onChange,
  children,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  children?: ReactNode
}) {
  return (
    <label className="checkbox-label">
      <span className="checkbox-control">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="checkbox-visual">
          {checked && (
            <svg viewBox="0 0 32 34" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m6 17 7 7L27 9" />
            </svg>
          )}
        </span>
      </span>
      {children && <span>{children}</span>}
    </label>
  )
}

function Field({
  icon,
  wide,
  children,
}: {
  icon: IconSvgElement
  wide?: boolean
  children: ReactNode
}) {
  return (
    <label className={`signup-field${wide ? " is-wide" : ""}`}>
      <HugeiconsIcon icon={icon} size={24} strokeWidth={1.6} color="currentColor" aria-hidden="true" />
      {children}
    </label>
  )
}

export default function SignUpPage({
  onBack,
  onLogin,
}: {
  onBack: () => void
  onLogin: () => void
}) {
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [dial, setDial] = useState(dialCodes[0])
  const [dialOpen, setDialOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [invite, setInvite] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const dialRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!dialRef.current?.contains(event.target as Node)) setDialOpen(false)
    }
    document.addEventListener("pointerdown", dismiss)
    return () => document.removeEventListener("pointerdown", dismiss)
  }, [])

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (password.length < 8) {
      setError("密碼至少需要 8 個字元。")
      return
    }
    if (password !== confirm) {
      setError("兩次輸入的密碼不一致。")
      return
    }
    if (!agreed) {
      setError("請先同意條款及細則。")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <main className="sign-in-page signup-page ipad-app">
      <div className="landscape" aria-hidden="true" />
      <button className="signup-back" onClick={onBack} aria-label="返回登入">
        <BackIcon />
      </button>

      <section className="signup-card" aria-labelledby="signup-heading">
        {done ? (
          <div className="signup-done" role="status">
            <span className="signup-done-icon">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={44} strokeWidth={1.6} color="currentColor" />
            </span>
            <h1 id="signup-heading">帳戶已建立</h1>
            <p>
              {company ? `${company} account` : "你的帳戶"}  已準備就緒。以電郵及密碼登入，開始管理你的團隊。
            </p>
            <button className="primary-button signup-done-button" onClick={onLogin}>
              
              返回登入
            </button>
          </div>
        ) : (
          <>
            <header className="signup-heading">
              <h1 id="signup-heading">建立帳戶</h1>
              <p>設定你的 Hong Ye Group 公司帳戶</p>
            </header>

            <form className="signup-form" onSubmit={submit}>
              <div className="signup-grid">
                <Field icon={Building02Icon}>
                  <input
                    aria-label="公司名稱"
                    name="company"
                    autoComplete="organization"
                    placeholder="公司名稱"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    required
                  />
                </Field>

                <Field icon={Mail01Icon}>
                  <input
                    aria-label="電郵"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="電郵"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                </Field>

                <div className="signup-field is-wide signup-phone" ref={dialRef}>
                  <HugeiconsIcon icon={SmartPhone01Icon} size={24} strokeWidth={1.6} color="currentColor" aria-hidden="true" />
                  <div className="signup-dial">
                    <button
                      type="button"
                      className="signup-dial-trigger"
                      onClick={() => setDialOpen(!dialOpen)}
                      aria-expanded={dialOpen}
                      aria-label="區號"
                    >
                      {dial.dial}
                      <HugeiconsIcon icon={ArrowDown01Icon} size={17} strokeWidth={2.2} color="currentColor" />
                    </button>
                    {dialOpen && (
                      <div className="signup-dial-options">
                        {dialCodes.map((item) => (
                          <button
                            key={item.code}
                            type="button"
                            aria-pressed={item.code === dial.code}
                            onClick={() => {
                              setDial(item)
                              setDialOpen(false)
                            }}
                          >
                            <span>{item.label}</span>
                            <b>{item.dial}</b>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="signup-dial-split" aria-hidden="true" />
                  <input
                    aria-label="電話或手機號碼"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="電話／手機"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>

                <Field icon={SquareLock02Icon}>
                  <input
                    aria-label="密碼"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="密碼"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={() => setError("")}
                    required
                  />
                  <button
                    type="button"
                    className="signup-eye"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "隱藏密碼" : "顯示密碼"}
                  >
                    <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={22} strokeWidth={1.7} color="currentColor" />
                  </button>
                </Field>

                <Field icon={SquareLock02Icon}>
                  <input
                    aria-label="確認密碼"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="確認密碼"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    onFocus={() => setError("")}
                    required
                  />
                  <button
                    type="button"
                    className="signup-eye"
                    onClick={() => setShowConfirm(!showConfirm)}
                    aria-label={showConfirm ? "隱藏密碼" : "顯示密碼"}
                  >
                    <HugeiconsIcon icon={showConfirm ? ViewOffIcon : ViewIcon} size={22} strokeWidth={1.7} color="currentColor" />
                  </button>
                </Field>

                <p className="signup-hint">密碼至少需要 8 個字元。</p>

                <Field icon={Ticket01Icon} wide>
                  <input
                    aria-label="邀請碼"
                    name="inviteCode"
                    placeholder="邀請碼（可選）"
                    value={invite}
                    onChange={(event) => setInvite(event.target.value)}
                  />
                </Field>
              </div>

              <div className="agreement signup-agreement">
                <Checkbox
                  checked={agreed}
                  onChange={(value) => {
                    setAgreed(value)
                    setError("")
                  }}
                >
                  
                  註冊即表示你同意 Hong Ye Group 的{" "}
                  <button type="button" className="text-link">
                    
                    條款及細則
                  </button>
                </Checkbox>
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button className="primary-button signup-submit" type="submit">
                
                註冊
              </button>
            </form>

            <p className="signup-foot">
              
              已有帳戶？{" "}
              <button type="button" className="text-link" onClick={onLogin}>
                
                登入
              </button>
            </p>
          </>
        )}
      </section>
    </main>
  )
}
