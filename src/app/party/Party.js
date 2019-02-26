import React from 'react'
import styled from 'styled-components'
import { getOffsetText } from '../../utils/hours'

const Container = styled.div`
  cursor: pointer;
`

const Heading = styled.div`
  font-size: 1.4rem;
  padding: 0.5rem 0 0.2rem;
`

const Timezone = styled.div`
  font-size: 1rem;
`

const Party = (props) => (
  <Container onClick={props.onClick}>
    <Heading>{props.name}</Heading>
    <Timezone>{getOffsetText(props.offset)}</Timezone>
  </Container>
)

export default Party