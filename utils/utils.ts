const isKeyInObject = (obj: Object, key: string): boolean => {
  const k = Object.keys(obj).find(v => v === key)
  if (k) return true
  return false
}

export {
  isKeyInObject
}
