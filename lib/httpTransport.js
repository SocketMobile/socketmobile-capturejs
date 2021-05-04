import { JRpcRequest, JRpcEvent } from './jsonRpc';
import { BaseTransport } from './rpcTransport';
import SktErrors from './gen/errors';
import { CaptureEventIds, CaptureEventTypes } from './captureEvents';
export class Ajax extends XMLHttpRequest {
    constructor() {
        super();
    }
}
function sktGetXmlHttp(uri, logger, callback) {
    var xmlhttp;
    /* code for IE7+, Firefox, Chrome, Opera, Safari */
    if (window.XMLHttpRequest) {
        xmlhttp = new Ajax();
    }
    /* code for IE6, IE5 */
    // else {
    //   xmlhttp = new AjaxIE<T>('Microsoft.XMLHTTP');
    // }
    //https://stackoverflow.com/questions/41474445/xmlhttprequest-does-not-exist-on-type-window
    // if ((<any>window).XMLHttpRequest) {
    //   xmlhttp = new XMLHttpRequest();
    // } else {
    //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    xmlhttp = new Ajax();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            try {
                const jsonRpc = JSON.parse(xmlhttp.responseText);
                logger.log('<=', jsonRpc);
                callback(xmlhttp.status, xmlhttp.responseText);
            }
            catch (e) {
                callback(xmlhttp.status, JSON.stringify({ error: SktErrors.ESKT_COMMUNICATIONERROR, message: 'Did not receive a JSON object' }));
            }
        }
    };
    xmlhttp.sendJsonRpc = function (jsonRpc) {
        const jsonRpcString = JSON.stringify(jsonRpc);
        xmlhttp.open('POST', uri, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(jsonRpcString);
        logger.log('=>', jsonRpc);
    };
    return xmlhttp;
}
class InternalLogger {
    log(message, arg) {
    }
}
export default class HttpTransport extends BaseTransport {
    constructor(logger) {
        super();
        this.getXmlRequest = sktGetXmlHttp;
        this.logger = logger || new InternalLogger();
    }
    open(host, notification) {
        const newHandle = this.generateHandle();
        if (newHandle === 0) {
            return Promise.reject(SktErrors.ESKT_INVALIDHANDLE);
        }
        this.host = host + '/Capture/v1/api';
        this.hostWebsocket = this.host.replace(/^https?:/, 'ws:');
        this.notification = notification;
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
        const promise = new Promise((resolve, reject) => {
            const ajax = this.getXmlRequest(this.host, this.logger, (status, responseStr) => {
                if (status !== 200) {
                    if (request.method === 'openclient') {
                        return reject(SktErrors.ESKT_UNABLEOPENDEVICE);
                    }
                    return reject(SktErrors.ESKT_COMMUNICATIONERROR);
                }
                try {
                    const response = JSON.parse(responseStr);
                    if (request.method === 'openclient') {
                        // we want to start the web service here if we can
                        this.openWebSocket(() => {
                            const res = response;
                            // send a waitForEvent
                            const waitForEvent = new JRpcRequest(1, 'waitforcaptureevent', { handle: res.result.handle });
                            const waitForEventString = JSON.stringify(waitForEvent);
                            this.websocket.send(waitForEventString);
                        });
                    }
                    resolve(response);
                }
                catch (e) {
                    return reject(SktErrors.ESKT_INVALIDFORMAT);
                }
            });
            const index = this.handles.findIndex(h => h.handle === handle);
            if (index === -1) {
                return reject(SktErrors.ESKT_INVALIDHANDLE);
            }
            ajax.sendJsonRpc(request);
        });
        return promise;
    }
    openWebSocket(callback) {
        const that = this;
        this.websocket = new WebSocket(this.hostWebsocket); //, 'jsonRpc');
        this.websocket.onopen = callback;
        this.websocket.onclose = event => {
            this.logger.log('websocket closed!!');
            this.logger.log('', event);
            if (event.code === 1006) {
                const error = new JRpcEvent(CaptureEventIds.Error, CaptureEventTypes.Ulong, SktErrors.ESKT_SERVICENOTCOMMUNICATING);
                that.notification(error);
            }
        };
        this.websocket.onmessage = (event) => {
            this.logger.log('receiving something through the websocket:');
            var json = JSON.parse(event.data);
            this.logger.log('', event);
            if (json.result) {
                if (json.result) {
                    const evt = json;
                    this.notification(evt);
                }
            }
            else if (json.error) {
                // const event = new JRpcEvent<{}>
                // this.notification(capture, json.error.code, json.error.message);
            }
        };
    }
}
//# sourceMappingURL=httpTransport.js.map