export declare enum CaptureEventIds {
    NotInitialized = 0,
    DeviceArrival = 1,
    DeviceRemoval = 2,
    Terminate = 3,
    Error = 4,
    DecodedData = 5,
    Power = 6,
    Buttons = 7,
    BatteryLevel = 8,
    ListenerStarted = 9,
    DeviceOwnership = 10,
    DeviceManagerArrival = 11,
    DeviceManagerRemoval = 12,
    DeviceDiscovered = 13,
    DiscoveryEnd = 14,
    CcidStatus = 15,
    LastID = 16
}
export declare enum CaptureEventTypes {
    None = 0,
    Byte = 1,
    Ulong = 2,
    Array = 3,
    String = 4,
    DecodedData = 5,
    DeviceInfo = 6,
    LastID = 7
}
export declare class CaptureEvent<T> {
    id: CaptureEventIds;
    type: CaptureEventTypes;
    result: number;
    value?: T;
    constructor(id: CaptureEventIds, type: CaptureEventTypes, result?: number, value?: T);
}
