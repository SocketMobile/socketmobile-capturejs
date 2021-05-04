// RPC Transport
//
// Interface for a transport layer used by CaptureJS
//
//  (c) 2019 Socket Mobile, Inc. All rights reserved
export class BaseTransport {
    constructor() {
        this.handles = [];
    }
    generateHandle() {
        let newHandle;
        while (1) {
            newHandle = Math.floor(Math.random() * 100) + 1;
            if (this.handles.length === 0) {
                this.handles.push({ handle: newHandle });
                return newHandle;
            }
            if (this.handles.every(h => h.handle !== newHandle)) {
                this.handles.push({ handle: newHandle });
                return newHandle;
            }
        }
        return 0;
    }
}
//# sourceMappingURL=rpcTransport.js.map