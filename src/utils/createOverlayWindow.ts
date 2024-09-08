import { BrowserWindow } from "electron";

interface WindowProps {
  width?: number;
  height?: number;
}

export const createOverlayWindow = (url: string, props?: WindowProps) => {
  // Create the browser window.
  const overlayWindow = new BrowserWindow({
    height: props?.height || 43,
    width: props?.width || 474,
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
  overlayWindow.loadURL(url);

  overlayWindow.setAlwaysOnTop(true, "screen-saver");
  overlayWindow.setVisibleOnAllWorkspaces(true); // Ensures it's visible across all workspaces
  overlayWindow.setFullScreenable(false);

  overlayWindow.on("minimize", () => {
    overlayWindow.restore();
  });

  overlayWindow.on("system-context-menu", (event) => {
    event.preventDefault();
  });

  overlayWindow.on("close", (event) => {
    event.preventDefault();
  });

  return overlayWindow;
};
