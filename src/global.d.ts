interface IRacingAPI {
  sendMessage: (message: iRacingMessage) => void;
  onMessage: (callback: (message: iRacingMessage) => void) => void;
}

interface Window {
  iracingAPI: IRacingAPI;
}
