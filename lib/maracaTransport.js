import { BaseTransport } from './rpcTransport';
import SktErrors from './gen/errors';
;
class InternalLogger {
    log(message, arg) {
    }
}
export default class MaracaTransport extends BaseTransport {
    constructor(depwindow, logger) {
        super();
        this.responses = [];
        this.logger = logger || new InternalLogger();
        if (depwindow) {
            this.window = depwindow;
        }
        else {
            this.window = window;
        }
        this.window.maraca = this.window.maraca || {
            receiveJsonRpc: (json) => void {},
            replyJsonRpc: (json) => void {},
        };
    }
    open(host, notification) {
        // WE SHOULD USE SYMBOL FOR THE KEY (HANDLE) TO IDENTIFY A TRANSPORT CLIENT
        // AND FOR THE RESPONSE CALLBACKS
        //     sendJsonRpc(jsonRpc, responseCallback)
        //      callbacks[jsonRpc.id] = responseCallback;
        //      window.webkit.messageHandlers.maracaSendJsonRpc.postMessage(jsonRpc)
        //
        //      window.maraca.replyJsonRpc(jsonRpcResponse)
        //      responseCallback = callbacks[jsonRpcResponse.id]
        // responseCallback(jsonRpcResponse)
        //
        //      window.maraca.receiveJsonRpc(jsonRpcEvent)
        // OnCaptureEvent(jsonRpcEvent)
        const newHandle = this.generateHandle();
        if (newHandle === 0) {
            return Promise.reject(SktErrors.ESKT_INVALIDHANDLE);
        }
        this.window.maraca.receiveJsonRpc = (json) => {
            try {
                const jsonRpcDecoded = decodeURI(json);
                const jsonRpc = JSON.parse(jsonRpcDecoded);
                notification(jsonRpc);
            }
            catch (ex) {
                // should we log a warning here???
            }
        };
        this.window.maraca.replyJsonRpc = (json) => {
            const decodedJsonRpc = decodeURI(json);
            this.dispatchResponse(decodedJsonRpc);
        };
        return Promise.resolve({ handle: newHandle });
    }
    close(handle) {
        const index = this.handles.findIndex(h => h.handle === handle);
        if (index === -1) {
            return Promise.reject(SktErrors.ESKT_INVALIDHANDLE);
        }
        this.handles.splice(index, 1);
        return Promise.resolve(SktErrors.ESKT_NOERROR);
    }
    send(handle, request) {
        const jsonRpc = JSON.stringify(request);
        const promise = new Promise((resolve, reject) => {
            const response = {
                rpcId: request.id,
                responseCallback: (jsonRpcResponse) => {
                    resolve(jsonRpcResponse);
                }
            };
            const index = this.handles.findIndex(h => h.handle === handle);
            if (index === -1) {
                return reject(SktErrors.ESKT_INVALIDHANDLE);
            }
            this.responses.push(response);
            this.window.webkit.messageHandlers.maracaSendJsonRpc.postMessage(jsonRpc);
        });
        return promise;
    }
    dispatchResponse(jsonrpc) {
        try {
            const jsonRpc = JSON.parse(jsonrpc);
            // look for the corresponding callback
            const index = this.responses.findIndex(rpr => rpr.rpcId === jsonRpc.id);
            if (index !== -1) {
                const callback = this.responses[index];
                this.responses.splice(index, 1);
                callback.responseCallback(jsonRpc);
            }
            else {
                // should we log a warning here???
            }
        }
        catch (ex) {
            // should we log the exception here???
        }
    }
}
//# sourceMappingURL=maracaTransport.js.map