import BackIcon from "./BackIcon"
import "./employer.css"
import "./billing-method.css"

/**
 * Billing Method：从工作台的 Sign In / Sign Out 卡片进来，先选计费方式。
 * 外壳和卡片都直接用工作台（E-Attendance）那一套：.employer-page / .employer-landscape /
 * .employer-header / .employer-module，保证背景、返回按钮、卡片底色完全一致。
 * 两种方式都进考勤页，区别是列名/统计口径（Per Hour → Break Hours + Total Hours，
 * Per Room → Room + Total Rooms）。
 */
export default function BillingMethodPage({
  onBack,
  onPerHour,
  onPerRoom,
}: {
  onBack: () => void
  onPerHour: () => void
  onPerRoom: () => void
}) {
  const methods = [
    {
      id: "hour",
      title: "Per Hour",
      description: "Bill by hours worked.",
      image: "/assets/icon-per-hour.png",
      onSelect: onPerHour,
    },
    {
      id: "room",
      title: "Per Room",
      description: "Bill by rooms served.",
      image: "/assets/icon-per-room.png",
      onSelect: onPerRoom,
    },
  ]

  return (
    <main className="employer-page billing-page">
      <div className="employer-landscape" aria-hidden="true" />

      <header className="employer-header">
        <button
          className="employer-back"
          onClick={onBack}
          aria-label="Back to workspace"
        >
          <BackIcon />
        </button>
        <div>
          <p>Hong Ye Group</p>
          <h1>Billing Method</h1>
        </div>
        <span />
      </header>

      <section className="employer-content billing-content" aria-labelledby="billing-title">
        <div className="employer-heading">
          <p>Sign In / Sign Out</p>
          <h2 id="billing-title">How would you like to bill?</h2>
        </div>
        <div className="employer-grid billing-grid">
          {methods.map((method) => (
            <button
              key={method.id}
              className="employer-module"
              onClick={method.onSelect}
            >
              <span className="employer-module-icon">
                <img src={method.image} alt="" aria-hidden="true" />
              </span>
              <span className="employer-module-copy">
                <strong>{method.title}</strong>
                <small>{method.description}</small>
              </span>
              <span className="employer-module-arrow" aria-hidden="true">
                →
              </span>
            </button>
          ))}
        </div>
      </section>
    </main>
  )
}
