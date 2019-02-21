import React, { useState } from 'react'
import styled from 'styled-components'
import Hour from './Hour'
import { hours } from '../../utils/hours'

const Container = styled.div`
  display: flex;
  height: 3rem;
  width: 100%;
  margin: 4rem 0;
  cursor: pointer;
  user-select: none;
`

const getMousePosX = (evt) => {
  const elementRect = evt.currentTarget.getBoundingClientRect()
  return (evt.clientX - elementRect.x) / elementRect.width
}

const onMouseDown = (evt, setPosX) => setPosX(getMousePosX(evt))
const onMouseUp = (_, setPosX) => setPosX(undefined)
const onMouseMove = (evt, setDragStartX, startPosX, offset, setOffset) => {
  if (!setOffset || (startPosX === undefined)) { return }
  const hoursToShift = Math.round(24 * (getMousePosX(evt) - startPosX))
  if (hoursToShift === 0) { return }
  setOffset(offset + hoursToShift)
  setDragStartX(startPosX + hoursToShift / 24)
}

const Timeline = (props) => {
  const offset = props.offset || 0
  const [ dragStartX, setDragStartX ] = useState(undefined)
  return (
    <Container
      onMouseDown={(e) => onMouseDown(e, setDragStartX)}
      onMouseMove={(e) => onMouseMove(e, setDragStartX, dragStartX, offset, props.setOffset)}
      onMouseUp={(e) => onMouseUp(e, setDragStartX)}
    >
      {hours.map((hour, i) => {
        const shiftedHour = (hour - offset + 24) % 24
        return (
          <Hour key={i} hour={shiftedHour} opacity={props.officeHours[shiftedHour] ? 0.8 : 0.4} />
        )
      })}
    </Container>
  )
}

export default Timeline
