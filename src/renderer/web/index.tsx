import Layout from "./components/layout";
import Button from "./components/ui/button";
// import useLocationHash from "./hooks/useLocationHash";

const Main = () => {

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
      <Button
        onClick={() => {
          window.MainWindowAPI.sendMessage("switch-to-iracing");
        }}
      >
        Connect to iRacing client
      </Button>
      {/* TODO: Remove/Replace "disconnect-from-iracing" */}
      <Button
        onClick={() => {
          window.MainWindowAPI.sendMessage("disconnect-from-iracing");
        }}
      >
        Disconnect from iRacing client
      </Button>
      <Button>Mods</Button>
    </Layout>
  );
};

export default Main;
