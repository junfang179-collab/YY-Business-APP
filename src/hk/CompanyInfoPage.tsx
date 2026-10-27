import { useEffect, useRef, useState, type FormEvent } from "react"
import { SelectMenu } from "./SelectMenu"
import BackIcon from "../BackIcon"
import "../employer.css"
import "../company-info.css"

const INDUSTRIES = ["酒店服務", "F&B", "零售", "物流", "醫療"]
const BANKS = [
  "滙豐銀行",
  "恒生銀行",
  "中國銀行（香港）",
  "渣打銀行",
  "東亞銀行",
]
/* 香港版默认 +852，保留 +65 以便填写新加坡号码 */
const COUNTRY_CODES = ["+852", "+65"]

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
  merchant: "Hong Ye Group Limited",
  uen: "51234567-000",
  contact: "Tina Fang",
  phone: "9123 4567",
  zip: "000000",
  address: "香港中環皇后大道中 99 號 20 樓",
  email: "admin@hongyegroup.com.hk",
  industry: "酒店服務",
  bank: "滙豐銀行",
  account: "321-456-789-0",
  gst: "否",
  gstNumber: "",
  about:
    "精品酒店集團，於香港營運六間物業，專注為宴會及活動提供人手安排。",
}

/**
 * Company Information（参考稿里的 Employer Info）：
 * 信息结构参考稿是「返回 + 标题 + 两列商户资料 + GST + 简介 + 上传 LOGO + 提交」。
 * 视觉沿用 Customer Feedback / Change Password 那套白卡 + 纯色主按钮，
 * 字段是「小标签 + 输入框」，不用参考稿的拟物黄按钮与红色必填角标。
 */
export default function CompanyInfoPage({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [code, setCode] = useState("+852")
  const [logo, setLogo] = useState("")
  const [done, setDone] = useState(false)
  const fileInput = useRef<HTMLInputElement>(null)
  const timer = useRef<number | null>(null)

  const withGst = form.gst === "是"
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
        <button type="button" className="notice-back" aria-label="返回" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>公司資料</h1>
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
            <h2>公司資料已儲存</h2>
            <p>你的公司資料已更新。</p>
          </div>
        ) : (
          <form className="ci-form" onSubmit={submit}>
            <label className="ci-field">
              <span className="ci-label">商戶名稱</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.merchant}
                  onChange={(event) => set("merchant", event.target.value)}
                  placeholder="商戶名稱"
                  aria-label="商戶名稱"
                  required
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">商業登記號碼</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.uen}
                  onChange={(event) => set("uen", event.target.value)}
                  placeholder="商業登記號碼"
                  aria-label="商業登記號碼"
                  spellCheck={false}
                  required
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">聯絡人</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.contact}
                  onChange={(event) => set("contact", event.target.value)}
                  placeholder="聯絡人"
                  aria-label="聯絡人"
                  required
                />
              </span>
            </label>

            <div className="ci-field">
              <span className="ci-label">聯絡電話</span>
              <span className="ci-input-wrap">
                <span className="ci-code">
                  <SelectMenu
                    ariaLabel="區號"
                    value={code}
                    placeholder="+852"
                    options={COUNTRY_CODES}
                    onChange={setCode}
                  />
                </span>
                <span className="ci-divider" aria-hidden="true" />
                <input
                  className="ci-input"
                  value={form.phone}
                  onChange={(event) => set("phone", event.target.value)}
                  placeholder="聯絡電話"
                  aria-label="聯絡電話"
                  inputMode="tel"
                  required
                />
              </span>
            </div>

            <label className="ci-field">
              <span className="ci-label">郵區編號</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.zip}
                  onChange={(event) => set("zip", event.target.value)}
                  placeholder="郵區編號"
                  aria-label="郵區編號"
                  inputMode="numeric"
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">地址</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.address}
                  onChange={(event) => set("address", event.target.value)}
                  placeholder="地址"
                  aria-label="地址"
                />
              </span>
            </label>

            <label className="ci-field">
              <span className="ci-label">電郵</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  type="email"
                  value={form.email}
                  onChange={(event) => set("email", event.target.value)}
                  placeholder="電郵"
                  aria-label="電郵"
                  required
                />
              </span>
            </label>

            <div className="ci-field">
              <span className="ci-label">行業</span>
              <span className="ci-input-wrap is-select">
                <SelectMenu
                  ariaLabel="行業"
                  value={form.industry}
                  placeholder="選擇行業"
                  options={INDUSTRIES}
                  onChange={(value) => set("industry", value)}
                />
              </span>
            </div>

            <div className="ci-field">
              <span className="ci-label">銀行名稱</span>
              <span className="ci-input-wrap is-select">
                <SelectMenu
                  ariaLabel="銀行名稱"
                  value={form.bank}
                  placeholder="選擇銀行"
                  options={BANKS}
                  onChange={(value) => set("bank", value)}
                />
              </span>
            </div>

            <label className="ci-field">
              <span className="ci-label">銀行帳戶</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.account}
                  onChange={(event) => set("account", event.target.value)}
                  placeholder="銀行帳戶"
                  aria-label="銀行帳戶"
                  spellCheck={false}
                />
              </span>
            </label>

            <div className="ci-field">
              <span className="ci-label">包含消費稅</span>
              {/* 用 button + role=radio：原生 radio 在 Figma 里会被画成系统控件，
                  复制出来会多一个灰色圆点，所以整套视觉都用真实元素自绘 */}
              <div className="ci-gst" role="radiogroup" aria-label="包含消費稅">
                {["是", "否"].map((option) => (
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
              <span className="ci-label">消費稅號碼</span>
              <span className="ci-input-wrap">
                <input
                  className="ci-input"
                  value={form.gstNumber}
                  onChange={(event) => set("gstNumber", event.target.value)}
                  placeholder={withGst ? "消費稅號碼" : "不適用"}
                  aria-label="消費稅號碼"
                  disabled={!withGst}
                  spellCheck={false}
                />
              </span>
            </label>

            <label className="ci-field ci-wide">
              <span className="ci-label">關於商戶</span>
              <textarea
                className="ci-textarea"
                value={form.about}
                onChange={(event) => set("about", event.target.value)}
                placeholder="介紹一下你的公司業務。"
                aria-label="關於商戶"
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
                  {logo ? <img src={logo} alt="商戶標誌預覽" /> : <UploadIcon />}
                </span>
                <span className="ci-upload-copy">
                  <strong>上傳商戶標誌</strong>
                  <small>PNG 或 JPG，上限 2 MB</small>
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
                
                提交
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
