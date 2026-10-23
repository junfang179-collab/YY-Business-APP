import { useState } from "react"
import "./page-states.css"

/**
 * 页面状态（空数据 / 加载 / 报错 …）。只做展示切换，不参与业务逻辑。
 */
export type PageState =
  | "default"
  | "loading"
  | "empty"
  | "no-results"
  | "error"
  | "offline"

/** 面板里的状态项统一用中性色圆点，选中项才变品牌蓝，避免出现多套配色 */
const PAGE_STATES: { id: PageState; label: string; tone: string }[] = [
  { id: "default", label: "Default list", tone: "slate" },
  { id: "loading", label: "Loading", tone: "slate" },
  { id: "empty", label: "Empty list", tone: "slate" },
  { id: "no-results", label: "No search results", tone: "slate" },
  { id: "error", label: "Load failed", tone: "slate" },
  { id: "offline", label: "No connection", tone: "slate" },
]

/**
 * 悬浮的状态切换器。挂在 <main> 之外，所以不会被 Copy to Figma 抓进设计稿里；
 * 面板本身可以收起，只留右下角一个小圆按钮。
 */
export default function PageStateSwitcher({
  value,
  onChange,
}: {
  value: PageState
  onChange: (next: PageState) => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`page-states${open ? " is-open" : ""}`}>
      {open && (
        <div className="page-states-panel" role="group" aria-label="Page states">
          <div className="page-states-head">
            <strong>Page states</strong>
            <button
              type="button"
              className="page-states-close"
              aria-label="Hide page states"
              onClick={() => setOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="m7 7 10 10M17 7 7 17" />
              </svg>
            </button>
          </div>
          <ul className="page-states-list">
            {PAGE_STATES.map((state) => (
              <li key={state.id}>
                <button
                  type="button"
                  aria-pressed={value === state.id}
                  onClick={() => onChange(state.id)}
                >
                  <span
                    className={`page-states-dot is-${
                      value === state.id ? "blue" : state.tone
                    }`}
                    aria-hidden="true"
                  />
                  <span className="page-states-label">{state.label}</span>
                  {value === state.id && (
                    <svg
                      className="page-states-check"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m5 12.5 4.5 4.5L19 7" />
                    </svg>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        className="page-states-toggle"
        aria-expanded={open}
        aria-label={open ? "Hide page states" : "Show page states"}
        onClick={() => setOpen(!open)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 13 9 5 9-5" />
        </svg>
      </button>
    </div>
  )
}
