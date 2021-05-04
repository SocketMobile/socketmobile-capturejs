import { CaptureEvent, CaptureEventTypes } from './captureEvents';
export class JsonRpc {
    constructor(id) {
        this.jsonrpc = '2.0';
        this.id = 0;
        this.id = id;
    }
}
;
// {
//     "jsonrpc": "2.0",
//     "result": {
//         "handle": 0,
//         "event": {
//             "id": 1,
//             "type": 6,
//             "value": {
//                 "guid": "{2EAAAA3F-B51E-4537-851C-31CA683C3BEF}",
//                 "name": "Socket D740 [E537BA]",
//                 "type": 196619
//             }
//         }
//     }
// }
export class CaptureEventResult {
    constructor(id, type, value, handle) {
        this.event = new CaptureEvent(id, type, value);
        if (handle) {
            this.handle = handle;
        }
    }
}
export class JRpcEvent {
    constructor(id, type, value, handle) {
        this.jsonrpc = '2.0';
        this.result = new CaptureEventResult(id, type, value, handle);
    }
}
;
export class JRpcEventDevicePresence extends JRpcEvent {
    constructor(id, deviceInfo, handle) {
        super(id, CaptureEventTypes.DeviceInfo, deviceInfo, handle);
    }
}
;
export class JRpcRequest extends JsonRpc {
    constructor(id, method, params) {
        super(id);
        this.method = method;
        if (params && params !== null) {
            this.params = params;
        }
    }
}
;
export class JRpcResponse extends JsonRpc {
    constructor(id, response) {
        super(id);
        this.result = response;
    }
}
;
export class JRpcError extends JsonRpc {
    constructor(id, code, message) {
        super(id);
        this.error = { code, message };
    }
}
;
//# sourceMappingURL=jsonRpc.js.map