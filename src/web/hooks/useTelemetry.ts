import { useEffect, useState } from "react";
import irsdkAPI from "../api/websocket";

interface TelemetryData {
  Throttle?: number | null;
  Brake?: number | null;
  RPM?: number | null;
  Gear?: number | null;
}

const requestedFields = ["Throttle", "Brake", "RPM", "Gear"];

export const useTelemetry = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);
  const [connected, setConnected] = useState<boolean>(false);

  useEffect(() => {
    // Define the onmessage handler to process incoming WebSocket data
    const handleTelemetryMessage = (data: TelemetryData) => {
      setTelemetry(data);
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

  return { connected, telemetry };
};
