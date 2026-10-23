import { useEffect, useRef, useState, type FormEvent } from "react"
import { SelectMenu } from "./SelectMenu"
import "../employer.css"
import "../company-info.css"

const INDUSTRIES = ["Hospitality", "F&B", "Retail", "Logistics", "Healthcare"]
const BANKS = [
  "United Overseas Bank",
  "DBS Bank",
  "OCBC Bank",
  "Maybank",
  "Standard Chartered",
]
/* 马来西亚站：默认 +60，同时可选 +65 */
const COUNTRY_CODES = ["+60", "+65"]

/** 横幅上传图标：虚线框里的图片符号 */
function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3.2" y="4.6" width="17.6" height="14.8" rx="3.2" />
      <path d="M3.6 15.4l4.3-4a2 2 0 0 1 2.7 0l3.1 2.9M14 13.6l1.6-1.5a2 2 0 0 1 2.7 0l2.3 2.1" />
      <circle cx="8.7" cy="9.4" r="1.5" />
    </svg>
  )
}

const EMPTY_FORM = {
  merchant: "Hong Ye Group Pte Ltd",
  uen: "201834567K",
  contact: "Tina Fang",
  phone: "9123 4567",
  zip: "049213",
  address: "1 Raffles Place, #20-01",
  email: "admin@hongyegroup.com.sg",
  industry: "Hospitality",
  bank: "United Overseas Bank",
  account: "321-456-789-0",
  gst: "No",
  gstNumber: "",
  about:
    "Boutique hospitality group operating six properties across Singapore, focused on banquet and event staffing.",
}

/**
 * Company Information（参考稿里的 Employer Info）：
 * 信息结构参考稿是「返回 + 标题 + 两列商户资料 + GST + 简介 + 上传 LOGO + 提交」。
 * 视觉沿用 Customer Feedback / Change Password 那套白卡 + 纯色主按钮，
 * 字段是「小标签 + 输入框」，不用参考稿的拟物黄按钮与红色必填角标。
 */
