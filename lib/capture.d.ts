import AppInfo from './appInfo';
import CaptureProperty from './captureProperty';
import { RpcTransport } from './rpcTransport';
import CaptureOptions from './captureOptions';
import { JRpcEvent } from './jsonRpc';
import { CaptureEvent } from './captureEvents';
import { Logger } from './logger';
declare type Notification = (event: CaptureEvent<any>, handle?: number) => void;
declare class Capture {
    transport: RpcTransport;
    host: string;
    clientOrDeviceHandle: number;
    transportHandle: number;
    rpcId: number;
    onEventNotification: Notification;
    rootCapture?: Capture;
    logger?: Logger;
    constructor(log?: Logger);
    open(appInfo: AppInfo, eventNotification: Notification, options?: CaptureOptions): Promise<number>;
    close(): Promise<number>;
    openDevice(guid: string, capture: Capture): Promise<any>;
    getProperty<T>(property: CaptureProperty<T>): Promise<CaptureProperty<any>>;
    setProperty<T>(property: CaptureProperty<T>): Promise<CaptureProperty<unknown>>;
    notification(jsonRpc: JRpcEvent<any>, handle?: number): void;
    private getJsonRpcId;
}
export default Capture;
