import React, { useState } from 'react'
import styled from 'styled-components'

const OuterContainer = styled.div`
  position: relative;
  height: 0;
  width: 100%;
`

const Container = styled.div`
  position: absolute;
  top: 20px;
  left: calc(50% - 125px);
  width: 250px;
  background: papayawhip;
  padding: 1rem;
  color: black;
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  z-index: 1;
`

const Name = styled.input.attrs({
  type: 'text',
})`
`

const Timezone = styled.input.attrs({
  type: 'number',
})`
  font-size: 1rem;
`

const Tooltip = styled.div`
  position: absolute;
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid papayawhip;
  top: -10px;
  left: calc(50% - 10px);
`

const PartyModal = (props) => {
  const [ offsetText, setOffsetText ] = useState(props.offset)
  const updateOffsetText = (text) => {
    if (text !== '') {
      props.onEditOffset(text)
    }
    setOffsetText(text)
  }
  return (
    <OuterContainer onClick={(e) => e.stopPropagation()}>
      <Container>
        <Tooltip />
        <Name
          value={props.name}
          onChange={(e) => props.onEditName(e.target.value)}
        />
        <Timezone
          value={offsetText}
          onChange={(e) => updateOffsetText(e.target.value)}
        />
      </Container>
    </OuterContainer>
  )
}

export default PartyModal