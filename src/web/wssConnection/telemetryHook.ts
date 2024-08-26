import { useEffect, useState } from "react";
import ws from "."; // Import the ReconnectingWebSocket instance

interface TelemetryData {
  Throttle: number;
  Brake: number;
  RPM: number;
  Gear: number;
}

interface WebSocketData {
  telemetry?: TelemetryData;
}

const useTelemetryData = () => {
  const [telemetry, setTelemetry] = useState<TelemetryData | null>(null);

  useEffect(() => {
    // Define the onmessage handler to process incoming WebSocket data
    const handleMessage = (event: MessageEvent) => {
      try {
        const data: WebSocketData = JSON.parse(event.data);

        if (data.telemetry) {
          setTelemetry(data.telemetry);
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    // Set up the WebSocket event listener
    ws.ws?.addEventListener("message", handleMessage);

    // Cleanup the WebSocket event listener on unmount
    return () => {
      ws.ws?.removeEventListener("message", handleMessage);
    };
  }, []);

  return { telemetry };
};

export default useTelemetryData;
