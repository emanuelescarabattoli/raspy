const { app, BrowserWindow } = require("electron")
const path = require("path")
// const Gpio = require("onoff").Gpio;
// const { ipcMain } = require("electron");

// let beeperPin = undefined

// try {
//   beeperPin = new Gpio(21, "out");
// } catch (error) {
//   console.log(error);
// }

// const beep = () => {
//   try {
//     beeperPin.writeSync(1)
//     setTimeout(() => {
//       beeperPin.writeSync(0)
//     }, 500);
//     return "done";
//   } catch (error) {
//     return error.message;
//   }
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