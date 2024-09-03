import { useEffect, useState } from "react";
import { iRacingMessage } from "../index";
// import Speedometer from "./components/Speedometer/speedometer";
// import useLocationHash from "./hooks/useLocationHash";
// import { useTelemetry } from "./hooks/useTelemetry";
// import Telemetry from "./telemetry";

const Main = () => {
  // const hash = useLocationHash();
  // const telemetryData = useTelemetry();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [telemetry, setTelemetry] = useState<null | unknown>(null);
  const [sessionInfo, setSessionInfo] = useState<null | unknown>(null);

  useEffect(() => {
    // Listen for messages from the main process
    window.iracingAPI.onMessage((message: iRacingMessage) => {
      if (message.type === "Connected" && typeof message.data === "boolean") {
        setIsConnected(message.data);
      } else if (message.type === "Telemetry") {
        setTelemetry(message.data);
      } else if (message.type === "SessionInfo") {
        setSessionInfo(message.data);
      }
    });

    // Optionally, send an initial message to the main process
    // window.iracingAPI.sendMessage("Hello from React!");

    // Cleanup the event listener on unmount
    return () => {
      window.iracingAPI.onMessage(null); // Clear the listener
    };
  }, []);

  // if (hash.toLowerCase() === "#speedometer") {
  //   if (telemetryData.connected) {
  //     return <Speedometer telemetryData={telemetryData} />;
  //   } else {
  //     return null;
  //   }
  // }

  return (
    <h2>
      <pre>
        {JSON.stringify(
          {
            connected: isConnected,
            telemetry,
            sessionInfo,
          },
          null,
          4
        )}
      </pre>
    </h2>
  );
};

export default Main;
