import { useEffect, useState } from "react";
import Layout from "./components/layout";
import Button from "./components/ui/button";
import { GameAPI } from "./utils/GameAPI";
import { WEBSOCKET_SERVER_PORT } from "../../shared/constants";
// import useLocationHash from "./hooks/useLocationHash";

const Main = () => {
  const [api] = useState(new GameAPI(WEBSOCKET_SERVER_PORT));
  const [controls, setControls] = useState(null);

  useEffect(() => {
    const callback = (data: unknown) => {
      setControls(data);
    };

    api.addEventListener("controls", callback);
    return () => {
      api.removeEventListener("controls", callback);
    };
  }, []);

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
      <pre>{JSON.stringify(controls, undefined, " ")}</pre>
    </Layout>
  );
};

export default Main;
