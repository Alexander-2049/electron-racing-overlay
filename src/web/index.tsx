import Speedometer from "./components/Speedometer/speedometer";
import useLocationHash from "./hooks/useLocationHash";
import { useTelemetry } from "./hooks/useTelemetry";
import Telemetry from "./telemetry";

const Main = () => {
  const hash = useLocationHash();
  const telemetryData = useTelemetry();

  if (hash.toLowerCase() === "#speedometer" && telemetryData.connected) {
    return <Speedometer telemetryData={telemetryData} />;
  }

  return (
    <h2>
      <Telemetry />
    </h2>
  );
};

export default Main;
