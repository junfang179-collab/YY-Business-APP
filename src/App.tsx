import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react"
import IpadPreview from "./IpadPreview"
/* 各地区完全独立的页面：新加坡（默认）、马来西亚、香港。
   App 根据 URL 上的 ?region=my / ?region=hk 选择渲染哪一套，hash 路由三者完全一致。 */
import * as Sg from "./pages-sg"
import * as My from "./my"
import * as Hk from "./hk"
import type { HistorySheet } from "./HistoryDetailPage"
import type { ClothingRequestInfo } from "./StaffClothingSizePage"
import FigmaCopyBridge from "./FigmaCopyBridge"

/** 业务地区。页面按地区分成多套独立文件，避免改一边影响另一边。 */
type Region = "sg" | "my" | "hk"

function readRegion(): Region {
  const value = new URLSearchParams(window.location.search).get("region")
  return value === "my" || value === "hk" ? value : "sg"
}

/** 切换地区只改 query，不动 hash，所以当前所在页面保持不变。 */
function writeRegion(region: Region) {
  const url = new URL(window.location.href)
  if (region === "sg") url.searchParams.delete("region")
  else url.searchParams.set("region", region)
  window.history.replaceState(null, "", url)
}

type IconName = "mail" | "lock" | "eye" | "eye-off" | "chevron" | "check" | "close"
type ModalName = "forgot" | "signup" | "terms" | "privacy" | "login" | null

