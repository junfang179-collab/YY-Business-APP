import { useState } from "react"
import BackIcon from "../BackIcon"
import "../employer.css"
import "../customer-feedback.css"
import { readLogTarget } from "./logStore"

/**
 * 日誌整页。信息结构参考客户的旧系统：返回栏 + 一张白卡，
 * 卡里三列 —— 操作類型 / 日期時間 / 內容，一行一条记录，最新的在最上面。
 * 视觉沿用「客戶意見 / 編輯工作」那套（玻璃圆返回 + 白卡 + 细分割线）。
 */
export default function LogPage({ onBack }: { onBack: () => void }) {
  const [target] = useState(readLogTarget)

  return (
    <main className="employer-page cf-page log-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="notice-header">
        <button
          type="button"
          className="notice-back"
          aria-label="返回"
          onClick={onBack}
        >
          <BackIcon />
        </button>
        <h1>日誌</h1>
        <span />
      </header>

      <section className="cf-panel log-panel" aria-label="日誌記錄">
        {target ? (
          <>
            <div className="log-meta">
              <strong>{target.name}</strong>
              <span className="log-meta-sep" aria-hidden="true" />
              <span>
                {target.department} · {target.jobTitle}
              </span>
            </div>

            <div className="log-scroller">
              <table className="log-table">
                <colgroup>
                  <col style={{ width: "24%" }} />
                  <col style={{ width: "28%" }} />
                  <col style={{ width: "48%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">操作類型</th>
                    <th scope="col">日期時間</th>
                    <th scope="col">內容</th>
                  </tr>
                </thead>
                <tbody>
                  {target.entries.map((entry) => (
                    <tr key={`${entry.type}-${entry.time}`}>
                      <td className="log-type">{entry.type}</td>
                      <td className="log-time">{entry.time}</td>
                      <td className="log-content">{entry.content}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : (
          <p className="log-empty">暫無日誌記錄</p>
        )}
      </section>
    </main>
  )
}
