import { CaptureEventIds, CaptureEventTypes } from './gen/eventIds';
export declare class CaptureEvent<T> {
    id: CaptureEventIds;
    type: CaptureEventTypes;
    result: number;
    value?: T;
    constructor(id: CaptureEventIds, type: CaptureEventTypes, result?: number, value?: T);
}
