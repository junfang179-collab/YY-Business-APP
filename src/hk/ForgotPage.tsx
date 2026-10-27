import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  CheckmarkCircle02Icon,
  Mail01Icon,
  SquareLock02Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import BackIcon from "../BackIcon"
import "../forgot.css"

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

const OTP_LENGTH = 6

export default function ForgotPage({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState<1 | 2>(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [error, setError] = useState("")
  const [cooldown, setCooldown] = useState(0)
  const [done, setDone] = useState(false)
  const otpRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (!cooldown) return
    const timer = setTimeout(() => setCooldown(cooldown - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  function sendCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setStep(2)
    setCooldown(30)
    window.setTimeout(() => otpRefs.current[0]?.focus(), 60)
  }

  function reset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (otp.join("").length < OTP_LENGTH) {
      setError("請輸入我們發送給你的 6 位驗證碼。")
      return
    }
    if (password.length < 8) {
      setError("密碼至少需要 8 個字元。")
      return
    }
    if (password !== confirm) {
      setError("兩次輸入的密碼不一致。")
      return
    }
    setError("")
    setDone(true)
  }

  function writeDigit(index: number, raw: string) {
    const digit = raw.replace(/\D/g, "").slice(-1)
    setOtp((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
    setError("")
    if (digit && index < OTP_LENGTH - 1) otpRefs.current[index + 1]?.focus()
  }

  function handlePaste(event: ClipboardEvent<HTMLDivElement>) {
    const text = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!text) return
    event.preventDefault()
    const next = Array(OTP_LENGTH).fill("")
    text.split("").forEach((char, index) => {
      next[index] = char
    })
    setOtp(next)
    setError("")
    otpRefs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus()
  }

  function goBack() {
    if (step === 2 && !done) {
      setStep(1)
      setError("")
      return
    }
    onBack()
  }

  return (
    <main className="sign-in-page signup-page ipad-app">
      <div className="landscape" aria-hidden="true" />
      <button className="signup-back" onClick={goBack} aria-label="返回">
        <BackIcon />
      </button>

      <section className="signup-card forgot-card" aria-labelledby="forgot-heading">
        {done ? (
          <div className="signup-done" role="status">
            <span className="signup-done-icon">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={44} strokeWidth={1.6} color="currentColor" />
            </span>
            <h1 id="forgot-heading">密碼已重設</h1>
            <p>
              
              你的密碼已重設。請以新密碼登入以繼續。
            </p>
            <button className="primary-button signup-done-button" onClick={onBack}>
              
              返回登入
            </button>
          </div>
        ) : (
          <>
            <header className="signup-heading">
              <span className="forgot-kicker">{step === 1 ? "第 1 步，共 2 步" : "第 2 步，共 2 步"}</span>
              <h1 id="forgot-heading">{step === 1 ? "忘記密碼" : "驗證碼"}</h1>
              <p>
                {step === 1
                  ? "輸入你註冊時使用的電郵，我們會發送 6 位驗證碼。"
                  : `我們已向 ${email} 發送 6 位驗證碼。`}
              </p>
            </header>

            {step === 1 ? (
              <form className="signup-form" onSubmit={sendCode}>
                <div className="signup-grid">
                  <Field icon={Mail01Icon} wide>
                    <input
                      aria-label="註冊電郵"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="註冊電郵"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value)
                        setError("")
                      }}
                      required
                    />
                  </Field>
                </div>

                <button className="primary-button signup-submit" type="submit">
                  
                  發送驗證碼
                </button>

                <p className="signup-foot">
                  
                  記得密碼？{" "}
                  <button type="button" className="text-link" onClick={onBack}>
                    
                    登入
                  </button>
                </p>
              </form>
            ) : (
              <form className="signup-form" onSubmit={reset}>
                <div className="signup-grid">
                  <div className="forgot-otp is-wide" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(node) => {
                          otpRefs.current[index] = node
                        }}
                        aria-label={`Digit ${index + 1}`}
                        inputMode="numeric"
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        maxLength={1}
                        value={digit}
                        onChange={(event) => writeDigit(index, event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Backspace" && !otp[index] && index > 0) {
                            otpRefs.current[index - 1]?.focus()
                          }
                        }}
                      />
                    ))}
                  </div>

                  <Field icon={SquareLock02Icon} wide>
                    <input
                      aria-label="新密碼"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="新密碼"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value)
                        setError("")
                      }}
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

                  <Field icon={SquareLock02Icon} wide>
                    <input
                      aria-label="確認新密碼"
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="確認密碼"
                      value={confirm}
                      onChange={(event) => {
                        setConfirm(event.target.value)
                        setError("")
                      }}
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

                  <p className="signup-hint">新密碼至少需要 8 個字元。</p>
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <button className="primary-button signup-submit" type="submit">
                  
                  重設密碼
                </button>

                <p className="signup-foot">
                  {cooldown > 0 ? (
                    <>沒有收到驗證碼？重新發送倒數 {cooldown}s</>
                  ) : (
                    <>
                      
                      沒有收到驗證碼？{" "}
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => {
                          setOtp(Array(OTP_LENGTH).fill(""))
                          setCooldown(30)
                          otpRefs.current[0]?.focus()
                        }}
                      >
                        
                        重新發送驗證碼
                      </button>
                    </>
                  )}
                </p>
              </form>
            )}
          </>
        )}
      </section>
    </main>
  )
}
