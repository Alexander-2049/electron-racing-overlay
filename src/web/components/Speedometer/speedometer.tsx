import { useEffect, useState } from "react";
import "./speedometer.css";
import { useTelemetry } from "../../hooks/useTelemetry";

enum BrickColor {
  whiteTransparent,
  white,
  red,
  yellow,
  green,
  redBlink,
}

const AMOUNT_OF_BRICKS = 77; // Move constants outside

const Speedometer = () => {
  const telemetryData = useTelemetry();

  const [bricks, setBricks] = useState<BrickColor[]>(
    initialBricks(AMOUNT_OF_BRICKS)
  );

  useEffect(() => {
    if (!telemetryData.connected || !telemetryData.telemetry) {
      return;
    }
    const { telemetry } = telemetryData;

    const bricksToPaint = Math.floor(
      (telemetry.RPM * AMOUNT_OF_BRICKS) / telemetry.PlayerCarSLShiftRPM
    );

    const paintColor =
    telemetry.RPM >= telemetry.PlayerCarSLBlinkRPM
    ? BrickColor.redBlink
    : telemetry.RPM > telemetry.PlayerCarSLLastRPM
    ? BrickColor.red
    : telemetry.RPM >= telemetryData.telemetry.PlayerCarSLShiftRPM
    ? BrickColor.yellow
    : telemetry.RPM >= telemetryData.telemetry.PlayerCarSLFirstRPM
    ? BrickColor.green
    : BrickColor.white;

    setBricks((prevBricks) => {
      const updatedBricks = [...prevBricks];

      for (let i = 0; i < AMOUNT_OF_BRICKS; i++) {
        if (paintColor === BrickColor.redBlink) {
          updatedBricks[i] = BrickColor.redBlink;
        } else if (i <= bricksToPaint) {
          updatedBricks[i] = paintColor;
        } else {
          updatedBricks[i] = BrickColor.whiteTransparent;
        }
      }

      return updatedBricks;
    });
  }, [telemetryData]);

  return (
    <div className="bricks-wrapper">
      {bricks.map((brick, index) => {
        const brickClass =
          brick === BrickColor.whiteTransparent
            ? "brick white transparent"
            : brick === BrickColor.white
            ? "brick white"
            : brick === BrickColor.yellow
            ? "brick yellow"
            : brick === BrickColor.green
            ? "brick green"
            : brick === BrickColor.red
            ? "brick red"
            : "brick red blink";

        return <div key={index} className={brickClass}></div>;
      })}
    </div>
  );
};

function initialBricks(amountOfBricks: number): BrickColor[] {
  return Array(amountOfBricks).fill(BrickColor.whiteTransparent);
}

export default Speedometer;
