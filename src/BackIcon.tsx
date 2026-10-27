/**
 * 全項目統一的返回圖標（2026-10-26 統一樣式）。
 *
 * 白色圓底 + 藍色折角箭頭。折角角度、線寬都是按參考圖量出來的比例定的：
 * 箭頭高 ≈ 圓徑的 0.29、線寬 ≈ 箭頭高的 0.16（比原來的細箭頭粗一倍）。
 *
 * 顏色直接寫死在 path 上，不用 currentColor —— Figma 抓取時 currentColor 容易失效；
 * 圓底的顏色、投影、尺寸由各頁的 CSS（.attendance-back / .notice-back /
 * .employer-back / .signup-back / 評價頁頭部按鈕）統一負責，各頁只按自己的縮放變量換算大小。
 */
export default function BackIcon() {
  return (
    <svg viewBox="0 0 44 44" fill="none" aria-hidden="true" focusable="false">
      <path
        d="m30 9-16 14 16 14"
        stroke="#1689eb"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
