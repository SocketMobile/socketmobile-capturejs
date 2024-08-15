export var CaptureEventIds;
(function (CaptureEventIds) {
    CaptureEventIds[CaptureEventIds["NotInitialized"] = 0] = "NotInitialized";
    CaptureEventIds[CaptureEventIds["DeviceArrival"] = 1] = "DeviceArrival";
    CaptureEventIds[CaptureEventIds["DeviceRemoval"] = 2] = "DeviceRemoval";
    CaptureEventIds[CaptureEventIds["Terminate"] = 3] = "Terminate";
    CaptureEventIds[CaptureEventIds["Error"] = 4] = "Error";
    CaptureEventIds[CaptureEventIds["DecodedData"] = 5] = "DecodedData";
    CaptureEventIds[CaptureEventIds["Power"] = 6] = "Power";
    CaptureEventIds[CaptureEventIds["Buttons"] = 7] = "Buttons";
    CaptureEventIds[CaptureEventIds["BatteryLevel"] = 8] = "BatteryLevel";
    CaptureEventIds[CaptureEventIds["ListenerStarted"] = 9] = "ListenerStarted";
    CaptureEventIds[CaptureEventIds["DeviceOwnership"] = 10] = "DeviceOwnership";
    CaptureEventIds[CaptureEventIds["DeviceManagerArrival"] = 11] = "DeviceManagerArrival";
    CaptureEventIds[CaptureEventIds["DeviceManagerRemoval"] = 12] = "DeviceManagerRemoval";
    CaptureEventIds[CaptureEventIds["DeviceDiscovered"] = 13] = "DeviceDiscovered";
    CaptureEventIds[CaptureEventIds["DiscoveryEnd"] = 14] = "DiscoveryEnd";
    CaptureEventIds[CaptureEventIds["CcidStatus"] = 15] = "CcidStatus";
    CaptureEventIds[CaptureEventIds["LastID"] = 16] = "LastID"; // just for marking the end of this enum
})(CaptureEventIds || (CaptureEventIds = {}));
;
export var CaptureEventTypes;
(function (CaptureEventTypes) {
    CaptureEventTypes[CaptureEventTypes["None"] = 0] = "None";
    CaptureEventTypes[CaptureEventTypes["Byte"] = 1] = "Byte";
    CaptureEventTypes[CaptureEventTypes["Ulong"] = 2] = "Ulong";
    CaptureEventTypes[CaptureEventTypes["Array"] = 3] = "Array";
    CaptureEventTypes[CaptureEventTypes["String"] = 4] = "String";
    CaptureEventTypes[CaptureEventTypes["DecodedData"] = 5] = "DecodedData";
    CaptureEventTypes[CaptureEventTypes["DeviceInfo"] = 6] = "DeviceInfo";
    CaptureEventTypes[CaptureEventTypes["LastID"] = 7] = "LastID"; // just for marking the end of this enum
})(CaptureEventTypes || (CaptureEventTypes = {}));
;
export class CaptureEvent {
    constructor(id, type, result = 0, value) {
        this.id = id;
        this.type = type;
        this.result = result;
        if (value) {
            this.value = value;
        }
    }
}
//# sourceMappingURL=captureEvents.js.map