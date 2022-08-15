import { RpcTransport } from './rpcTransport';
export default interface CaptureOptions {
    transport?: RpcTransport;
    host?: string;
    xhr?: any;
}
