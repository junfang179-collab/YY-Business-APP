import { useMemo, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Clock01Icon } from "@hugeicons/core-free-icons"
import { TimeSheet } from "./AttendancePage"

import BackIcon from "../BackIcon"
/* ── 示意二维码 ────────────────────────────────────────────
   真扫码不是原型要验的东西，这里按二维码的视觉规则画一张：
   27×27 模块、三个定位角（7×7 外框 + 3×3 实心）、定位角之间
   的 timing 线，其余用固定种子的伪随机填点 —— 种子写死，所以
   每次渲染图案都一样，不会闪。
   全部栅格合并成一条 path（Figma 那边就只有一个矢量节点）。 */
const QR_MODULES = 27

function buildQrArt() {
  const size = QR_MODULES
  let seed = 20261026
  const rand = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648
    return seed / 2147483648
  }

  /* 定位角占 7×7，外面还留一圈空白（8×8 范围） */
  const inFinder = (x: number, y: number) => {
    const near = (ox: number, oy: number) =>
      x >= ox && x < ox + 8 && y >= oy && y < oy + 8
    return near(0, 0) || near(size - 8, 0) || near(0, size - 8)
  }

  let dots = ""
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (inFinder(x, y)) continue
      /* timing line：第 6 行 / 第 6 列黑白相间 */
      const timing = y === 6 || x === 6 ? (x + y) % 2 === 0 : null
      const filled = timing ?? rand() > 0.5
      if (filled) dots += `M${x} ${y}h1v1h-1z`
    }
  }

  const finders = [
    [0, 0],
    [size - 7, 0],
    [0, size - 7],
  ]
    .map(([ox, oy]) =>
      [
        `M${ox} ${oy}h7v7h-7z`,
        `M${ox + 1} ${oy + 1}h5v5h-5z`,
        `M${ox + 2} ${oy + 2}h3v3h-3z`,
      ].join(""),
    )
    .join("")

  return { dots, finders }
}

/** 二维码图形；门卫打卡页的 QR 弹窗复用同一份，图案保持一致 */
export function QrArt() {
  const art = useMemo(buildQrArt, [])
  return (
    <svg
      className="qr-art"
      viewBox={`0 0 ${QR_MODULES} ${QR_MODULES}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <path d={art.dots} fill="#16233a" />
      {/* evenodd：外框减去中间一圈，再补回中心方块 */}
      <path d={art.finders} fill="#16233a" fillRule="evenodd" />
    </svg>
  )
}

/**
 * 签到二维码整页。运营在同一台 iPad 上开给员工扫，所以信息只有三块：
 * 这段码管用的时间范围、码本身、一句怎么用。
 * 结束时间可以落到明天（跨夜班次），所以滚轮里带日期列。
 */
export default function QrCodePage({ onBack }: { onBack: () => void }) {
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  /* 结束时间落到哪一天：空 = 今天，否则是 YYYY-MM-DD */
  const [endDate, setEndDate] = useState("")
  const [picking, setPicking] = useState<"start" | "end" | null>(null)

  const today = (() => {
    const now = new Date()
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`
  })()
  const endText = end
    ? `${endDate && endDate !== today ? "明天" : "今天"} ${end}`
    : ""

  return (
    <main className="attendance-page qr-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="頁面導覽">
            <button
              className="attendance-back"
              onClick={onBack}
              aria-label="返回簽到 / 簽退"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>二維碼</h1>
        </div>
      </header>

      <section className="attendance-panel qr-panel" aria-label="簽到二維碼">
        <div className="qr-range">
          <div className="qr-field">
            <span className="qr-label">開始時間：</span>
            <button
              type="button"
              className={`qr-value${start ? "" : " is-empty"}`}
              onClick={() => setPicking("start")}
              aria-label={
                start ? `開始時間 ${start}，點擊修改` : "選擇開始時間"
              }
            >
              <span>{start || "選擇開始時間"}</span>
              <HugeiconsIcon
                icon={Clock01Icon}
                size={23}
                strokeWidth={1.8}
                color="currentColor"
              />
            </button>
          </div>
          <div className="qr-field">
            <span className="qr-label">結束時間：</span>
            <button
              type="button"
              className={`qr-value${endText ? "" : " is-empty"}`}
              onClick={() => setPicking("end")}
              aria-label={
                endText ? `結束時間 ${endText}，點擊修改` : "選擇結束時間"
              }
            >
              <span>{endText || "選擇結束時間"}</span>
              <HugeiconsIcon
                icon={Clock01Icon}
                size={23}
                strokeWidth={1.8}
                color="currentColor"
              />
            </button>
          </div>
        </div>

        <div className="qr-card">
          <QrArt />
        </div>

        <p className="qr-hint">請掃上面的二維碼進行簽到簽出</p>
      </section>

      {picking && (
        <TimeSheet
          title={picking === "start" ? "開始時間" : "結束時間"}
          withDate={picking === "end"}
          initialDate={picking === "end" && endDate ? endDate : undefined}
          initial={(picking === "start" ? start : end) || "09:00"}
          note=""
          onCancel={() => setPicking(null)}
          onConfirm={(value, date) => {
            if (picking === "start") setStart(value)
            else {
              setEnd(value)
              setEndDate(date ?? today)
            }
            setPicking(null)
          }}
        />
      )}
    </main>
  )
}
