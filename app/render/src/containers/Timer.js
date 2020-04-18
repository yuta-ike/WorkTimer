import React, { useState, useEffect } from 'react'
import { ThemeProvider } from "styled-components"
import { clipboard, ipcRenderer, remote } from "electron"
import themes from "../theme/index"
import Show from "../components/Show"
import Button from "../components/Button"
import TimerWindow from "../components/TimerWindow"
import useExactClick from "../hooks/useExactClick"
import useTimer from "../hooks/useTimer"

const win = remote.getCurrentWindow()
const mouseData = [false, false]
const onMouseEnter = id => () => {
  // mouseData[id] = true
  win.setIgnoreMouseEvents(false)
  console.log("enter")
}
const onMouseExit = id => () => {
  // mouseData[id] = false
  // if(!mouseData[0] && !mouseData[1]){
    win.setIgnoreMouseEvents(true, { forward: true })
  // }
  console.log("exit")
}

function TimerButtons(props) {
  const { state, handleStart, handlePause, handleRestart, handleFinish, handleReset } = props
  switch (state) {
    case "waiting": return (
      <Button onClick={handleStart}>
        開始
      </Button>
    )
    case "timing": return (
      <Button onClick={handlePause}>
        一時停止
      </Button>
    )
    case "pausing": return (
      <div style={{ gridTemplateColumns: "1fr 1fr", display: "grid" }}>
        <Button onClick={handleRestart} style={{ gridColumn: 1 }}>
          再開
        </Button>
        <Button onClick={handleFinish} style={{ gridColumn: 2 }}>
          終了
        </Button>
      </div>
    )
    case "result": return (
      <Button onClick={handleReset}>
        リセット
      </Button>
    )
  }
}

export default function Timer(){
  const [taskId, setTaskId] = useState(0)
  const [showDetail, setShowDetail] = useState(true)
  const { timer, ...operators } = useTimer()
  useEffect(() => {
    ipcRenderer.send("time", timer.passedTime)
  }, [timer.passedTime])

  const handleStart = () => {
    ipcRenderer.send("timer-reset")
    operators.start()
  }

  const handlePause = () => {
    operators.pause()
  }

  const handleRestart = () => {
    operators.restart()
  }

  const handleFinish = () => {
    operators.finish(taskId)
  }

  const handleReset = () => {
    operators.reset()
  }

  function ShowClickable(props){
    const getClickProps = useExactClick()

    const handleClick = () => {
      setShowDetail(!showDetail)
    }

    const handleDoubleClick = () => {
      if(timer.state !== "waiting") return
      setTaskId((taskId + 1) % themes.length)
    }

    return (
      <Show {...props} {...getClickProps(handleClick, handleDoubleClick)}>
        {timer.passedTime}
      </Show>
    )
  }

  const [detail, setDetail] = useState(false)
  const handleOpen = () => {
    setDetail(!detail)
  }
  useEffect(() => {
    if(timer.state === "result") setDetail(true)
    if(!showDetail) setDetail(false)
  }, [timer.state, showDetail])

  const handleClickCopy = () => {
    const text =
      timer.timesLabel.map(({ startTime, endTime }, i) => `${startTime.split(" ")[1]} - ${endTime.split(" ")[1]}`).join('\n')

    clipboard.writeText(text)
  }

  return (
    <ThemeProvider theme={themes[taskId]}>
      <ShowClickable onMouseEnter={onMouseEnter(1)} onMouseLeave={onMouseExit(1)}/>
      <TimerWindow showDetail={showDetail} onMouseEnter={onMouseEnter(2)} onMouseLeave={onMouseExit(2)}>
        <TimerButtons
          state={timer.state}
          {...{ handleStart, handlePause, handleRestart, handleFinish, handleReset }}
        />
        {
          timer.state !== "waiting" && (
            <div id="start-time-label" style={{ fontSize: "12px" }} onClick={handleOpen}>{timer.startTimeLabel}</div>
          )
        }
        {
          detail && timer.state !== "waiting" && (
            <React.Fragment>
              {
                timer.timesLabel.map(({ startTime, endTime }, i) => (
                  <div id="record-times-label" key={i} style={{ fontSize: "12px" }}>{startTime.split(" ")[1]} - {endTime.split(" ")[1]}</div>
                ))
              }
              <div id="copy-button" onClick={handleClickCopy} onTouchStart={() => {}}>クリップボードにコピー</div>
            </React.Fragment>
          )
        }
      </TimerWindow>
    </ThemeProvider>
  )
}