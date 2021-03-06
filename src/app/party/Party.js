import React from 'react'
import styled from 'styled-components'
import PartyModal from './PartyModal'
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
  <React.Fragment>
    <Container onClick={props.onToggleModal}>
      <Heading>{props.name}</Heading>
      <Timezone>{getOffsetText(props.offset)}</Timezone>
    </Container>
    {props.modalOpen && (
      <PartyModal
        name={props.name}
        offset={props.offset}
        onEditName={props.onEditName}
        onEditOffset={props.onEditOffset}
        onToggleModal={props.onToggleModal}
      />
    )}
  </React.Fragment>
)

export default Party