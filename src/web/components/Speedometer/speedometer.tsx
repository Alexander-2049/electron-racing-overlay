import { useEffect, useState } from "react";
import "./speedometer.css";
import { TelemetryData } from "../../hooks/useTelemetry";

enum BrickColor {
  whiteTransparent,
  white,
  red,
  yellow,
  green,
  redBlink,
}

const brickColorMap = new Map([
  [BrickColor.whiteTransparent, "brick white transparent"],
  [BrickColor.white, "brick white"],
  [BrickColor.yellow, "brick yellow"],
  [BrickColor.green, "brick green"],
  [BrickColor.red, "brick red"],
  [BrickColor.redBlink, "brick red blink"],
]);

const AMOUNT_OF_BRICKS = 77; // Move constants outside

const Speedometer = ({ telemetryData }: { telemetryData: TelemetryData }) => {
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
        const brickClass = brickColorMap.get(brick);

        return <div key={index} className={brickClass}></div>;
      })}
    </div>
  );
};

function initialBricks(amountOfBricks: number): BrickColor[] {
  return Array(amountOfBricks).fill(BrickColor.whiteTransparent);
}

export default Speedometer;
