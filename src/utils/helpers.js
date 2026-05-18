export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}
