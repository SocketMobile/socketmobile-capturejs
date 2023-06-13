import Transport from './transport';
import { JRpcRequest, JRpcError } from './jsonRpc';
import SktErrors from './gen/errors';
const ERRMSG_NO_TRANSPORT = 'no transport, is this initialized?';
const DEFAULT_HOST = "http://127.0.0.1:18481";
class Capture {
    constructor(log) {
        this.host = DEFAULT_HOST;
        this.rpcId = 0;
        this.logger = log;
    }
    open(appInfo, eventNotification, options) {
        if (options) {
            this.transport = options.transport || Transport.getTransport(this.logger);
            this.host = options.host || DEFAULT_HOST;
        }
        else {
            // this is done here for transport lazy loading
            this.transport = Transport.getTransport(this.logger);
        }
        return this.transport.open(this.host, (event) => { this.notification(event); })
            .then(transportHandle => {
            const jsonRpc = new JRpcRequest(this.getJsonRpcId(), 'openclient', {
                appId: appInfo.appId,
                developerId: appInfo.developerId,
                appKey: appInfo.appKey
            });
            this.onEventNotification = eventNotification;
            this.transportHandle = transportHandle.handle;
            return this.transport.send(transportHandle.handle, jsonRpc);
        })
            .then(response => {
            if (response.result && response.result.handle) {
                this.clientOrDeviceHandle = response.result.handle;
                return SktErrors.ESKT_NOERROR;
            }
            else {
                const res = response;
                if (res.error) {
                    const { error } = res;
                    throw (new JRpcError(0, error.code, error.message));
                }
                else {
                    throw (new JRpcError(0, SktErrors.ESKT_COMMUNICATIONERROR, "There was an error during communication."));
                }
            }
        });
    }
    close() {
        if (this.transport) {
            const jsonRpc = new JRpcRequest(this.getJsonRpcId(), 'close', {
                handle: this.clientOrDeviceHandle
            });
            return this.transport.send(this.transportHandle, jsonRpc)
                .then(() => {
                if (this.rootCapture === undefined) {
                    return this.transport.close(this.transportHandle)
                        .then(() => {
                        this.transport = null;
                        this.clientOrDeviceHandle = null;
                        this.transportHandle = 0;
                        return SktErrors.ESKT_NOERROR;
                    });
                }
                this.rootCapture = undefined;
                return SktErrors.ESKT_NOERROR;
            });
        }
        return Promise.reject({ error: SktErrors.ESKT_ALREADYDONE });
    }
    openDevice(guid, capture) {
        if (typeof capture === 'undefined' || capture === null) {
            return Promise.reject({ error: SktErrors.ESKT_INVALIDPARAMETER });
        }
        this.rootCapture = capture;
        this.transport = capture.transport;
        this.transportHandle = capture.transportHandle;
        if (this.transport) {
            const openRequest = new JRpcRequest(this.getJsonRpcId(), 'opendevice', {
                handle: this.rootCapture.clientOrDeviceHandle,
                guid
            });
            return this.transport.send(this.transportHandle, openRequest)
                .then((response) => {
                if (response.result && response.result.handle) {
                    this.clientOrDeviceHandle = response.result.handle;
                    return SktErrors.ESKT_NOERROR;
                }
                else {
                    if (response.error) {
                        const { error } = response;
                        throw (new JRpcError(0, error.code, error.message));
                    }
                    else {
                        throw (new JRpcError(0, SktErrors.ESKT_COMMUNICATIONERROR, "There was an error during communication."));
                    }
                }
            });
        }
        return Promise.reject({ error: SktErrors.ESKT_NOTINITIALIZED });
    }
    getProperty(property) {
        if (this.transport) {
            return this.transport.send(this.transportHandle, new JRpcRequest(this.getJsonRpcId(), 'getproperty', {
                property, handle: this.clientOrDeviceHandle
            }))
                .then(response => {
                if (response.result) {
                    if (this.clientOrDeviceHandle != response.result.handle) {
                        console.log("Warning the response handle does not match with the handle of the request");
                    }
                    const propertyResponse = response.result.property;
                    return Promise.resolve(propertyResponse);
                }
                const rsp = response;
                return Promise.reject(rsp.error);
            });
        }
        return Promise.reject(new JRpcError(0, SktErrors.ESKT_NOTINITIALIZED, ERRMSG_NO_TRANSPORT));
    }
    setProperty(property) {
        if (this.transport) {
            return this.transport.send(this.transportHandle, new JRpcRequest(this.getJsonRpcId(), 'setproperty', {
                property, handle: this.clientOrDeviceHandle
            }))
                .then(response => {
                if (response.result) {
                    const propertyResponse = response.result.property;
                    return Promise.resolve(propertyResponse);
                }
                const rsp = response;
                return Promise.reject(rsp);
            });
        }
        return Promise.reject(new JRpcError(0, SktErrors.ESKT_NOTINITIALIZED, ERRMSG_NO_TRANSPORT));
    }
    notification(jsonRpc, handle) {
        const result = jsonRpc.result;
        if (jsonRpc && this.onEventNotification) {
            this.onEventNotification(result.event, result.handle);
        }
    }
    getJsonRpcId() {
        let self = this;
        if (this.rootCapture) {
            self = this.rootCapture;
        }
        return self.rpcId++;
    }
}
export default Capture;
//# sourceMappingURL=capture.js.map