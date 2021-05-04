import { CapturePropertyIds, CapturePropertyTypes } from './gen/propertyIdsTypes';
export default class CaptureProperty<T> {
    id: CapturePropertyIds;
    type: CapturePropertyTypes;
    value: T;
    constructor(id: CapturePropertyIds, type: CapturePropertyTypes, value: T);
}
