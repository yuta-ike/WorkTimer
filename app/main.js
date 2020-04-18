import { app, BrowserWindow, ipcMain, Tray } from "electron"
import { listenTimer, listenTimerReset } from "./timeNotify.js"
import "./fileManager"

const createWindow = () => {
  //ウィンドウを作る
  const win = new BrowserWindow({
    x: 9999,//右端
    y: 0,
    width: 220,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    },
    alwaysOnTop: true,
    show: false,
    frame: false,
    transparent: true,
  })
  win.setHasShadow(false)

  // HTMLファイルをロードする
  win.loadFile('./public/render/bundle.html')

  // win.setIgnoreMouseEvents(true)

  //デベロッパーツールを開く
  // win.webContents.openDevTools()

  return win
}

app.whenReady().then(() => {
  const win = createWindow()
  const tray = new Tray('/Users/ikechan/dev/worktimer/public/assets/icon3.png')

  ipcMain.on("time", (event, arg) => {
    tray.setTitle(`${arg.hour}時間${("0" + arg.minute).slice(-2)}分${("0" + arg.second).slice(-2)}`)
    listenTimer(arg)
  })
  ipcMain.on("timer-reset", () => {
    listenTimerReset()
  })

  tray.setToolTip('開始')
  tray.on('click', function clicked(e, bounds) {
    if (win.isVisible()) {
      win.hide()
    } else {
      win.show()
    }
  })
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.dock.hide()
