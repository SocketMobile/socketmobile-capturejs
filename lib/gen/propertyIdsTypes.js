//PropertyIdsTypes.ts
//This file is generated when calling npm run update
//
//
export var CapturePropertyIds;
(function (CapturePropertyIds) {
    // Set to notify Capture that the client is shutting down gracefully.
    // Capture will send device removal events followed by a terminate
    // event. Once you receive the terminate event, it is safe to shut
    // down Capture.
    // Device: False	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["Abort"] = -2146435072] = "Abort";
    // Gets the Capture service version.
    // Device: False	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["Version"] = -2147418111] = "Version";
    // Gets the version of the firmware interface that Capture service
    // supports. This can be useful for determining if the Capture service
    // supports a particular hardware feature.
    // Device: False	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["InterfaceVersion"] = -2147418112] = "InterfaceVersion";
    // property to set or get the Capture configuration
    // Device: False	Get Type: String 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["Configuration"] = -2141913085] = "Configuration";
    // Gets or sets the data confirmation mode. The data confirmation mode
    // determines who acknowledges whether the data received was good or
    // bad.
    // Device: False	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DataConfirmationMode"] = -2147352572] = "DataConfirmationMode";
    // Gets or sets the data confirmation action. Data confirmation action
    // determines how good or bad data is acknowledged.
    // Device: False	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["DataConfirmationAction"] = -2147287035] = "DataConfirmationAction";
    // Gets or sets the log level of various Capture service components
    // (Only works on debug builds of the service).
    // Device: False	Get Type: Byte 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["MonitorMode"] = -2145124346] = "MonitorMode";
    // property to get or set the SocketCam status
    // (iOS only)
    // Device: False	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["SocketCamStatus"] = -2147352569] = "SocketCamStatus";
    // Gets the firmware version of the device
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["VersionDevice"] = 65536] = "VersionDevice";
    // Gets the model of the device
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["DeviceType"] = 65538] = "DeviceType";
    // Sends an arbitrary get or set command to the device
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["DeviceSpecific"] = 4456451] = "DeviceSpecific";
    // property to get or set the data source status / information
    // Device: True	Get Type: DataSource 	Set Type: DataSource
    CapturePropertyIds[CapturePropertyIds["DataSourceDevice"] = 7798788] = "DataSourceDevice";
    // Sets the trigger of the device - can start or stop a read and
    // enable or disable the physical trigger button on the device.
    // Device: True	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["TriggerDevice"] = 1179653] = "TriggerDevice";
    // property to apply a config to a Capture Device (not yet enabled)
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["ApplyConfigDevice"] = 1048582] = "ApplyConfigDevice";
    // Gets or sets a preamble for data decoded by the device. When set,
    // the preamble is added in front of the decoded data.
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["PreambleDevice"] = 327687] = "PreambleDevice";
    // Gets or sets a postamble for data decoded by the device. When set,
    // the postamble is added to the end of the decoded data.
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["PostambleDevice"] = 327688] = "PostambleDevice";
    // property to get the Capture Device capabilities
    // Device: True	Get Type: Byte 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["CapabilitiesDevice"] = 2162697] = "CapabilitiesDevice";
    // Gets the change id of the device. The change id is a checksum of
    // all the engine settings - e.g. symbology settings, preamble,
    // postamble, etc - and can be used to determine if the device
    // configuration has been altered by another application or using a
    // command barcode.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["ChangeIdDevice"] = 65546] = "ChangeIdDevice";
    // property to get or set the Decoded Data Format of a Capture Device
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DataFormatDevice"] = 131083] = "DataFormatDevice";
    // Gets or sets the friendly name of the device. The friendly name is
    // the name that appears in Bluetooth settings.
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["FriendlyNameDevice"] = 327936] = "FriendlyNameDevice";
    // property to get or set the Capture Device Security Mode
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["SecurityModeDevice"] = 131329] = "SecurityModeDevice";
    // property to get or set the Capture Device PIN code
    // Device: True	Get Type: NotApplicable 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["PinCodeDevice"] = 1376514] = "PinCodeDevice";
    // Set deletes pairing and bonding information off the device. Useful
    // when preparing to pair the Capture device to a different host.
    // Device: True	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DeletePairingBondingDevice"] = 1179907] = "DeletePairingBondingDevice";
    // Set resets all the settings on the device to their default values.
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["RestoreFactoryDefaultsDevice"] = 1048836] = "RestoreFactoryDefaultsDevice";
    // Set turns the device off
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["SetPowerOffDevice"] = 1048837] = "SetPowerOffDevice";
    // Gets the current state of each button on the device. Consider using
    // kNotificationsDevice to subscribe to button events instead.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["ButtonsStatusDevice"] = 65798] = "ButtonsStatusDevice";
    // Gets or sets the sound configuration of the device. There are
    // separate sound configurations for when a good scan is acknowledged
    // locally (by the Capture device) and when it is acknowledged by the
    // host. The same applies to the bad scan sound configuration.
    // Device: True	Get Type: Byte 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["SoundConfigDevice"] = 2359559] = "SoundConfigDevice";
    // Gets or sets the trigger lock and auto-off timers. The trigger lock
    // determines how long the trigger remains locked after decoding data
    // without receiving confirmation. There are two auto-off timers, one
    // for when the device is connected to a host and one for when it is
    // not.
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["TimersDevice"] = 262408] = "TimersDevice";
    // Gets or sets local device acknowledgement. When enabled, the device
    // acknowledges decoded data as soon as it is decoded. When disabled,
    // the device waits for the host to acknowledge decoded data and the
    // trigger will be locked until acknowledgement is received or the
    // trigger lock timeout has elapsed.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["LocalAcknowledgmentDevice"] = 131337] = "LocalAcknowledgmentDevice";
    // Sends an acknowledgement to the device. Acknowledgement can either
    // be positive or negative - a.k.a. good scan or bad scan.
    // Device: True	Get Type: NotApplicable 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["DataConfirmationDevice"] = 1245450] = "DataConfirmationDevice";
    // Gets the current battery level of the device. Consider using 
    // kNotificationsDevice to subscribe to battery level change events
    // instead.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["BatteryLevelDevice"] = 65803] = "BatteryLevelDevice";
    // Gets or sets the local decode action of the device. Determines how
    // decoded data is acknowledged - i.e. with a beep, rumble, flash or
    // some combination of all three.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["LocalDecodeActionDevice"] = 131340] = "LocalDecodeActionDevice";
    // Gets the Bluetooth address of the device
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["BluetoothAddressDevice"] = 65805] = "BluetoothAddressDevice";
    // Gets the statistics counters of the device. Counters record the
    // absolute number of times a particular event has occurred.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["StatisticCountersDevice"] = 65806] = "StatisticCountersDevice";
    // Gets or sets the rumble configuration of the device. There are
    // separate rumble configurations for when a good scan is acknowledged
    // locally (by the Capture device) and when it is acknowledged by the
    // host. The same applies to the bad scan rumble configuration.
    // Device: True	Get Type: Byte 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["RumbleConfigDevice"] = 2359567] = "RumbleConfigDevice";
    // property to get or set the Capture Device Profile Configuration
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["ProfileConfigDevice"] = 262416] = "ProfileConfigDevice";
    // Instructs the device to drop its connection. Note: After sending
    // this command, the host will be unable to send any subsequent
    // commands to this device.
    // Device: True	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DisconnectDevice"] = 1179921] = "DisconnectDevice";
    // Gets or sets arbitrary bytes to store on the device. The device has
    // 16 storage locations which can hold up to 64 bytes each.
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["DataStoreDevice"] = 4456722] = "DataStoreDevice";
    // Gets or sets subscriptions to various events from the device.
    // Events that can be subscribed to include, trigger press/release,
    // power button press/release, power state and battery level change.
    // Device: True	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["NotificationsDevice"] = 196883] = "NotificationsDevice";
    // property to get the Capture Device Connect reason
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["ConnectReasonDevice"] = 65812] = "ConnectReasonDevice";
    // Gets the current power state of the device. Consider using
    // kNotificationsDevice to subscribe to power state events instead.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["PowerStateDevice"] = 65813] = "PowerStateDevice";
    // Gets or sets the reconnect behavior of the device when it is
    // powered on in application mode. By default, the device will attempt
    // to reconnect to the last host, but this feature can be turned off
    // using this property.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["StartUpRoleSPPDevice"] = 131350] = "StartUpRoleSPPDevice";
    // property to get or set the Capture Device Connection Beep
    // Configuration.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["ConnectionBeepConfigDevice"] = 131351] = "ConnectionBeepConfigDevice";
    // Gets or sets the status of the flash on the SocketCam device.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["FlashDevice"] = 131352] = "FlashDevice";
    // property to get or set the Capture Device Overlay View (SocketCam
    // only)
    // Device: True	Get Type: None 	Set Type: Object
    CapturePropertyIds[CapturePropertyIds["OverlayViewDevice"] = 590105] = "OverlayViewDevice";
    // property to get or set the Capture Device Stand Configuration
    // Device: True	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["StandConfigDevice"] = 196890] = "StandConfigDevice";
    // property to start a BLE discovery from a Device Manager
    // Device: True	Get Type: NotApplicable 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["StartDiscovery"] = 1245696] = "StartDiscovery";
    // property to set or get the BLE favorites for a Device Manager
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["Favorite"] = 328193] = "Favorite";
    // property to get the BLE Unique Device Identifier that can be used to set favorite with
    // Device: True	Get Type: String 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["UniqueDeviceIdentifier"] = 5308930] = "UniqueDeviceIdentifier";
    // property to transmit through PC/SC an array of bytes often called APDU
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["PcScTagTransmit"] = 4456731] = "PcScTagTransmit";
    // property to control the PC/SC coupler device by passing an array of bytes often called APDU
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["PcScCouplerControl"] = 4456732] = "PcScCouplerControl";
    // property to define the theme that is used for the different events: Ready, Read, Read Success, Read Failure UI
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["ThemeSelectionDevice"] = 262430] = "ThemeSelectionDevice";
})(CapturePropertyIds || (CapturePropertyIds = {}));
;
export var CapturePropertyTypes;
(function (CapturePropertyTypes) {
    // for capture properties that don't have any value
    CapturePropertyTypes[CapturePropertyTypes["None"] = 0] = "None";
    // for capture properties that don't have a value for
    // either a get operation or a set operation or neither of
    // them.
    CapturePropertyTypes[CapturePropertyTypes["NotApplicable"] = 1] = "NotApplicable";
    // the property has a byte value
    CapturePropertyTypes[CapturePropertyTypes["Byte"] = 2] = "Byte";
    // the property has a unsigned long value
    CapturePropertyTypes[CapturePropertyTypes["Ulong"] = 3] = "Ulong";
    // the property has a byte array value
    CapturePropertyTypes[CapturePropertyTypes["Array"] = 4] = "Array";
    // the property has a string value
    CapturePropertyTypes[CapturePropertyTypes["String"] = 5] = "String";
    // the property has a version structure as value (read only)
    CapturePropertyTypes[CapturePropertyTypes["Version"] = 6] = "Version";
    // the property has a data source structure as value
    CapturePropertyTypes[CapturePropertyTypes["DataSource"] = 7] = "DataSource";
    // the property has an enum value
    CapturePropertyTypes[CapturePropertyTypes["Enum"] = 8] = "Enum";
    // the property has an object as value
    CapturePropertyTypes[CapturePropertyTypes["Object"] = 9] = "Object";
    // the property type should not be equal or higher that kLast otherwise
    // it means the SDK is not in sync with the actual version of Socket
    // Mobile Companion running on the host
    CapturePropertyTypes[CapturePropertyTypes["LastType"] = 10] = "LastType";
})(CapturePropertyTypes || (CapturePropertyTypes = {}));
;
//# sourceMappingURL=propertyIdsTypes.js.map