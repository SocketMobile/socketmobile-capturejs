import HttpTransport from './httpTransport';
import MaracaTransport from './maracaTransport';
export default class Transport {
    static getTransport(logger) {
        let transport;
        if ((window.webkit) &&
            (window.webkit.messageHandlers) &&
            (window.webkit.messageHandlers.maracaSendJsonRpc)) {
            transport = new MaracaTransport(null, logger);
        }
        else {
            transport = new HttpTransport(logger);
        }
        return transport;
    }
}
//# sourceMappingURL=transport.js.map