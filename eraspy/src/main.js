const { app, BrowserWindow } = require("electron")
const path = require("path")
const { ipcMain } = require("electron");
const spawn = require('child_process').spawn;

const beep = () => {
  try {
    spawn('yarn', ["--cwd", "~/Downloads/raspy/raspy/beep", "beep"]);
  } catch (error) {
    fs.writeFileSync("~/Downloads/raspy/error.txt", error.message);
  }
}

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
  ipcMain.on("beep", beep);
  createWindow()
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit()
})