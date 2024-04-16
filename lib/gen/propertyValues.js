//PropertyValues.ts
//This file is generated when calling npm run update
//
//
// Data Confirmation Mode indicates what is 
// expected to the send the Data ACK back to the scanner
export var DataConfirmationMode;
(function (DataConfirmationMode) {
    // use the device configuration (Local Confirmation or App)
    DataConfirmationMode[DataConfirmationMode["ModeOff"] = 0] = "ModeOff";
    // the device confirms the decoded data locally
    DataConfirmationMode[DataConfirmationMode["ModeDevice"] = 1] = "ModeDevice";
    // Capture confirms the decoded data as it receives them and there is one app
    DataConfirmationMode[DataConfirmationMode["ModeCapture"] = 2] = "ModeCapture";
    // the Application confirms the decoded data as it receives them
    DataConfirmationMode[DataConfirmationMode["ModeApp"] = 3] = "ModeApp";
})(DataConfirmationMode || (DataConfirmationMode = {}));
;
// Device Data Acknowledgment mode
export var DeviceDataAcknowledgment;
(function (DeviceDataAcknowledgment) {
    // the device won't locally acknowledge decoded data
    DeviceDataAcknowledgment[DeviceDataAcknowledgment["Off"] = 0] = "Off";
    // the device will locally acknowledge decoded data
    DeviceDataAcknowledgment[DeviceDataAcknowledgment["On"] = 1] = "On";
})(DeviceDataAcknowledgment || (DeviceDataAcknowledgment = {}));
;
// Security Mode
export var SecurityMode;
(function (SecurityMode) {
    // No security
    SecurityMode[SecurityMode["None"] = 0] = "None";
    // communication protected by authentication
    SecurityMode[SecurityMode["Authentication"] = 1] = "Authentication";
    // communication protected by authentication and encrytion
    SecurityMode[SecurityMode["AuthenticationEncryption"] = 2] = "AuthenticationEncryption";
})(SecurityMode || (SecurityMode = {}));
;
// trigger parameter
export var Trigger;
(function (Trigger) {
    // start a read
    Trigger[Trigger["Start"] = 1] = "Start";
    // stop a read
    Trigger[Trigger["Stop"] = 2] = "Stop";
    // enable the trigger
    Trigger[Trigger["Enable"] = 3] = "Enable";
    // disable the trigger
    Trigger[Trigger["Disable"] = 4] = "Disable";
    // start a read in continuous
    Trigger[Trigger["ContinuousScan"] = 5] = "ContinuousScan";
    // start a read in continuous until a code is read
    Trigger[Trigger["ContinuousScanUntilRead"] = 6] = "ContinuousScanUntilRead";
})(Trigger || (Trigger = {}));
;
// Delete the pairing of the device
export var DeletePairing;
(function (DeletePairing) {
    // delete the current pairing
    DeletePairing[DeletePairing["Current"] = 0] = "Current";
    // delete all the pairing of the device
    DeletePairing[DeletePairing["All"] = 1] = "All";
})(DeletePairing || (DeletePairing = {}));
;
// sound configuration for the a type of action
export var SoundActionType;
(function (SoundActionType) {
    // sound configuration for a good read action
    SoundActionType[SoundActionType["GoodRead"] = 0] = "GoodRead";
    // sound configuration for a good read local action
    SoundActionType[SoundActionType["GoodReadLocal"] = 1] = "GoodReadLocal";
    // sound configuration for a bad read action
    SoundActionType[SoundActionType["BadRead"] = 2] = "BadRead";
    // sound configuration for a bad read local action
    SoundActionType[SoundActionType["BadReadLocal"] = 3] = "BadReadLocal";
})(SoundActionType || (SoundActionType = {}));
;
// Sound frequency configuration
export var SoundFrequency;
(function (SoundFrequency) {
    // no frequency
    SoundFrequency[SoundFrequency["None"] = 0] = "None";
    // Low pitch frequency
    SoundFrequency[SoundFrequency["Low"] = 1] = "Low";
    // Medium pitch frequency
    SoundFrequency[SoundFrequency["Medium"] = 2] = "Medium";
    // High pitch frequency
    SoundFrequency[SoundFrequency["High"] = 3] = "High";
})(SoundFrequency || (SoundFrequency = {}));
;
// Rumble configuration for the a type of action
export var RumbleActionType;
(function (RumbleActionType) {
    // Rumble configuration for a good read action
    RumbleActionType[RumbleActionType["GoodRead"] = 0] = "GoodRead";
    // Rumble configuration for a good read local action
    RumbleActionType[RumbleActionType["GoodReadLocal"] = 1] = "GoodReadLocal";
    // Rumble configuration for a bad read action
    RumbleActionType[RumbleActionType["BadRead"] = 2] = "BadRead";
    // Rumble configuration for a bad read local action
    RumbleActionType[RumbleActionType["BadReadLocal"] = 3] = "BadReadLocal";
})(RumbleActionType || (RumbleActionType = {}));
;
// Define the action for a local decode
export var LocalDecodeAction;
(function (LocalDecodeAction) {
    // no action
    LocalDecodeAction[LocalDecodeAction["None"] = 0] = "None";
    // Beep when a local decode occurs
    LocalDecodeAction[LocalDecodeAction["Beep"] = 1] = "Beep";
    // Flash the LED when a local decode occurs
    LocalDecodeAction[LocalDecodeAction["Flash"] = 2] = "Flash";
    // Rumble when a local decode occurs
    LocalDecodeAction[LocalDecodeAction["Rumble"] = 4] = "Rumble";
})(LocalDecodeAction || (LocalDecodeAction = {}));
;
// Define the LED for data confirmation
export var DataConfirmationLed;
(function (DataConfirmationLed) {
    // no LED
    DataConfirmationLed[DataConfirmationLed["None"] = 0] = "None";
    // make the LED flash in green
    DataConfirmationLed[DataConfirmationLed["Green"] = 1] = "Green";
    // make the LED flash in red
    DataConfirmationLed[DataConfirmationLed["Red"] = 2] = "Red";
})(DataConfirmationLed || (DataConfirmationLed = {}));
;
// Define the sound for data confirmation
export var DataConfirmationBeep;
(function (DataConfirmationBeep) {
    // no sound
    DataConfirmationBeep[DataConfirmationBeep["None"] = 0] = "None";
    // short beep for success
    DataConfirmationBeep[DataConfirmationBeep["Good"] = 1] = "Good";
    // long beep for failure
    DataConfirmationBeep[DataConfirmationBeep["Bad"] = 2] = "Bad";
})(DataConfirmationBeep || (DataConfirmationBeep = {}));
;
// Define the rumble for data confirmation
export var DataConfirmationRumble;
(function (DataConfirmationRumble) {
    // no sound
    DataConfirmationRumble[DataConfirmationRumble["None"] = 0] = "None";
    // short rumble for success
    DataConfirmationRumble[DataConfirmationRumble["Good"] = 1] = "Good";
    // long rumble for failure
    DataConfirmationRumble[DataConfirmationRumble["Bad"] = 2] = "Bad";
})(DataConfirmationRumble || (DataConfirmationRumble = {}));
;
// Define the flash setting
export var Flash;
(function (Flash) {
    // turn off the flash
    Flash[Flash["Off"] = 0] = "Off";
    // turn on the flash
    Flash[Flash["On"] = 1] = "On";
})(Flash || (Flash = {}));
;
// Define the SocketCam experience (iOS-iPadOS only)
export var SocketCam;
(function (SocketCam) {
    // Enable SocketCam
    SocketCam[SocketCam["Enable"] = 0] = "Enable";
    // Disable SocketCam
    SocketCam[SocketCam["Disable"] = 1] = "Disable";
    // SocketCam is not supported, and cannot be enabled
    SocketCam[SocketCam["NotSupported"] = 2] = "NotSupported";
})(SocketCam || (SocketCam = {}));
;
// Define the possible power states
export var PowerState;
(function (PowerState) {
    // The power state is unknown
    PowerState[PowerState["Unknown"] = 0] = "Unknown";
    // The power state is on battery
    PowerState[PowerState["OnBattery"] = 1] = "OnBattery";
    // The power state is on cradle
    PowerState[PowerState["OnCradle"] = 2] = "OnCradle";
    // The power state in on AC
    PowerState[PowerState["OnAc"] = 4] = "OnAc";
})(PowerState || (PowerState = {}));
;
// Define the monitor feature (DEBUG build only)
export var MonitorDbg;
(function (MonitorDbg) {
    // define the level for the debug traces
    MonitorDbg[MonitorDbg["Level"] = 1] = "Level";
    // define the output channel for the debug traces
    MonitorDbg[MonitorDbg["Channel"] = 2] = "Channel";
    // define the number of lines in the file
    MonitorDbg[MonitorDbg["FileLineLevel"] = 3] = "FileLineLevel";
})(MonitorDbg || (MonitorDbg = {}));
;
// identifiers for the statistic counters
export var Counter;
(function (Counter) {
    // use for convenience only to skip a counter
    Counter[Counter["Skip"] = -1] = "Skip";
    // unknow counter
    Counter[Counter["Unknown"] = 0] = "Unknown";
    // number of connections
    Counter[Counter["Connect"] = 1] = "Connect";
    // number of disconnections
    Counter[Counter["Disconnect"] = 2] = "Disconnect";
    // number of unbound operation
    Counter[Counter["Unbound"] = 3] = "Unbound";
    // number of reset to factory default
    Counter[Counter["FactoryReset"] = 4] = "FactoryReset";
    // number of reads (scans)
    Counter[Counter["Reads"] = 5] = "Reads";
    // number of trigger button released
    Counter[Counter["TriggerButtonUp"] = 6] = "TriggerButtonUp";
    // number of trigger button pressed
    Counter[Counter["TriggerButtonDown"] = 7] = "TriggerButtonDown";
    // number of power button released
    Counter[Counter["PowerButtonUp"] = 8] = "PowerButtonUp";
    // number of power button pressed
    Counter[Counter["PowerButtonDown"] = 9] = "PowerButtonDown";
    // number of minutes in AC power
    Counter[Counter["OnAcTimeInMinutes"] = 10] = "OnAcTimeInMinutes";
    // number of minutes on battery
    Counter[Counter["OnBatTimeInMinutes"] = 11] = "OnBatTimeInMinutes";
    // number of RFCOMM sent (SSI only)
    Counter[Counter["RfcommSend"] = 12] = "RfcommSend";
    // number of RFCOMM received (SSI only)
    Counter[Counter["RfcommReceive"] = 13] = "RfcommReceive";
    // number of RFCOMM discarded (SSI only)
    Counter[Counter["RfcommReceiveDiscarded"] = 14] = "RfcommReceiveDiscarded";
    // number of UART sent (SSI only)
    Counter[Counter["UartSend"] = 15] = "UartSend";
    // number of UART received (SSI only)
    Counter[Counter["UartReceive"] = 16] = "UartReceive";
    // number of UART discarded (SSI only)
    Counter[Counter["UartReceiveDiscarded"] = 17] = "UartReceiveDiscarded";
    // number of left button press (CRS only)
    Counter[Counter["ButtonLeftPress"] = 18] = "ButtonLeftPress";
    // number of left button release (CRS only)
    Counter[Counter["ButtonLeftRelease"] = 19] = "ButtonLeftRelease";
    // number of right button press (CRS only)
    Counter[Counter["ButtonRightPress"] = 20] = "ButtonRightPress";
    // number of right button release (CRS only)
    Counter[Counter["ButtonRightRelease"] = 21] = "ButtonRightRelease";
    // number of ring unit detach (CRS only)
    Counter[Counter["RingUnitDetach"] = 22] = "RingUnitDetach";
    // number of ring unit attach (CRS only)
    Counter[Counter["RingUnitAttach"] = 23] = "RingUnitAttach";
    // number of decoded bytes (7x only ISCI)
    Counter[Counter["DecodedBytes"] = 24] = "DecodedBytes";
    // number of abnormal shutdowns (7x only ISCI)
    Counter[Counter["AbnormalShutdowns"] = 25] = "AbnormalShutdowns";
    // number of battery charge cycles (7x only ISCI)
    Counter[Counter["BatteryChargeCycles"] = 26] = "BatteryChargeCycles";
    // number of battery charge count (7x only ISCI)
    Counter[Counter["BatteryChargeCount"] = 27] = "BatteryChargeCount";
    // number of power on (only 8Ci)
    Counter[Counter["PowerOn"] = 28] = "PowerOn";
    // number of power off (only 8Ci)
    Counter[Counter["PowerOff"] = 29] = "PowerOff";
    // number of stand mode change (only 7X/Q 7630 and higher)
    Counter[Counter["StandModeChange"] = 30] = "StandModeChange";
})(Counter || (Counter = {}));
;
// Disconnect parameters to instruct the device what to do after disconnection
export var Disconnect;
(function (Disconnect) {
    // disconnect and then start the current profile
    Disconnect[Disconnect["StartProfile"] = 0] = "StartProfile";
    // Disconnect and disable radio (low power)
    Disconnect[Disconnect["DisableRadio"] = 1] = "DisableRadio";
    // Disconnect a device and make it available for a new connection (for Bluetooth Low Energy device)
    Disconnect[Disconnect["MakeAvailable"] = 2] = "MakeAvailable";
})(Disconnect || (Disconnect = {}));
;
// Select a profile for the device (None, SPP, HID, Reader, Coupler)
export var ProfileSelect;
(function (ProfileSelect) {
    // The device is in acceptor mode, not trying to connect to any host
    ProfileSelect[ProfileSelect["None"] = 0] = "None";
    // The device is in App mode
    ProfileSelect[ProfileSelect["Spp"] = 1] = "Spp";
    // The device is in Basic mode, sometimes referred as Keyboard emulation
    ProfileSelect[ProfileSelect["Hid"] = 2] = "Hid";
    // The device is in Reader mode, for NFC devices
    ProfileSelect[ProfileSelect["Reader"] = 3] = "Reader";
    // The device is in Coupler mode, for NFC devices
    ProfileSelect[ProfileSelect["Coupler"] = 4] = "Coupler";
})(ProfileSelect || (ProfileSelect = {}));
;
// Configure a profile for the device (None, Acceptor, Initiator)
export var ProfileConfig;
(function (ProfileConfig) {
    // The device is in either acceptor or initiator mode, meaning not even discoverable
    ProfileConfig[ProfileConfig["None"] = 0] = "None";
    // The device is discoverable and will accept any connection
    ProfileConfig[ProfileConfig["Acceptor"] = 1] = "Acceptor";
    // The device initiates a connection to the Bluetooth address specified in the Profile Configuration
    ProfileConfig[ProfileConfig["Initiator"] = 2] = "Initiator";
})(ProfileConfig || (ProfileConfig = {}));
;
// Configuration masks for selecting the notifications the device should send to the host
export var Notifications;
(function (Notifications) {
    // The device sends a notification when the trigger button is pressed
    Notifications[Notifications["TriggerButtonPress"] = 1] = "TriggerButtonPress";
    // The device sends a notification when the trigger button is released
    Notifications[Notifications["TriggerButtonRelease"] = 2] = "TriggerButtonRelease";
    // The device sends a notification when the power button is pressed
    Notifications[Notifications["PowerButtonPress"] = 4] = "PowerButtonPress";
    // The device sends a notification when the power button is released
    Notifications[Notifications["PowerButtonRelease"] = 8] = "PowerButtonRelease";
    // The device sends a notification when the power state changes (battery to AC or vice-versa) (not supported on all device)
    Notifications[Notifications["PowerState"] = 16] = "PowerState";
    // The device sends a notification when the battery level changed (not supported on all device)
    Notifications[Notifications["BatteryLevelChange"] = 32] = "BatteryLevelChange";
})(Notifications || (Notifications = {}));
;
// Identifies the timers used in the device, (trigger lock, disconnected, connected)
export var Timer;
(function (Timer) {
    // The trigger button stays ineffective for the specified amount of time 
    // or until the device receives a data confirmation command.
    Timer[Timer["AutoLock"] = 1] = "AutoLock";
    // This timer specifies the amount of time the device stays on while it is not connected to any host.
    Timer[Timer["PowerOffDisconnected"] = 2] = "PowerOffDisconnected";
    // This timer specifies the amount of time the device stays on while it is connected to a host.
    Timer[Timer["PowerOffConnected"] = 4] = "PowerOffConnected";
})(Timer || (Timer = {}));
;
// Identifies the data format the device should send the data to the host
export var DataFormat;
(function (DataFormat) {
    // The device sends the data without any protocol overhead
    DataFormat[DataFormat["Raw"] = 0] = "Raw";
    // The device sends the data embedded in a protocol packet (default)
    DataFormat[DataFormat["Packet"] = 1] = "Packet";
    // The device sends only the RFID tag ID, (valid only for D600 NFC devices)
    DataFormat[DataFormat["IdOnly"] = 2] = "IdOnly";
    // The device sends the tag type and RFID tag ID, (valid only for D600 NFC devices)
    DataFormat[DataFormat["TagTypeAndId"] = 10] = "TagTypeAndId";
    // The device sends only the tag data, (valid only for D600 NFC devices)
    DataFormat[DataFormat["DataOnly"] = 4] = "DataOnly";
    // The device sends the tag type and the tag data, (valid only for D600 NFC devices)
    DataFormat[DataFormat["TagTypeAndData"] = 12] = "TagTypeAndData";
})(DataFormat || (DataFormat = {}));
;
// defines the operational mode of the device
export var TriggerMode;
(function (TriggerMode) {
    // The device triggers a read only by pressing the trigger button
    TriggerMode[TriggerMode["LocalOnly"] = 1] = "LocalOnly";
    // The device triggers a read by pressing the trigger button or by receiving the trigger command
    TriggerMode[TriggerMode["RemoteAndLocal"] = 2] = "RemoteAndLocal";
    // the device waits for the host to unlock the trigger
    TriggerMode[TriggerMode["AutoLock"] = 3] = "AutoLock";
    // the device locks and unlocks the trigger locally (default)
    TriggerMode[TriggerMode["NormalLock"] = 4] = "NormalLock";
    // The device triggers a read automatically without user intervention
    TriggerMode[TriggerMode["Presentation"] = 5] = "Presentation";
})(TriggerMode || (TriggerMode = {}));
;
// defines the reason as of how the device connects to the host
export var ConnectReason;
(function (ConnectReason) {
    // The device connects to the host from unknown reason
    ConnectReason[ConnectReason["Unknown"] = 0] = "Unknown";
    // The device connects to the host just after power on
    ConnectReason[ConnectReason["PowerOn"] = 1] = "PowerOn";
    // The device connects to the host by reading the host address from a barcode
    ConnectReason[ConnectReason["Barcode"] = 2] = "Barcode";
    // The device connects to the host by user action (usually a press on the trigger button)
    ConnectReason[ConnectReason["UserAction"] = 3] = "UserAction";
    // The device connects to the host from a change of the host address in the profile configuration
    ConnectReason[ConnectReason["HostChange"] = 4] = "HostChange";
    // The device connects to the host after a retry (device coming back to the radio range)
    ConnectReason[ConnectReason["Retry"] = 5] = "Retry";
})(ConnectReason || (ConnectReason = {}));
;
// The start up role SPP defines the start up role when using the SPP profile.
export var StartUpRoleSpp;
(function (StartUpRoleSpp) {
    // The device returns to acceptor mode, not initiating a connection to a host.
    StartUpRoleSpp[StartUpRoleSpp["Acceptor"] = 0] = "Acceptor";
    // The device uses the last role configuration upon startup.
    StartUpRoleSpp[StartUpRoleSpp["LastRole"] = 1] = "LastRole";
})(StartUpRoleSpp || (StartUpRoleSpp = {}));
;
// The connect beep configuration allows to turn off or on the connection beep when the scanner connects
export var ConnectBeepConfig;
(function (ConnectBeepConfig) {
    // The device won't beep upon connection to a host.
    ConnectBeepConfig[ConnectBeepConfig["NoBeep"] = 0] = "NoBeep";
    // The device beeps when connecting to the host.
    ConnectBeepConfig[ConnectBeepConfig["Beep"] = 1] = "Beep";
})(ConnectBeepConfig || (ConnectBeepConfig = {}));
;
// The stand configuration defines the operational mode of the device when used with a stand.
export var StandConfig;
(function (StandConfig) {
    // Disabled the stand config property and sets the scanner as it is intended
    StandConfig[StandConfig["Disabled"] = 0] = "Disabled";
    // Mobile mode Works like today existing firmware Engine is always in 
    //  trigger mode Engine hibernate enabled
    StandConfig[StandConfig["MobileMode"] = 1] = "MobileMode";
    // Stand mode Engine always in presentation mode Engine hibernate 
    // disabled Scanner turns on immediately Power timers disabled Connection 
    // retries forever
    StandConfig[StandConfig["StandMode"] = 2] = "StandMode";
    // Detect mode On stand engine in presentation mode On stand engine 
    // hibernate disabled On stand charging led state not show On stand 
    // scanner turns on immediately On stand power timers disabled On stand 
    // connection retries forever Off stand engine in level mode Off stand 
    // battery led state reported Off stand engine hibernate enabled Off stand 
    // power off timers running Off stand connection retries halt after max 
    // count
    StandConfig[StandConfig["DetectMode"] = 3] = "DetectMode";
    // Auto mode On stand engine in presentation mode On stand engine hibernate 
    // disabled On stand charging led state not show On stand scanner turns on 
    // immediately On stand power timers disabled On stand connection retries 
    // forever Off stand does nothing, engine remains in presentation mode Off 
    // stand trigger press causes engine to enter level mode Engine in level 
    // mode battery led state reported Engine in level mode hibernate enabled 
    // Engine in level mode power off timers running Engine in level mode 
    // connection retries halt after max count
    StandConfig[StandConfig["AutoMode"] = 4] = "AutoMode";
})(StandConfig || (StandConfig = {}));
;
// The mask to apply for each button that is pressed
export var ButtonsState;
(function (ButtonsState) {
    // The left button is pressed.
    ButtonsState[ButtonsState["Left"] = 1] = "Left";
    // The right button is pressed.
    ButtonsState[ButtonsState["Right"] = 2] = "Right";
    // The middle button is pressed.
    ButtonsState[ButtonsState["Middle"] = 4] = "Middle";
    // The power button is pressed.
    ButtonsState[ButtonsState["Power"] = 8] = "Power";
    // The Ring is detached from the wrist unit.
    ButtonsState[ButtonsState["RingDetach"] = 16] = "RingDetach";
})(ButtonsState || (ButtonsState = {}));
;
// The mask to apply for each theme
export var ThemeSelection;
(function (ThemeSelection) {
    // No theme.
    ThemeSelection[ThemeSelection["None"] = 0] = "None";
    // The Health theme.
    ThemeSelection[ThemeSelection["Health"] = 1] = "Health";
    // The Access theme.
    ThemeSelection[ThemeSelection["Access"] = 2] = "Access";
    // The Value theme.
    ThemeSelection[ThemeSelection["Value"] = 3] = "Value";
    // The Membership theme.
    ThemeSelection[ThemeSelection["Membership"] = 4] = "Membership";
})(ThemeSelection || (ThemeSelection = {}));
;
// Mask for the Theme selection property. It applies the theme selection on the given device(s) set with the mask
export var ThemeSelectionMask;
(function (ThemeSelectionMask) {
    // Mask applied on the Default device
    ThemeSelectionMask[ThemeSelectionMask["Default"] = 1] = "Default";
    // Mask applied on the Nfc device
    ThemeSelectionMask[ThemeSelectionMask["Nfc"] = 2] = "Nfc";
    // Mask applied on the Default and Nfc devices
    ThemeSelectionMask[ThemeSelectionMask["DefaultNfc"] = 3] = "DefaultNfc";
    // Mask applied on the Barcode device
    ThemeSelectionMask[ThemeSelectionMask["Barcode"] = 4] = "Barcode";
    // Mask applied on the Default and Barcode devices
    ThemeSelectionMask[ThemeSelectionMask["DefaultBarcode"] = 5] = "DefaultBarcode";
    // Mask applied on the Nfc and Barcode devices
    ThemeSelectionMask[ThemeSelectionMask["NfcBarcode"] = 6] = "NfcBarcode";
    // Mask applied on the Default, Nfc and Barcode devices
    ThemeSelectionMask[ThemeSelectionMask["All"] = 7] = "All";
})(ThemeSelectionMask || (ThemeSelectionMask = {}));
;
//# sourceMappingURL=propertyValues.js.map