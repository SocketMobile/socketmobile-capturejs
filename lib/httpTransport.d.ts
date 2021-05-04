import { JRpcRequest, JRpcResponse, JRpcEvent } from './jsonRpc';
import { RpcTransport, BaseTransport } from './rpcTransport';
import { Logger } from './logger';
export declare type AjaxCallback = (status: number, response: string) => void;
export declare class Ajax<T> extends XMLHttpRequest {
    sendJsonRpc: (jsonRpc: JRpcRequest<T>) => void;
    constructor();
}
export declare type GetXmlHttp<T> = (uri: string, logger: Logger, callback: AjaxCallback) => Ajax<T>;
export default class HttpTransport extends BaseTransport implements RpcTransport {
    host: string;
    hostWebsocket: string;
    notification: (event: JRpcEvent<any>, handle?: number) => void;
    websocket: WebSocket;
    sendTest: (jsonString: string) => void;
    getXmlRequest: GetXmlHttp<any>;
    logger?: Logger;
    constructor(logger?: Logger);
    open(host: string, notification: (event: JRpcEvent<any>, handle?: number) => void): Promise<{
        handle: number;
    }>;
    close(handle: number): Promise<number>;
    send<T>(handle: number, request: JRpcRequest<T>): Promise<JRpcResponse<any>>;
    openWebSocket(callback: (event: any) => void): void;
}
