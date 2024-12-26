import WebSocket from "ws";
import { WEBSOCKET_SERVER_PORT } from "../../shared/constants";
import { SelectedGame, WebSocketConnections } from "../types/GamesAPI";
import { ConnectedListeners } from "./ConnectedListeners";

export class GamesWebSocketServerAPI {
  private selectedGame: SelectedGame = "NONE";
  private connections: WebSocketConnections = {
    controls: new ConnectedListeners(),
    rpm: new ConnectedListeners(),
    speed: new ConnectedListeners(),
    "car-location": new ConnectedListeners(),
  };
  private webSocketServer = new WebSocket.Server({
    port: WEBSOCKET_SERVER_PORT,
  });

  public groupNames = new Set<keyof WebSocketConnections>(
    Object.keys(this.connections) as (keyof WebSocketConnections)[]
  );

  constructor() {
    this.webSocketServer.on("error", (error) => {
      console.error(error.message);
    });
    this.webSocketServer.on("connection", (ws, req) => {
      const group = req.url.slice(1).toLowerCase();

      if (this.groupNames.has(group as keyof WebSocketConnections)) {
        const groupMap = this.connections[group as keyof WebSocketConnections];
        groupMap.add(ws);

        ws.on("close", () => groupMap.delete(ws));
      }
    });
  }

  public setSelectedGame(game: SelectedGame) {
    this.selectedGame = game;
  }

  public getSelectedGame() {
    return this.selectedGame;
  }

  public getConnections() {
    return this.connections;
  }
}
