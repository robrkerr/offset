import React, { useState } from 'react'
import styled from 'styled-components'
import Hour from './Hour'
import { hours } from '../../utils/hours'

export const Container = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  margin: 1rem 0;
  ${(props) => props.adjustable && 'cursor: grab;'}
  user-select: none;
  overflow-x: hidden;
  overflow-y: hidden;
  flex-shrink: 0;

  &:active {
    ${(props) => props.adjustable && 'cursor: grabbing;'}
  }
`

const getDragPosX = (evt) => {
  const xPos = evt.clientX || evt.touches[0].clientX
  const elementRect = evt.currentTarget.getBoundingClientRect()
  return (xPos - elementRect.x) / elementRect.width
}

const onPanStart = (evt, setPosX) => setPosX(getDragPosX(evt))
const onPanEnd = (_, setPosX) => setPosX(undefined)
const onPanMove = (evt, setDragStartX, startPosX, offset, setOffset) => {
  if (!setOffset || (startPosX === undefined)) { return }
  const hoursToShift = Math.round(4 * 24 * (getDragPosX(evt) - startPosX)) / 4
  if (hoursToShift === 0) { return }
  setOffset(offset + hoursToShift)
  setDragStartX(startPosX + hoursToShift / 24)
}

const Timeline = (props) => {
  const offset = props.offset || 0
  const wholeOffset = Math.ceil(offset)
  const fractionOffset = offset - wholeOffset
  const [ dragStartX, setDragStartX ] = useState(undefined)
  const toggleHour = (hour) => {
    const toggleOn = props.availableHours[hour] === '0'
    const newAvailableHours = props.availableHours.slice(0, hour)
      + (toggleOn ? "1" : "0")
      + props.availableHours.slice(hour + 1)
    props.setAvailableHours(newAvailableHours)
  }
  return (
    <Container adjustable={!!props.setOffset}
      onMouseDown={(e) => onPanStart(e, setDragStartX)}
      onMouseMove={(e) => onPanMove(e, setDragStartX, dragStartX, offset, props.setOffset)}
      onMouseUp={(e) => onPanEnd(e, setDragStartX)}
      onTouchStart={(e) => onPanStart(e, setDragStartX)}
      onTouchMove={(e) => onPanMove(e, setDragStartX, dragStartX, offset, props.setOffset)}
      onTouchEnd={(e) => onPanEnd(e, setDragStartX)}
    >
      {hours.map((hour, i) => {
        const shiftedHour = (hour - wholeOffset + 24) % 24
        return (
          <Hour
            key={shiftedHour}
            hour={((i === 0) && (fractionOffset !== 0)) ? undefined : shiftedHour}
            opacity={(props.availableHours[shiftedHour] === '1') ? 0.8 : 0.4}
            toggle={() => toggleHour(shiftedHour)}
            adjustment={fractionOffset}
          />
        )
      })}
      {(fractionOffset !== 0) && (
        <Hour
          opacity={(props.availableHours[(hours[0] - wholeOffset + 24) % 24] === '1') ? 0.8 : 0.4}
          toggle={() => toggleHour((hours[0] - wholeOffset + 24) % 24)}
          adjustment={fractionOffset}
        />
      )}
    </Container>
  )
}

export default Timeline
