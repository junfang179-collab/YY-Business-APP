import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import BackIcon from "./BackIcon"
import "./attendance.css"
import "./e-attendance.css"
import "./staff-clothing.css"

/** 从 Staff Clothing 列表带过来的一单 */
export type ClothingRequestInfo = {
  date: string
  time: string
  jobTitle: string
}

type Size = "Small" | "Medium" | "Large" | "X-Large" | "XX-Large"
type Gender = "Male" | "Female"

type StaffRow = {
  id: number
  name: string
  nric: string
  gender: Gender
  size: Size
}

const SIZES: Size[] = ["Small", "Medium", "Large", "X-Large", "XX-Large"]

/** 这一单里报名的员工 */
const staffList: StaffRow[] = [
  { id: 1, name: "Anni", nric: "42011619892235", gender: "Male", size: "Small" },
  { id: 2, name: "Wang", nric: "42011619895555", gender: "Male", size: "Small" },
  { id: 3, name: "Li", nric: "42011619898888", gender: "Male", size: "Small" },
  { id: 4, name: "Chen Hui", nric: "42011619902211", gender: "Female", size: "Small" },
  { id: 5, name: "Nurul Aisyah", nric: "S9012334A", gender: "Female", size: "Small" },
  { id: 6, name: "Tan Wei Ming", nric: "S8821445B", gender: "Male", size: "Medium" },
  { id: 7, name: "Siti Rahman", nric: "S9345678C", gender: "Female", size: "Medium" },
  { id: 8, name: "Kumar Raj", nric: "S8712345D", gender: "Male", size: "Medium" },
  { id: 9, name: "Joanne Lim", nric: "S9023456E", gender: "Female", size: "Medium" },
  { id: 10, name: "Ahmad Faizal", nric: "S8211223F", gender: "Male", size: "Large" },
  { id: 11, name: "Grace Tan", nric: "S9334455G", gender: "Female", size: "Large" },
  { id: 12, name: "Liu Yan", nric: "42011619967788", gender: "Female", size: "Large" },
  { id: 13, name: "Muthu Samy", nric: "S7909876H", gender: "Male", size: "XX-Large" },
]

export default function StaffClothingSizePage({
  request,
  onBack,
}: {
  request: ClothingRequestInfo | null
  onBack: () => void
}) {
  const [tab, setTab] = useState<"details" | "statistics">("details")

  const stamp = request ? `(${request.date.split(",")[1]?.trim().slice(0, 6)} ${request.time.slice(0, 8)})` : ""
  const counts = SIZES.map((size) => ({
    size,
    male: staffList.filter((row) => row.size === size && row.gender === "Male").length,
    female: staffList.filter((row) => row.size === size && row.gender === "Female").length,
  }))

  return (
    <main className="attendance-page e-att-page sc-page sca-page">
      <div className="attendance-landscape" aria-hidden="true">
        <div className="attendance-skyline" />
        <div className="attendance-skyline-right" />
      </div>

      <header className="attendance-header">
        <div className="attendance-title-group">
          <nav className="attendance-navigation" aria-label="Page navigation">
            <button
              className="attendance-back"
              onClick={onBack}
              aria-label="Back to Staff Clothing"
            >
              <BackIcon />
            </button>
          </nav>
          <h1>Staff Clothing Size {stamp}</h1>
        </div>
      </header>

      <div className="sc-tabs" role="tablist" aria-label="Staff clothing views">
        <button
          className={`sc-tab${tab === "details" ? " is-active" : ""}`}
          role="tab"
          aria-selected={tab === "details"}
          onClick={() => setTab("details")}
        >
          Details
        </button>
        <button
          className={`sc-tab${tab === "statistics" ? " is-active" : ""}`}
          role="tab"
          aria-selected={tab === "statistics"}
          onClick={() => setTab("statistics")}
        >
          Statistics
        </button>
      </div>

      {tab === "details" ? (
        <section className="attendance-panel e-att-panel sc-panel" aria-label="Staff clothing sizes">
          <div className="sc-size-head" aria-hidden="true">
            <span>#</span>
            <span>Name</span>
            <span>NRIC</span>
            <span>Gender</span>
            <span>Clothing size</span>
          </div>
          <ul className="sc-rows">
            {staffList.map((row, index) => (
              <li key={row.id} className="sc-size-row">
                <span className="sc-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{row.name}</span>
                <span>{row.nric}</span>
                <span>{row.gender}</span>
                <span className="sc-size-value">{row.size}</span>
              </li>
            ))}
          </ul>
          <p className="e-att-end">No More Data.</p>
        </section>
      ) : (
        <section className="attendance-panel e-att-panel sc-panel sca-stat-panel" aria-label="Clothing size statistics">
          <table className="sca-stat-table">
            <thead>
              <tr>
                <th scope="col">Size/Gender</th>
                <th scope="col">Male</th>
                <th scope="col">Female</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {counts.map((row) => (
                <tr key={row.size}>
                  <th scope="row">{row.size}</th>
                  <td>{row.male}</td>
                  <td>{row.female}</td>
                  <td className="is-total">{row.male + row.female}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}
    </main>
  )
}
