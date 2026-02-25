//eventIds.ts
//This file is generated when calling npm run update
//
//
export var CaptureEventIds;
(function (CaptureEventIds) {
    // Capture has not been correctly initialized after its first open.
    // Type: kNone
    CaptureEventIds[CaptureEventIds["NotInitialized"] = 0] = "NotInitialized";
    // Event when a device has connected or is present.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceArrival"] = 1] = "DeviceArrival";
    // Event when a device is no longer present.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceRemoval"] = 2] = "DeviceRemoval";
    // Event when Capture is terminated.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Terminate"] = 3] = "Terminate";
    // Event when Capture had an error.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Error"] = 4] = "Error";
    // Event when Capture has some decoded data available.
    // Type: kDecodedData
    CaptureEventIds[CaptureEventIds["DecodedData"] = 5] = "DecodedData";
    // Event when a device sends a power change notification.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Power"] = 6] = "Power";
    // Event when the device button status has changed.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Buttons"] = 7] = "Buttons";
    // Event when the battery Level has changed.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["BatteryLevel"] = 8] = "BatteryLevel";
    // Event when the communication listener thread has started.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["ListenerStarted"] = 9] = "ListenerStarted";
    // Event when a device ownership has changed.
    // Type: kString
    CaptureEventIds[CaptureEventIds["DeviceOwnership"] = 10] = "DeviceOwnership";
    // Event when the Device Manager (BLE) is present.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceManagerArrival"] = 11] = "DeviceManagerArrival";
    // Event when the Device Manager (BLE) is gone.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceManagerRemoval"] = 12] = "DeviceManagerRemoval";
    // A device has been discovered.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceDiscovered"] = 13] = "DeviceDiscovered";
    // The device discovery has ended.
    // Type: kNone
    CaptureEventIds[CaptureEventIds["DiscoveryEnd"] = 14] = "DiscoveryEnd";
    // Event when a CaptureSDK log trace is generated.
    // Type: kString
    CaptureEventIds[CaptureEventIds["LogTrace"] = 21] = "LogTrace";
    // The Last Event should always be the last ID in the list of possible events.
    // Type: kNone
    CaptureEventIds[CaptureEventIds["LastID"] = 22] = "LastID";
})(CaptureEventIds || (CaptureEventIds = {}));
;
export var CaptureEventTypes;
(function (CaptureEventTypes) {
    // For capture events that don't have any value.
    CaptureEventTypes[CaptureEventTypes["None"] = 0] = "None";
    // The event has a byte value.
    CaptureEventTypes[CaptureEventTypes["Byte"] = 1] = "Byte";
    // The event has a unsigned long value.
    CaptureEventTypes[CaptureEventTypes["Ulong"] = 2] = "Ulong";
    // The event has a byte array value.
    CaptureEventTypes[CaptureEventTypes["Array"] = 3] = "Array";
    // The event has a string value.
    CaptureEventTypes[CaptureEventTypes["String"] = 4] = "String";
    // The event has a decoded data structure as value.
    CaptureEventTypes[CaptureEventTypes["DecodedData"] = 5] = "DecodedData";
    // The event has a device info structure as value (read only).
    CaptureEventTypes[CaptureEventTypes["DeviceInfo"] = 6] = "DeviceInfo";
    // The event has an object structure (array, map, dictionary) as value (read only).
    CaptureEventTypes[CaptureEventTypes["Object"] = 7] = "Object";
    // The event type should not be equal or higher that kLastID otherwise
    // it means the SDK is not in sync with the actual version of Socket
    // Mobile Companion running on the host.
    CaptureEventTypes[CaptureEventTypes["LastID"] = 8] = "LastID";
})(CaptureEventTypes || (CaptureEventTypes = {}));
;
//# sourceMappingURL=eventIds.js.map