import { CaptureEvent, CaptureEventIds, CaptureEventTypes } from './captureEvents';
import { DeviceInfo } from './deviceInfo';
export declare class JsonRpc {
    jsonrpc: string;
    id: number;
    constructor(id: number);
}
export declare class CaptureEventResult<T> {
    handle?: number;
    event: CaptureEvent<T>;
    constructor(id: CaptureEventIds, type: CaptureEventTypes, value: T, handle?: number);
}
export declare class JRpcEvent<T> {
    jsonrpc: string;
    result: CaptureEventResult<T>;
    constructor(id: CaptureEventIds, type: CaptureEventTypes, value: T, handle?: number);
}
export declare class JRpcEventDevicePresence extends JRpcEvent<DeviceInfo> {
    constructor(id: CaptureEventIds, deviceInfo: DeviceInfo, handle?: number);
}
export declare class JRpcRequest<T> extends JsonRpc {
    method: string;
    params?: T;
    constructor(id: number, method: string, params: T);
}
export declare class JRpcResponse<T> extends JsonRpc {
    result?: T;
    constructor(id: number, response: T);
}
export declare class JRpcError extends JsonRpc {
    error: {
        code: number;
        message?: string;
    };
    constructor(id: number, code: number, message?: string);
}
