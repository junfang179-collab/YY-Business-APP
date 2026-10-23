/** Demo only: 7 generated avatars in /public/assets, cycled by staff id. */
const AVATAR_COUNT = 7

export function staffPhoto(id: number) {
  return `/assets/staff-${((id - 1 + AVATAR_COUNT) % AVATAR_COUNT) + 1}.jpg`
}
