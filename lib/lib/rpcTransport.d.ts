import { JRpcRequest, JRpcResponse, JRpcEvent } from './jsonRpc';
export declare class BaseTransport {
    handles: {
        handle: number;
    }[];
    constructor();
    generateHandle(): number;
}
export interface RpcTransport extends BaseTransport {
    open(host: string, notification: (event: JRpcEvent<any>) => void): Promise<{
        handle: number;
    }>;
    close(handle: number): Promise<number>;
    send<T>(handle: number, jsonRpc: JRpcRequest<T>): Promise<JRpcResponse<any>>;
}
