import React, { useState } from 'react'
import styled from 'styled-components'
import Timeline from './timeline/Timeline'
import Party from './party/Party'
import PartyModal from './party/PartyModal'

const MainContainer = styled.div`
  position: relative;
  text-align: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  overflow: visible;
`

const NowLine = styled.div`
  border-left: firebrick solid 2px;
  opacity: 0.4;
  height: 100%;
  position: absolute;
  left: ${(props) => props.position * 100}%;
  top: 0;
  width: 1rem;
`

const Main = (props) => {
  const [ modalOpen, setOpenModal ] = useState(undefined)
  const toggleModal = (type) => (evt) => {
    evt.stopPropagation()
    return (modalOpen === type) ? setOpenModal(undefined) : setOpenModal(type)
  }
  return (
    <MainContainer onClick={() => setOpenModal(undefined)}>
      <NowLine position={props.currentTime / 24} />
      <Party
        name={props.them.name}
        offset={props.them.utcOffset}
        onClick={toggleModal('them')}
      />
      {(modalOpen === 'them') && (
        <PartyModal
          name={props.them.name}
          offset={props.them.utcOffset}
          onEditName={(name) => props.them.setName(name)}
          onEditOffset={(offset) => props.them.setUtcOffset(offset)}
        />
      )}
      <Timeline
        officeHours={props.them.officeHours}
        offset={props.me.utcOffset - props.them.utcOffset}
        setOffset={(offset) => {
          const newOffset = (36 + props.me.utcOffset - offset) % 24 - 12
          props.them.setUtcOffset(newOffset)
        }}
      />
      <Party
        name={props.me.name}
        offset={props.me.utcOffset}
        onClick={toggleModal('me')}
      />
      {(modalOpen === 'me') && (
        <PartyModal
          name={props.me.name}
          offset={props.me.utcOffset}
          onEditName={(name) => props.me.setName(name)}
          onEditOffset={(offset) => props.me.setUtcOffset(offset)}
        />
      )}
      <Timeline
        officeHours={props.me.officeHours}
      />
    </MainContainer>
  )
}

export default Main
