import { useEffect, useState } from "react";
import {
  ConnectedMessage,
  iRacingMessage,
  SessionInfoMessage,
  TelemetryMessage,
} from "../../shared/types/iRacingMessage";
import Layout from "./components/layout";
import TelemetryPreview from "./components/telemetry-preview";
import Button from "./components/ui/button";
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
    window.iRacingAPI.onMessage((message: iRacingMessage) => {
      if (message.type === "Connected") {
        setConnected(message);
      } else if (message.type === "Telemetry") {
        setTelemetry(message);
      } else if (message.type === "SessionInfo") {
        setSessionInfo(message);
      } else {
        console.log("ANOTHER MESSAGE", message);
      }
    });

    // Optionally, send an initial message to the main process
    // window.iracingAPI.sendMessage("Hello from React!");

    // Cleanup the event listener on unmount
    return () => {
      window.iRacingAPI.onMessage(null); // Clear the listener
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
    <Layout>
      <h1>Hello!</h1>
      <Button onClick={() => {
        window.MainWindowAPI.sendMessage("switch-to-iracing");
      }}>Connect to iRacing client</Button>
      <Button>Mods</Button>
      {connected && telemetry.data !== null ? (
        <TelemetryPreview
          connected={true}
          brake={telemetry.data.Brake}
          rpm={telemetry.data.RPM}
          speed={telemetry.data.Speed}
          throttle={telemetry.data.Throttle}
        />
      ) : (
        <TelemetryPreview connected={false} />
      )}
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
    </Layout>
  );
};

export default Main;
