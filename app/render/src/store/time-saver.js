import dayjs from "dayjs"

/*
{
  workHistory:[
    {
      day: "2020/4/1",
      passedTime: 20000000,
      times: [
        {
          startTime: "2020/4/1 10:00",
          endTime: "2020/4/1 12:00",
          passedTime: "72000000"
        },
        {
          startTime: "2020/4/1 15:00",
          endTime: "2020/4/1 16:00",
          passedTime: "60000000"
        }
      ]
    }
    ...
  ],
  startTime: "2020/4/1 18:00",
  times: [
    ...
  ]

}
*/

let timeCache = {}
const _loadTime = key => {
  if(timeCache[key] != null) return timeCache[key]
  const value = localStorage.getItem(key)
  timeCache[key] = value
  return value
}

const _storeTime = (key, value) => {
  timeCache[key] = value
  localStorage.setItem(key, value)
}


const saveTime = (key, value) => _storeTime(key, value)
const loadTime = (key) => {
  const timeStr = _loadTime(key)
  return timeStr != null ? dayjs(timeStr) : null
}


const pushTimeArrayTemp = (value) => {
  const times = JSON.parse(_loadTime("times") || "[]")
  _storeTime("times", JSON.stringify([...times, value]))
}

const getTimeArrayTemp = () => {
  return JSON.parse(_loadTime("times") || "[]")
}

const clearTimeArrayTemp = () => {
  _storeTime("times", "[]")
}

const removeTimeArrayTemp = () => {
  const times = JSON.parse(_loadTime("times") || "[]")
  clearTimeArrayTemp()
  return times
}

export { saveTime, loadTime, pushTimeArrayTemp, getTimeArrayTemp, removeTimeArrayTemp }
