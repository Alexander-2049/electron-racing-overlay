import { useEffect } from "react";

const Telemetry = () => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:4004");
    ws.addEventListener("open", () => {
      console.log("open");
      ws.send(
        JSON.stringify({
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
        })
      );
    });
    ws.addEventListener("message", (message) => {
      console.log(message.data);
    });
    ws.addEventListener("close", () => {
      console.log("close");
    });
  }, []);

  return <div></div>;
};

export default Telemetry;
