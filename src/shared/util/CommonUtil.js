export const isNull = (obj) => {
  return obj == null && (obj === undefined || typeof obj === 'undefined')
}

export const isNullOrEmpty = (obj) => {
  if (isNull(obj)) return true
  if (typeof obj === 'string') if (obj.length < 1) return true
  return false
}

export const isNullOrBlank = (obj) => {
  if (isNull(obj)) return true
  if (typeof obj === 'string') if (obj.trim().length < 1) return true
  return false
}
