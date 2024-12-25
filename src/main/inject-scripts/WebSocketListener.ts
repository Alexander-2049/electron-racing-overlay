import { WEBSOCKET_SERVER_PORT } from "../../shared/constants";

export const WEBSOCKET_LISTENER_CODE = `class WebSocketListener {
  constructor(port) {
    const websocketUrl = \`ws://localhost:\${port}\`;
    const eventListenerGroups = new Map();
    const websocketConnections = new Map();
    const CLIENT_DISCONNECT = "CLIENT_DISCONNECT";

    const listenToWebSocket = (path) => {
      const url = \`\${websocketUrl}/\${path}\`;
      const connect = () => {
        if (!eventListenerGroups.has(path)) return;

        const websocketConnection = new WebSocket(url);
        websocketConnection.onmessage = (message) => {
          sendToAllListeners(path, message.data);
        };

        websocketConnection.onerror = () => {
          console.error(\`WebSocket error on path: \${path}\`);
          websocketConnection.close();
        };

        websocketConnection.onclose = (event) => {
          if (event.reason === CLIENT_DISCONNECT) return;
          setTimeout(connect, 5000);
        };

        websocketConnections.set(path, websocketConnection);
      };

      connect();
    };

    const sendToAllListeners = (type, data) => {
      if (!eventListenerGroups.has(type)) return;

      eventListenerGroups.get(type).forEach((callback) => {
        try {
          callback(JSON.parse(data));
        } catch (error) {
          console.error(\`Failed to parse WebSocket data: \${data}\`);
        }
      });
    };

    const stopListenToWebSocket = (path) => {
      const connection = websocketConnections.get(path);
      if (connection) {
        connection.close(1000, CLIENT_DISCONNECT);
        websocketConnections.delete(path);
      }
    };

    // Define public methods
    this.addEventListener = (type, callback) => {
      const typeLowerCase = type.toLowerCase();
      if (!eventListenerGroups.has(typeLowerCase)) {
        eventListenerGroups.set(typeLowerCase, new Map());
        listenToWebSocket(typeLowerCase);
      }

      eventListenerGroups.get(typeLowerCase).set(callback, callback);
    };

    this.removeEventListener = (type, callback) => {
      const typeLowerCase = type.toLowerCase();
      if (!eventListenerGroups.has(typeLowerCase)) return;

      const eventListenersGroup = eventListenerGroups.get(typeLowerCase);
      eventListenersGroup.delete(callback);

      if (eventListenersGroup.size === 0) {
        stopListenToWebSocket(typeLowerCase);
        eventListenerGroups.delete(typeLowerCase);
      }
    };
  }

  // Only expose these methods to the outside
  getAddEventListener() {
    return this.addEventListener;
  }

  getRemoveEventListener() {
    return this.removeEventListener;
  }
}

window.api = new WebSocketListener(${WEBSOCKET_SERVER_PORT});`;

export class WebSocketListener {
  private readonly addEventListener: (type: string, callback: (data: unknown) => void) => void;
  private readonly removeEventListener: (type: string, callback: (data: unknown) => void) => void;

  constructor(port: number) {
    const websocketUrl = `ws://localhost:${port}`;
    const eventListenerGroups: Map<string, Map<(data: unknown) => void, (data: unknown) => void>> = new Map();
    const websocketConnections: Map<string, WebSocket> = new Map();
    const CLIENT_DISCONNECT = "CLIENT_DISCONNECT";

    const listenToWebSocket = (path: string) => {
      const url = `${websocketUrl}/${path}`;
      const connect = () => {
        if (!eventListenerGroups.has(path)) return;

        const websocketConnection = new WebSocket(url);
        websocketConnection.onmessage = (message) => {
          sendToAllListeners(path, message.data);
        };

        websocketConnection.onerror = () => {
          console.error(`WebSocket error on path: ${path}`);
          websocketConnection.close();
        };

        websocketConnection.onclose = (event) => {
          if (event.reason === CLIENT_DISCONNECT) return;
          setTimeout(connect, 5000);
        };

        websocketConnections.set(path, websocketConnection);
      };

      connect();
    };

    const sendToAllListeners = (type: string, data: string) => {
      if (!eventListenerGroups.has(type)) return;

      eventListenerGroups.get(type).forEach((callback) => {
        try {
          callback(JSON.parse(data));
        } catch (error) {
          console.error(`Failed to parse WebSocket data: ${data}`);
        }
      });
    };

    const stopListenToWebSocket = (path: string) => {
      const connection = websocketConnections.get(path);
      if (connection) {
        connection.close(1000, CLIENT_DISCONNECT);
        websocketConnections.delete(path);
      }
    };

    // Define public methods
    this.addEventListener = (type: string, callback: (data: unknown) => void) => {
      const typeLowerCase = type.toLowerCase();
      if (!eventListenerGroups.has(typeLowerCase)) {
        eventListenerGroups.set(typeLowerCase, new Map());
        listenToWebSocket(typeLowerCase);
      }

      eventListenerGroups.get(typeLowerCase).set(callback, callback);
    };

    this.removeEventListener = (type: string, callback: (data: unknown) => void) => {
      const typeLowerCase = type.toLowerCase();
      if (!eventListenerGroups.has(typeLowerCase)) return;

      const eventListenersGroup = eventListenerGroups.get(typeLowerCase);
      eventListenersGroup.delete(callback);

      if (eventListenersGroup.size === 0) {
        stopListenToWebSocket(typeLowerCase);
        eventListenerGroups.delete(typeLowerCase);
      }
    };
  }

  // Only expose these methods to the outside
  public getAddEventListener() {
    return this.addEventListener;
  }

  public getRemoveEventListener() {
    return this.removeEventListener;
  }
}