function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, ReactNode> = {
    mail: (
      <>
        <rect x="3" y="5" width="26" height="23" rx="3" />
        <path d="m4 7 12 10L28 7" />
      </>
    ),
    lock: (
      <>
        <rect x="6" y="13" width="21" height="18" rx="2.5" />
        <path d="M10 13V9a6.5 6.5 0 0 1 13 0v4" />
        <circle cx="16.5" cy="21" r="1.4" />
        <path d="M16.5 23v3" />
      </>
    ),
    eye: (
      <>
        <path d="M2 17S7 8 16 8s14 9 14 9-5 9-14 9S2 17 2 17Z" />
        <circle cx="16" cy="17" r="4.5" />
      </>
    ),
    "eye-off": (
      <>
        <path d="m4 4 24 24M12 8.5a17 17 0 0 1 4-.5c9 0 14 9 14 9a27 27 0 0 1-5 5M20 25.5a17 17 0 0 1-4 .5C7 26 2 17 2 17a29 29 0 0 1 5-5" />
        <path d="M12.8 13.8a4.5 4.5 0 0 0 6.4 6.4" />
      </>
    ),
    chevron: <path d="m7 12 9 10 9-10" />,
    check: <path d="m6 17 7 7L27 9" />,
    close: <path d="m8 8 16 16M24 8 8 24" />,
  }
  return (
    <svg
      viewBox="0 0 32 34"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

/* 区域选择：圆形国旗 + 名称。香港按中国香港表述。
   `region` 决定登录后走哪一套页面（sg / my / hk 各有一套独立文件）。 */
const regions: {
  code: string
  region: Region
  name: string
  /** 香港繁体界面下的地区名称 */
  nameHk: string
  flag: ReactNode
}[] = [
  {
    code: "SG",
    region: "sg",
    name: "Singapore",
    nameHk: "新加坡",
    flag: (
      <>
        <rect x="0" y="0" width="24" height="12" fill="#ed2939" />
        <rect x="0" y="12" width="24" height="12" fill="#fff" />
        <circle cx="7.4" cy="7.2" r="3.5" fill="#fff" />
        <circle cx="9.1" cy="7.2" r="3.1" fill="#ed2939" />
      </>
    ),
  },
  {
    code: "MY",
    region: "my",
    name: "Malaysia",
    nameHk: "馬來西亞",
    flag: (
      <>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((row) => (
          <rect
            key={row}
            x="0"
            y={row * 3}
            width="24"
            height="3"
            fill={row % 2 === 0 ? "#cc0001" : "#fff"}
          />
        ))}
        <rect x="0" y="0" width="13" height="12" fill="#010066" />
        <circle cx="6.4" cy="6" r="3.3" fill="#ffcc00" />
        <circle cx="7.7" cy="6" r="2.9" fill="#010066" />
      </>
    ),
  },
  {
    code: "HK",
    region: "hk",
    name: "Hong Kong, China",
    nameHk: "中國香港",
    flag: (
      <>
        <rect x="0" y="0" width="24" height="24" fill="#de2910" />
        <circle cx="12" cy="11.4" r="1.5" fill="#fff" />
        {[0, 1, 2, 3, 4].map((petal) => {
          const angle = ((petal * 72 - 90) * Math.PI) / 180
          return (
            <circle
              key={petal}
              cx={12 + Math.cos(angle) * 4.2}
              cy={11.4 + Math.sin(angle) * 4.2}
              r="1.5"
              fill="#fff"
            />
          )
        })}
      </>
    ),
  },
  /* 除新加坡、马来西亚、香港以外的地区先隐藏；需要恢复时删掉这段注释的两个标记即可
     （同时记得给每项补上 region 字段，否则会按新加坡处理）。
  {
    code: "TH",
    name: "Thailand",
    flag: (
      <>
        <rect x="0" y="0" width="24" height="24" fill="#a51931" />
        <rect x="0" y="4" width="24" height="16" fill="#f4f5f8" />
        <rect x="0" y="8" width="24" height="8" fill="#2d2a4a" />
      </>
    ),
  },
  {
    code: "AE",
    name: "UAE",
    flag: (
      <>
        <rect x="0" y="0" width="24" height="8" fill="#00732f" />
        <rect x="0" y="8" width="24" height="8" fill="#fff" />
        <rect x="0" y="16" width="24" height="8" fill="#0b0b0b" />
        <rect x="0" y="0" width="7" height="24" fill="#ff0000" />
      </>
    ),
  },
  {
    code: "DE",
    name: "Germany",
    flag: (
      <>
        <rect x="0" y="0" width="24" height="8" fill="#0b0b0b" />
        <rect x="0" y="8" width="24" height="8" fill="#dd0000" />
        <rect x="0" y="16" width="24" height="8" fill="#ffce00" />
      </>
    ),
  },
  {
    code: "NL",
    name: "Netherlands",
    flag: (
      <>
        <rect x="0" y="0" width="24" height="8" fill="#ae1c28" />
        <rect x="0" y="8" width="24" height="8" fill="#fff" />
        <rect x="0" y="16" width="24" height="8" fill="#21468b" />
      </>
    ),
  },
  */
]

function RegionFlag({ code, children }: { code: string; children: ReactNode }) {
  const clipId = `region-flag-${code}`
  return (
    <svg className="region-flag" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath id={clipId}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{children}</g>
      <circle cx="12" cy="12" r="11.4" fill="none" stroke="#0f2a4a2e" strokeWidth="1.2" />
    </svg>
  )
}

