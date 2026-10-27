import { useEffect, useState } from "react"
import BackIcon from "./BackIcon"
import "./employer.css"
import "./redeem.css"

/**
 * Redeem Goods：掃描 QR 後進入的兌換頁。
 * 信息結構參考客戶舊系統：返回 + 標題 / 可兌換清單（縮圖、名稱、兌換期限、所需積分、勾選）/
 * 底部「全選 + 兌換」。視覺沿用雇主页那套玻璃面板與純色藍按鈕。
 */

type Reward = {
  id: string
  name: string
  image: string
  window: string
  points: number
}

const REWARDS: Reward[] = [
  {
    id: "warmer",
    name: "Thermal Food Warmer Stainless Steel",
    image: "/assets/redeem-warmer.webp",
    window: "2024/02/05 ~ 2030/12/31",
    points: 1,
  },
  {
    id: "bottle",
    name: "Vacuum Insulated Bottle 500ml",
    image: "/assets/redeem-bottle.webp",
    window: "2024/03/01 ~ 2030/12/31",
    points: 3,
  },
  {
    id: "tote",
    name: "Canvas Tote Bag",
    image: "/assets/redeem-tote.webp",
    window: "2024/05/12 ~ 2030/12/31",
    points: 5,
  },
  {
    id: "charger",
    name: "Wireless Charging Pad",
    image: "/assets/redeem-charger.webp",
    window: "2024/06/18 ~ 2030/12/31",
    points: 8,
  },
]

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="m5 12.4 4.5 4.5L19 7.2"
        stroke="#fff"
        strokeWidth="2.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function RedeemPage({ onBack }: { onBack: () => void }) {
  const [picked, setPicked] = useState<string[]>(() => REWARDS.map((item) => item.id))
  const [notice, setNotice] = useState("")

  const allPicked = picked.length === REWARDS.length

  useEffect(() => {
    if (!notice) return
    const timer = window.setTimeout(() => setNotice(""), 3200)
    return () => window.clearTimeout(timer)
  }, [notice])

  function toggle(id: string) {
    setPicked((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    )
  }

  function redeem() {
    setNotice(
      picked.length === 1
        ? "1 item redeemed. Collect it at the HR counter."
        : `${picked.length} items redeemed. Collect them at the HR counter.`,
    )
    setPicked([])
  }

  return (
    <main className="employer-page redeem-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button type="button" className="notice-back" aria-label="Back" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>Redeem Goods</h1>
        <span />
      </header>

      <section className="redeem-panel" aria-label="Redeemable goods">
        <ul className="redeem-list">
          {REWARDS.map((item) => {
            const on = picked.includes(item.id)
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`redeem-item${on ? " is-on" : ""}`}
                  aria-pressed={on}
                  onClick={() => toggle(item.id)}
                >
                  <span className="redeem-thumb">
                    <img src={item.image} alt={item.name} />
                  </span>
                  <span className="redeem-copy">
                    <strong>{item.name}</strong>
                    <span className="redeem-window">Redeemable Time: {item.window}</span>
                    <span className="redeem-points">
                      <b>{item.points}</b> points
                    </span>
                  </span>
                  <span className="redeem-tick" aria-hidden="true">
                    {on && <Check />}
                  </span>
                </button>
              </li>
            )
          })}
        </ul>

        <footer className="redeem-foot">
          <button
            type="button"
            className="redeem-all"
            aria-pressed={allPicked}
            onClick={() => setPicked(allPicked ? [] : REWARDS.map((item) => item.id))}
          >
            <span className={`redeem-all-box${allPicked ? " is-on" : ""}`} aria-hidden="true">
              {allPicked && <Check />}
            </span>
            <span>Select All</span>
          </button>
          <button
            type="button"
            className="redeem-submit"
            disabled={!picked.length}
            onClick={redeem}
          >
            Redeem
          </button>
        </footer>
      </section>

      {notice && (
        <div className="employer-notice" role="status">
          <span>{notice}</span>
          <button type="button" aria-label="Dismiss" onClick={() => setNotice("")}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}
    </main>
  )
}
