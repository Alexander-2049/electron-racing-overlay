import { BrowserWindow } from "electron";

export const createSpeedometer = (url: string) => {
  // Create the browser window.
  const speedometerWindow = new BrowserWindow({
    height: 43,
    width: 474,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    hasShadow: false,
    minimizable: false,
    fullscreenable: false,
    skipTaskbar: true,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // and load the index.html of the app.
  speedometerWindow.loadURL(url + "#speedometer");

  speedometerWindow.setAlwaysOnTop(true, "screen-saver");
  speedometerWindow.setVisibleOnAllWorkspaces(true); // Ensures it's visible across all workspaces
  speedometerWindow.setFullScreenable(false);

  speedometerWindow.on("minimize", () => {
    speedometerWindow.restore();
  });

  speedometerWindow.on("system-context-menu", (event) => {
    event.preventDefault();
  });

  speedometerWindow.on("close", (event) => {
    event.preventDefault();
  });

  return speedometerWindow;
};
