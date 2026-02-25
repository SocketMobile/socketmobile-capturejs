export class CaptureEvent {
    constructor(id, type, result = 0, value) {
        this.id = id;
        this.type = type;
        this.result = result;
        if (value) {
            this.value = value;
        }
    }
}
//# sourceMappingURL=captureEvents.js.map