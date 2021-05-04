import { JRpcRequest, JRpcResponse, JRpcEvent } from './jsonRpc';
import { RpcTransport, BaseTransport } from './rpcTransport';
import { Logger } from './logger';
declare global {
    interface Window {
        webkit: {
            messageHandlers: {
                maracaSendJsonRpc: any;
            };
        };
        maraca: {
            receiveJsonRpc: (json: string) => void;
            replyJsonRpc: (json: string) => void;
        };
    }
}
interface ResponsePerJsonRpc {
    rpcId: number;
    responseCallback: (json: JRpcResponse<any>) => void;
}
export default class MaracaTransport extends BaseTransport implements RpcTransport {
    callbacks: {
        (response: JRpcResponse<any>): void;
    }[];
    window: Window;
    handles: {
        handle: number;
    }[];
    responses: ResponsePerJsonRpc[];
    logger: Logger;
    constructor(depwindow?: Window, logger?: Logger);
    open(host: string, notification: (event: JRpcEvent<any>) => void): Promise<{
        handle: number;
    }>;
    close(handle: number): Promise<number>;
    send<T>(handle: number, request: JRpcRequest<T>): Promise<JRpcResponse<any>>;
    dispatchResponse(jsonrpc: string): void;
}
export {};
