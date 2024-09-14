interface IRacingAPI {
  sendMessage: (message: iRacingMessage) => void;
  onMessage: (callback: (message: iRacingMessage) => void) => void;
}
interface TitleBarAction {
  sendMessage: (message: "close" | "minimize") => void;
}

interface Window {
  iracingAPI: IRacingAPI;
  titleBar: TitleBarAction;
}
