import React, { useState } from 'react'
import { useUrlState } from 'with-url-state'
import Main from './Main'
import { hours } from '../utils/hours'
import { useInterval } from '../utils/hooks'

const defaultOffset = -(new Date()).getTimezoneOffset() / 60
const defaultAvailableHours = hours.map((hour) => (hour >= 9 && hour < 17) ? 1 : 0).join('')

const getTime = (time, myOffset) => {
  return time.getHours() + (myOffset - defaultOffset) + time.getMinutes() / 60
}

const App = () => {
  // set up url state
  const [ urlState, setUrlState ] = useUrlState({})
  const themOffset = (urlState.themOffset !== undefined) ? Number(urlState.themOffset) : defaultOffset
  const setThemOffset = (offset) => (offset !== undefined) && setUrlState({ ...urlState, themOffset: offset })
  const meOffset = (urlState.meOffset !== undefined) ? Number(urlState.meOffset) : defaultOffset
  const setMeOffset = (offset) => (offset !== undefined) && setUrlState({ ...urlState, meOffset: offset })
  const themName = urlState.themName || 'them'
  const setThemName = (name) => (name !== undefined) && setUrlState({ ...urlState, themName: name })
  const meName = urlState.meName || 'me'
  const setMeName = (name) => (name !== undefined) && setUrlState({ ...urlState, meName: name })
  const themAvailableHours = urlState.themAvailableHours || defaultAvailableHours
  const setThemAvailableHours = (hours) => (hours !== undefined) && setUrlState({ ...urlState, themAvailableHours: hours })
  const meAvailableHours = urlState.meAvailableHours || defaultAvailableHours
  const setMeAvailableHours = (hours) => (hours !== undefined) && setUrlState({ ...urlState, meAvailableHours: hours })
  // update the time every 5mins
  const [ currentTime, setCurrentTime ] = useState(new Date())
  const setCurrentTimeAsNow = () => setCurrentTime(new Date())
  useInterval(() => setCurrentTimeAsNow(), 5 * 60 * 1000)
  // 
  const switchPerspectives = () => {
    setUrlState({
      themOffset: urlState.meOffset,
      meOffset: urlState.themOffset,
      themName: urlState.meName,
      meName: urlState.themName,
      meAvailableHours: urlState.themAvailableHours,
      themAvailableHours: urlState.meAvailableHours,
    })
  }
  //
  const mainProps = {
    currentTime: getTime(currentTime, meOffset),
    switchPerspectives,
    them: {
      name: themName,
      utcOffset: themOffset,
      availableHours: themAvailableHours,
      setName: setThemName,
      setUtcOffset: setThemOffset,
      setAvailableHours: setThemAvailableHours,
    },
    me: {
      name: meName,
      utcOffset: meOffset,
      availableHours: meAvailableHours,
      setName: setMeName,
      setUtcOffset: setMeOffset,
      setAvailableHours: setMeAvailableHours,
    }
  }
  return <Main {...mainProps} />
}

export default App
