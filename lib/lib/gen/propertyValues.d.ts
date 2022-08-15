export declare enum DataConfirmationMode {
    ModeOff = 0,
    ModeDevice = 1,
    ModeCapture = 2,
    ModeApp = 3
}
export declare enum DeviceDataAcknowledgment {
    Off = 0,
    On = 1
}
export declare enum SecurityMode {
    None = 0,
    Authentication = 1,
    AuthenticationEncryption = 2
}
export declare enum Trigger {
    Start = 1,
    Stop = 2,
    Enable = 3,
    Disable = 4,
    ContinuousScan = 5
}
export declare enum DeletePairing {
    Current = 0,
    All = 1
}
export declare enum SoundActionType {
    GoodRead = 0,
    GoodReadLocal = 1,
    BadRead = 2,
    BadReadLocal = 3
}
export declare enum SoundFrequency {
    None = 0,
    Low = 1,
    Medium = 2,
    High = 3
}
export declare enum RumbleActionType {
    GoodRead = 0,
    GoodReadLocal = 1,
    BadRead = 2,
    BadReadLocal = 3
}
export declare enum LocalDecodeAction {
    None = 0,
    Beep = 1,
    Flash = 2,
    Rumble = 4
}
export declare enum DataConfirmationLed {
    None = 0,
    Green = 1,
    Red = 2
}
export declare enum DataConfirmationBeep {
    None = 0,
    Good = 1,
    Bad = 2
}
export declare enum DataConfirmationRumble {
    None = 0,
    Good = 1,
    Bad = 2
}
export declare enum Flash {
    Off = 0,
    On = 1
}
export declare enum SocketCam {
    Enable = 0,
    Disable = 1,
    NotSupported = 2,
    Supported = 2
}
export declare enum PowerState {
    Unknown = 0,
    OnBattery = 1,
    OnCradle = 2,
    OnAc = 4
}
export declare enum MonitorDbg {
    Level = 1,
    Channel = 2,
    FileLineLevel = 3
}
export declare enum Counter {
    Skip = -1,
    Unknown = 0,
    Connect = 1,
    Disconnect = 2,
    Unbound = 3,
    FactoryReset = 4,
    Reads = 5,
    TriggerButtonUp = 6,
    TriggerButtonDown = 7,
    PowerButtonUp = 8,
    PowerButtonDown = 9,
    OnAcTimeInMinutes = 10,
    OnBatTimeInMinutes = 11,
    RfcommSend = 12,
    RfcommReceive = 13,
    RfcommReceiveDiscarded = 14,
    UartSend = 15,
    UartReceive = 16,
    UartReceiveDiscarded = 17,
    ButtonLeftPress = 18,
    ButtonLeftRelease = 19,
    ButtonRightPress = 20,
    ButtonRightRelease = 21,
    RingUnitDetach = 22,
    RingUnitAttach = 23,
    DecodedBytes = 24,
    AbnormalShutdowns = 25,
    BatteryChargeCycles = 26,
    BatteryChargeCount = 27,
    PowerOn = 28,
    PowerOff = 29,
    StandModeChange = 30
}
export declare enum Disconnect {
    StartProfile = 0,
    DisableRadio = 1
}
export declare enum ProfileSelect {
    None = 0,
    Spp = 1,
    Hid = 2
}
export declare enum ProfileConfig {
    None = 0,
    Acceptor = 1,
    Initiator = 2
}
export declare enum Notifications {
    TriggerButtonPress = 1,
    TriggerButtonRelease = 2,
    PowerButtonPress = 4,
    PowerButtonRelease = 8,
    PowerState = 16,
    BatteryLevelChange = 32
}
export declare enum Timer {
    AutoLock = 1,
    PowerOffDisconnected = 2,
    PowerOffConnected = 4
}
export declare enum DataFormat {
    Raw = 0,
    Packet = 1,
    IdOnly = 2,
    TagTypeAndId = 10,
    DataOnly = 4,
    TagTypeAndData = 12
}
export declare enum TriggerMode {
    LocalOnly = 1,
    RemoteAndLocal = 2,
    AutoLock = 3,
    NormalLock = 4,
    Presentation = 5
}
export declare enum ConnectReason {
    Unknown = 0,
    PowerOn = 1,
    Barcode = 2,
    UserAction = 3,
    HostChange = 4,
    Retry = 5
}
export declare enum StartUpRoleSpp {
    Acceptor = 0,
    LastRole = 1
}
export declare enum ConnectBeepConfig {
    NoBeep = 0,
    Beep = 1
}
export declare enum StandConfig {
    MobileMode = 0,
    StandMode = 1,
    DetectMode = 2,
    AutoMode = 3
}
export declare enum ButtonPressMask {
    Left = 1,
    Right = 2,
    Middle = 4,
    Power = 8,
    RingDetach = 16
}
