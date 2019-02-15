import React from 'react'
import styled from 'styled-components'
import Timeline from './timeline'

const AppContainer = styled.div`
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;

  & > *+* {
    margin-top: 8rem;
  }
`

const App = () => (
  <AppContainer>
    <Timeline />
    <Timeline />
  </AppContainer>
)

export default App
