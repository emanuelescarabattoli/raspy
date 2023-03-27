const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
  "electronAPI", {
  beep: (data) => ipcRenderer.send("beep")
})
