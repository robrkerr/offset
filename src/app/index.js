import React, { useState } from 'react'
import { useUrlState } from 'with-url-state'
import Main from './Main'
import { hours } from '../utils/hours'
import { useInterval } from '../utils/hooks'

const defaultOffset = -(new Date()).getTimezoneOffset() / 60
const defaultOfficeHours = hours.map((hour) => hour >= 9 && hour < 17)

const getTime = (time, myOffset) => {
  return time.getHours() + (myOffset - defaultOffset) + time.getMinutes() / 60
}

const App = () => {
  // set up url state
  const [ urlState, setUrlState ] = useUrlState({})
  const themOffset = urlState.themOffset || defaultOffset
  const setThemOffset = (offset) => (offset !== undefined) && setUrlState({ ...urlState, themOffset: offset })
  const meOffset = urlState.meOffset || defaultOffset
  const setMeOffset = (offset) => (offset !== undefined) && setUrlState({ ...urlState, meOffset: offset })
  const themName = urlState.themName || 'them'
  const setThemName = (name) => (name !== undefined) && setUrlState({ ...urlState, themName: name })
  const meName = urlState.meName || 'me'
  const setMeName = (name) => (name !== undefined) && setUrlState({ ...urlState, meName: name })
  // update the time every 5mins
  const [ currentTime, setCurrentTime ] = useState(new Date())
  useInterval(() => setCurrentTime(new Date()), 5 * 60 * 1000)
  const mainProps = {
    currentTime: getTime(currentTime, meOffset),
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
  return <Main {...mainProps} />
}

export default App
