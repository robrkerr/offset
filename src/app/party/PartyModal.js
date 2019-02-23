import React, { useState } from 'react'
import styled from 'styled-components'
import { colours } from '../../utils/styles'

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
  background: ${colours.midDark};
  padding: 1rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${colours.midLight};
  border-radius: 3px;
  box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.75);
  z-index: 1;

  & > *+* {
    margin-top: 0.5rem;
  }
`

const Name = styled.input.attrs({
  type: 'text',
})`
  font-size: 1rem;
  background: ${colours.lightDark};
  color: inherit;
  padding: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${colours.midLight};
  border-radius: 3px;
`

const Timezone = styled.input.attrs({
  type: 'number',
})`
  font-size: 1rem;
  background: ${colours.lightDark};
  color: inherit;
  padding: 0.5rem;
  border-width: 1px;
  border-style: solid;
  border-color: ${colours.midLight};
  border-radius: 3px;
`

const Tooltip = styled.div`
  position: absolute;
  width: 0; 
  height: 0; 
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid ${colours.midDark};
  top: -17px;
  left: calc(50% - 10px);
`

const TooltipBacking = styled.div`
  position: absolute;
  width: 0; 
  height: 0; 
  border-left: 11px solid transparent;
  border-right: 11px solid transparent;
  border-bottom: 11px solid ${colours.midLight};
  top: -11px;
  left: calc(50% - 11px);
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
        <TooltipBacking />
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