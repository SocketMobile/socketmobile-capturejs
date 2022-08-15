import { RpcTransport } from './rpcTransport';
import { Logger } from './logger';
declare global {
    interface Window {
        webkit: {
            messageHandlers: {
                maracaSendJsonRpc: any;
            };
        };
    }
}
export default class Transport {
    static getTransport(logger?: Logger, xhr?: any): RpcTransport;
}
