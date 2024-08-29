import { BrowserWindow } from "electron";

export const createSpeedometer = (url: string): void => {
  // Create the browser window.
  const speedometerWindow = new BrowserWindow({
    height: 130,
    width: 600,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
  });
  // and load the index.html of the app.
  speedometerWindow.loadURL(url + "#speedometer");

  speedometerWindow.setAlwaysOnTop(true);
};
