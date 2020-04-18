import { useState } from "react"
import msToTime from "../time-utils/msToTime"
import dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
import "dayjs/locale/ja"
dayjs.locale('ja')
dayjs.extend(updateLocale)
import { loadTime, saveTime, pushTimeArrayTemp, getTimeArrayTemp } from "../store/time-saver"
import { pushHistory } from "../store/hisotry-saver"

const ZERO_TIME = { hour: 0, minute: 0, second: 0 }

export default function useTimer(){
  const [state, setState] = useState("waiting")
  const [passedTime, setPassedTime] = useState(ZERO_TIME)
  const [countinuousPassedTime, setCountinuousPassedTime] = useState(ZERO_TIME)
  const [startTime, setStartTime] = useState("")
  const [times, setTimes] = useState([])
  const [timerId, setTimerId] = useState(null)

  const start = () => {
    if (state !== "waiting") return
    setState("timing")

    const startTime = dayjs()
    saveTime("start-time", startTime)
    setStartTime(startTime)
    setTimes([])

    const _timerId = setInterval(() => {
      const _passedTimeTotal = dayjs().diff(loadTime("start-time"))
      const timeData = msToTime(_passedTimeTotal)
      setPassedTime(timeData)
      setCountinuousPassedTime(timeData)

    }, 1 * 1000)
    setTimerId(_timerId)
  }

  const clearTimerAndRecord = () => {
    clearInterval(timerId)
    setTimerId(null)

    const startTime = loadTime("start-time")
    //まだ記録されていないものがある場合は記録する
    if(startTime.isValid()){
      const endTime = dayjs()
      const _passedTime = endTime.diff(startTime)
      pushTimeArrayTemp({
        startTime: startTime,
        endTime: endTime,
        passedTime: _passedTime
      })

      setTimes([...times, { startTime: startTime, endTime: endTime}])
    }

    saveTime("start-time", null)
  }

  const pause = () => {
    if (state !== "timing") return
    setState("pausing")

    clearTimerAndRecord()

    setCountinuousPassedTime(ZERO_TIME)
  }

  const restart = () => {
    if (state !== "pausing") return
    setState("timing")

    const startTime = dayjs()
    saveTime("start-time", startTime)
    setStartTime(startTime)

    const _timerId = setInterval(() => {
      const _continupusPassedTime = dayjs().diff(loadTime("start-time"))
      const _passedTimeTotal = _continupusPassedTime + getTimeArrayTemp().map(({ passedTime }) => Number(passedTime)).reduce((a, b) => a + b, 0)
      const timeDataB = msToTime(_continupusPassedTime)
      const timeDataA = msToTime(_passedTimeTotal)
      setPassedTime(timeDataA)
      setCountinuousPassedTime(timeDataB)
    }, 1 * 1000)
    setTimerId(_timerId)
  }

  const finish = (taskName) => {
    if (state !== "timing" && state !== "pausing") return
    setState("result")

    clearTimerAndRecord()

    pushHistory(taskName)
  }

  const reset = () => {
    if(state !== "result") return
    setState("waiting")

    setPassedTime(ZERO_TIME)
    setCountinuousPassedTime(ZERO_TIME)
  }

  const timer = {
    state,
    startTime,
    startTimeLabel: dayjs(startTime).format("M/D H:mm"),
    times,
    timesLabel: times.map(({startTime, endTime}) => {
      return { startTime: dayjs(startTime).format("M/D H:mm"), endTime: dayjs(endTime).format("M/D H:mm") }
    }),
    passedTime,
    countinuousPassedTime,
  }
  return { timer, start, pause, restart, finish, reset }
}