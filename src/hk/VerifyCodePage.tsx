import { useRef, useState } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"

/*
 * 兑换码校验页：信息结构参考稿是「提示文案 + 6 个单字符输入格 + 右下提交」，
 * 这里沿用现有玻璃面板与蓝色主按钮，输入格做成自动跳格的六位码。
 */
export default function VerifyCodePage({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const [code, setCode] = useState<string[]>(Array(6).fill(""))
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const complete = code.every((char) => char !== "")

  const writeAt = (index: number, value: string) => {
    setCode((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  return (
    <main className="employer-page verify-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="返回" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>驗證優惠碼</h1>
        <span />
      </header>

      <section className="verify-panel">
        <div className="verify-body">
          <p className="verify-hint">請輸入以下 6 位驗證碼以完成驗證：</p>
          <div className="verify-inputs">
            {code.map((char, index) => (
              <input
                key={index}
                ref={(node) => {
                  inputs.current[index] = node
                }}
                value={char}
                inputMode="text"
                autoComplete="off"
                aria-label={`驗證碼第 ${index + 1} 位`}
                className={char ? "is-filled" : undefined}
                onChange={(event) => {
                  const value = event.target.value.replace(/\s/g, "")
                  if (!value) return
                  /* 手动输入只取最后一位，退格交给 keydown 处理 */
                  writeAt(index, value.slice(-1).toUpperCase())
                  if (index < 5) inputs.current[index + 1]?.focus()
                }}
                onKeyDown={(event) => {
                  if (event.key === "Backspace") {
                    event.preventDefault()
                    if (code[index]) {
                      writeAt(index, "")
                      return
                    }
                    if (index > 0) {
                      writeAt(index - 1, "")
                      inputs.current[index - 1]?.focus()
                    }
                  }
                  if (event.key === "ArrowLeft" && index > 0) inputs.current[index - 1]?.focus()
                  if (event.key === "ArrowRight" && index < 5) inputs.current[index + 1]?.focus()
                }}
                onPaste={(event) => {
                  const pasted = event.clipboardData.getData("text").replace(/\s/g, "").slice(0, 6)
                  if (!pasted) return
                  event.preventDefault()
                  setCode(
                    Array.from({ length: 6 }, (_, slot) => pasted[slot]?.toUpperCase() ?? ""),
                  )
                  inputs.current[Math.min(pasted.length, 5)]?.focus()
                }}
              />
            ))}
          </div>
          <div className="verify-actions">
            <button type="button" className="verify-submit" disabled={!complete} onClick={onDone}>
              
              提交
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
