import { useEffect, useState } from "react";
import irsdkAPI from "../api/websocket";
import checkRequestedFields from "../utils/checkRequestedFields";

interface TelemetryData {
  Throttle: number;
  Brake: number;
  RPM: number;
  Gear: number;
  Speed: number;
  PlayerCarSLFirstRPM: number;
  PlayerCarSLShiftRPM: number;
  PlayerCarSLLastRPM: number;
  PlayerCarSLBlinkRPM: number;
}

const requestedFields = [
  "Throttle",
  "Brake",
  "RPM",
  "Gear",
  "Speed",
  "PlayerCarSLFirstRPM",
  "PlayerCarSLShiftRPM",
  "PlayerCarSLLastRPM",
  "PlayerCarSLBlinkRPM",
];

export const useTelemetry = (): {
  connected: boolean;
  telemetry: TelemetryData | null;
} => {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // Define the onmessage handler to process incoming WebSocket data
    const handleTelemetryMessage = (data: TelemetryData) => {
      if (checkRequestedFields(data, requestedFields)) {
        setTelemetry(data);
      } else {
        setTelemetry(null);
      }
    };

    const handleConnectedMessage = (isConnected: boolean) => {
      setConnected(isConnected);
    };

    // Set up the WebSocket event listener
    irsdkAPI.addEventListener("telemetry", handleTelemetryMessage);
    irsdkAPI.addEventListener("connected", handleConnectedMessage);

    irsdkAPI.addRequestedFields("telemetry", requestedFields);

    // Cleanup the WebSocket event listener on unmount
    return () => {
      irsdkAPI.removeEventListener("telemetry", handleTelemetryMessage);
      irsdkAPI.removeEventListener("connected", handleConnectedMessage);
    };
  }, []);

  return { telemetry, connected };
};
