import { ipcRenderer } from "electron"
import dayjs from "dayjs"
import updateLocale from "dayjs/plugin/updateLocale"
import "dayjs/locale/ja"
dayjs.locale('ja')
dayjs.extend(updateLocale)

import { removeTimeArrayTemp } from "./time-saver"

let historyCache = null;

const _loadHistory = () => {
  if(historyCache == null){
    historyCache = JSON.parse(localStorage.getItem("work-history") || "[]")
  }
  return [...historyCache]
}

const _storeHistory = (value) => {
  historyCache = value
  localStorage.setItem("work-history", JSON.stringify(value))
}

const pushHistory = (taskId) => {
  const history = _loadHistory()
  const times = removeTimeArrayTemp()
  const day = dayjs(times[0].startTime).format("YYYY/MM/DD")
  const additionalHistory = {
    taskId,
    day,
    times,
  }
  console.log(additionalHistory)
  ipcRenderer.send("save-file", additionalHistory)
  _storeHistory([...history, additionalHistory])
}

const getToday = () => {
  const history = _loadHistory()
  return history.filter(({ day }) => day == dayjs().format("YYYY/MM/DD"))
}

const getThisMonth = () => {
  const history = _loadHistory()
  return history.filter(({ day }) => day.slice(0, "YYYY/MM".length) == dayjs().format("YYYY/MM"))
}

export { pushHistory, getToday, getThisMonth }
