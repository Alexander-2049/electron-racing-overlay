export interface SessionInfo {
  WeekendInfo: WeekendInfo;
  SessionInfo: SessionInfoField;
  CameraInfo: CameraInfo;
  RadioInfo: RadioInfo;
  DriverInfo: DriverInfo;
  SplitTimeInfo: SplitTimeInfo;
  CarSetup: CarSetup;
}

export interface WeekendInfo {
  TrackName: string;
  TrackID: number;
  TrackLength: string;
  TrackLengthOfficial: string;
  TrackDisplayName: string;
  TrackDisplayShortName: string;
  TrackConfigName: null | string;
  TrackCity: string;
  TrackCountry: string;
  TrackAltitude: string;
  TrackLatitude: string;
  TrackLongitude: string;
  TrackNorthOffset: string;
  TrackNumTurns: number;
  TrackPitSpeedLimit: string;
  TrackType: string;
  TrackDirection: string;
  TrackWeatherType: string;
  TrackSkies: string;
  TrackSurfaceTemp: string;
  TrackAirTemp: string;
  TrackAirPressure: string;
  TrackWindVel: string;
  TrackWindDir: string;
  TrackRelativeHumidity: string;
  TrackFogLevel: string;
  TrackPrecipitation: string;
  TrackCleanup: number;
  TrackDynamicTrack: number;
  TrackVersion: string;
  SeriesID: number;
  SeasonID: number;
  SessionID: number;
  SubSessionID: number;
  LeagueID: number;
  Official: number;
  RaceWeek: number;
  EventType: string;
  Category: string;
  SimMode: string;
  TeamRacing: number;
  MinDrivers: number;
  MaxDrivers: number;
  DCRuleSet: string;
  QualifierMustStartRace: number;
  NumCarClasses: number;
  NumCarTypes: number;
  HeatRacing: number;
  BuildType: string;
  BuildTarget: string;
  BuildVersion: string;
  RaceFarm: string | null;
  WeekendOptions: WeekendOptions;
  TelemetryOptions: TelemetryOptions;
}

export interface WeekendOptions {
  NumStarters: number;
  StartingGrid: string;
  QualifyScoring: string;
  CourseCautions: string;
  StandingStart: number;
  ShortParadeLap: number;
  Restarts: string;
  WeatherType: string;
  Skies: string;
  WindDirection: string;
  WindSpeed: string;
  WeatherTemp: string;
  RelativeHumidity: string;
  FogLevel: string;
  TimeOfDay: string;
  Date: string;
  EarthRotationSpeedupFactor: number;
  Unofficial: number;
  CommercialMode: string;
  NightMode: string;
  IsFixedSetup: number;
  StrictLapsChecking: string;
  HasOpenRegistration: number;
  HardcoreLevel: number;
  NumJokerLaps: number;
  IncidentLimit: string;
  FastRepairsLimit: string;
  GreenWhiteCheckeredLimit: number;
}

export interface TelemetryOptions {
  TelemetryDiskFile: string;
}

export interface SessionInfoField {
  Sessions: Session[];
}

export interface Session {
  SessionNum: number;
  SessionLaps: string;
  SessionTime: string;
  SessionNumLapsToAvg: number;
  SessionType: string;
  SessionTrackRubberState: string;
  SessionName: string;
  SessionSubType: string | null;
  SessionSkipped: number;
  SessionRunGroupsUsed: number;
  SessionEnforceTireCompoundChange: number;
  // TODO: Find type of ResultsPositions
  // ResultsPositions: any;
  ResultsFastestLap: ResultsFastestLap[];
  ResultsAverageLapTime: number;
  ResultsNumCautionFlags: number;
  ResultsNumCautionLaps: number;
  ResultsNumLeadChanges: number;
  ResultsLapsComplete: number;
  ResultsOfficial: number;
}

export interface ResultsFastestLap {
  CarIdx: number;
  FastestLap: number;
  FastestTime: number;
}

export interface CameraInfo {
  Groups: Group[];
}

export interface Group {
  GroupNum: number;
  GroupName: string;
  Cameras: Camera[];
  IsScenic?: boolean;
}

export interface Camera {
  CameraNum: number;
  CameraName: string;
}

export interface RadioInfo {
  SelectedRadioNum: number;
  Radios: Radio[];
}

export interface Radio {
  RadioNum: number;
  HopCount: number;
  NumFrequencies: number;
  TunedToFrequencyNum: number;
  ScanningIsOn: number;
  Frequencies: Frequency[];
}

export interface Frequency {
  FrequencyNum: number;
  FrequencyName: string;
  Priority: number;
  CarIdx: number;
  EntryIdx: number;
  ClubID: number;
  CanScan: number;
  CanSquawk: number;
  Muted: number;
  IsMutable: number;
  IsDeletable: number;
}

