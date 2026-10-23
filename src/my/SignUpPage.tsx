import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react"
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowLeft02Icon,
  Building02Icon,
  CheckmarkCircle02Icon,
  Mail01Icon,
  SmartPhone01Icon,
  SquareLock02Icon,
  Ticket01Icon,
  ViewIcon,
  ViewOffIcon,
} from "@hugeicons/core-free-icons"
import "../signup.css"

/* 马来西亚站：区号默认 +60，同时保留 +65（新加坡号也能收到）；其余先注释掉 */
const dialCodes = [
  { code: "MY", dial: "+60", label: "Malaysia" },
  { code: "SG", dial: "+65", label: "Singapore" },
  /*
  { code: "HK", dial: "+852", label: "Hong Kong, China" },
  { code: "TH", dial: "+66", label: "Thailand" },
  { code: "AE", dial: "+971", label: "UAE" },
  { code: "DE", dial: "+49", label: "Germany" },
  { code: "NL", dial: "+31", label: "Netherlands" },
  */
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
      setError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirm) {
      setError("The two passwords do not match.")
      return
    }
    if (!agreed) {
      setError("Please agree to the Terms & Conditions.")
      return
    }
    setError("")
    setDone(true)
  }

  return (
    <main className="sign-in-page signup-page ipad-app">
      <div className="landscape" aria-hidden="true" />
      <button className="signup-back" onClick={onBack} aria-label="Back to login">
        <HugeiconsIcon icon={ArrowLeft02Icon} size={26} strokeWidth={2} color="currentColor" />
      </button>

      <section className="signup-card" aria-labelledby="signup-heading">
        {done ? (
          <div className="signup-done" role="status">
            <span className="signup-done-icon">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} size={44} strokeWidth={1.6} color="currentColor" />
            </span>
            <h1 id="signup-heading">Account created</h1>
            <p>
              {company ? `${company} account` : "Your account"} is ready. Sign in
              with your email and password to start managing your team.
            </p>
            <button className="primary-button signup-done-button" onClick={onLogin}>
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <header className="signup-heading">
              <h1 id="signup-heading">Create Account</h1>
              <p>Set up your Hong Ye Group company account</p>
            </header>

            <form className="signup-form" onSubmit={submit}>
              <div className="signup-grid">
                <Field icon={Building02Icon}>
                  <input
                    aria-label="Company name"
                    name="company"
                    autoComplete="organization"
                    placeholder="Company Name"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    required
                  />
                </Field>

                <Field icon={Mail01Icon}>
                  <input
                    aria-label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email"
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
                      aria-label="Country code"
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
                    aria-label="Telephone or mobile number"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Tel / Mobile"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    required
                  />
                </div>

                <Field icon={SquareLock02Icon}>
                  <input
                    aria-label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    onFocus={() => setError("")}
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

                <Field icon={SquareLock02Icon}>
                  <input
                    aria-label="Confirm password"
                    name="confirmPassword"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="Confirm Password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    onFocus={() => setError("")}
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

                <p className="signup-hint">Use at least 8 characters for your password.</p>

                <Field icon={Ticket01Icon} wide>
                  <input
                    aria-label="Invite code"
                    name="inviteCode"
                    placeholder="Invite Code (Optional)"
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
                  By signing up, you agree to Hong Ye Group's{" "}
                  <button type="button" className="text-link">
                    Terms &amp; Conditions
                  </button>
                </Checkbox>
              </div>

              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}

              <button className="primary-button signup-submit" type="submit">
                Sign Up
              </button>
            </form>

            <p className="signup-foot">
              Already have an account?{" "}
              <button type="button" className="text-link" onClick={onLogin}>
                Login
              </button>
            </p>
          </>
        )}
      </section>
    </main>
  )
}
