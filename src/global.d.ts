interface IRacingAPI {
  sendMessage: (message: iRacingMessage) => void;
  onMessage: (callback: (message: iRacingMessage) => void) => void;
}
interface MainWindowAPI {
  sendMessage: (message: string) => void;
  onMessage: (callback: (message: string) => void) => void;
}
interface TitleBarAction {
  sendMessage: (message: "close" | "minimize") => void;
}

interface Window {
  iRacingAPI: IRacingAPI;
  MainWindowAPI: MainWindowAPI;
  titleBar: TitleBarAction;
}
