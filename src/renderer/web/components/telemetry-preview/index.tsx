type TelemetryPreviewProps =
  | TelemetryPreviewPropsConnected
  | TelemetryPreviewPropsDisconnected;

interface TelemetryPreviewPropsDisconnected {
  connected: false;
}

interface TelemetryPreviewPropsConnected {
  connected: true;
  throttle: number;
  brake: number;
  rpm: number;
  speed: number;
}

const TelemetryPreview = (props: TelemetryPreviewProps) => {
  if (!props.connected) {
    return <div>iRacing is not connected</div>;
  }

  return (
    <div>
      <h2>{props.rpm}</h2>
      <h2>{props.throttle}</h2>
    </div>
  );
};

export default TelemetryPreview;
