import { useEffect, useState } from "react";
import {
  ConnectedMessage,
  iRacingMessage,
  SessionInfoMessage,
  TelemetryMessage,
} from "../../shared/types/iRacingMessage";
import TitleBar from "./components/TitleBar";
import "./Main.css";
// import useLocationHash from "./hooks/useLocationHash";

const Main = () => {
  // const hash = useLocationHash();
  const [connected, setConnected] = useState<ConnectedMessage>({
    type: "Connected",
    timestamp: new Date().toDateString(),
    data: false,
  });
  const [telemetry, setTelemetry] = useState<TelemetryMessage>({
    type: "Telemetry",
    timestamp: new Date().toDateString(),
    data: null,
  });
  const [sessionInfo, setSessionInfo] = useState<SessionInfoMessage>({
    type: "SessionInfo",
    timestamp: new Date().toDateString(),
    data: null,
  });

  useEffect(() => {
    // Listen for messages from the main process
    window.iracingAPI.onMessage((message: iRacingMessage) => {
      if (message.type === "Connected") {
        setConnected(message);
      } else if (message.type === "Telemetry") {
        setTelemetry(message);
      } else if (message.type === "SessionInfo") {
        setSessionInfo(message);
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
    <div className="app-wrapper">
      <TitleBar />
      <div className="app-content">
        <pre>
          {JSON.stringify(
            {
              connected: connected.data,
              telemetry,
              sessionInfo,
            },
            null,
            4
          )}
        </pre>
      </div>
    </div>
  );
};

export default Main;
