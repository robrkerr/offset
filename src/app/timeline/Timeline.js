import React from 'react'
import styled from 'styled-components'
import Hour from './Hour'
import { hours } from '../../utils/hours'
import { useDragState } from '../../utils/hooks'

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

const Timeline = (props) => {
  const offset = props.offset || 0
  const wholeOffset = Math.ceil(offset)
  const fractionOffset = offset - wholeOffset
  const dragHandlers = useDragState((shift) => props.setOffset(offset + shift))
  const toggleHour = (hour) => {
    const toggleOn = props.availableHours[hour] === '0'
    const newAvailableHours = props.availableHours.slice(0, hour)
      + (toggleOn ? "1" : "0")
      + props.availableHours.slice(hour + 1)
    props.setAvailableHours(newAvailableHours)
  }
  return (
    <Container adjustable={!!props.setOffset} {...dragHandlers}>
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
