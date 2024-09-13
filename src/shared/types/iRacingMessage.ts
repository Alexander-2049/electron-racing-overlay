import { SessionInfo } from "./sessionInfo";
import { TelemetryInterface } from "./telemetry";

export type iRacingMessage =
  | TelemetryMessage
  | SessionInfoMessage
  | ConnectedMessage;

export interface TelemetryMessage {
  type: "Telemetry";
  data: TelemetryInterface | null;
  timestamp: string;
}

export interface SessionInfoMessage {
  type: "SessionInfo";
  data: SessionInfo | null;
  timestamp: string;
}

export interface ConnectedMessage {
  type: "Connected";
  data: boolean;
  timestamp: string;
}
