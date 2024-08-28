import { useEffect, useState } from "react";
import "./speedometer.css";

export interface SpeedometerProps {
  Speed: number;
  Gear: number;
  Engine: EngineProps;
}

export interface EngineProps {
  RPM: number;
  PlayerCarSLFirstRPM: number;
  PlayerCarSLShiftRPM: number;
  PlayerCarSLLastRPM: number;
  PlayerCarSLBlinkRPM: number;
}

enum BrickColor {
  whiteTransparent,
  white,
  red,
  redBlink,
}

const Speedometer = (props: SpeedometerProps) => {
  const AMOUNT_OF_BRICKS = 77;
  const [bricks, setBricks] = useState<BrickColor[]>(
    initialBricks(AMOUNT_OF_BRICKS)
  );

  useEffect(() => {
    const bricksToPaint = Math.floor(
      (props.Engine.RPM * AMOUNT_OF_BRICKS) / props.Engine.PlayerCarSLShiftRPM
    );

    const paintColor =
      props.Engine.RPM >= props.Engine.PlayerCarSLBlinkRPM
        ? BrickColor.redBlink
        : (props.Engine.RPM > props.Engine.PlayerCarSLLastRPM
        ? BrickColor.red
        : BrickColor.white);

    const updatedBricks = [...bricks];

    for (let i = 0; i < AMOUNT_OF_BRICKS; i++) {
      if (paintColor === BrickColor.redBlink) {
        updatedBricks[i] = BrickColor.redBlink;
      } else if (i <= bricksToPaint) {
        updatedBricks[i] = paintColor;
      } else {
        updatedBricks[i] = BrickColor.whiteTransparent;
      }
    }

    setBricks(updatedBricks);
  }, [props.Engine]);

  return (
    <div className="bricks-wrapper">
      {bricks.map((brick) => {
        if (brick === BrickColor.whiteTransparent) {
          return <div className="brick white transparent"></div>;
        } else if (brick === BrickColor.white) {
          return <div className="brick white"></div>;
        } else if (brick === BrickColor.red) {
          return <div className="brick red"></div>;
        } else if (brick === BrickColor.redBlink) {
          return <div className="brick red blink"></div>;
        }
      })}
    </div>
  );
};

function initialBricks(amountOfBricks: number) {
  const initialBricks = [];
  for (let i = 0; i < amountOfBricks; i++) {
    initialBricks.push(BrickColor.whiteTransparent);
  }
  return initialBricks;
}

export default Speedometer;
