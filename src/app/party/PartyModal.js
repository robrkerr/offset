import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { colours } from '../../utils/styles'

const OuterContainer = styled.div`
  position: relative;
  height: 0;
  width: 100%;
`

const Container = styled.form`
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

const HiddenSubmit = styled.input.attrs({
  type: 'submit',
})`
  display: none;
`

const PartyModal = (props) => {
  const [ offsetText, setOffsetText ] = useState(props.offset)
  const [ nameText, setNameText ] = useState(props.name)
  const onSubmit = (evt) => {
    evt.preventDefault()
    if (nameInput.current === document.activeElement) {
      props.onEditName(nameText)
    } else if (offsetInput.current === document.activeElement) {
      props.onEditOffset(offsetText)
    }
    props.onToggleModal()
  }
  const nameInput = useRef(null)
  const offsetInput = useRef(null)
  useEffect(() => {
    nameInput.current.focus()
  }, [])
  return (
    <OuterContainer onClick={(e) => e.stopPropagation()}>
      <Container onSubmit={onSubmit}>
        <TooltipBacking />
        <Tooltip />
        <Name
          value={nameText}
          ref={nameInput}
          onChange={(e) => setNameText(e.target.value)}
          onBlur={(e) => props.onEditName(e.target.value)}
        />
        <Timezone
          value={offsetText}
          ref={offsetInput}
          onChange={(e) => setOffsetText(e.target.value)}
          onBlur={(e) => props.onEditOffset(e.target.value)}
        />
        <HiddenSubmit />
      </Container>
    </OuterContainer>
  )
}

export default PartyModal