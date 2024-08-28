export type CallbackType = (data: unknown) => void;
export type CallbackConnectedStatusType = (data: boolean) => void;

class iRacingAPI {
  private url: string;
  private ws: WebSocket | null = null;
  private reconnectInterval = 2000;
  private connectedListeners: CallbackConnectedStatusType[] = [];
  private telemetryListeners: CallbackType[] = [];
  private sessionInfoListeners: CallbackType[] = [];
  private websocketConnected = false;
  private iracingConnected = false;
  private telemetryRequestedFields: string[] = [];
  private sessionInfoRequestedFields: string[] = [];

  constructor(url: string) {
    this.url = url;
    this.connect();
  }

  private connect() {
    this.ws = new WebSocket(this.url);

    this.ws.addEventListener("open", this.onOpen);
    this.ws.addEventListener("close", this.onClose);
    this.ws.addEventListener("error", this.onError);
    this.ws.addEventListener("message", this.onMessage);
  }

  private onOpen = () => {
    console.log("WebSocket connection opened.");
    this.websocketConnected = true;
    this.sendRequestedFields();
  };

  private onClose = () => {
    console.log("WebSocket connection closed.");
    this.websocketConnected = false;
    this.connectedListeners.forEach((callback) => {
      callback(false);
    });
    this.attemptReconnect();
  };

  private onError = (error: Event) => {
    console.error("WebSocket encountered an error:", error);
    if (this.ws) {
      this.ws.close();
    }
  };

  private onMessage = (event: MessageEvent) => {
    console.log("WebSocket message received:", event.data);
    try {
      const parsedMessage = JSON.parse(event.data);
      if (parsedMessage.telemetry) {
        this.telemetryListeners.forEach((callback) => {
          callback(parsedMessage.telemetry);
        });
      }
      if (parsedMessage.sessionInfo) {
        this.sessionInfoListeners.forEach((callback) => {
          callback(parsedMessage.sessionInfo);
        });
      }
      if (Object.keys(parsedMessage).includes("connected")) {
        this.connectedListeners.forEach((callback) => {
          callback(parsedMessage.connected);
        });
      }
    } catch (error) {
      console.error("Error parsing JSON:", error, "Received data:", event.data);
    }
  };

  private attemptReconnect() {
    if (!this.websocketConnected) {
      setTimeout(() => this.connect(), this.reconnectInterval);
    }
  }

  public send(data: unknown) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket is not open. Cannot send data.");
    }
  }

  public addEventListener(
    event: "telemetry" | "sessionInfo" | "connected",
    callback: CallbackType | CallbackConnectedStatusType
  ) {
    if (event === "connected") {
      this.connectedListeners.push(callback);
      if (!this.iracingConnected) {
        callback(false);
      } else if (this.websocketConnected && this.iracingConnected) {
        callback(this.iracingConnected);
      } else {
        callback(false);
      }
    }
    if (event === "telemetry") {
      this.telemetryListeners.push(callback);
    }
    if (event === "sessionInfo") {
      this.sessionInfoListeners.push(callback);
    }
  }

  public removeEventListener(
    type: "telemetry" | "sessionInfo" | "connected",
    callback: CallbackType
  ) {
    if (type === "connected") {
      this.connectedListeners = this.connectedListeners.filter((item) => {
        return item !== callback;
      });
    }
    if (type === "telemetry") {
      this.telemetryListeners = this.telemetryListeners.filter((item) => {
        return item !== callback;
      });
    }
    if (type === "sessionInfo") {
      this.sessionInfoListeners = this.sessionInfoListeners.filter((item) => {
        return item !== callback;
      });
    }
  }

  public addRequestedFields(
    type: "telemetry" | "sessionInfo",
    fields: string[]
  ) {
    if (type === "telemetry") {
      fields.forEach((field) => {
        if (!this.telemetryRequestedFields.includes(field)) {
          this.telemetryRequestedFields.push(field);
        }
      });
    }
    if (type === "sessionInfo") {
      fields.forEach((field) => {
        if (!this.sessionInfoRequestedFields.includes(field)) {
          this.sessionInfoRequestedFields.push(field);
        }
      });
    }
    this.sendRequestedFields();
  }

  public removeRequestedFields(
    type: "telemetry" | "sessionInfo",
    fields: string[]
  ) {
    if (type === "telemetry") {
      fields.forEach((field) => {
        this.telemetryRequestedFields = this.telemetryRequestedFields.filter(
          (element) => {
            return field !== element;
          }
        );
      });
    }
    if (type === "sessionInfo") {
      fields.forEach((field) => {
        this.sessionInfoRequestedFields =
          this.sessionInfoRequestedFields.filter((element) => {
            return field !== element;
          });
      });
    }
    this.sendRequestedFields();
  }

  private sendRequestedFields() {
    this.send({
      telemetry: {
        requestedFields: this.telemetryRequestedFields,
      },
      sessionInfo: {
        requestedFields: this.sessionInfoRequestedFields,
      },
    });
  }
}

const irsdkAPI = new iRacingAPI("ws://localhost:4004");

export default irsdkAPI;