export default function CompanyInfoPage({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [code, setCode] = useState("+60")
  const [logo, setLogo] = useState("")
  const [done, setDone] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const timer = useRef<number | null>(null)

  const withGst = form.gst === "Yes"
  const ready =
    form.merchant.trim() !== "" &&
    form.uen.trim() !== "" &&
    form.contact.trim() !== "" &&
    form.phone.trim() !== "" &&
    form.email.trim() !== ""

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearTimeout(timer.current)
      if (logo) URL.revokeObjectURL(logo)
    },
    [logo],
  )

  function set<K extends keyof typeof EMPTY_FORM>(key: K, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!ready) return
    setDone(true)
    timer.current = window.setTimeout(onBack, 1800)
  }

  return (
    <main className="employer-page ci-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="Back" onClick={onBack}>
          <svg viewBox="0 0 44 44" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m27 9-13 14 13 14" />
          </svg>
        </button>
        <h1>Company Information</h1>
        <span />
      </header>

      <section className="ci-panel">
        {done ? (
          <div className="ci-done" role="status">
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
            <h2>Company information saved</h2>
            <p>Your company profile has been updated.</p>
          </div>
        ) : (
          <form className="ci-form" onSubmit={submit}>
            <label className="ci-field">
              <span className="ci-label">Merchant Name</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.merchant}
                  onChange={(event) => set("merchant", event.target.value)}
                  placeholder="Merchant Name"
                  aria-label="Merchant Name"
                  required
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">UEN No.</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.uen}
                  onChange={(event) => set("uen", event.target.value)}
                  placeholder="UEN No."
                  aria-label="UEN No."
                  spellCheck={false}
                  required
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">Contact Person</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.contact}
                  onChange={(event) => set("contact", event.target.value)}
                  placeholder="Contact Person"
                  aria-label="Contact Person"
                  required
                />
              </span>
            </label>

            <div className="ci-field">
              <span className="ci-label">Contact Phone</span>
              <span className="ci-input-wrap">
                <span className="ci-code">
                  <SelectMenu
                    ariaLabel="Country code"
                    value={code}
                    placeholder="+60"
                    options={COUNTRY_CODES}
                    onChange={setCode}
                  />
                </span>
                <span className="ci-divider" aria-hidden="true" />
                <input
                  className="ci-input"
                  value={form.phone}
                  onChange={(event) => set("phone", event.target.value)}
                  placeholder="Contact Phone"
                  aria-label="Contact Phone"
                  inputMode="tel"
                  required
                />
              </span>
            </div>

            <label className="ci-field">
              <span className="ci-label">Zip Code</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.zip}
                  onChange={(event) => set("zip", event.target.value)}
                  placeholder="Zip Code"
                  aria-label="Zip Code"
                  inputMode="numeric"
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">Address</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.address}
                  onChange={(event) => set("address", event.target.value)}
                  placeholder="Address"
                  aria-label="Address"
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">Email</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  type="email"
                  value={form.email}
                  onChange={(event) => set("email", event.target.value)}
                  placeholder="Email"
                  aria-label="Email"
                  required
                />
              </span>
            </label>

            <div className="ci-field">
              <span className="ci-label">Industry</span>
              <span className="ci-input-wrap is-select">
                <SelectMenu
                  ariaLabel="Industry"
                  value={form.industry}
                  placeholder="Select industry"
                  options={INDUSTRIES}
                  onChange={(value) => set("industry", value)}
                />
              </span>
            </div>

            <div className="ci-field">
              <span className="ci-label">Bank Name</span>
              <span className="ci-input-wrap is-select">
                <SelectMenu
                  ariaLabel="Bank Name"
                  value={form.bank}
                  placeholder="Select bank"
                  options={BANKS}
                  onChange={(value) => set("bank", value)}
                />
              </span>
            </div>

            <label className="ci-field">
              <span className="ci-label">Bank Account</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.account}
                  onChange={(event) => set("account", event.target.value)}
                  placeholder="Bank Account"
                  aria-label="Bank Account"
                  spellCheck={false}
                />
              </span>
            </label>

            <div className="ci-field">
              <span className="ci-label">Including GST</span>
              {/* 用 button + role=radio：原生 radio 在 Figma 里会被画成系统控件，
                  复制出来会多一个灰色圆点，所以整套视觉都用真实元素自绘 */}
              <div className="ci-gst" role="radiogroup" aria-label="Including GST">
                {["Yes", "No"].map((option) => (
                  <button
                    type="button"
                    role="radio"
                    aria-checked={form.gst === option}
                    className={`ci-radio${form.gst === option ? " is-active" : ""}`}
                    key={option}
                    onClick={() => set("gst", option)}
                  >
                    <span className="ci-radio-dot">
                      {form.gst === option && <span className="ci-radio-core" />}
                    </span>
                    <span className="ci-radio-text">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <label className={`ci-field${withGst ? "" : " is-muted"}`}>
              <span className="ci-label">GST Number</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.gstNumber}
                  onChange={(event) => set("gstNumber", event.target.value)}
                  placeholder={withGst ? "GST Number" : "Not applicable"}
                  aria-label="GST Number"
                  disabled={!withGst}
                  spellCheck={false}
                />
              </span>
            </label>

            <label className="ci-field ci-wide">
              <span className="ci-label">About The Merchant</span>
              <textarea
                className="ci-textarea"
                value={form.about}
                onChange={(event) => set("about", event.target.value)}
                placeholder="Tell us what your company does."
                aria-label="About The Merchant"
              />
            </label>

            <div className="ci-footer ci-wide">
              <label
                className="ci-upload"
                onClick={(event) => {
                  /* label 里放的是 display:none 的 file input，这里主动唤起选择框 */
                  event.preventDefault()
                  fileInput.current?.click()
                }}
              >
                <span className="ci-upload-tile">
                  {logo ? <img src={logo} alt="Merchant logo preview" /> : <UploadIcon />}
                </span>
                <span className="ci-upload-copy">
                  <strong>Upload Merchant Logo</strong>
                  <small>PNG or JPG, up to 2 MB</small>
                </span>
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/png,image/jpeg"
                  className="ci-file"
                  onChange={(event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    if (logo) URL.revokeObjectURL(logo)
                    setLogo(URL.createObjectURL(file))
                  }}
                />
              </label>

              <button type="submit" className="ci-submit" disabled={!ready}>
                Submit
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
