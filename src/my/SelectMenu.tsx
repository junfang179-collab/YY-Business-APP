import { useEffect, useRef, useState } from "react"
import "../select-menu.css"

/**
 * 统一风格的自定义下拉：白卡菜单 + 浅蓝选中态，
 * 替代原生 <select>（原生弹层样式无法控制）。
 */
export function SelectMenu({
  ariaLabel,
  value,
  placeholder,
  options,
  onChange,
  className,
}: {
  ariaLabel: string
  value: string
  placeholder: string
  options: string[]
  onChange: (value: string) => void
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  /* placeholder 有时本身就是合法选项（例如区号 +65）：
     这时候不再额外插一行清空项，否则菜单里会出现两个 +65 */
  const placeholderIsOption = options.includes(placeholder)
  const rows = placeholderIsOption ? options : [placeholder, ...options]

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
    }
    document.addEventListener("pointerdown", onPointerDown)
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("pointerdown", onPointerDown)
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  return (
    <div ref={root} className={`app-select${className ? ` ${className}` : ""}`}>
      <button
        type="button"
        className={`app-select-trigger${value ? "" : " is-empty"}${open ? " is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen(!open)}
      >
        <span>{value || placeholder}</span>
        {/* 下三角必须写成内联 SVG：CSS border 三角不是图形，复制到 Figma 会被整块丢掉 */}
        <svg
          className="app-select-caret"
          viewBox="0 0 16 9"
          xmlns="http://www.w3.org/2000/svg"
          shapeRendering="geometricPrecision"
          aria-hidden="true"
        >
          <path
            d="M0.9 1.1h14.2L8 7.9z"
            fill="#b9c9db"
            stroke="#b9c9db"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul className="app-select-menu" role="listbox">
          {rows.map((option) => {
            const optionValue = !placeholderIsOption && option === placeholder ? "" : option
            const isActive = optionValue === value
            return (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  className={isActive ? "is-active" : undefined}
                  onClick={() => {
                    onChange(optionValue)
                    setOpen(false)
                  }}
                >
                  {option}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