function LocationNavigation({
  region,
  onRegionChange,
}: {
  region: Region
  onRegionChange: (next: Region) => void
}) {
  const [open, setOpen] = useState(false)
  const navigation = useRef<HTMLElement>(null)
  const current = regions.find((item) => item.region === region) ?? regions[0]
  /* 香港繁体界面下，地区名（含下拉里的其它国家）一并走繁体 */
  const label = (item: (typeof regions)[number]) =>
    region === "hk" ? item.nameHk : item.name

  useEffect(() => {
    function dismiss(event: PointerEvent) {
      if (!navigation.current?.contains(event.target as Node)) setOpen(false)
    }
    document.addEventListener("pointerdown", dismiss)
    return () => document.removeEventListener("pointerdown", dismiss)
  }, [])

  return (
    <nav
      className="location-navigation"
      aria-label={region === "hk" ? "地區" : "Region"}
      ref={navigation}
      onKeyDown={(event) => {
        if (event.key === "Escape") setOpen(false)
      }}
    >
      <button
        className="location-trigger"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-controls="location-options"
      >
        <RegionFlag code={current.code}>{current.flag}</RegionFlag>
        {label(current)}
        <Icon name="chevron" />
      </button>
      {open && (
        <div
          className="location-options"
          id="location-options"
          aria-label={region === "hk" ? "選擇地區" : "Choose your region"}
        >
          {regions.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                onRegionChange(item.region)
                setOpen(false)
              }}
              aria-pressed={region === item.region}
            >
              <span className="location-option-main">
                <RegionFlag code={item.code}>{item.flag}</RegionFlag>
                <span>{label(item)}</span>
              </span>
              {region === item.region && <Icon name="check" />}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

function Checkbox({
  checked,
  onChange,
  children,
  className = "",
  ariaLabel,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  children?: ReactNode
  className?: string
  ariaLabel?: string
}) {
  return (
    <label className={`checkbox-label ${className}`}>
      <span className="checkbox-control">
        <input
          type="checkbox"
          aria-label={ariaLabel}
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span className="checkbox-visual">
          {checked && <Icon name="check" />}
        </span>
      </span>
      {children && <span>{children}</span>}
    </label>
  )
}

function Dialog({
  modal,
  region,
  onClose,
}: {
  modal: Exclude<ModalName, null>
  region: Region
  onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const hk = region === "hk"
  const titles = hk
    ? {
        forgot: "忘記密碼",
        signup: "建立你的帳戶",
        terms: "條款及細則",
        privacy: "私隱政策",
        login: "登入協助",
      }
    : {
        forgot: "Forgot Password",
        signup: "Create your account",
        terms: "Terms & Conditions",
        privacy: "Privacy Policy",
        login: "Sign-in help",
      }

  useEffect(() => {
    dialog.current?.showModal()
  }, [])

  function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <dialog
      ref={dialog}
      className="detail-dialog"
      aria-labelledby="dialog-heading"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="dialog-inner">
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label={hk ? "關閉" : "Close dialog"}
        >
          <Icon name="close" />
        </button>
        <h2 id="dialog-heading">{titles[modal]}</h2>
        {modal === "forgot" || modal === "signup" ? (
          submitted ? (
            <div className="dialog-confirmation" role="status">
              <span className="confirmation-icon">
                <Icon name="check" />
              </span>
              <h3>
                {modal === "forgot"
                  ? hk
                    ? "重設連結已發送"
                    : "Reset link sent"
                  : hk
                    ? "歡迎加入 Hong Ye Group"
                    : "Welcome to Hong Ye Group"}
              </h3>
              <p>
                {modal === "forgot"
                  ? hk
                    ? "請查看你的電郵，並按連結設定新密碼。"
                    : "Check your inbox and follow the link to set a new password."
                  : hk
                    ? "你的公司帳戶已建立，登入即可開始管理團隊。"
                    : "Your company account is ready. Sign in to start managing your team."}
              </p>
              <button
                className="primary-button dialog-action"
                onClick={onClose}
              >
                {hk ? "返回登入" : "Back to Login"}
              </button>
            </div>
          ) : (
            <form className="dialog-form" onSubmit={submit}>
              <p>
                {modal === "forgot"
                  ? hk
                    ? "輸入你的帳戶電郵，我們會發送重設連結給你。"
                    : "Enter your account email and we will send you a reset link."
                  : hk
                    ? "加入 Hong Ye Group，填寫資料即可建立你的公司帳戶。"
                    : "Join Hong Ye Group. Enter your details to create your company account."}
              </p>
              {modal === "signup" && (
                <label>
                  {hk ? "姓名" : "Full name"}
                  <input
                    name="name"
                    autoComplete="name"
                    placeholder={hk ? "你的姓名" : "Your full name"}
                    required
                  />
                </label>
              )}
              <label>
                {hk ? "電郵地址" : "Email address"}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  required
                />
              </label>
              {modal === "signup" && (
                <label>
                  {hk ? "密碼" : "Password"}
                  <input
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    minLength={8}
                    placeholder={hk ? "至少 8 個字元" : "At least 8 characters"}
                    required
                  />
                </label>
              )}
              <button type="submit" className="primary-button dialog-action">
                {modal === "forgot"
                  ? hk
                    ? "發送重設連結"
                    : "Send reset link"
                  : hk
                    ? "建立帳戶"
                    : "Create account"}
              </button>
            </form>
          )
        ) : (
          <>
            <p>
              {modal === "login"
                ? hk
                  ? "請使用公司分配給你的電郵與密碼登入。如仍未有帳戶，請聯絡你的管理員。"
                  : "Sign in with the company email and password issued to you. Contact your administrator if you do not have an account yet."
                : modal === "terms"
                  ? hk
                    ? "帳戶只供 Hong Ye Group 授權員工使用。請妥善保管登入資料，並僅將考勤工具用於工作用途。"
                    : "Accounts are for authorised Hong Ye Group staff only. Keep your credentials private and use the attendance tools for work purposes."
                  : hk
                    ? "Hong Ye Group 只會收集管理考勤與薪酬所需的員工資料。如需查閱或更新你的資料，請聯絡管理員。"
                    : "Hong Ye Group collects only the staff details needed to manage attendance and payroll. Contact your administrator to review or update your information."}
            </p>
            <button className="primary-button dialog-action" onClick={onClose}>
              {hk ? "返回登入" : "Back to Login"}
            </button>
          </>
        )}
      </div>
    </dialog>
  )
}

/* 登录页文案：香港地区走繁体，其余地区保持英文（设计稿原文） */
const loginCopy = {
  en: {
    heading: "Welcome Back",
    sub: "Sign in to your Hong Ye Group account",
    emailLabel: "Email or username",
    passwordLabel: "Password",
    passwordPlaceholder: "Enter your password",
    showPassword: "Show password",
    hidePassword: "Hide password",
    login: "Login",
    remember: "Remember Password",
    forgot: "Forgot Password",
    signup: "Don't have account? Sign up Now",
    agreeAria: "Agree to Terms & Conditions and Privacy Policy",
    agreeLead: "By signing in, you agree to Hong Ye Group's",
    terms: "Terms & Conditions",
    and: "and",
    privacy: "Privacy Policy",
    mustAgree: "Please agree to the Terms & Conditions and Privacy Policy.",
  },
  hk: {
    heading: "歡迎回來",
    sub: "登入你的 Hong Ye Group 帳戶",
    emailLabel: "電郵或帳戶名稱",
    passwordLabel: "密碼",
    passwordPlaceholder: "請輸入密碼",
    showPassword: "顯示密碼",
    hidePassword: "隱藏密碼",
    login: "登入",
    remember: "記住密碼",
    forgot: "忘記密碼",
    signup: "還沒有帳戶？立即註冊",
    agreeAria: "同意條款及細則與私隱政策",
    agreeLead: "登入即表示你同意 Hong Ye Group 的",
    terms: "條款及細則",
    and: "及",
    privacy: "私隱政策",
    mustAgree: "請先同意條款及細則與私隱政策。",
  },
}

function LoginCard({
  region,
  onOpen,
  onLogin,
  onSignup,
  onForgot,
}: {
  region: Region
  onOpen: (modal: ModalName) => void
  onLogin: () => void
  onSignup: () => void
  onForgot: () => void
}) {
  const copy = region === "hk" ? loginCopy.hk : loginCopy.en
  const [username, setUsername] = useState(
    region === "hk" ? "hongyehongyegroup.com.hk" : "hongyehongyegroup.com.sg",
  )
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [remember, setRemember] = useState(false)
  const [agreed, setAgreed] = useState(true)
  const [error, setError] = useState("")

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!agreed) {
      setError(copy.mustAgree)
      return
    }
    setError("")
    onLogin()
  }

  return (
    <section className="login-card" aria-labelledby="welcome-heading">
      <header className="card-heading">
        <h1 id="welcome-heading">{copy.heading}</h1>
        <p>{copy.sub}</p>
      </header>
      <form className="login-form" onSubmit={submit}>
        <div className="credentials">
          <label className="input-field">
            <Icon name="mail" />
            <input
              aria-label={copy.emailLabel}
              name="username"
              autoComplete="username"
              spellCheck={false}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label className="input-field password-field">
            <Icon name="lock" />
            <input
              aria-label={copy.passwordLabel}
              name="password"
              type={visible ? "text" : "password"}
              autoComplete="current-password"
              placeholder={copy.passwordPlaceholder}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="password-toggle"
              type="button"
              onClick={() => setVisible(!visible)}
              aria-label={visible ? copy.hidePassword : copy.showPassword}
              aria-pressed={visible}
            >
              <Icon name={visible ? "eye-off" : "eye"} />
            </button>
          </label>
        </div>
        <button className="primary-button login-button" type="submit">
          {copy.login}
        </button>
        <div className="account-options">
          <Checkbox checked={remember} onChange={setRemember}>
            {copy.remember}
          </Checkbox>
          <button
            className="text-link"
            type="button"
            onClick={() => onForgot()}
          >
            {copy.forgot}
          </button>
        </div>
        <button
          className="signup-button"
          type="button"
          onClick={() => onSignup()}
        >
          {copy.signup}
        </button>
        <div className="agreement">
          <Checkbox
            checked={agreed}
            onChange={(value) => {
              setAgreed(value)
              setError("")
            }}
            className="agreement-checkbox"
            ariaLabel={copy.agreeAria}
          />
          <p>
            {copy.agreeLead}
            <br className="desktop-break" />{" "}
            <button
              type="button"
              className="text-link"
              onClick={() => onOpen("terms")}
            >
              {copy.terms}
            </button>{" "}
            {copy.and}{" "}
            <button
              type="button"
              className="text-link"
              onClick={() => onOpen("privacy")}
            >
              {copy.privacy}
            </button>
          </p>
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  )
}

function AppRoutes({
  region,
  onRegionChange,
}: {
  region: Region
  onRegionChange: (next: Region) => void
}) {
  /* 当前地区对应的页面集合。两套导出结构完全一致，只是文件各自独立 */
  const R: typeof Sg = region === "my" ? My : region === "hk" ? Hk : Sg
  const [modal, setModal] = useState<ModalName>(null)
  const [page, setPage] = useState(window.location.hash)
  const [reviewStaff, setReviewStaff] = useState({ id: 1, name: "Tina Fang", nric: "S5486 1256" })
  const [reviewStaffList, setReviewStaffList] = useState<
    { id: number; name: string; nric: string }[]
  >([])
  const [askSubmit, setAskSubmit] = useState(false)
  const [eattSheet, setEattSheet] = useState<{ iso: string; date: string } | null>(null)
  const [historySheet, setHistorySheet] = useState<HistorySheet | null>(null)
  /* 建单流程：上一步在雇主页选好的部门 */
  const [requisitionDept, setRequisitionDept] = useState("")
  /* 计费方式：Per Hour 看 Break Hours，Per Room 看 Room 数量 */
  const [billingMode, setBillingMode] = useState<"hour" | "room">("hour")
  /* Staff Clothing：点列表某一行带过去的单据信息 */
  const [clothingRequest, setClothingRequest] = useState<ClothingRequestInfo | null>(null)
  /* 明细页签完名带回列表页的成功提示 + 要翻成 Revised 的那一天 */
  const [historyNotice, setHistoryNotice] = useState("")
  const [historyRevisedIso, setHistoryRevisedIso] = useState("")
  /* 单人评价页点返回时回到来的那一页（考勤表 / 考勤明细） */
  const [reviewFrom, setReviewFrom] = useState("attendance")
  const isIpadViewport =
    new URLSearchParams(window.location.search).get("viewport") === "ipad"

  useEffect(() => {
    const updatePage = () => {
      setPage(window.location.hash)
      setModal(null)
    }
    window.addEventListener("hashchange", updatePage)
    return () => window.removeEventListener("hashchange", updatePage)
  }, [])

  if (!isIpadViewport) return <IpadPreview />

  /* 考勤页三个地区共用同一份；`billing` 决定列头是 Break Hours 还是 Room。
     香港只做「按小時」计费，付款方式页已下线，所以固定传 hour。 */
  const attendanceView = (
    <R.AttendancePage
      onBack={() => {
        window.location.hash = "employer"
      }}
      onWriteReview={(staff, target) => {
        setReviewStaff(staff)
        setReviewFrom("attendance")
        /* 人物卡点 Reviews 先落在该员工的 Staff Reviews 页 */
        window.location.hash = target ?? "write-review"
      }}
      onBatchReview={(staff) => {
        setReviewStaffList(staff)
        window.location.hash = "batch-review"
      }}
      onCheckHistory={() => {
        /* 提交成功后的 Check History → 直接进 History 列表 */
        window.location.hash = "history"
      }}
      askSubmit={askSubmit}
      onSubmitHandled={() => setAskSubmit(false)}
      billing={region === "hk" ? "hour" : billingMode}
    />
  )

  if (page === "#attendance") return attendanceView
  /* 香港没有付款方式页：旧链接进来也直接落在「按小時」的考勤页 */
  if (page === "#billing-method" && region === "hk") return attendanceView
  /* 香港：签到二维码整页（考勤页右上「二維碼」进入） */
  if (page === "#qr-code" && region === "hk") {
    return (
      <Hk.QrCodePage
        onBack={() => {
          window.location.hash = "attendance"
        }}
      />
    )
  }
  /* 香港：批量編輯工作（簽到 / 簽退 的批量編輯欄 与 電子考勤列表 標題右側
     的「編輯工作」进入，返回按进来时的来源原路回去） */
  if (page === "#edit-job" && region === "hk") {
    return (
      <Hk.EditJobPage
        onBack={() => {
          window.location.hash = Hk.takeEditJobOrigin()
        }}
      />
    )
  }

  /* 香港：添加新員工整页（簽到 / 簽退 与 電子考勤列表 的「加人」进入，
     返回按进来时的来源原路回去） */
  if (page === "#add-staff" && region === "hk") {
    return (
      <Hk.AddStaffPage
        onBack={() => {
          window.location.hash = Hk.takeAddStaffOrigin()
        }}
      />
    )
  }

  /* 香港：门卫打卡整页（部门主页的「門衛打卡」卡片进入） */
  if (page === "#gate-checkin" && region === "hk") {
    return (
      <Hk.GateCheckinPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  /* 香港：日誌整页（考勤页 / 電子考勤明細页点日誌图标进入，返回原来那一页） */
  if (page === "#log" && region === "hk") {
    return (
      <Hk.LogPage
        onBack={() => {
          window.location.hash = Hk.takeLogOrigin()
        }}
      />
    )
  }

  if (page === "#reviews") {
    return (
      <R.ReviewPage
        staff={reviewStaff}
        onBack={() => {
          /* 从哪张考勤表 / 明细进的人物卡，返回就回哪一页 */
          window.location.hash = reviewFrom
        }}
        onWrite={() => {
          window.location.hash = "write-review"
        }}
        onWorkRecord={() => {
          window.location.hash = "work-record"
        }}
      />
    )
  }

  /* 員工的工作記錄（Staff Reviews 右上「Work Record」进入，返回那一页） */
  if (page === "#work-record") {
    return (
      <R.WorkRecordPage
        staff={reviewStaff}
        onBack={() => {
          window.location.hash = "reviews"
        }}
      />
    )
  }

  if (page === "#write-review") {
    return <R.WriteReviewPage staff={reviewStaff} onBack={() => { window.location.hash = "reviews" }} onSubmit={() => { window.location.hash = "reviews" }} onSkip={() => { window.location.hash = reviewFrom }} />
  }

  if (page === "#batch-review") {
    return <R.BatchReviewPage staffList={reviewStaffList} onBack={() => { window.location.hash = "attendance" }} onSubmit={() => { setAskSubmit(true); window.location.hash = "attendance" }} onSkip={() => { setAskSubmit(true); window.location.hash = "attendance" }} />
  }

  if (page === "#e-attendance-list") {
    return (
      <R.EAttendanceListPage
        onBack={() => {
          window.location.hash = "employer"
        }}
        onOpenRecord={(record) => {
          setEattSheet(record)
          window.location.hash = "e-attendance-detail"
        }}
      />
    )
  }

  if (page === "#e-attendance-detail") {
    return (
      <R.EAttendanceDetailPage
        sheet={eattSheet}
        onBack={() => {
          window.location.hash = "e-attendance-list"
        }}
        onWriteReview={(staff, target) => {
          setReviewStaff(staff)
          setReviewFrom("e-attendance-detail")
          window.location.hash = target ?? "write-review"
        }}
      />
    )
  }

  if (page === "#history") {
    return (
      <R.HistoryPage
        onBack={() => {
          window.location.hash = "employer"
        }}
        onOpenRecord={(record) => {
          setHistorySheet(record)
          window.location.hash = "history-detail"
        }}
        notice={historyNotice}
        revisedIso={historyRevisedIso}
        onNoticeShown={() => {
          setHistoryNotice("")
          setHistoryRevisedIso("")
        }}
      />
    )
  }

  if (page === "#history-detail") {
    return (
      <R.HistoryDetailPage
        sheet={historySheet}
        onBack={() => {
          window.location.hash = "history"
        }}
        onSubmitted={(message, iso) => {
          /* 签完名：回列表页，在那里弹成功提示并把这条标成 Revised */
          setHistoryNotice(message)
          setHistoryRevisedIso(iso)
          window.location.hash = "history"
        }}
        onWriteReview={(staff, target) => {
          setReviewStaff(staff)
          setReviewFrom("history-detail")
          window.location.hash = target ?? "write-review"
        }}
      />
    )
  }

  if (page === "#forgot") {
    return (
      <R.ForgotPage
        onBack={() => {
          window.location.hash = ""
        }}
      />
    )
  }

  if (page === "#signup") {
    return (
      <R.SignUpPage
        onBack={() => {
          window.location.hash = ""
        }}
        onLogin={() => {
          window.location.hash = ""
        }}
      />
    )
  }

  if (page === "#department-home") {
    return (
      <R.DepartmentHomePage
        onOpenAttendance={() => {
          window.location.hash = "employer"
        }}
        onOpenNotifications={() => {
          window.location.hash = "notifications"
        }}
        onOpenScan={() => {
          window.location.hash = "scan"
        }}
        onOpenVerify={() => {
          window.location.hash = "verify-code"
        }}
        onOpenFeedback={() => {
          window.location.hash = "customer-feedback"
        }}
        onOpenChangePassword={() => {
          window.location.hash = "change-password"
        }}
        onOpenCompanyInfo={() => {
          window.location.hash = "company-info"
        }}
      />
    )
  }

  if (page === "#company-info") {
    return (
      <R.CompanyInfoPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#customer-feedback") {
    return (
      <R.CustomerFeedbackPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#billing-method") {
    return (
      <R.BillingMethodPage
        onBack={() => {
          window.location.hash = "employer"
        }}
        onPerHour={() => {
          setBillingMode("hour")
          window.location.hash = "attendance"
        }}
        onPerRoom={() => {
          setBillingMode("room")
          window.location.hash = "attendance"
        }}
      />
    )
  }

  if (page === "#change-password") {
    return (
      <R.ChangePasswordPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#verify-code") {
    return (
      <R.VerifyCodePage
        onBack={() => {
          window.location.hash = "department-home"
        }}
        onDone={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#scan") {
    return (
      <R.ScanPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#redeem") {
    return (
      <R.RedeemPage
        onBack={() => {
          /* 回部門主頁而不是回掃描頁：掃描頁 3 秒後會再自動進來，會變成死循環 */
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#notifications") {
    return (
      <R.NotificationPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
      />
    )
  }

  if (page === "#employer") {
    return (
      <R.EmployerPage
        onBack={() => {
          window.location.hash = "department-home"
        }}
        onBillingMethod={() => {
          /* 香港只保留「按小時」计费：不经过付款方式页，直接进考勤 */
          if (region === "hk") {
            setBillingMode("hour")
            window.location.hash = "attendance"
            return
          }
          window.location.hash = "billing-method"
        }}
        onAttendanceList={() => {
          window.location.hash = "e-attendance-list"
        }}
        onHistory={() => {
          window.location.hash = "history"
        }}
        onRequisition={(department) => {
          setRequisitionDept(department)
          window.location.hash = "labour-requisition"
        }}
        onClothing={() => {
          window.location.hash = "staff-clothing"
        }}
      />
    )
  }

  if (page === "#staff-clothing") {
    return (
      <R.StaffClothingPage
        onBack={() => {
          window.location.hash = "employer"
        }}
        onOpenRequest={(request) => {
          setClothingRequest(request)
          window.location.hash = "staff-clothing-size"
        }}
      />
    )
  }

  if (page === "#staff-clothing-size") {
    return (
      <R.StaffClothingSizePage
        request={clothingRequest}
        onBack={() => {
          window.location.hash = "staff-clothing"
        }}
      />
    )
  }

  if (page === "#labour-requisition") {
    return (
      <R.LabourRequisitionPage
        department={requisitionDept}
        onBack={() => {
          window.location.hash = "employer"
        }}
      />
    )
  }

  return (
    <main className="sign-in-page ipad-app">
      <div className="landscape" aria-hidden="true" />
      <LocationNavigation region={region} onRegionChange={onRegionChange} />
      <LoginCard
        region={region}
        onOpen={setModal}
        onLogin={() => {
          window.location.hash = "department-home"
        }}
        onSignup={() => {
          window.location.hash = "signup"
        }}
        onForgot={() => {
          window.location.hash = "forgot"
        }}
      />
      {modal && (
        <Dialog key={modal} modal={modal} region={region} onClose={() => setModal(null)} />
      )}
    </main>
  )
}

/**
 * 真实页面外面包一层 iPad 外壳（IpadPreview）时，外壳右下角有 Copy 按钮；
 * 这里只挂一个接收抓取请求的桥，按钮本身不落在设计稿里。
 */
export default function App() {
  const isIpadViewport =
    new URLSearchParams(window.location.search).get("viewport") === "ipad"
  /* 地区由 URL 决定，刷新或分享链接后仍是同一个地区的页面 */
  const [region, setRegion] = useState<Region>(readRegion)

  /* 给 <html> 打标记：各地区的差异样式统一写成 html.region-my / html.region-hk xxx，
     不写这一层的一律沿用新加坡的样式 */
  useEffect(() => {
    document.documentElement.classList.toggle("region-my", region === "my")
    document.documentElement.classList.toggle("region-hk", region === "hk")
    return () => {
      document.documentElement.classList.remove("region-my")
      document.documentElement.classList.remove("region-hk")
    }
  }, [region])

  useEffect(() => {
    function sync() {
      setRegion(readRegion())
    }
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  if (!isIpadViewport) return <IpadPreview />

  return (
    <>
      <AppRoutes
        region={region}
        onRegionChange={(next) => {
          setRegion(next)
          writeRegion(next)
        }}
      />
      <FigmaCopyBridge />
    </>
  )
}
