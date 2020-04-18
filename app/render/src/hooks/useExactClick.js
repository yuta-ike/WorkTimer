import { useState } from "react"

export default function useExactClick(){
  const [mouseMove, setMouseMove] = useState(false)
  const [timerId, setTimerId] = useState(null)

  const onClick = (callbackClick, callbackDoubleClick) => () => {
    if (!mouseMove) {
      if(timerId != null){
        callbackDoubleClick()
        clearTimeout(timerId)
        setTimerId(null)
      }else{
        const _timerId = setTimeout(() => {
          callbackClick()
          setTimerId(null)
        }, 150)
        setTimerId(_timerId)
      }
    }
    setMouseMove(false)
  }

  const onMouseDown = () => {
    setMouseMove(false)
  }

  const onMouseMove = () => {
    setMouseMove(true)
  }

  return (_onClick, _onDoubleClick) => ({ onClick: onClick(_onClick, _onDoubleClick), onMouseDown, onMouseMove })
}