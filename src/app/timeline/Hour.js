import React from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 100%;
  height: calc(100% - 1rem);
  opacity: ${(props) => props.opacity || 1};
  background: ${(props) => props.colour || 'steelblue'};
`

const Text = styled.div`
  width: 100%;
  height: 1rem;
  font-size: 0.55rem;
  text-align: left;
`

const Container = styled.div`
  width: 4.17%;
  height: 100%;
  position: relative;
  ${(props) => props.adjustment && `left: ${props.adjustment * 4.17}%;`}
  flex-shrink: 0;
`

const Hour = (props) => {
  return (
    <Container opacity={props.opacity} adjustment={props.adjustment}>
      <Text>
        {(props.hour === undefined)
          ? ''
          : ((props.hour === 0)
            ? '12AM'
            : ((props.hour === 12)
              ? '12PM'
              : ((props.hour > 12)
                ? `${props.hour - 12}PM`
                : `${props.hour}AM`
              )
            )
          )
        }
      </Text>
      <Box opacity={props.opacity}></Box>
    </Container>
  )
}

export default Hour
