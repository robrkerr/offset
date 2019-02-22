
export const hours = (new Array(24)).fill(null).map((_, i) => i)

export const normaliseOffset = (offset) => {
  if (offset > 12) {
    return normaliseOffset(offset - 12)
  } else if (offset < -12) {
    return normaliseOffset(offset + 12)
  } else {
    return offset
  }
}