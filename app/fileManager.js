import { app, ipcMain } from "electron"
import fs from "fs"
import path from "path"
import packagedata from "../package.json"

const PATH_TO_DIR = (() => {
  console.log(process.env.NODE_ENV)
  if(process.env.NODE_ENV === "development"){
    return "./public"
  }else{
    const DATA_PATH = app.getPath('userData')
    if (!fs.existsSync(DATA_PATH)) {
      fs.mkdirSync(DATA_PATH)
    }
    if(!fs.existsSync(DATA_PATH + "/workhistory")){
      fs.mkdirSync(DATA_PATH + "/workhistory")
    }
    return DATA_PATH + "/workhistory"
  }
})()

const PATH = PATH_TO_DIR + `/workhistory_${packagedata.version}.json`

ipcMain.on("save-file", (event, args) => {
  if (!fs.existsSync(PATH)){
    fs.writeFileSync(PATH, "")
  }
  try{
    fs.readFile(PATH, 'utf8', (err, f) => {
      if(err){
        throw new Error(err)
      }
      const data = f !== "" ? JSON.parse(f) : []
      data.push(args)
      fs.writeFile(PATH, JSON.stringify(data), () => {
        console.log("success to save data.")
      })
    })
  }catch(e){
    console.log(e)
  }
})