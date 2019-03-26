import React, { useState } from 'react'
import styled from 'styled-components'
import { colours } from '../../utils/styles'

const Box = styled.div`
  width: 100%;
  height: calc(100% - 1rem);
  opacity: ${(props) => props.opacity || 1};
  background: ${(props) => props.colour || colours.primary};
  cursor: pointer;

  &:hover {
    opacity: ${(props) => Math.min(props.opacity + 0.1) || 1};
  }
`

const TextContainer = styled.div`
  width: 100%;
  height: 1.1rem;
  text-align: left;
  font-size: 0.75rem;
  white-space: nowrap;

  @media (max-width: 700px) {
    ${(props) => props.minor && 'visibility: hidden;'}
  }
`

const TextNumber = styled.span`
  display: inline-block;
`

const TextSuffix = styled.span`
  display: inline-block;
  font-size: 0.55rem;
`

const Container = styled.div`
  width: 4.17%;
  height: 100%;
  position: relative;
  ${(props) => props.adjustment && `left: ${props.adjustment * 4.17}%;`}
  flex-shrink: 0;
`

const formatHour = (hour) => {
  if (hour > 12) {
    return { number: `${hour - 12}`, suffix: 'PM' }
  } else if (hour < 12 && hour > 0) {
    return { number: `${hour}`, suffix: 'AM' }
  } else if (hour === 0) {
    return { number: '12', suffix: 'AM' }
  } else if (hour === 12) {
    return { number: '12', suffix: 'PM' }
  }
  return {}
}

const clickStart = (e, {
  clickStartTime,
  clickEndTime,
  setClickStartTime,
}) => {
  const timeNow = Date.now()
  const canStartClick = (clickStartTime === undefined)
    && ((clickEndTime === undefined) || (timeNow - clickEndTime) > 300)
  if (canStartClick) {
    setClickStartTime(timeNow)
  }
}

const clickEnd = (e, {
  clickStartTime,
  setClickStartTime,
  setClickEndTime,
}, onClick) => {
  const timeNow = Date.now()
  const canEndClick = (clickStartTime !== undefined)
    && ((timeNow - clickStartTime) < 600)
  if (canEndClick) {
    onClick()
  }
  setClickStartTime(undefined)
  setClickEndTime(timeNow)
}

const Hour = (props) => {
  const { number: hourNumber, suffix: hourSuffix } = formatHour(props.hour)
  const [ clickStartTime, setClickStartTime ] = useState(undefined)
  const [ clickEndTime, setClickEndTime ] = useState(undefined)
  return (
    <Container opacity={props.opacity} adjustment={props.adjustment}>
      <TextContainer minor={(props.hour % 3) !== 0}>
        <TextNumber>{hourNumber}</TextNumber>
        <TextSuffix>{hourSuffix}</TextSuffix>
      </TextContainer>
      <Box
        opacity={props.opacity}
        onMouseDown={(e) => clickStart(e, {
          clickStartTime,
          clickEndTime,
          setClickStartTime,
          setClickEndTime,
        })}
        onMouseUp={(e) => clickEnd(e, {
          clickStartTime,
          clickEndTime,
          setClickStartTime,
          setClickEndTime,
        }, props.toggle)}
        onTouchStart={(e) => clickStart(e, {
          clickStartTime,
          clickEndTime,
          setClickStartTime,
          setClickEndTime,
        })}
        onTouchEnd={(e) => clickEnd(e, {
          clickStartTime,
          clickEndTime,
          setClickStartTime,
          setClickEndTime,
        }, props.toggle)}
      />
    </Container>
  )
}

export default Hour
