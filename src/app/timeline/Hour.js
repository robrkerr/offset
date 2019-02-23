import React from 'react'
import styled from 'styled-components'
import { colours } from '../../utils/styles'

const Box = styled.div`
  width: 100%;
  height: calc(100% - 1rem);
  opacity: ${(props) => props.opacity || 1};
  background: ${(props) => props.colour || colours.primary};
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
  if (hour === 0) {
    return { number: '12', suffix: 'AM' }
  } else if (hour === 12) {
    return { number: '12', suffix: 'PM' }
  } else if (hour > 12) {
    return { number: `${hour - 12}`, suffix: 'PM' }
  } else if (hour < 12) {
    return { number: `${hour}`, suffix: 'AM' }
  }
  return {}
}

const Hour = (props) => {
  const { number: hourNumber, suffix: hourSuffix } = formatHour(props.hour)
  return (
    <Container opacity={props.opacity} adjustment={props.adjustment}>
      <TextContainer minor={(props.hour % 3) !== 0}>
        <TextNumber>{hourNumber}</TextNumber>
        <TextSuffix>{hourSuffix}</TextSuffix>
      </TextContainer>
      <Box opacity={props.opacity}></Box>
    </Container>
  )
}

export default Hour
