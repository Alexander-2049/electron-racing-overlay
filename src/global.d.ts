import { WebSocketListener } from "./main/WebSocketListener/WebSocketListener";

interface MainWindowAPI {
  sendMessage: (message: string) => void;
  onMessage: (callback: (message: string) => void) => void;
}
interface TitleBarAction {
  sendMessage: (message: "close" | "minimize") => void;
}

declare global {
  interface Window {
    MainWindowAPI: MainWindowAPI;
    titleBar: TitleBarAction;
    api: WebSocketListener;
  }
}

export {};

