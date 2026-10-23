import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  ArrowLeft02Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  SquareLock02Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import "./forgot.css"

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
      setError("Please enter the 6-digit code we sent you.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirm) {
      setError("The two passwords do not match.")
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
      <button className="signup-back" onClick={goBack} aria-label="Back">
        <HugeiconsIcon icon={ArrowLeft02Icon} size={26} strokeWidth={2} color="currentColor" />
      </button>

      <section className="signup-card forgot-card" aria-labelledby="forgot-heading">
        {done ? (
          <div className="signup-done" role="status">
            <span className="signup-done-icon">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={44} strokeWidth={1.6} color="currentColor" />
            </span>
            <h1 id="forgot-heading">Password reset</h1>
            <p>
              Your password has been reset. Sign in with your new password to
              continue.
            </p>
            <button className="primary-button signup-done-button" onClick={onBack}>
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <header className="signup-heading">
              <span className="forgot-kicker">{step === 1 ? "Step 1 of 2" : "Step 2 of 2"}</span>
              <h1 id="forgot-heading">{step === 1 ? "Forgot Password" : "Verify Code"}</h1>
              <p>
                {step === 1
                  ? "Enter the email you registered with and we will send a 6-digit code."
                  : `We sent a 6-digit code to ${email}.`}
              </p>
            </header>

            {step === 1 ? (
              <form className="signup-form" onSubmit={sendCode}>
                <div className="signup-grid">
                  <Field icon={Mail01Icon} wide>
                    <input
                      aria-label="Registered email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="Registered Email"
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
                  Send Code
                </button>

                <p className="signup-foot">
                  Remember your password?{" "}
                  <button type="button" className="text-link" onClick={onBack}>
                    Login
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
                      aria-label="New password"
                      name="newPassword"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="New Password"
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
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      <HugeiconsIcon icon={showPassword ? ViewOffIcon : ViewIcon} size={22} strokeWidth={1.7} color="currentColor" />
                    </button>
                  </Field>

                  <Field icon={SquareLock02Icon} wide>
                    <input
                      aria-label="Confirm new password"
                      name="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Confirm Password"
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
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                    >
                      <HugeiconsIcon icon={showConfirm ? ViewOffIcon : ViewIcon} size={22} strokeWidth={1.7} color="currentColor" />
                    </button>
                  </Field>

                  <p className="signup-hint">Use at least 8 characters for your new password.</p>
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}

                <button className="primary-button signup-submit" type="submit">
                  Reset Password
                </button>

                <p className="signup-foot">
                  {cooldown > 0 ? (
                    <>Didn&apos;t get the code? Resend in {cooldown}s</>
                  ) : (
                    <>
                      Didn&apos;t get the code?{" "}
                      <button
                        type="button"
                        className="text-link"
                        onClick={() => {
                          setOtp(Array(OTP_LENGTH).fill(""))
                          setCooldown(30)
                          otpRefs.current[0]?.focus()
                        }}
                      >
                        Resend code
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
