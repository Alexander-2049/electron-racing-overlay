import Speedometer from "./components/Speedometer/speedometer";
import useLocationHash from "./hooks/useLocationHash";
import Telemetry from "./telemetry";

const Main = () => {
  const hash = useLocationHash();

  if (hash.toLowerCase() === "#speedometer") {
    return <Speedometer />;
  }

  return (
    <h2>
      <Telemetry />
    </h2>
  );
};

export default Main;
