
export const hours = (new Array(24)).fill(null).map((_, i) => i)

export const normaliseOffset = (offset) => {
  if (offset > 12) {
    return normaliseOffset(offset - 24)
  } else if (offset < -12) {
    return normaliseOffset(offset + 24)
  } else {
    return offset
  }
}

export const getOffsetText = (offset) => {
  if (offset >= 0) {
    const offsetHour = Math.floor(offset)
    const offsetMinutes = Math.floor((offset - offsetHour) * 60)
    const minuteText = (offsetMinutes < 10) ? `0${offsetMinutes.toFixed(0)}` : offsetMinutes.toFixed(0)
    return `+${offsetHour.toFixed(0)}:${minuteText}`
  } else {
    return `-${getOffsetText(-offset).slice(1)}`
  }
}