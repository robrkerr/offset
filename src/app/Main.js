import React, { useState } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import Timeline, { Container as TimelineContainer } from './timeline/Timeline'
import Party from './party/Party'
import PartyModal from './party/PartyModal'
import { normaliseOffset } from '../utils/hours'
import { colours } from '../utils/styles'

const ContainerOuter = styled.div`
  text-align: center;
  height: 100vh;
  color: ${colours.light};
  width: 100%;
  overflow: visible;
`

const ContainerInner = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  overflow: visible;

  @media (min-height: 500px) {
    & > ${TimelineContainer} {
      margin-bottom: 4rem;
    }
  }
`

const NowLine = styled.div`
  border-left: ${colours.currentTime} solid 2px;
  opacity: 0.4;
  height: 100%;
  position: absolute;
  left: ${(props) => props.position * 100}%;
  top: 0;
  width: 1rem;
`

const SwitchContainer = styled.div`
  position: relative;
  width: 100%;
  text-align: right;
  height: 0;

  & > svg {
    cursor: pointer;
    position: absolute;
    right: 1.5rem;
    top: 0.5rem;
  }

  @media (min-height: 500px) {
    & > svg {
      top: -1rem;
    }
  }
`

const Links = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  color: ${colours.midLight};

  & > *+* {
    margin-left: 1rem;
  }

  & > a:hover {
    color: ${colours.light};
  }
`

const GithubLink = styled.a`
  color: inherit;
`

const TwitterLink = styled.a`
  color: inherit;
`

const Main = (props) => {
  const [ modalOpen, setOpenModal ] = useState(undefined)
  const toggleModal = (type) => (evt) => {
    evt.stopPropagation()
    return (modalOpen === type) ? setOpenModal(undefined) : setOpenModal(type)
  }
  return (
    <ContainerOuter onClick={() => setOpenModal(undefined)}>
      <ContainerInner>
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
            onEditOffset={(offset) => {
              props.them.setUtcOffset(normaliseOffset(offset))
            }}
          />
        )}
        <Timeline
          offset={props.me.utcOffset - props.them.utcOffset}
          setOffset={(offsetDiff) => {
            const newOffset = normaliseOffset(props.me.utcOffset - offsetDiff)
            props.them.setUtcOffset(newOffset)
          }}
          availableHours={props.them.availableHours}
          setAvailableHours={props.them.setAvailableHours}
        />
        <SwitchContainer>
          <FontAwesomeIcon
            rotation={90}
            icon={faExchangeAlt}
            onClick={props.switchPerspectives}
          />
        </SwitchContainer>      
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
            onEditOffset={(offset) => {
              props.me.setUtcOffset(normaliseOffset(offset))
            }}
          />
        )}
        <Timeline
          availableHours={props.me.availableHours}
          setAvailableHours={props.me.setAvailableHours}
        />
      </ContainerInner>
      <Links>
        <TwitterLink href="https://twitter.com/robrkerr" target="_blank">
          <FontAwesomeIcon icon={faTwitter} />
        </TwitterLink>
        <GithubLink href="https://github.com/robrkerr/offset" target="_blank">
          <FontAwesomeIcon icon={faGithub} />
        </GithubLink>
      </Links>
    </ContainerOuter>
  )
}

export default Main
