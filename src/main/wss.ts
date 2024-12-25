import { WEBSOCKET_SERVER_PORT } from "../shared/constants";
import WebSocket from "ws";
const wss = new WebSocket.Server({ port: WEBSOCKET_SERVER_PORT });

wss.on("error", (error) => {
  console.error(error.message);
});

type DisplayUnits = "METRIC" | "IMPERIAL";
type ObjectOptions = DataRPM | DataSpeed | DataControls | DataCarLocation;

interface WebSocketConnections {
  controls: ConnectedListeners<DataControls>;
  rpm: ConnectedListeners<DataRPM>;
  speed: ConnectedListeners<DataSpeed>;
  "car-location": ConnectedListeners<DataCarLocation>;
}

interface DataRPM {
  rpm: number;
  green: number;
  orange: number;
  red: number;
  max: number;
}

interface DataSpeed {
  speedKph: number;
  speedMph: number;
  displayUnits: DisplayUnits;
}

interface DataControls {
  throttle: number;
  brake: number;
  clutch: number;
  steeringAnglePercents: number;
}

interface DataCarLocation {
  isOnPitLane: boolean;
  isOnTrack: boolean;
  isInGarage: boolean;
}

class ConnectedListeners<T extends ObjectOptions> {
  private listeners: Set<WebSocket> = new Set();
  private lastMessageStringified: string = null;

  public add(ws: WebSocket) {
    this.listeners.add(ws);

    // Even if Game Client is closed our listener will receive a last state
    if (this.lastMessageStringified !== null)
      ws.send(this.lastMessageStringified);
  }

  public delete(ws: WebSocket) {
    this.listeners.delete(ws);
  }

  public send(message: T) {
    const messageStringified = JSON.stringify(message);
    if (this.lastMessageStringified === messageStringified) return;

    this.lastMessageStringified = messageStringified;

    this.listeners.forEach((ws) => {
      ws.send(messageStringified);
    });
  }
}

export const connections: WebSocketConnections = {
  controls: new ConnectedListeners(),
  rpm: new ConnectedListeners(),
  speed: new ConnectedListeners(),
  "car-location": new ConnectedListeners(),
};

const groupNames = new Set<keyof WebSocketConnections>(
  Object.keys(connections) as (keyof WebSocketConnections)[]
);

wss.on("connection", (ws, req) => {
  const group = req.url.slice(1).toLowerCase();

  if (groupNames.has(group as keyof WebSocketConnections)) {
    const groupMap = connections[group as keyof WebSocketConnections];
    groupMap.add(ws);

    ws.on("close", () => groupMap.delete(ws));
  }
});
