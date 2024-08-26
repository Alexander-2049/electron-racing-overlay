class ReconnectingWebSocket {
  private url: string;
  public ws: WebSocket | null = null;
  private reconnectInterval = 2000; // Time in milliseconds between reconnection attempts
  private maxRetries = 10; // Maximum number of reconnection attempts
  private retryCount = 0;

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener("open", this.onOpen);
    this.ws.addEventListener("close", this.onClose);
    this.ws.addEventListener("error", this.onError);
    // this.ws.addEventListener("message", this.onMessage);
  }

  private onOpen = () => {
    console.log("WebSocket connection opened.");
    this.retryCount = 0; // Reset retry count on successful connection
    this.sendInitialData(); // Send initial data when the connection opens
  };

  private onClose = () => {
    console.log("WebSocket connection closed.");
    this.attemptReconnect();
  };

  private onError = (error: Event) => {
    console.error("WebSocket encountered an error:", error);
    if (this.ws) {
      this.ws.close();
    }
  };

  // private onMessage = (event: MessageEvent) => {
  //   console.log("WebSocket message received:", event.data);
  // };

  private attemptReconnect() {
    if (this.retryCount < this.maxRetries) {
      this.retryCount += 1;
      console.log(
        `Attempting to reconnect... (${this.retryCount}/${this.maxRetries})`
      );
      setTimeout(() => this.connect(), this.reconnectInterval);
    } else {
      console.error("Max reconnect attempts reached. Giving up.");
    }
  }

  private sendInitialData() {
    const data = {
      telemetry: {
        requestedFields: ["Throttle", "Brake", "RPM", "Gear"],
      },
      sessionInfo: {
        requestedFields: [
          "WeekendInfo.TrackName",
          "WeekendInfo.TrackDisplayName",
          "WeekendInfo.BuildVersion",
          "WeekendInfo.WeekendOptions.NumStarters",
        ],
      },
    };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }

  public send(data: unknown) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Cannot send data.");
    }
  }
}

const ws = new ReconnectingWebSocket("ws://localhost:4004");

export default ws;
