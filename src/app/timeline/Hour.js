import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 2rem;
  height: 100%;
  opacity: ${(props) => props.opacity || 1};
  background: ${(props) => props.colour || 'blue'};

  &:hover {
    opacity: ${(props) => props.opacity ? Math.max(props.opacity + 0.2, 1.0) : 1};
  }
`

const Hour = (props) => (
  <Container opacity={props.opacity} colour="steelblue"></Container>
)

export default Hour
