import { HugeiconsIcon } from "@hugeicons/react"
import { StarCircleIcon } from "@hugeicons/core-free-icons"
import { AttendanceDialog, lookupStaffProfile } from "./AddStaffForm"
import { staffPhoto } from "./staffPhoto"

/**
 * The card that sits between a shift row and the review flow: tapping a
 * person's Name or NRIC opens their information first, so the manager can
 * check identity before writing anything. "Reviews" then opens that person's
 * Staff Reviews page; writing a new review starts from there.
 *
 * Information architecture: avatar → name → NRIC + Date of birth → Reviews.
 */
export type ProfileSubject = {
  id: number
  name: string
  nric: string
}

/** "YYSG135174" → "Y***5174" — the middle stays hidden, as on the staff card. */
function maskId(nric: string) {
  const value = nric.replace(/\s/g, "")
  if (value.length < 6) return value
  return `${value.charAt(0)}***${value.slice(-4)}`
}

export function StaffProfileDialog({
  person,
  onClose,
  onWriteReview,
}: {
  person: ProfileSubject
  onClose: () => void
  /**
   * "reviews" → 先看這位員工的 Staff Reviews 頁（單人評價不再從這裏直接進寫評價頁）；
   * "write-review" → 迳直進寫評價頁（其它入口的舊行為）。
   */
  onWriteReview: (target?: "reviews" | "write-review") => void
}) {
  const name = person.name.replace(/\s*\n\s*/g, " ")
  const nric = person.nric.replace(/\s/g, "")
  const profile = lookupStaffProfile(nric)

  return (
    <AttendanceDialog title="Personal information" onClose={onClose}>
      <div className="attendance-profile">
        <img src={staffPhoto(person.id)} alt="" />
        <h3>{name}</h3>
        <div className="attendance-profile-fields">
          <div>
            <span>NRIC</span>
            <strong>{maskId(nric)}</strong>
          </div>
          <div>
            <span>Date of birth</span>
            <strong>{profile?.birth ?? "—"}</strong>
          </div>
        </div>
        <button
          className="attendance-blue-button attendance-profile-review"
          onClick={() => onWriteReview("reviews")}
        >
          <HugeiconsIcon icon={StarCircleIcon} size={20} strokeWidth={1.9} color="currentColor" />
          Reviews
        </button>
      </div>
    </AttendanceDialog>
  )
}
