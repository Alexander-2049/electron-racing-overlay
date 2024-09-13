// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// Preload (Isolated World)
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("iracingAPI", {
  sendMessage: (message: string) =>
    ipcRenderer.send("iracing-message", message),
  onMessage: (callback: (data: unknown) => void) =>
    ipcRenderer.on("iracing-reply", (_, data) => callback(data)),
});
