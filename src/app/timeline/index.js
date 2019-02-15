import React from 'react'
import styled from 'styled-components'
import Hour from './Hour'

const Container = styled.div`
  display: flex;
  height: 3rem;
  width: 48rem;
`

const hours = (new Array(24)).fill(null).map((_, i) => i)

const Timeline = () => (
  <Container>
    {hours.map((hour) => (
      <Hour key={hour} opacity={0.8} />
    ))}
  </Container>
)

export default Timeline
