import React, { useState } from 'react'
import styled from 'styled-components'
import Hour from './Hour'
import { hours } from '../../utils/hours'

const Container = styled.div`
  display: flex;
  height: 4rem;
  width: 100%;
  margin: 3rem 0;
  ${(props) => props.adjustable && 'cursor: grab;'}
  user-select: none;
  overflow-x: hidden;

  &:active {
    ${(props) => props.adjustable && 'cursor: grabbing;'}
  }
`

const getMousePosX = (evt) => {
  const elementRect = evt.currentTarget.getBoundingClientRect()
  return (evt.clientX - elementRect.x) / elementRect.width
}

const onMouseDown = (evt, setPosX) => setPosX(getMousePosX(evt))
const onMouseUp = (_, setPosX) => setPosX(undefined)
const onMouseMove = (evt, setDragStartX, startPosX, offset, setOffset) => {
  if (!setOffset || (startPosX === undefined)) { return }
  const hoursToShift = Math.round(4 * 24 * (getMousePosX(evt) - startPosX)) / 4
  if (hoursToShift === 0) { return }
  setOffset(offset + hoursToShift)
  setDragStartX(startPosX + hoursToShift / 24)
}

const Timeline = (props) => {
  const offset = props.offset || 0
  const wholeOffset = Math.ceil(offset)
  const fractionOffset = offset - wholeOffset
  const [ dragStartX, setDragStartX ] = useState(undefined)
  return (
    <Container adjustable={!!props.setOffset}
      onMouseDown={(e) => onMouseDown(e, setDragStartX)}
      onMouseMove={(e) => onMouseMove(e, setDragStartX, dragStartX, offset, props.setOffset)}
      onMouseUp={(e) => onMouseUp(e, setDragStartX)}
    >
      {hours.map((hour, i) => {
        const shiftedHour = (hour - wholeOffset + 24) % 24
        return (
          <Hour
            key={shiftedHour}
            hour={((i === 0) && (fractionOffset !== 0)) ? undefined : shiftedHour}
            opacity={props.officeHours[shiftedHour] ? 0.8 : 0.4}
            adjustment={fractionOffset}
          />
        )
      })}
      {(fractionOffset !== 0) && (
        <Hour
          opacity={props.officeHours[(hours[0] - wholeOffset + 24) % 24] ? 0.8 : 0.4}
          adjustment={fractionOffset}
        />
      )}
    </Container>
  )
}

export default Timeline
