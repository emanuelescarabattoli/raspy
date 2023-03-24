const { app, BrowserWindow } = require("electron")
const path = require("path")
// var Gpio = require("onoff").Gpio;
// const { ipcMain } = require("electron");

// try {
//   var beeperPin = new Gpio(21, "out");
//   beeperPin.writeSync(1)
//   setTimeout(() => {
//     beeperPin.writeSync(0)
//   }, 500);
// } catch (error) {
//   console.log(error)
// }

// const beep = () => {
//   console.log("")
// }

const devSettings = {
  width: 800,
  height: 480,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
    nodeIntegration: true,
    devTools: true,
  },
  fullscreen: false,
  frame: true,
}

const prodSettings = {
  width: 800,
  height: 480,
  webPreferences: {
    preload: path.join(__dirname, "preload.js"),
    nodeIntegration: true,
    devTools: false,
  },
  fullscreen: true,
  frame: false,
}

const isDevEnv = process.env.env === "DEV"

const createWindow = () => {
  const mainWindow = new BrowserWindow(isDevEnv ? devSettings : prodSettings)
  if (isDevEnv) {
    mainWindow.loadURL("http://localhost:3000/");
  } else {
    mainWindow.loadFile(path.join(__dirname, "./build/index.html"));
  }
}

app.whenReady().then(() => {
  // ipcMain.on("beep", beep)
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})