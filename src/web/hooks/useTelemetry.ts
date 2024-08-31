import { useEffect, useState } from "react";
import irsdkAPI from "../api/websocket";
import checkRequestedFields from "../utils/checkRequestedFields";

export interface TelemetryData {
  connected: boolean;
  telemetry: TelemetryValues | null;
}

export interface TelemetryValues {
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

export const useTelemetry = (): TelemetryData => {
  const [data, setData] = useState<{
    connected: boolean;
    telemetry: TelemetryValues | null;
  }>({ connected: false, telemetry: null });

  useEffect(() => {
    // Define the onmessage handler to process incoming WebSocket data
    const handleTelemetryMessage = (updatedTelemetryData: TelemetryValues) => {
      if (checkRequestedFields(updatedTelemetryData, requestedFields)) {
        setData({
          connected: true,
          telemetry: updatedTelemetryData,
        });
      } else {
        setData({
          connected: true,
          telemetry: null,
        });
      }
    };

    const handleConnectedMessage = (isConnected: boolean) => {
      setData({
        connected: isConnected,
        telemetry: data.telemetry,
      });
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

  return data;
};
