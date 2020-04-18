import { Notification } from "electron"

let notifiedHour = [0]
let prevNotify = null

const listenTimer = (args) => {
  const { hour } = args

  if(!notifiedHour.includes(hour)){
    const notify = new Notification({
      title: "タイマー通知",
      body: `${hour}時間が経過しました。`,
    })
    //直前の通知を消す
    prevNotify && prevNotify.close()
    //通知を表示
    notify.show()
    prevNotify = notify

    notifiedHour.push(hour)
  }
}

const listenTimerReset = () => {
  notifiedHour = [0]
}

export { listenTimer, listenTimerReset }