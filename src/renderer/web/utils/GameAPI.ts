export class GameAPI {
  private eventListenerGroups: Map<
    string,
    Map<(data: unknown) => void, (data: unknown) => void>
  > = new Map();
  private websocketConnections: Map<string, WebSocket> = new Map();
  private websocketUrl: string;
  private CLIENT_DISCONNECT = "CLIENT_DISCONNECT";

  constructor(port: number) {
    this.websocketUrl = `ws://localhost:${port}`;
  }

  public addEventListener(type: string, callback: (data: unknown) => void) {
    const typeLowerCase = type.toLowerCase();
    if (!this.eventListenerGroups.has(typeLowerCase)) {
      this.eventListenerGroups.set(typeLowerCase, new Map());
      this.listenToWebSocket(typeLowerCase);
    }

    this.eventListenerGroups.get(typeLowerCase).set(callback, callback);
  }

  public removeEventListener(type: string, callback: (data: unknown) => void) {
    const typeLowerCase = type.toLowerCase();
    if (!this.eventListenerGroups.has(typeLowerCase)) return;

    const eventListenersGroup = this.eventListenerGroups.get(typeLowerCase);
    eventListenersGroup.delete(callback);

    if (eventListenersGroup.size === 0) {
      this.stopListenToWebSocket(typeLowerCase);
      this.eventListenerGroups.delete(typeLowerCase);
    }
  }

  private listenToWebSocket(path: string) {
    const url = `${this.websocketUrl}/${path}`;
    const connect = () => {
      if (!this.eventListenerGroups.has(path)) return;

      const websocketConnection = new WebSocket(url);
      websocketConnection.onmessage = (message) => {
        this.sendToAllListeners(path, message.data);
      };

      websocketConnection.onerror = () => {
        console.error(`WebSocket error on path: ${path}`);
        websocketConnection.close();
      };

      websocketConnection.onclose = (event) => {
        if (event.reason === this.CLIENT_DISCONNECT) return;
        setTimeout(connect, 5000);
      };

      this.websocketConnections.set(path, websocketConnection);
    };

    connect();
  }

  private sendToAllListeners(type: string, data: string) {
    if (!this.eventListenerGroups.has(type)) return;

    this.eventListenerGroups.get(type).forEach((callback) => {
      try {
        callback(JSON.parse(data));
      } catch (error) {
        console.error(`Failed to parse WebSocket data: ${data}`);
      }
    });
  }

  private stopListenToWebSocket(path: string) {
    const connection = this.websocketConnections.get(path);
    if (connection) {
      connection.close(1000, this.CLIENT_DISCONNECT);
      this.websocketConnections.delete(path);
    }
  }
}
