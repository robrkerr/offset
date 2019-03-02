import { useEffect, useRef, useState } from 'react'

export const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  })

  // Set up the interval.
  useEffect(() => {
    const tick = () => savedCallback.current()
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

const getDragPosX = (evt) => {
  const xPos = evt.clientX || evt.touches[0].clientX
  const elementRect = evt.currentTarget.getBoundingClientRect()
  return (xPos - elementRect.x) / elementRect.width
}

const onPanStart = (evt, setDragStartX) => setDragStartX(getDragPosX(evt))
const onPanEnd = (_, setDragStartX) => setDragStartX(undefined)
const onPanMove = (evt, setDragStartX, dragStartX, callback) => {
  if (!callback || (dragStartX === undefined)) { return }
  const hoursToShift = Math.round(4 * 24 * (getDragPosX(evt) - dragStartX)) / 4
  if (hoursToShift === 0) { return }
  callback(hoursToShift)
  setDragStartX(dragStartX + hoursToShift / 24)
}

export const useDragState = (callback) => {
  const [ dragStartX, setDragStartX ] = useState(undefined)
  const [ dragHandlers, setDragHandlers ] = useState({})

  useEffect(() => {
    setDragHandlers({
      onMouseDown: (e) => onPanStart(e, setDragStartX),
      onMouseMove: (e) => onPanMove(e, setDragStartX, dragStartX, callback),
      onMouseUp: (e) => onPanEnd(e, setDragStartX),
      onMouseLeave: (e) => onPanEnd(e, setDragStartX),
      onTouchStart: (e) => onPanStart(e, setDragStartX),
      onTouchMove: (e) => onPanMove(e, setDragStartX, dragStartX, callback),
      onTouchEnd: (e) => onPanEnd(e, setDragStartX),
    })
  }, [dragStartX])
  
  return dragHandlers
}
