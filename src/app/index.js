import React from 'react'
// import React, { useState } from 'react'
import { useUrlState } from 'with-url-state'
import Main from './Main'
import { hours } from '../utils/hours'

const now = new Date()
const defaultOffset = -now.getTimezoneOffset() / 60
const defaultOfficeHours = hours.map((hour) => hour >= 9 && hour < 17)
const myTimeOfDay = now.getHours() + now.getMinutes() / 60

const App = () => {
  const [ urlState, setUrlState ] = useUrlState({})
  const themOffset = urlState.themOffset || defaultOffset
  const setThemOffset = (offset) => (offset !== undefined) && setUrlState({ ...urlState, themOffset: offset })
  const meOffset = urlState.meOffset || defaultOffset
  const setMeOffset = (offset) => (offset !== undefined) && setUrlState({ ...urlState, meOffset: offset })
  const themName = urlState.themName || 'them'
  const setThemName = (name) => (name !== undefined) && setUrlState({ ...urlState, themName: name })
  const meName = urlState.meName || 'me'
  const setMeName = (name) => (name !== undefined) && setUrlState({ ...urlState, meName: name })
  const mainProps = {
    them: {
      name: themName,
      utcOffset: themOffset,
      setName: setThemName,
      setUtcOffset: setThemOffset,
      officeHours: defaultOfficeHours,
    },
    me: {
      name: meName,
      utcOffset: meOffset,
      setName: setMeName,
      setUtcOffset: setMeOffset,
      officeHours: defaultOfficeHours,
    }
  }
  return <Main {...mainProps} currentTime={myTimeOfDay} />
}

export default App
