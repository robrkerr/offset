import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  cursor: pointer;
  
`

const Heading = styled.div`
`

const Timezone = styled.div`
  font-size: 1rem;
`

const Party = (props) => {
  return (
    <Container onClick={props.onClick}>
      <Heading>{props.name}</Heading>
      <Timezone>{(props.offset > 0) ? `+${props.offset}` : props.offset}</Timezone>
    </Container>
  )
}

export default Party