import { iRacingSDK } from "./games/iracing/iRacingSDK";
import { SpeedConverter } from "./utils/speedConverter";
import { iracingSteeringAngleToPercents } from "./utils/iracingSteeringAngleToPercents";
import { GamesWebSocketServerAPI } from "./models/GamesWebSocketServerAPI";

export const irsdkipc = new iRacingSDK();

export const gamesWebSocketServerAPI = new GamesWebSocketServerAPI();

// irsdkipc.on("sessionInfo", (sessionInfo) => {
//   if (gamesWebSocketServerAPI.getSelectedGame() !== "IRACING") return;
// });

irsdkipc.on("telemetry", (telemetry) => {
  if (gamesWebSocketServerAPI.getSelectedGame() !== "IRACING") return;
  gamesWebSocketServerAPI.getConnections().rpm.send({
    green: telemetry.data.PlayerCarSLFirstRPM,
    orange: telemetry.data.PlayerCarSLShiftRPM,
    red: telemetry.data.PlayerCarSLLastRPM,
    max: telemetry.data.PlayerCarSLBlinkRPM,
    rpm: telemetry.data.RPM,
  });

  gamesWebSocketServerAPI.getConnections().controls.send({
    brake: telemetry.data.Brake,
    clutch: telemetry.data.Clutch,
    steeringAnglePercents: iracingSteeringAngleToPercents(
      telemetry.data.SteeringWheelAngle
    ),
    throttle: telemetry.data.Throttle,
  });

  gamesWebSocketServerAPI.getConnections().speed.send({
    displayUnits: telemetry.data.DisplayUnits === 0 ? "IMPERIAL" : "METRIC",
    speedKph: SpeedConverter.convert(
      telemetry.data.Speed,
      "METERS_PER_SECOND",
      "KILOMETERS_PER_HOUR"
    ),
    speedMph: SpeedConverter.convert(
      telemetry.data.Speed,
      "METERS_PER_SECOND",
      "MILES_PER_HOUR"
    ),
  });

  gamesWebSocketServerAPI.getConnections()["car-location"].send({
    isInGarage: telemetry.data.IsInGarage,
    isOnPitLane: telemetry.data.OnPitRoad,
    isOnTrack: telemetry.data.IsOnTrack,
  });
});

// irsdkipc.on("connected", (connected) => {
//   if (gamesWebSocketServerAPI.getSelectedGame() !== "IRACING") return;
// });

irsdkipc.on("close", () => {
  if (gamesWebSocketServerAPI.getSelectedGame() !== "IRACING") return;
});

irsdkipc.on("spawn", () => {
  if (gamesWebSocketServerAPI.getSelectedGame() !== "IRACING") return;
});
