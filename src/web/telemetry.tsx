import Speedometer from "./components/Speedometer/speedometer";
import { useTelemetry } from "./hooks/useTelemetry";

const Telemetry = () => {
  const telemetryData = useTelemetry();
  if (!telemetryData.connected) {
    return <div>Connection is currently unavaliable</div>;
  }
  if (!telemetryData.telemetry) {
    return <div>Telemetry is currently unavaliable</div>;
  }
  const { telemetry } = telemetryData;

  return (
    <div>
      <pre>
        {JSON.stringify(
          { connected: telemetryData.connected, telemetry },
          null,
          4
        )}
      </pre>
      <Speedometer
        Speed={telemetry.Speed}
        Gear={telemetry.Gear}
        Engine={{
          PlayerCarSLBlinkRPM: telemetry.PlayerCarSLBlinkRPM,
          PlayerCarSLFirstRPM: telemetry.PlayerCarSLFirstRPM,
          PlayerCarSLLastRPM: telemetry.PlayerCarSLLastRPM,
          PlayerCarSLShiftRPM: telemetry.PlayerCarSLShiftRPM,
          RPM: telemetry?.RPM,
        }}
      />
    </div>
  );
};

export default Telemetry;