export interface DriverInfo {
  DriverCarIdx: number;
  DriverUserID: number;
  PaceCarIdx: number;
  DriverHeadPosX: number;
  DriverHeadPosY: number;
  DriverHeadPosZ: number;
  DriverCarIsElectric: number;
  DriverCarIdleRPM: number;
  DriverCarRedLine: number;
  DriverCarEngCylinderCount: number;
  DriverCarFuelKgPerLtr: number;
  DriverCarFuelMaxLtr: number;
  DriverCarMaxFuelPct: number;
  DriverCarGearNumForward: number;
  DriverCarGearNeutral: number;
  DriverCarGearReverse: number;
  DriverCarSLFirstRPM: number;
  DriverCarSLShiftRPM: number;
  DriverCarSLLastRPM: number;
  DriverCarSLBlinkRPM: number;
  DriverCarVersion: string;
  DriverPitTrkPct: number;
  DriverCarEstLapTime: number;
  DriverSetupName: string;
  DriverSetupIsModified: number;
  DriverSetupLoadTypeName: string;
  DriverSetupPassedTech: number;
  DriverIncidentCount: number;
  Drivers: Driver[];
}

export interface Driver {
  CarIdx: number;
  UserName: string;
  AbbrevName: string | null;
  Initials: string | null;
  UserID: number;
  TeamID: number;
  TeamName: string;
  CarNumber: string;
  CarNumberRaw: number;
  CarPath: string;
  CarClassID: number;
  CarID: number;
  CarIsPaceCar: number;
  CarIsAI: number;
  CarIsElectric: number;
  CarScreenName: string;
  CarScreenNameShort: string;
  CarClassShortName: string | null;
  CarClassRelSpeed: number;
  CarClassLicenseLevel: number;
  CarClassMaxFuelPct: string;
  CarClassWeightPenalty: string;
  CarClassPowerAdjust: string;
  CarClassDryTireSetLimit: string;
  CarClassColor: number;
  CarClassEstLapTime: number;
  IRating: number;
  LicLevel: number;
  LicSubLevel: number;
  LicString: string;
  LicColor: number;
  IsSpectator: number;
  CarDesignStr: string;
  HelmetDesignStr: string;
  SuitDesignStr: string;
  BodyType: number;
  FaceType: number;
  HelmetType: number;
  CarNumberDesignStr: string;
  CarSponsor_1: number;
  CarSponsor_2: number;
  CurDriverIncidentCount: number;
  TeamIncidentCount: number;
}

export interface SplitTimeInfo {
  Sectors: Sector[];
}

export interface Sector {
  SectorNum: number;
  SectorStartPct: number;
}

export interface CarSetup {
  UpdateCount: number;
  TiresAero: TiresAero;
  Chassis: Chassis;
}

export interface TiresAero {
  TireType: TireType;
  LeftFront: LeftFront;
  LeftRear: LeftRear;
  RightFront: RightFront;
  RightRear: RightRear;
}

export interface TireType {
  TireType: string;
}

export interface LeftFront {
  StartingPressure: string;
  LastHotPressure: string;
  LastTempsOMI: string;
  TreadRemaining: string;
}

export interface LeftRear {
  StartingPressure: string;
  LastHotPressure: string;
  LastTempsOMI: string;
  TreadRemaining: string;
}

export interface RightFront {
  StartingPressure: string;
  LastHotPressure: string;
  LastTempsIMO: string;
  TreadRemaining: string;
}

export interface RightRear {
  StartingPressure: string;
  LastHotPressure: string;
  LastTempsIMO: string;
  TreadRemaining: string;
}

export interface Chassis {
  Front: Front;
  LeftFront: LeftFront2;
  LeftRear: LeftRear2;
  BrakesInCarDials: BrakesInCarDials;
  RightFront: RightFront2;
  RightRear: RightRear2;
  Rear: Rear;
}

export interface Front {
  ArbSetting: number;
  ToeIn: string;
  FuelLevel: string;
  CrossWeight: string;
  FrontWeight: string;
}

export interface LeftFront2 {
  CornerWeight: string;
  RideHeight: string;
  SpringPerchOffset: string;
  Camber: string;
}

export interface LeftRear2 {
  CornerWeight: string;
  RideHeight: string;
  SpringPerchOffset: string;
  Camber: string;
  ToeIn: string;
}

export interface BrakesInCarDials {
  DisplayPage: string;
  BrakePressureBias: string;
}

export interface RightFront2 {
  CornerWeight: string;
  RideHeight: string;
  SpringPerchOffset: string;
  Camber: string;
}

export interface RightRear2 {
  CornerWeight: string;
  RideHeight: string;
  SpringPerchOffset: string;
  Camber: string;
  ToeIn: string;
}

export interface Rear {
  ArbSetting: number;
  WingSetting: number;
}
