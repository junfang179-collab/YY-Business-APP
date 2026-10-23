/**
 * 表格里的复选按钮。
 *
 * 为什么不用原生 `input` + `::after` 画勾：
 * 伪元素不在 DOM 树里，复制到 Figma 时勾会整个丢掉，只剩一个蓝色方块。
 * 这里改成「隐藏的原生 input（保交互 / 可聚焦） + 真实 span + 内联 SVG 勾」，
 * 视觉层全部是可被抓取的实体节点。
 */
export default function AttendanceCheck({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
}) {
  return (
    <label className="attendance-check-wrap">
      <input
        type="checkbox"
        className="attendance-check"
        aria-label={label}
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="attendance-check-box" aria-hidden="true">
        {/* 未选中就整个不渲染：靠 opacity 隐藏的话，Figma 侧一旦忽略 opacity 勾就会露出来 */}
        {checked && (
          <svg viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.4 5.9 4.8 9.3 11.6 1.7"
              stroke="#fff"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </label>
  )
}
