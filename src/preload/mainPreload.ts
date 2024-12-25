// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Preload (Isolated World)
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("MainWindowAPI", {
  sendMessage: (message: string) =>
    ipcRenderer.send("main-message", message),
  onMessage: (callback: (data: unknown) => void) =>
    ipcRenderer.on("main-data", (_, data) => callback(data)),
});

contextBridge.exposeInMainWorld("titleBar", {
  sendMessage: (message: string) =>
    ipcRenderer.send("title-bar-message", message),
});
