import useTelemetryData from "./wssConnection/telemetryHook";

const Telemetry = () => {
  const { telemetry } = useTelemetryData();

  return <div><pre>{JSON.stringify(telemetry, null, 4)}</pre></div>;
};

export default Telemetry;
