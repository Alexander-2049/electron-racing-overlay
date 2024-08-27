import { useTelemetry } from "./hooks/useTelemetry";

const Telemetry = () => {
  const { telemetry, connected } = useTelemetry();

  return (
    <div>
      <pre>{JSON.stringify({ connected, telemetry }, null, 4)}</pre>
    </div>
  );
};

export default Telemetry;
