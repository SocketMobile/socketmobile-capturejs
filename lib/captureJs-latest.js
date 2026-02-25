/* CaptureJS version 2.0.2.228 2026/02/25 15:29:03 © 2026 Socket Mobile, inc. */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SocketMobile"] = factory();
	else
		root["SocketMobile"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./ts/capture.ts":
/*!***********************!*\
  !*** ./ts/capture.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transport */ "./ts/transport.ts");
/* harmony import */ var _jsonRpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./jsonRpc */ "./ts/jsonRpc.ts");
/* harmony import */ var _gen_eventIds__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gen/eventIds */ "./ts/gen/eventIds.ts");
/* harmony import */ var _gen_errors__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gen/errors */ "./ts/gen/errors.ts");




const ERRMSG_NO_TRANSPORT = 'no transport, is this initialized?';
const DEFAULT_HOST = "http://127.0.0.1:18481";
class Capture {
    constructor(log) {
        this.host = DEFAULT_HOST;
        this.rpcId = 0;
        this.logger = log;
    }
    open(appInfo, eventNotification, options) {
        if (options) {
            this.transport = options.transport || _transport__WEBPACK_IMPORTED_MODULE_0__["default"].getTransport(this.logger);
            this.host = options.host || DEFAULT_HOST;
        }
        else {
            // this is done here for transport lazy loading
            this.transport = _transport__WEBPACK_IMPORTED_MODULE_0__["default"].getTransport(this.logger);
        }
        return this.transport.open(this.host, (event) => {
            return this.notification(event);
        })
            .then(transportHandle => {
            const jsonRpc = new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcRequest(this.getJsonRpcId(), 'openclient', {
                appId: appInfo.appId,
                developerId: appInfo.developerId,
                appKey: appInfo.appKey
            });
            this.onEventNotification = eventNotification;
            this.transportHandle = transportHandle.handle;
            return this.transport.send(transportHandle.handle, jsonRpc);
        })
            .then(response => {
            if (response.result && response.result.handle) {
                this.clientOrDeviceHandle = response.result.handle;
                return _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOERROR;
            }
            else {
                const res = response;
                if (res.error) {
                    const { error } = res;
                    throw (new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcError(0, error.code, error.message));
                }
                else {
                    throw (new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcError(0, _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_COMMUNICATIONERROR, "There was an error during communication."));
                }
            }
        });
    }
    close() {
        if (this.transport) {
            const jsonRpc = new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcRequest(this.getJsonRpcId(), 'close', {
                handle: this.clientOrDeviceHandle
            });
            return this.transport.send(this.transportHandle, jsonRpc)
                .then(() => {
                if (this.rootCapture === undefined) {
                    return this.transport.close(this.transportHandle)
                        .then(() => {
                        this.transport = null;
                        this.clientOrDeviceHandle = null;
                        this.transportHandle = 0;
                        return _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOERROR;
                    });
                }
                this.rootCapture = undefined;
                return _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOERROR;
            });
        }
        return Promise.reject({ error: _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_ALREADYDONE });
    }
    openDevice(guid, capture) {
        if (typeof capture === 'undefined' || capture === null) {
            return Promise.reject({ error: _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_INVALIDPARAMETER });
        }
        this.rootCapture = capture;
        this.transport = capture.transport;
        this.transportHandle = capture.transportHandle;
        if (this.transport) {
            const openRequest = new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcRequest(this.getJsonRpcId(), 'opendevice', {
                handle: this.rootCapture.clientOrDeviceHandle,
                guid
            });
            return this.transport.send(this.transportHandle, openRequest)
                .then((response) => {
                if (response.result && response.result.handle) {
                    this.clientOrDeviceHandle = response.result.handle;
                    return _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOERROR;
                }
                else {
                    if (response.error) {
                        const { error } = response;
                        throw (new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcError(0, error.code, error.message));
                    }
                    else {
                        throw (new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcError(0, _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_COMMUNICATIONERROR, "There was an error during communication."));
                    }
                }
            });
        }
        return Promise.reject({ error: _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOTINITIALIZED });
    }
    getProperty(property) {
        if (this.transport) {
            return this.transport.send(this.transportHandle, new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcRequest(this.getJsonRpcId(), 'getproperty', {
                property, handle: this.clientOrDeviceHandle
            }))
                .then(response => {
                if (response.result) {
                    if (this.clientOrDeviceHandle != response.result.handle) {
                        console.log("Warning the response handle does not match with the handle of the request");
                    }
                    const propertyResponse = response.result.property;
                    return Promise.resolve(propertyResponse);
                }
                const rsp = response;
                return Promise.reject(rsp.error);
            });
        }
        return Promise.reject(new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcError(0, _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOTINITIALIZED, ERRMSG_NO_TRANSPORT));
    }
    setProperty(property) {
        if (this.transport) {
            return this.transport.send(this.transportHandle, new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcRequest(this.getJsonRpcId(), 'setproperty', {
                property, handle: this.clientOrDeviceHandle
            }))
                .then(response => {
                if (response.result) {
                    const propertyResponse = response.result.property;
                    return Promise.resolve(propertyResponse);
                }
                const rsp = response;
                return Promise.reject(rsp);
            });
        }
        return Promise.reject(new _jsonRpc__WEBPACK_IMPORTED_MODULE_1__.JRpcError(0, _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_NOTINITIALIZED, ERRMSG_NO_TRANSPORT));
    }
    notification(jsonRpc, handle) {
        const unifiedJsonResult = this.unifyResultInEvents(jsonRpc);
        if (jsonRpc && this.onEventNotification) {
            this.onEventNotification(unifiedJsonResult.event, unifiedJsonResult.handle);
        }
    }
    unifyResultInEvents(jsonRpc) {
        var _a;
        let res = jsonRpc.result;
        if (jsonRpc.result && JSON.stringify(jsonRpc.result) != '{}') {
            if (res.event) {
                let value = res.event.value;
                if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                    // updating only if the value type is an object containing properties-times it can just be a string, etc.-and 
                    // checking if the result is already in the event, if so, keep it.
                    // If it is in the event value (android as of 08/15/24), if so use that value.
                    // If there is no result present anywhere in the 
                    if (typeof res.event.result === 'undefined') {
                        res.event.result = (_a = value.result) !== null && _a !== void 0 ? _a : 0;
                    }
                }
                else {
                    res.event.result = 0;
                }
                // below is the case for closing socketcam view
                // it is registered as an empty scan with no name, id === 0, and data.length === 0
                if (value && res.event.type === _gen_eventIds__WEBPACK_IMPORTED_MODULE_2__.CaptureEventTypes.DecodedData) {
                    if ((value === null || value === void 0 ? void 0 : value.id) === 0 && (value === null || value === void 0 ? void 0 : value.name.length) === 0 && (value === null || value === void 0 ? void 0 : value.data.length) === 0) {
                        res.event.result = _gen_errors__WEBPACK_IMPORTED_MODULE_3__["default"].ESKT_CANCEL;
                    }
                }
            }
        }
        else {
            // in some cases the JsonRpc spec calls for an empty/event-less value in the jsonRpc.result.
            res = jsonRpc.result;
        }
        return res;
    }
    getJsonRpcId() {
        let self = this;
        if (this.rootCapture) {
            self = this.rootCapture;
        }
        return self.rpcId++;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Capture);


/***/ }),

/***/ "./ts/captureEvents.ts":
/*!*****************************!*\
  !*** ./ts/captureEvents.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaptureEvent: () => (/* binding */ CaptureEvent)
/* harmony export */ });
class CaptureEvent {
    constructor(id, type, result = 0, value) {
        this.id = id;
        this.type = type;
        this.result = result;
        if (value) {
            this.value = value;
        }
    }
}


/***/ }),

/***/ "./ts/captureProperty.ts":
/*!*******************************!*\
  !*** ./ts/captureProperty.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CaptureProperty)
/* harmony export */ });
class CaptureProperty {
    constructor(id, type, value) {
        this.id = id;
        this.type = type;
        this.value = value;
    }
}


/***/ }),

/***/ "./ts/gen/dataSources.ts":
/*!*******************************!*\
  !*** ./ts/gen/dataSources.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaptureDataSourceFlags: () => (/* binding */ CaptureDataSourceFlags),
/* harmony export */   CaptureDataSourceID: () => (/* binding */ CaptureDataSourceID),
/* harmony export */   CaptureDataSourceStatus: () => (/* binding */ CaptureDataSourceStatus)
/* harmony export */ });
// dataSource.ts
// This file is generated when calling npm run update
//
//
class CaptureDataSourceID {
}
// the data source ID is not specified or initialized
CaptureDataSourceID.NotSpecified = 0;
// the barcode symbology for Australia post
CaptureDataSourceID.SymbologyAustraliaPost = 1;
// the barcode symbology Aztec
CaptureDataSourceID.SymbologyAztec = 2;
// the barcode symbology Bookland EAN
CaptureDataSourceID.SymbologyBooklandEan = 3;
// the barcode symbology for British post
CaptureDataSourceID.SymbologyBritishPost = 4;
// the barcode symbology for Canada post
CaptureDataSourceID.SymbologyCanadaPost = 5;
// the barcode symbology Chinese 2 of 5
CaptureDataSourceID.SymbologyChinese2of5 = 6;
// the barcode symbology Codabar
CaptureDataSourceID.SymbologyCodabar = 7;
// the barcode symbology Codablock A
CaptureDataSourceID.SymbologyCodablockA = 8;
// the barcode symbology Codablock F
CaptureDataSourceID.SymbologyCodablockF = 9;
// the barcode symbology Code 11
CaptureDataSourceID.SymbologyCode11 = 10;
// the barcode symbology Code 39
CaptureDataSourceID.SymbologyCode39 = 11;
// the barcode symbology Code 39 Extended
CaptureDataSourceID.SymbologyCode39Extended = 12;
// the barcode symbology Code 39 Trioptic
CaptureDataSourceID.SymbologyCode39Trioptic = 13;
// the barcode symbology Code 93
CaptureDataSourceID.SymbologyCode93 = 14;
// the barcode symbology Code 128
CaptureDataSourceID.SymbologyCode128 = 15;
// the barcode symbology DataMatrix
CaptureDataSourceID.SymbologyDataMatrix = 16;
// the barcode symbology for Dutch post
CaptureDataSourceID.SymbologyDutchPost = 17;
// the barcode symbology EAN 8
CaptureDataSourceID.SymbologyEan8 = 18;
// the barcode symbology EAN 13
CaptureDataSourceID.SymbologyEan13 = 19;
// the barcode symbology EAN 128
CaptureDataSourceID.SymbologyEan128 = 20;
// the barcode symbology EAN 128 Irregular
CaptureDataSourceID.SymbologyEan128Irregular = 21;
// the barcode symbology EAN UCC Composite AB
CaptureDataSourceID.SymbologyEanUccCompositeAB = 22;
// the barcode symbology EAN UCC Composite C
CaptureDataSourceID.SymbologyEanUccCompositeC = 23;
// the barcode symbology GS1 Databar
CaptureDataSourceID.SymbologyGs1Databar = 24;
// the barcode symbology GS1 Databar Limited
CaptureDataSourceID.SymbologyGs1DatabarLimited = 25;
// the barcode symbology GS1 Databar Expanded
CaptureDataSourceID.SymbologyGs1DatabarExpanded = 26;
// the barcode symbology Interleaved 2 of 5
CaptureDataSourceID.SymbologyInterleaved2of5 = 27;
// the barcode symbology ISBT 128
CaptureDataSourceID.SymbologyIsbt128 = 28;
// the barcode symbology for Japan post
CaptureDataSourceID.SymbologyJapanPost = 29;
// the barcode symbology Matrix 2 of 5
CaptureDataSourceID.SymbologyMatrix2of5 = 30;
// the barcode symbology Maxi Code
CaptureDataSourceID.SymbologyMaxicode = 31;
// the barcode symbology MSI
CaptureDataSourceID.SymbologyMsi = 32;
// the barcode symbology PDF 417
CaptureDataSourceID.SymbologyPdf417 = 33;
// the barcode symbology PDF 417 Micro
CaptureDataSourceID.SymbologyPdf417Micro = 34;
// the barcode symbology Planet
CaptureDataSourceID.SymbologyPlanet = 35;
// the barcode symbology Plessey
CaptureDataSourceID.SymbologyPlessey = 36;
// the barcode symbology Postnet
CaptureDataSourceID.SymbologyPostnet = 37;
// the barcode symbology QR Code
CaptureDataSourceID.SymbologyQRCode = 38;
// the barcode symbology Standard 2 of 5
CaptureDataSourceID.SymbologyStandard2of5 = 39;
// the barcode symbology Telepen
CaptureDataSourceID.SymbologyTelepen = 40;
// the barcode symbology TLC 39
CaptureDataSourceID.SymbologyTlc39 = 41;
// the barcode symbology UPC A
CaptureDataSourceID.SymbologyUpcA = 42;
// the barcode symbology UPC E0
CaptureDataSourceID.SymbologyUpcE0 = 43;
// the barcode symbology UPC E1
CaptureDataSourceID.SymbologyUpcE1 = 44;
// the barcode symbology USPS Intelligent Mail
CaptureDataSourceID.SymbologyUspsIntelligentMail = 45;
// the barcode symbology Direct Part Marking
CaptureDataSourceID.SymbologyDirectPartMarking = 46;
// the barcode symbology Han Xin
CaptureDataSourceID.SymbologyHanXin = 47;
// the barcode symbology DotCode
CaptureDataSourceID.SymbologyDotCode = 48;
// the barcode symbology Digimarc
CaptureDataSourceID.SymbologyDigimarc = 49;
// the barcode symbology Korea Post
CaptureDataSourceID.SymbologyKoreaPost = 50;
// the barcode symbology Micro QR Code
CaptureDataSourceID.SymbologyMicroQRCode = 51;
// the last barcode symbology ID, not an actual barcode symbology
CaptureDataSourceID.LastSymbologyID = 52;
// the RFID Tag Type ISO 14443 A
CaptureDataSourceID.TagTypeISO14443TypeA = 256;
// the RFID Tag Type ISO 14443 B
CaptureDataSourceID.TagTypeISO14443TypeB = 257;
// the RFID Tag Type Felica
CaptureDataSourceID.TagTypeFelica = 258;
// the RFID Tag Type ISO 15693
CaptureDataSourceID.TagTypeISO15693 = 259;
// the RFID Tag Type NXPI Code 1
CaptureDataSourceID.TagTypeNXPICODE1 = 260;
// the RFID Tag Type Inside Secure Pico Tag
CaptureDataSourceID.TagTypeInsideSecurePicoTag = 261;
// the RFID Tag Type Innovision Topaz Jewel
CaptureDataSourceID.TagTypeInnovisionTopazJewel = 262;
// the RFID Tag Type Thin Film NFC Barcode
CaptureDataSourceID.TagTypeThinfilmNFCBarcode = 263;
// the RFID Tag Type ST Micro Electronics SR
CaptureDataSourceID.TagTypeSTMicroElectronicsSR = 264;
// the RFID Tag Type ASK CTS 256B or CTS 512B
CaptureDataSourceID.TagTypeASKCTS256BOrCTS512B = 265;
// the RFID Tag Type NFC Forum
CaptureDataSourceID.TagTypeNFCForum = 266;
// the RFID Tag Type Innovatron Radio Protocol
CaptureDataSourceID.TagTypeInnovatronRadioProtocol = 267;
// the last RFID tag type, not an actual tag type
CaptureDataSourceID.TagTypeLastTagType = 268;
;
class CaptureDataSourceFlags {
}
// the data source contains a status
CaptureDataSourceFlags.Status = 1;
// the data source contains some parameters
CaptureDataSourceFlags.Param = 2;
;
class CaptureDataSourceStatus {
}
// the data source status by default
CaptureDataSourceStatus.Default = -1;
// the data source status is disabled
CaptureDataSourceStatus.Disable = 0;
// the data source status is enabled
CaptureDataSourceStatus.Enable = 1;
// the data source is not supported
CaptureDataSourceStatus.NotSupported = 2;
;


/***/ }),

/***/ "./ts/gen/deviceTypes.ts":
/*!*******************************!*\
  !*** ./ts/gen/deviceTypes.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaptureDeviceType: () => (/* binding */ CaptureDeviceType),
/* harmony export */   CaptureDeviceTypeClass: () => (/* binding */ CaptureDeviceTypeClass),
/* harmony export */   CaptureDeviceTypeFunction: () => (/* binding */ CaptureDeviceTypeFunction),
/* harmony export */   CaptureDeviceTypeInterface: () => (/* binding */ CaptureDeviceTypeInterface)
/* harmony export */ });
//deviceTypes.ts
//This file is generated when calling npm run update
//
//
class CaptureDeviceTypeClass {
}
///<summary>
/// the class is a device
/// value: 0 (0x00000)
///</summary>
CaptureDeviceTypeClass.DeviceClass = 0;
///<summary>
/// the class is a device manager
/// value: 1 (0x00001)
///</summary>
CaptureDeviceTypeClass.DeviceManagerClass = 1;
;
class CaptureDeviceTypeInterface {
}
///<summary>
/// no interface
/// value: 0 (0x00000)
///</summary>
CaptureDeviceTypeInterface.None = 0;
///<summary>
/// SD interface
/// value: 1 (0x00001)
///</summary>
CaptureDeviceTypeInterface.SD = 1;
///<summary>
/// CF interface
/// value: 2 (0x00002)
///</summary>
CaptureDeviceTypeInterface.CF = 2;
///<summary>
/// Bluetooth interface
/// value: 3 (0x00003)
///</summary>
CaptureDeviceTypeInterface.Bluetooth = 3;
///<summary>
/// Serial interface
/// value: 4 (0x00004)
///</summary>
CaptureDeviceTypeInterface.Serial = 4;
///<summary>
/// Bluetooth Low Energy interface
/// value: 5 (0x00005)
///</summary>
CaptureDeviceTypeInterface.Ble = 5;
///<summary>
/// NFC
/// value: 6 (0x00006)
///</summary>
CaptureDeviceTypeInterface.NFC = 6;
;
class CaptureDeviceType {
}
//no device type (initial value)
//value: 0 (0x00000)
CaptureDeviceType.None = 0;
//Model 7
//value: 196609 (0x30001)
CaptureDeviceType.Scanner7 = 196609;
//Model 7X
//value: 196610 (0x30002)
CaptureDeviceType.Scanner7x = 196610;
//Model 7Xi
//value: 196612 (0x30004)
CaptureDeviceType.Scanner7xi = 196612;
//Model 9 CRS
//value: 196611 (0x30003)
CaptureDeviceType.Scanner9 = 196611;
//SocketCam C820
//value: 5 (0x00005)
CaptureDeviceType.SocketCamC820 = 5;
//SocketCam C860
//value: 29 (0x0001D)
CaptureDeviceType.SocketCamC860 = 29;
//Model S800
//value: 196614 (0x30006)
CaptureDeviceType.ScannerS800 = 196614;
//Model S820
//value: 196634 (0x3001A)
CaptureDeviceType.ScannerS820 = 196634;
//Model S850
//value: 196615 (0x30007)
CaptureDeviceType.ScannerS850 = 196615;
//Model S840
//value: 196616 (0x30008)
CaptureDeviceType.ScannerS840 = 196616;
//Model D700
//value: 196617 (0x30009)
CaptureDeviceType.ScannerD700 = 196617;
//Model D720
//value: 196633 (0x30019)
CaptureDeviceType.ScannerD720 = 196633;
//Model D730
//value: 196618 (0x3000A)
CaptureDeviceType.ScannerD730 = 196618;
//Model D740
//value: 196619 (0x3000B)
CaptureDeviceType.ScannerD740 = 196619;
//Model D750
//value: 196620 (0x3000C)
CaptureDeviceType.ScannerD750 = 196620;
//Model D760
//value: 196621 (0x3000D)
CaptureDeviceType.ScannerD760 = 196621;
//Model S700
//value: 196622 (0x3000E)
CaptureDeviceType.ScannerS700 = 196622;
//Model S720
//value: 196632 (0x30018)
CaptureDeviceType.ScannerS720 = 196632;
//Model S730
//value: 196623 (0x3000F)
CaptureDeviceType.ScannerS730 = 196623;
//Model S740
//value: 196624 (0x30010)
CaptureDeviceType.ScannerS740 = 196624;
//Model S750
//value: 196625 (0x30011)
CaptureDeviceType.ScannerS750 = 196625;
//Model S760
//value: 196626 (0x30012)
CaptureDeviceType.ScannerS760 = 196626;
//Model S860
//value: 196627 (0x30013)
CaptureDeviceType.ScannerS860 = 196627;
//Model D790
//value: 196628 (0x30014)
CaptureDeviceType.ScannerD790 = 196628;
//Model D600
//value: 327701 (0x50015)
CaptureDeviceType.ScannerD600 = 327701;
//Model S550
//value: 327702 (0x50016)
CaptureDeviceType.ScannerS550 = 327702;
//Model S370 - Barcode scanner
//value: 327963 (0x5011B)
CaptureDeviceType.ScannerS370 = 327963;
//Model S370 - NFC Reader/Writer
//value: 329243 (0x5061B)
CaptureDeviceType.NFCS370 = 329243;
//Model S320
//value: 327964 (0x5011C)
CaptureDeviceType.ScannerS320 = 327964;
//NFC Tag
//value: 393239 (0x60017)
CaptureDeviceType.NFCTag = 393239;
//Model M930
//value: 196894 (0x3011E)
CaptureDeviceType.ScannerM930 = 196894;
//Model M940
//value: 196895 (0x3011F)
CaptureDeviceType.ScannerM940 = 196895;
//Model D761
//value: 196896 (0x30120)
CaptureDeviceType.DeviceD761 = 196896;
//Model D762
//value: 196897 (0x30121)
CaptureDeviceType.DeviceD762 = 196897;
//Model D763
//value: 327970 (0x50122)
CaptureDeviceType.DeviceD763 = 327970;
//Model D764
//value: 196899 (0x30123)
CaptureDeviceType.DeviceD764 = 196899;
//Model D765
//value: 196900 (0x30124)
CaptureDeviceType.DeviceD765 = 196900;
//Model D751 - NFC Reader/Writer
//value: 329253 (0x50625)
CaptureDeviceType.DeviceD751 = 329253;
//Model M942
//value: 327974 (0x50126)
CaptureDeviceType.DeviceM942 = 327974;
//Model M963
//value: 327975 (0x50127)
CaptureDeviceType.DeviceM963 = 327975;
//Model XS663
//value: 327976 (0x50128)
CaptureDeviceType.DeviceXS663 = 327976;
//Model S721
//value: 327977 (0x50129)
CaptureDeviceType.DeviceS721 = 327977;
//Model S741
//value: 327978 (0x5012A)
CaptureDeviceType.DeviceS741 = 327978;
//Bluetooth device type unknown by this version of Capture
//value: 196651 (0x3002B)
CaptureDeviceType.BtUnknown = 196651;
//device manager for controlling BLE
//value: 17104897 (0x1050001)
CaptureDeviceType.DeviceManagerBle = 17104897;
//Ble device type unknown by this version of Capture
//value: 329771 (0x5082B)
CaptureDeviceType.BleUnknown = 329771;
;
class CaptureDeviceTypeFunction {
}
///<summary>
/// legacy device
/// value: 0 (0x00000)
///</summary>
CaptureDeviceTypeFunction.Legacy = 0;
///<summary>
/// Barcode scanner function for this device
/// value: 1 (0x00001)
///</summary>
CaptureDeviceTypeFunction.Scanner = 1;
///<summary>
/// NFC reader function for this device
/// value: 2 (0x00002)
///</summary>
CaptureDeviceTypeFunction.NFCReader = 2;
///<summary>
/// NFC writer function for this device
/// value: 4 (0x00004)
///</summary>
CaptureDeviceTypeFunction.NFCWriter = 4;
///<summary>
/// Unknown function for this device
/// value: 8 (0x00008)
///</summary>
CaptureDeviceTypeFunction.Unknown = 8;
;


/***/ }),

/***/ "./ts/gen/errors.ts":
/*!**************************!*\
  !*** ./ts/gen/errors.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SktErrors)
/* harmony export */ });
//errors.ts
//This file is generated when calling npm run update
//
//
class SktErrors {
}
/// <summary>
/// The Lasso feature is disabled
/// </summary>
SktErrors.ESKT_LASSODISABLED = 8;
/// <summary>
/// This operation is deprecated
/// </summary>
SktErrors.ESKT_DEPRECATED = 7;
/// <summary>
/// No data present
/// </summary>
SktErrors.ESKT_NODATA = 6;
/// <summary>
/// The object has been created
/// </summary>
SktErrors.ESKT_CREATED = 5;
/// <summary>
/// This operation is still pending
/// </summary>
SktErrors.ESKT_STILLPENDING = 4;
/// <summary>
/// This operation is pending
/// </summary>
SktErrors.ESKT_PENDING = 3;
/// <summary>
/// This operation is already complete
/// </summary>
SktErrors.ESKT_ALREADYDONE = 2;
/// <summary>
/// The wait timed out
/// </summary>
SktErrors.ESKT_WAITTIMEOUT = 1;
/// <summary>
/// There is no error
/// </summary>
SktErrors.ESKT_NOERROR = 0;
/// <summary>
/// At least one test has failed
/// </summary>
SktErrors.ESKT_TESTFAILED = -1;
/// <summary>
/// There is not enough memory to complete the operation
/// </summary>
SktErrors.ESKT_NOTENOUGHMEMORY = -2;
/// <summary>
/// A lock cannot be created
/// </summary>
SktErrors.ESKT_UNABLECREATELOCK = -3;
/// <summary>
/// Unable to lock a shared resource
/// </summary>
SktErrors.ESKT_UNABLELOCK = -4;
/// <summary>
/// Unable to unlock a shared resource
/// </summary>
SktErrors.ESKT_UNABLEUNLOCK = -5;
/// <summary>
/// Unable to remove an item from a list because the list is empty
/// </summary>
SktErrors.ESKT_LISTEMPTY = -6;
/// <summary>
/// An event cannot be created
/// </summary>
SktErrors.ESKT_UNABLECREATEEVENT = -7;
/// <summary>
/// Unable to set an event
/// </summary>
SktErrors.ESKT_UNABLESETEVENT = -8;
/// <summary>
/// Unable to reset an event
/// </summary>
SktErrors.ESKT_UNABLERESETEVENT = -9;
/// <summary>
/// The event is not created
/// </summary>
SktErrors.ESKT_EVENTNOTCREATED = -10;
/// <summary>
/// The provided handle is invalid
/// </summary>
SktErrors.ESKT_INVALIDHANDLE = -11;
/// <summary>
/// A thread cannot be created
/// </summary>
SktErrors.ESKT_UNABLECREATETHREAD = -12;
/// <summary>
/// The thread is already created
/// </summary>
SktErrors.ESKT_THREADALREADYCREATED = -13;
/// <summary>
/// The thread is still running
/// </summary>
SktErrors.ESKT_THREADSTILLRUNNING = -14;
/// <summary>
/// This operation is not supported
/// </summary>
SktErrors.ESKT_NOTSUPPORTED = -15;
/// <summary>
/// The previous operation is not completed
/// </summary>
SktErrors.ESKT_PENDINGOPERATIONNOTCOMPLETED = -16;
/// <summary>
/// The item cannot be found
/// </summary>
SktErrors.ESKT_NOTFOUND = -17;
/// <summary>
/// The provided parameter is invalid
/// </summary>
SktErrors.ESKT_INVALIDPARAMETER = -18;
/// <summary>
/// Trying to use an object that is not yet initialized
/// </summary>
SktErrors.ESKT_NOTINITIALIZED = -19;
/// <summary>
/// The timeout value is out of range
/// </summary>
SktErrors.ESKT_TIMEOUTOUTOFRANGE = -20;
/// <summary>
/// The object cannot be initialized
/// </summary>
SktErrors.ESKT_UNABLEINITIALIZE = -21;
/// <summary>
/// The object cannot be un-initialized
/// </summary>
SktErrors.ESKT_UNABLEDEINITIALIZE = -22;
/// <summary>
/// The configuration is unknown
/// </summary>
SktErrors.ESKT_UNKNOWNCONFIGURATION = -23;
/// <summary>
/// The configuration is invalid
/// </summary>
SktErrors.ESKT_INVALIDCONFIGURATION = -24;
/// <summary>
/// Creating or adding an item that already exists
/// </summary>
SktErrors.ESKT_ALREADYEXISTING = -25;
/// <summary>
/// The provided buffer is too small
/// </summary>
SktErrors.ESKT_BUFFERTOOSMALL = -26;
/// <summary>
/// The specified device cannot be opened
/// </summary>
SktErrors.ESKT_UNABLEOPENDEVICE = -27;
/// <summary>
/// The specified device cannot be configured
/// </summary>
SktErrors.ESKT_UNABLECONFIGUREDEVICE = -28;
/// <summary>
/// The string cannot be converted
/// </summary>
SktErrors.ESKT_UNABLECONVERTSTRING = -29;
/// <summary>
/// The specified string cannot be copied
/// </summary>
SktErrors.ESKT_UNABLECOPYSTRING = -30;
/// <summary>
/// The specified device is not open
/// </summary>
SktErrors.ESKT_DEVICENOTOPEN = -31;
/// <summary>
/// The specified item is not available
/// </summary>
SktErrors.ESKT_NOTAVAILABLE = -32;
/// <summary>
/// The specified file cannot be written
/// </summary>
SktErrors.ESKT_UNABLEWRITEFILE = -33;
/// <summary>
/// The specified file cannot be read
/// </summary>
SktErrors.ESKT_UNABLEREADFILE = -34;
/// <summary>
/// The wait has failed
/// </summary>
SktErrors.ESKT_WAITFAILED = -35;
/// <summary>
/// The specified checksum is invalid
/// </summary>
SktErrors.ESKT_INVALIDCHECKSUM = -36;
/// <summary>
/// This command has been denied
/// </summary>
SktErrors.ESKT_COMMANDDENIED = -37;
/// <summary>
/// There was an error during communication
/// </summary>
SktErrors.ESKT_COMMUNICATIONERROR = -38;
/// <summary>
/// An unexpected command has been received
/// </summary>
SktErrors.ESKT_RECEIVEUNEXPECTEDCOMMAND = -39;
/// <summary>
/// The GUID cannot be created
/// </summary>
SktErrors.ESKT_UNABLECREATEGUID = -40;
/// <summary>
/// The specified value is invalid
/// </summary>
SktErrors.ESKT_INVALIDVALUE = -41;
/// <summary>
/// The request has timed out
/// </summary>
SktErrors.ESKT_REQUESTTIMEDOUT = -42;
/// <summary>
/// The operation is invalid
/// </summary>
SktErrors.ESKT_INVALIDOPERATION = -43;
/// <summary>
/// The protocol used is not the correct one
/// </summary>
SktErrors.ESKT_WRONGPROTOCOL = -44;
/// <summary>
/// The queue has been reset
/// </summary>
SktErrors.ESKT_QUEUERESETED = -45;
/// <summary>
/// The data size exceeeds maximum transmission unit
/// </summary>
SktErrors.ESKT_EXCEEDINGMTUSIZE = -46;
/// <summary>
/// The listener thread has nothing to listen to
/// </summary>
SktErrors.ESKT_NOTHINGTOLISTEN = -47;
/// <summary>
/// The current version is outdated
/// </summary>
SktErrors.ESKT_OUTDATEDVERSION = -48;
/// <summary>
/// The XML tag is invalid
/// </summary>
SktErrors.ESKT_INVALIDXMLTAG = -49;
/// <summary>
/// Cannot register for  HID change notifications
/// </summary>
SktErrors.ESKT_UNABLEREGISTERFORHIDCHANGES = -50;
/// <summary>
/// The message cannot be retrieved
/// </summary>
SktErrors.ESKT_UNABLERETRIEVEMESSAGE = -51;
/// <summary>
/// There is a syntax error
/// </summary>
SktErrors.ESKT_SYNTAXERROR = -52;
/// <summary>
/// The specified file cannot be opened
/// </summary>
SktErrors.ESKT_UNABLEOPENFILE = -53;
/// <summary>
/// The file path cannot be retrieved
/// </summary>
SktErrors.ESKT_UNABLERETRIEVEPATH = -54;
/// <summary>
/// The specified directory cannot be created
/// </summary>
SktErrors.ESKT_UNABLECREATEDIRECTORY = -55;
/// <summary>
/// The specified file cannot be deleted
/// </summary>
SktErrors.ESKT_UNABLEDELETEFILE = -56;
/// <summary>
/// The specified directory cannot be deleted
/// </summary>
SktErrors.ESKT_UNABLEDELETEDIRECTORY = -57;
/// <summary>
/// The modem status cannot be read
/// </summary>
SktErrors.ESKT_UNABLEREADMODEMSTATUS = -60;
/// <summary>
/// The Class of Devices cannot be retrieved
/// </summary>
SktErrors.ESKT_UNABLEGETCLASSDEVICES = -61;
/// <summary>
/// The device interface cannot be retrieved
/// </summary>
SktErrors.ESKT_UNABLEGETDEVICEINTERFACE = -62;
/// <summary>
/// The specified file or device cannot be found
/// </summary>
SktErrors.ESKT_FILENOTFOUND = -63;
/// <summary>
/// The specified file or device is not accessible
/// </summary>
SktErrors.ESKT_FILEACCESSDENIED = -64;
/// <summary>
/// The HID information cannot be read
/// </summary>
SktErrors.ESKT_UNABLEREADHIDINFO = -70;
/// <summary>
/// The number of parameters is incorrect
/// </summary>
SktErrors.ESKT_INCORRECTNUMBEROFPARAMETERS = -84;
/// <summary>
/// The specified format is invalid
/// </summary>
SktErrors.ESKT_INVALIDFORMAT = -85;
/// <summary>
/// The version is invalid
/// </summary>
SktErrors.ESKT_INVALIDVERSION = -86;
/// <summary>
/// The service does not respond
/// </summary>
SktErrors.ESKT_SERVICENOTCOMMUNICATING = -87;
/// <summary>
/// The Lasso Id is expired
/// </summary>
SktErrors.ESKT_LASSOIDEXPIRED = -88;
/// <summary>
/// The Lasso Id does not match
/// </summary>
SktErrors.ESKT_LASSOIDTNOTMATCHING = -89;
/// <summary>
/// The device already has a Lasso Id
/// </summary>
SktErrors.ESKT_LASSOIDALREADYSET = -90;
/// <summary>
/// This operation has been canceled
/// </summary>
SktErrors.ESKT_CANCEL = -91;
/// <summary>
/// The operation has expired
/// </summary>
SktErrors.ESKT_EXPIRED = -92;
/// <summary>
/// The AppInfo information is invalid
/// </summary>
SktErrors.ESKT_INVALIDAPPINFO = -93;
/// <summary>
/// BLE operation failed
/// </summary>
SktErrors.ESKT_BLEGATT = -94;
/// <summary>
/// Auto-discovery is in progress
/// </summary>
SktErrors.ESKT_FAVORITENOTEMPTY = -95;
/// <summary>
/// Location permission is required to complete the operation
/// </summary>
SktErrors.ESKT_LOCATIONPERMISSIONMISSING = -96;
/// <summary>
/// The requested operation cannot be completed
/// </summary>
SktErrors.ESKT_UNABLETOCOMPLETEOPERATION = -97;
/// <summary>
/// Location service is disabled
/// </summary>
SktErrors.ESKT_LOCATIONSERVICEDISABLED = -98;
/// <summary>
/// Bluetooth permission is not granted
/// </summary>
SktErrors.ESKT_BLUETOOTHPERMISSIONMISSING = -99;
;


/***/ }),

/***/ "./ts/gen/eventIds.ts":
/*!****************************!*\
  !*** ./ts/gen/eventIds.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaptureEventIds: () => (/* binding */ CaptureEventIds),
/* harmony export */   CaptureEventTypes: () => (/* binding */ CaptureEventTypes)
/* harmony export */ });
//eventIds.ts
//This file is generated when calling npm run update
//
//
var CaptureEventIds;
(function (CaptureEventIds) {
    // Capture has not been correctly initialized after its first open.
    // Type: kNone
    CaptureEventIds[CaptureEventIds["NotInitialized"] = 0] = "NotInitialized";
    // Event when a device has connected or is present.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceArrival"] = 1] = "DeviceArrival";
    // Event when a device is no longer present.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceRemoval"] = 2] = "DeviceRemoval";
    // Event when Capture is terminated.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Terminate"] = 3] = "Terminate";
    // Event when Capture had an error.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Error"] = 4] = "Error";
    // Event when Capture has some decoded data available.
    // Type: kDecodedData
    CaptureEventIds[CaptureEventIds["DecodedData"] = 5] = "DecodedData";
    // Event when a device sends a power change notification.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Power"] = 6] = "Power";
    // Event when the device button status has changed.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["Buttons"] = 7] = "Buttons";
    // Event when the battery Level has changed.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["BatteryLevel"] = 8] = "BatteryLevel";
    // Event when the communication listener thread has started.
    // Type: kUlong
    CaptureEventIds[CaptureEventIds["ListenerStarted"] = 9] = "ListenerStarted";
    // Event when a device ownership has changed.
    // Type: kString
    CaptureEventIds[CaptureEventIds["DeviceOwnership"] = 10] = "DeviceOwnership";
    // Event when the Device Manager (BLE) is present.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceManagerArrival"] = 11] = "DeviceManagerArrival";
    // Event when the Device Manager (BLE) is gone.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceManagerRemoval"] = 12] = "DeviceManagerRemoval";
    // A device has been discovered.
    // Type: kDeviceInfo
    CaptureEventIds[CaptureEventIds["DeviceDiscovered"] = 13] = "DeviceDiscovered";
    // The device discovery has ended.
    // Type: kNone
    CaptureEventIds[CaptureEventIds["DiscoveryEnd"] = 14] = "DiscoveryEnd";
    // Event when a CaptureSDK log trace is generated.
    // Type: kString
    CaptureEventIds[CaptureEventIds["LogTrace"] = 21] = "LogTrace";
    // The Last Event should always be the last ID in the list of possible events.
    // Type: kNone
    CaptureEventIds[CaptureEventIds["LastID"] = 22] = "LastID";
})(CaptureEventIds || (CaptureEventIds = {}));
;
var CaptureEventTypes;
(function (CaptureEventTypes) {
    // For capture events that don't have any value.
    CaptureEventTypes[CaptureEventTypes["None"] = 0] = "None";
    // The event has a byte value.
    CaptureEventTypes[CaptureEventTypes["Byte"] = 1] = "Byte";
    // The event has a unsigned long value.
    CaptureEventTypes[CaptureEventTypes["Ulong"] = 2] = "Ulong";
    // The event has a byte array value.
    CaptureEventTypes[CaptureEventTypes["Array"] = 3] = "Array";
    // The event has a string value.
    CaptureEventTypes[CaptureEventTypes["String"] = 4] = "String";
    // The event has a decoded data structure as value.
    CaptureEventTypes[CaptureEventTypes["DecodedData"] = 5] = "DecodedData";
    // The event has a device info structure as value (read only).
    CaptureEventTypes[CaptureEventTypes["DeviceInfo"] = 6] = "DeviceInfo";
    // The event has an object structure (array, map, dictionary) as value (read only).
    CaptureEventTypes[CaptureEventTypes["Object"] = 7] = "Object";
    // The event type should not be equal or higher that kLastID otherwise
    // it means the SDK is not in sync with the actual version of Socket
    // Mobile Companion running on the host.
    CaptureEventTypes[CaptureEventTypes["LastID"] = 8] = "LastID";
})(CaptureEventTypes || (CaptureEventTypes = {}));
;


/***/ }),

/***/ "./ts/gen/propertyIdsTypes.ts":
/*!************************************!*\
  !*** ./ts/gen/propertyIdsTypes.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CapturePropertyIds: () => (/* binding */ CapturePropertyIds),
/* harmony export */   CapturePropertyTypes: () => (/* binding */ CapturePropertyTypes)
/* harmony export */ });
//PropertyIdsTypes.ts
//This file is generated when calling npm run update
//
//
var CapturePropertyIds;
(function (CapturePropertyIds) {
    // Set to notify Capture that the client is shutting down gracefully.
    // Capture will send device removal events followed by a terminate
    // event. Once you receive the terminate event, it is safe to shut
    // down Capture.
    // Device: False	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["Abort"] = -2146435072] = "Abort";
    // Gets the Capture service version.
    // Device: False	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["Version"] = -2147418111] = "Version";
    // Gets the version of the firmware interface that Capture service
    // supports. This can be useful for determining if the Capture service
    // supports a particular hardware feature.
    // Device: False	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["InterfaceVersion"] = -2147418112] = "InterfaceVersion";
    // property to set or get the Capture configuration
    // Device: False	Get Type: String 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["Configuration"] = -2141913085] = "Configuration";
    // Gets or sets the data confirmation mode. The data confirmation mode
    // determines who acknowledges whether the data received was good or
    // bad.
    // Device: False	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DataConfirmationMode"] = -2147352572] = "DataConfirmationMode";
    // Gets or sets the data confirmation action. Data confirmation action
    // determines how good or bad data is acknowledged.
    // Device: False	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["DataConfirmationAction"] = -2147287035] = "DataConfirmationAction";
    // Gets or sets the log level of various Capture service components
    // (Only works on debug builds of the service).
    // Device: False	Get Type: Byte 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["MonitorMode"] = -2145124346] = "MonitorMode";
    // property to get or set the SocketCam status
    // Device: False	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["SocketCamStatus"] = -2147352569] = "SocketCamStatus";
    // Gets the firmware version of the device
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["VersionDevice"] = 65536] = "VersionDevice";
    // Gets the model of the device
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["DeviceType"] = 65538] = "DeviceType";
    // Sends an arbitrary get or set command to the device
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["DeviceSpecific"] = 4456451] = "DeviceSpecific";
    // property to get or set the data source status / information
    // Device: True	Get Type: DataSource 	Set Type: DataSource
    CapturePropertyIds[CapturePropertyIds["DataSourceDevice"] = 7798788] = "DataSourceDevice";
    // Sets the trigger of the device - can start or stop a read and
    // enable or disable the physical trigger button on the device.
    // Device: True	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["TriggerDevice"] = 1179653] = "TriggerDevice";
    // property to apply a config to a Capture Device (not yet enabled)
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["ApplyConfigDevice"] = 1048582] = "ApplyConfigDevice";
    // Gets or sets a preamble for data decoded by the device. When set,
    // the preamble is added in front of the decoded data.
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["PreambleDevice"] = 327687] = "PreambleDevice";
    // Gets or sets a postamble for data decoded by the device. When set,
    // the postamble is added to the end of the decoded data.
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["PostambleDevice"] = 327688] = "PostambleDevice";
    // property to get the Capture Device capabilities
    // Device: True	Get Type: Byte 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["CapabilitiesDevice"] = 2162697] = "CapabilitiesDevice";
    // Gets the change id of the device. The change id is a checksum of
    // all the engine settings - e.g. symbology settings, preamble,
    // postamble, etc - and can be used to determine if the device
    // configuration has been altered by another application or using a
    // command barcode.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["ChangeIdDevice"] = 65546] = "ChangeIdDevice";
    // property to get or set the Decoded Data Format of a Capture Device
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DataFormatDevice"] = 131083] = "DataFormatDevice";
    // Gets or sets the friendly name of the device. The friendly name is
    // the name that appears in Bluetooth settings.
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["FriendlyNameDevice"] = 327936] = "FriendlyNameDevice";
    // property to get or set the Capture Device Security Mode
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["SecurityModeDevice"] = 131329] = "SecurityModeDevice";
    // property to get or set the Capture Device PIN code
    // Device: True	Get Type: NotApplicable 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["PinCodeDevice"] = 1376514] = "PinCodeDevice";
    // Set deletes pairing and bonding information off the device. Useful
    // when preparing to pair the Capture device to a different host.
    // Device: True	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DeletePairingBondingDevice"] = 1179907] = "DeletePairingBondingDevice";
    // Set resets all the settings on the device to their default values.
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["RestoreFactoryDefaultsDevice"] = 1048836] = "RestoreFactoryDefaultsDevice";
    // Set turns the device off
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["SetPowerOffDevice"] = 1048837] = "SetPowerOffDevice";
    // Gets the current state of each button on the device. Consider using
    // kNotificationsDevice to subscribe to button events instead.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["ButtonsStatusDevice"] = 65792] = "ButtonsStatusDevice";
    // Gets or sets the sound configuration of the device. There are
    // separate sound configurations for when a good scan is acknowledged
    // locally (by the Capture device) and when it is acknowledged by the
    // host. The same applies to the bad scan sound configuration.
    // Device: True	Get Type: Byte 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["SoundConfigDevice"] = 2359559] = "SoundConfigDevice";
    // Gets or sets the trigger lock and auto-off timers. The trigger lock
    // determines how long the trigger remains locked after decoding data
    // without receiving confirmation. There are two auto-off timers, one
    // for when the device is connected to a host and one for when it is
    // not.
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["TimersDevice"] = 262408] = "TimersDevice";
    // Gets or sets local device acknowledgement. When enabled, the device
    // acknowledges decoded data as soon as it is decoded. When disabled,
    // the device waits for the host to acknowledge decoded data and the
    // trigger will be locked until acknowledgement is received or the
    // trigger lock timeout has elapsed.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["LocalAcknowledgmentDevice"] = 131337] = "LocalAcknowledgmentDevice";
    // Sends an acknowledgement to the device. Acknowledgement can either
    // be positive or negative - a.k.a. good scan or bad scan.
    // Device: True	Get Type: NotApplicable 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["DataConfirmationDevice"] = 1245450] = "DataConfirmationDevice";
    // Gets the current battery level of the device. Consider using 
    // kNotificationsDevice to subscribe to battery level change events
    // instead.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["BatteryLevelDevice"] = 65803] = "BatteryLevelDevice";
    // Gets or sets the local decode action of the device. Determines how
    // decoded data is acknowledged - i.e. with a beep, rumble, flash or
    // some combination of all three.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["LocalDecodeActionDevice"] = 131340] = "LocalDecodeActionDevice";
    // Gets the Bluetooth address of the device
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["BluetoothAddressDevice"] = 65805] = "BluetoothAddressDevice";
    // Gets the statistics counters of the device. Counters record the
    // absolute number of times a particular event has occurred.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["StatisticCountersDevice"] = 65806] = "StatisticCountersDevice";
    // Gets or sets the rumble configuration of the device. There are
    // separate rumble configurations for when a good scan is acknowledged
    // locally (by the Capture device) and when it is acknowledged by the
    // host. The same applies to the bad scan rumble configuration.
    // Device: True	Get Type: Byte 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["RumbleConfigDevice"] = 2359567] = "RumbleConfigDevice";
    // property to get or set the Capture Device Profile Configuration
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["ProfileConfigDevice"] = 262416] = "ProfileConfigDevice";
    // Instructs the device to drop its connection. Note: After sending
    // this command, the host will be unable to send any subsequent
    // commands to this device.
    // Device: True	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["DisconnectDevice"] = 1179921] = "DisconnectDevice";
    // Gets or sets arbitrary bytes to store on the device. The device has
    // 16 storage locations which can hold up to 64 bytes each.
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["DataStoreDevice"] = 4456722] = "DataStoreDevice";
    // Gets or sets subscriptions to various events from the device.
    // Events that can be subscribed to include, trigger press/release,
    // power button press/release, power state and battery level change.
    // Device: True	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["NotificationsDevice"] = 196883] = "NotificationsDevice";
    // property to get the Capture Device Connect reason
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["ConnectReasonDevice"] = 65812] = "ConnectReasonDevice";
    // Gets the current power state of the device. Consider using
    // kNotificationsDevice to subscribe to power state events instead.
    // Device: True	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["PowerStateDevice"] = 65813] = "PowerStateDevice";
    // Gets or sets the reconnect behavior of the device when it is
    // powered on in application mode. By default, the device will attempt
    // to reconnect to the last host, but this feature can be turned off
    // using this property.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["StartUpRoleSPPDevice"] = 131350] = "StartUpRoleSPPDevice";
    // property to get or set the Capture Device Connection Beep
    // Configuration.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["ConnectionBeepConfigDevice"] = 131351] = "ConnectionBeepConfigDevice";
    // Gets or sets the status of the flash on the SocketCam device.
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["FlashDevice"] = 131352] = "FlashDevice";
    // property to get or set the Capture Device Overlay View (SocketCam
    // only)
    // Device: True	Get Type: None 	Set Type: Object
    CapturePropertyIds[CapturePropertyIds["OverlayViewDevice"] = 590105] = "OverlayViewDevice";
    // property to get or set the Capture Device Stand Configuration
    // Device: True	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["StandConfigDevice"] = 196890] = "StandConfigDevice";
    // property to start a BLE discovery from a Device Manager
    // Device: True	Get Type: NotApplicable 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["StartDiscovery"] = 1245696] = "StartDiscovery";
    // property to set or get the BLE favorites for a Device Manager
    // Device: True	Get Type: None 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["Favorite"] = 328193] = "Favorite";
    // property to get the BLE Unique Device Identifier that can be used to set favorite with
    // Device: True	Get Type: String 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["UniqueDeviceIdentifier"] = 5308930] = "UniqueDeviceIdentifier";
    // property to transmit through PC/SC an array of bytes often called APDU
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["PcScTagTransmit"] = 4456731] = "PcScTagTransmit";
    // property to control the PC/SC coupler device by passing an array of bytes often called APDU
    // Device: True	Get Type: Array 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["PcScCouplerControl"] = 4456732] = "PcScCouplerControl";
    // property to define the theme that is used for the different events: Ready, Read, Read Success, Read Failure UI
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["ThemeSelectionDevice"] = 262429] = "ThemeSelectionDevice";
    // property to define the theme selection mask. It applies the theme selection on the given device(s) set with the mask
    // Device: True	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["ThemeSelectionMaskDevice"] = 262430] = "ThemeSelectionMaskDevice";
    // property to define if the Lasso feature is enabled or not
    // Device: True	Get Type: None 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["LassoStatusDevice"] = 131359] = "LassoStatusDevice";
    // property to define the Lasso Id for a device
    // Device: True	Get Type: NotApplicable 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["LassoIdDevice"] = 1311008] = "LassoIdDevice";
    // property to define the Lasso life span for a device
    // Device: True	Get Type: None 	Set Type: Ulong
    CapturePropertyIds[CapturePropertyIds["LassoLifeSpanDevice"] = 196897] = "LassoLifeSpanDevice";
    // property to get or set a device's Single Partnership connection
    // Device: False	Get Type: None 	Set Type: Array
    CapturePropertyIds[CapturePropertyIds["SinglePartnership"] = -2147221214] = "SinglePartnership";
    // property to get a stamp from the host for Single Partnership connection
    // Device: False	Get Type: None 	Set Type: NotApplicable
    CapturePropertyIds[CapturePropertyIds["SinglePartnershipStamp"] = -2147417821] = "SinglePartnershipStamp";
    // property to reset a device's Single Partnership connection
    // Device: True	Get Type: None 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["ResetSinglePartnershipDevice"] = 292] = "ResetSinglePartnershipDevice";
    // property to connect to a discovered BLE device with a Device Manager
    // Device: True	Get Type: NotApplicable 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["ConnectDiscoveredDevice"] = 1376771] = "ConnectDiscoveredDevice";
    // property to disconnect from a discovered BLE device with a Device Manager
    // Device: True	Get Type: NotApplicable 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["DisconnectDiscoveredDevice"] = 1376768] = "DisconnectDiscoveredDevice";
    // property to add a Bluetooth device (Classic or Low Energy)
    // Device: False	Get Type: NotApplicable 	Set Type: Byte
    CapturePropertyIds[CapturePropertyIds["AddDevice"] = -2146303981] = "AddDevice";
    // property to remove a Bluetooth device (Classic or Low Energy)
    // Device: False	Get Type: NotApplicable 	Set Type: String
    CapturePropertyIds[CapturePropertyIds["RemoveDevice"] = -2146107372] = "RemoveDevice";
    // property to power cycle a Bluetooth LE device when on a power source (e.g. charging). Otherwise it will just power off the device
    // Device: True	Get Type: NotApplicable 	Set Type: None
    CapturePropertyIds[CapturePropertyIds["ResetDevice"] = 1048832] = "ResetDevice";
})(CapturePropertyIds || (CapturePropertyIds = {}));
;
var CapturePropertyTypes;
(function (CapturePropertyTypes) {
    // for capture properties that don't have any value
    CapturePropertyTypes[CapturePropertyTypes["None"] = 0] = "None";
    // for capture properties that don't have a value for
    // either a get operation or a set operation or neither of
    // them.
    CapturePropertyTypes[CapturePropertyTypes["NotApplicable"] = 1] = "NotApplicable";
    // the property has a byte value
    CapturePropertyTypes[CapturePropertyTypes["Byte"] = 2] = "Byte";
    // the property has a unsigned long value
    CapturePropertyTypes[CapturePropertyTypes["Ulong"] = 3] = "Ulong";
    // the property has a byte array value
    CapturePropertyTypes[CapturePropertyTypes["Array"] = 4] = "Array";
    // the property has a string value
    CapturePropertyTypes[CapturePropertyTypes["String"] = 5] = "String";
    // the property has a version structure as value (read only)
    CapturePropertyTypes[CapturePropertyTypes["Version"] = 6] = "Version";
    // the property has a data source structure as value
    CapturePropertyTypes[CapturePropertyTypes["DataSource"] = 7] = "DataSource";
    // the property has an enum value
    CapturePropertyTypes[CapturePropertyTypes["Enum"] = 8] = "Enum";
    // the property has an object as value
    CapturePropertyTypes[CapturePropertyTypes["Object"] = 9] = "Object";
    // the property type should not be equal or higher that kLast otherwise
    // it means the SDK is not in sync with the actual version of Socket
    // Mobile Companion running on the host
    CapturePropertyTypes[CapturePropertyTypes["LastType"] = 10] = "LastType";
})(CapturePropertyTypes || (CapturePropertyTypes = {}));
;


/***/ }),

/***/ "./ts/gen/propertyValues.ts":
/*!**********************************!*\
  !*** ./ts/gen/propertyValues.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BluetoothDiscoveryMode: () => (/* binding */ BluetoothDiscoveryMode),
/* harmony export */   ButtonsState: () => (/* binding */ ButtonsState),
/* harmony export */   ConnectBeepConfig: () => (/* binding */ ConnectBeepConfig),
/* harmony export */   ConnectReason: () => (/* binding */ ConnectReason),
/* harmony export */   Counter: () => (/* binding */ Counter),
/* harmony export */   DataConfirmationBeep: () => (/* binding */ DataConfirmationBeep),
/* harmony export */   DataConfirmationLed: () => (/* binding */ DataConfirmationLed),
/* harmony export */   DataConfirmationMode: () => (/* binding */ DataConfirmationMode),
/* harmony export */   DataConfirmationRumble: () => (/* binding */ DataConfirmationRumble),
/* harmony export */   DataFormat: () => (/* binding */ DataFormat),
/* harmony export */   DecodeLocalActionSelectionMask: () => (/* binding */ DecodeLocalActionSelectionMask),
/* harmony export */   DeletePairing: () => (/* binding */ DeletePairing),
/* harmony export */   DeviceDataAcknowledgment: () => (/* binding */ DeviceDataAcknowledgment),
/* harmony export */   Disconnect: () => (/* binding */ Disconnect),
/* harmony export */   Flash: () => (/* binding */ Flash),
/* harmony export */   LassoDeviceStatus: () => (/* binding */ LassoDeviceStatus),
/* harmony export */   LocalDecodeAction: () => (/* binding */ LocalDecodeAction),
/* harmony export */   MonitorDbg: () => (/* binding */ MonitorDbg),
/* harmony export */   Notifications: () => (/* binding */ Notifications),
/* harmony export */   PowerState: () => (/* binding */ PowerState),
/* harmony export */   ProfileConfig: () => (/* binding */ ProfileConfig),
/* harmony export */   ProfileSelect: () => (/* binding */ ProfileSelect),
/* harmony export */   RumbleActionType: () => (/* binding */ RumbleActionType),
/* harmony export */   SecurityMode: () => (/* binding */ SecurityMode),
/* harmony export */   SinglePartnership: () => (/* binding */ SinglePartnership),
/* harmony export */   SocketCam: () => (/* binding */ SocketCam),
/* harmony export */   SoundActionType: () => (/* binding */ SoundActionType),
/* harmony export */   SoundFrequency: () => (/* binding */ SoundFrequency),
/* harmony export */   StandConfig: () => (/* binding */ StandConfig),
/* harmony export */   StartUpRoleSpp: () => (/* binding */ StartUpRoleSpp),
/* harmony export */   ThemeSelection: () => (/* binding */ ThemeSelection),
/* harmony export */   ThemeSelectionMask: () => (/* binding */ ThemeSelectionMask),
/* harmony export */   Timer: () => (/* binding */ Timer),
/* harmony export */   Trigger: () => (/* binding */ Trigger),
/* harmony export */   TriggerMode: () => (/* binding */ TriggerMode)
/* harmony export */ });
//PropertyValues.ts
//This file is generated when calling npm run update
//
//
// Data Confirmation Mode indicates what is 
// expected to the send the Data ACK back to the scanner
var DataConfirmationMode;
(function (DataConfirmationMode) {
    // use the device configuration (Local Confirmation or App)
    DataConfirmationMode[DataConfirmationMode["ModeOff"] = 0] = "ModeOff";
    // the device confirms the decoded data locally
    DataConfirmationMode[DataConfirmationMode["ModeDevice"] = 1] = "ModeDevice";
    // Capture confirms the decoded data as it receives them and there is one app
    DataConfirmationMode[DataConfirmationMode["ModeCapture"] = 2] = "ModeCapture";
    // the Application confirms the decoded data as it receives them
    DataConfirmationMode[DataConfirmationMode["ModeApp"] = 3] = "ModeApp";
})(DataConfirmationMode || (DataConfirmationMode = {}));
;
// Device Data Acknowledgment mode
var DeviceDataAcknowledgment;
(function (DeviceDataAcknowledgment) {
    // the device won't locally acknowledge decoded data
    DeviceDataAcknowledgment[DeviceDataAcknowledgment["Off"] = 0] = "Off";
    // the device will locally acknowledge decoded data
    DeviceDataAcknowledgment[DeviceDataAcknowledgment["On"] = 1] = "On";
})(DeviceDataAcknowledgment || (DeviceDataAcknowledgment = {}));
;
// Security Mode
var SecurityMode;
(function (SecurityMode) {
    // No security
    SecurityMode[SecurityMode["None"] = 0] = "None";
    // communication protected by authentication
    SecurityMode[SecurityMode["Authentication"] = 1] = "Authentication";
    // communication protected by authentication and encrytion
    SecurityMode[SecurityMode["AuthenticationEncryption"] = 2] = "AuthenticationEncryption";
})(SecurityMode || (SecurityMode = {}));
;
// trigger parameter
var Trigger;
(function (Trigger) {
    // start a read
    Trigger[Trigger["Start"] = 1] = "Start";
    // stop a read
    Trigger[Trigger["Stop"] = 2] = "Stop";
    // enable the trigger
    Trigger[Trigger["Enable"] = 3] = "Enable";
    // disable the trigger
    Trigger[Trigger["Disable"] = 4] = "Disable";
    // start a read in continuous
    Trigger[Trigger["ContinuousScan"] = 5] = "ContinuousScan";
    // start a read in continuous until a code is read
    Trigger[Trigger["ContinuousScanUntilRead"] = 6] = "ContinuousScanUntilRead";
})(Trigger || (Trigger = {}));
;
// Delete the pairing of the device
var DeletePairing;
(function (DeletePairing) {
    // delete the current pairing
    DeletePairing[DeletePairing["Current"] = 0] = "Current";
    // delete all the pairing of the device
    DeletePairing[DeletePairing["All"] = 1] = "All";
})(DeletePairing || (DeletePairing = {}));
;
// sound configuration for the a type of action
var SoundActionType;
(function (SoundActionType) {
    // sound configuration for a good read action
    SoundActionType[SoundActionType["GoodRead"] = 0] = "GoodRead";
    // sound configuration for a good read local action
    SoundActionType[SoundActionType["GoodReadLocal"] = 1] = "GoodReadLocal";
    // sound configuration for a bad read action
    SoundActionType[SoundActionType["BadRead"] = 2] = "BadRead";
    // sound configuration for a bad read local action
    SoundActionType[SoundActionType["BadReadLocal"] = 3] = "BadReadLocal";
})(SoundActionType || (SoundActionType = {}));
;
// Sound frequency configuration
var SoundFrequency;
(function (SoundFrequency) {
    // no frequency
    SoundFrequency[SoundFrequency["None"] = 0] = "None";
    // Low pitch frequency
    SoundFrequency[SoundFrequency["Low"] = 1] = "Low";
    // Medium pitch frequency
    SoundFrequency[SoundFrequency["Medium"] = 2] = "Medium";
    // High pitch frequency
    SoundFrequency[SoundFrequency["High"] = 3] = "High";
})(SoundFrequency || (SoundFrequency = {}));
;
// Rumble configuration for the a type of action
var RumbleActionType;
(function (RumbleActionType) {
    // Rumble configuration for a good read action
    RumbleActionType[RumbleActionType["GoodRead"] = 0] = "GoodRead";
    // Rumble configuration for a good read local action
    RumbleActionType[RumbleActionType["GoodReadLocal"] = 1] = "GoodReadLocal";
    // Rumble configuration for a bad read action
    RumbleActionType[RumbleActionType["BadRead"] = 2] = "BadRead";
    // Rumble configuration for a bad read local action
    RumbleActionType[RumbleActionType["BadReadLocal"] = 3] = "BadReadLocal";
})(RumbleActionType || (RumbleActionType = {}));
;
// Define the action for a local decode
var LocalDecodeAction;
(function (LocalDecodeAction) {
    // no action
    LocalDecodeAction[LocalDecodeAction["None"] = 0] = "None";
    // Beep when a local decode occurs
    LocalDecodeAction[LocalDecodeAction["Beep"] = 1] = "Beep";
    // Flash the LED when a local decode occurs
    LocalDecodeAction[LocalDecodeAction["Flash"] = 2] = "Flash";
    // Rumble when a local decode occurs
    LocalDecodeAction[LocalDecodeAction["Rumble"] = 4] = "Rumble";
})(LocalDecodeAction || (LocalDecodeAction = {}));
;
// Define the LED for data confirmation
var DataConfirmationLed;
(function (DataConfirmationLed) {
    // no LED
    DataConfirmationLed[DataConfirmationLed["None"] = 0] = "None";
    // make the LED flash in green
    DataConfirmationLed[DataConfirmationLed["Green"] = 1] = "Green";
    // make the LED flash in red
    DataConfirmationLed[DataConfirmationLed["Red"] = 2] = "Red";
})(DataConfirmationLed || (DataConfirmationLed = {}));
;
// Define the sound for data confirmation
var DataConfirmationBeep;
(function (DataConfirmationBeep) {
    // no sound
    DataConfirmationBeep[DataConfirmationBeep["None"] = 0] = "None";
    // short beep for success
    DataConfirmationBeep[DataConfirmationBeep["Good"] = 1] = "Good";
    // long beep for failure
    DataConfirmationBeep[DataConfirmationBeep["Bad"] = 2] = "Bad";
})(DataConfirmationBeep || (DataConfirmationBeep = {}));
;
// Define the rumble for data confirmation
var DataConfirmationRumble;
(function (DataConfirmationRumble) {
    // no sound
    DataConfirmationRumble[DataConfirmationRumble["None"] = 0] = "None";
    // short rumble for success
    DataConfirmationRumble[DataConfirmationRumble["Good"] = 1] = "Good";
    // long rumble for failure
    DataConfirmationRumble[DataConfirmationRumble["Bad"] = 2] = "Bad";
})(DataConfirmationRumble || (DataConfirmationRumble = {}));
;
// Define the flash setting
var Flash;
(function (Flash) {
    // turn off the flash
    Flash[Flash["Off"] = 0] = "Off";
    // turn on the flash
    Flash[Flash["On"] = 1] = "On";
})(Flash || (Flash = {}));
;
// Define the SocketCam experience
var SocketCam;
(function (SocketCam) {
    // Enable SocketCam
    SocketCam[SocketCam["Enable"] = 0] = "Enable";
    // Disable SocketCam
    SocketCam[SocketCam["Disable"] = 1] = "Disable";
    // SocketCam is not supported, and cannot be enabled
    SocketCam[SocketCam["NotSupported"] = 2] = "NotSupported";
})(SocketCam || (SocketCam = {}));
;
// Define the possible power states
var PowerState;
(function (PowerState) {
    // The power state is unknown
    PowerState[PowerState["Unknown"] = 0] = "Unknown";
    // The power state is on battery
    PowerState[PowerState["OnBattery"] = 1] = "OnBattery";
    // The power state is on cradle
    PowerState[PowerState["OnCradle"] = 2] = "OnCradle";
    // The power state in on AC
    PowerState[PowerState["OnAc"] = 4] = "OnAc";
})(PowerState || (PowerState = {}));
;
// Define the monitor feature (DEBUG build only)
var MonitorDbg;
(function (MonitorDbg) {
    // define the level for the debug traces
    MonitorDbg[MonitorDbg["Level"] = 1] = "Level";
    // define the output channel for the debug traces
    MonitorDbg[MonitorDbg["Channel"] = 2] = "Channel";
    // define the number of lines in the file
    MonitorDbg[MonitorDbg["FileLineLevel"] = 3] = "FileLineLevel";
})(MonitorDbg || (MonitorDbg = {}));
;
// identifiers for the statistic counters
var Counter;
(function (Counter) {
    // use for convenience only to skip a counter
    Counter[Counter["Skip"] = -1] = "Skip";
    // unknow counter
    Counter[Counter["Unknown"] = 0] = "Unknown";
    // number of connections
    Counter[Counter["Connect"] = 1] = "Connect";
    // number of disconnections
    Counter[Counter["Disconnect"] = 2] = "Disconnect";
    // number of unbound operation
    Counter[Counter["Unbound"] = 3] = "Unbound";
    // number of reset to factory default
    Counter[Counter["FactoryReset"] = 4] = "FactoryReset";
    // number of reads (scans)
    Counter[Counter["Reads"] = 5] = "Reads";
    // number of trigger button released
    Counter[Counter["TriggerButtonUp"] = 6] = "TriggerButtonUp";
    // number of trigger button pressed
    Counter[Counter["TriggerButtonDown"] = 7] = "TriggerButtonDown";
    // number of power button released
    Counter[Counter["PowerButtonUp"] = 8] = "PowerButtonUp";
    // number of power button pressed
    Counter[Counter["PowerButtonDown"] = 9] = "PowerButtonDown";
    // number of minutes in AC power
    Counter[Counter["OnAcTimeInMinutes"] = 10] = "OnAcTimeInMinutes";
    // number of minutes on battery
    Counter[Counter["OnBatTimeInMinutes"] = 11] = "OnBatTimeInMinutes";
    // number of RFCOMM sent (SSI only)
    Counter[Counter["RfcommSend"] = 12] = "RfcommSend";
    // number of RFCOMM received (SSI only)
    Counter[Counter["RfcommReceive"] = 13] = "RfcommReceive";
    // number of RFCOMM discarded (SSI only)
    Counter[Counter["RfcommReceiveDiscarded"] = 14] = "RfcommReceiveDiscarded";
    // number of UART sent (SSI only)
    Counter[Counter["UartSend"] = 15] = "UartSend";
    // number of UART received (SSI only)
    Counter[Counter["UartReceive"] = 16] = "UartReceive";
    // number of UART discarded (SSI only)
    Counter[Counter["UartReceiveDiscarded"] = 17] = "UartReceiveDiscarded";
    // number of left button press (CRS only)
    Counter[Counter["ButtonLeftPress"] = 18] = "ButtonLeftPress";
    // number of left button release (CRS only)
    Counter[Counter["ButtonLeftRelease"] = 19] = "ButtonLeftRelease";
    // number of right button press (CRS only)
    Counter[Counter["ButtonRightPress"] = 20] = "ButtonRightPress";
    // number of right button release (CRS only)
    Counter[Counter["ButtonRightRelease"] = 21] = "ButtonRightRelease";
    // number of ring unit detach (CRS only)
    Counter[Counter["RingUnitDetach"] = 22] = "RingUnitDetach";
    // number of ring unit attach (CRS only)
    Counter[Counter["RingUnitAttach"] = 23] = "RingUnitAttach";
    // number of decoded bytes (7x only ISCI)
    Counter[Counter["DecodedBytes"] = 24] = "DecodedBytes";
    // number of abnormal shutdowns (7x only ISCI)
    Counter[Counter["AbnormalShutdowns"] = 25] = "AbnormalShutdowns";
    // number of battery charge cycles (7x only ISCI)
    Counter[Counter["BatteryChargeCycles"] = 26] = "BatteryChargeCycles";
    // number of battery charge count (7x only ISCI)
    Counter[Counter["BatteryChargeCount"] = 27] = "BatteryChargeCount";
    // number of power on (only 8Ci)
    Counter[Counter["PowerOn"] = 28] = "PowerOn";
    // number of power off (only 8Ci)
    Counter[Counter["PowerOff"] = 29] = "PowerOff";
    // number of stand mode change (only 7X/Q 7630 and higher)
    Counter[Counter["StandModeChange"] = 30] = "StandModeChange";
})(Counter || (Counter = {}));
;
// Disconnect parameters to instruct the device what to do after disconnection
var Disconnect;
(function (Disconnect) {
    // disconnect and then start the current profile
    Disconnect[Disconnect["StartProfile"] = 0] = "StartProfile";
    // Disconnect and disable radio (low power)
    Disconnect[Disconnect["DisableRadio"] = 1] = "DisableRadio";
    // Disconnect a device and make it available for a new connection (for Bluetooth Low Energy device)
    Disconnect[Disconnect["MakeAvailable"] = 2] = "MakeAvailable";
})(Disconnect || (Disconnect = {}));
;
// Select a profile for the device (None, SPP, HID, Reader, Coupler)
var ProfileSelect;
(function (ProfileSelect) {
    // The device is in acceptor mode, not trying to connect to any host
    ProfileSelect[ProfileSelect["None"] = 0] = "None";
    // The device is in App mode
    ProfileSelect[ProfileSelect["Spp"] = 1] = "Spp";
    // The device is in Basic mode, sometimes referred as Keyboard emulation
    ProfileSelect[ProfileSelect["Hid"] = 2] = "Hid";
    // The device is in Reader mode, for NFC devices
    ProfileSelect[ProfileSelect["Reader"] = 3] = "Reader";
    // The device is in Coupler mode, for NFC devices
    ProfileSelect[ProfileSelect["Coupler"] = 4] = "Coupler";
})(ProfileSelect || (ProfileSelect = {}));
;
// Configure a profile for the device (None, Acceptor, Initiator)
var ProfileConfig;
(function (ProfileConfig) {
    // The device is in either acceptor or initiator mode, meaning not even discoverable
    ProfileConfig[ProfileConfig["None"] = 0] = "None";
    // The device is discoverable and will accept any connection
    ProfileConfig[ProfileConfig["Acceptor"] = 1] = "Acceptor";
    // The device initiates a connection to the Bluetooth address specified in the Profile Configuration
    ProfileConfig[ProfileConfig["Initiator"] = 2] = "Initiator";
})(ProfileConfig || (ProfileConfig = {}));
;
// Configuration masks for selecting the notifications the device should send to the host
var Notifications;
(function (Notifications) {
    // The device sends a notification when the trigger button is pressed
    Notifications[Notifications["TriggerButtonPress"] = 1] = "TriggerButtonPress";
    // The device sends a notification when the trigger button is released
    Notifications[Notifications["TriggerButtonRelease"] = 2] = "TriggerButtonRelease";
    // The device sends a notification when the power button is pressed
    Notifications[Notifications["PowerButtonPress"] = 4] = "PowerButtonPress";
    // The device sends a notification when the power button is released
    Notifications[Notifications["PowerButtonRelease"] = 8] = "PowerButtonRelease";
    // The device sends a notification when the power state changes (battery to AC or vice-versa) (not supported on all device)
    Notifications[Notifications["PowerState"] = 16] = "PowerState";
    // The device sends a notification when the battery level changed (not supported on all device)
    Notifications[Notifications["BatteryLevelChange"] = 32] = "BatteryLevelChange";
})(Notifications || (Notifications = {}));
;
// Identifies the timers used in the device, (trigger lock, disconnected, connected)
var Timer;
(function (Timer) {
    // The trigger button stays ineffective for the specified amount of time 
    // or until the device receives a data confirmation command.
    Timer[Timer["AutoLock"] = 1] = "AutoLock";
    // This timer specifies the amount of time the device stays on while it is not connected to any host.
    Timer[Timer["PowerOffDisconnected"] = 2] = "PowerOffDisconnected";
    // This timer specifies the amount of time the device stays on while it is connected to a host.
    Timer[Timer["PowerOffConnected"] = 4] = "PowerOffConnected";
})(Timer || (Timer = {}));
;
// Identifies the data format the device should send the data to the host
var DataFormat;
(function (DataFormat) {
    // The device sends the data without any protocol overhead
    DataFormat[DataFormat["Raw"] = 0] = "Raw";
    // The device sends the data embedded in a protocol packet (default)
    DataFormat[DataFormat["Packet"] = 1] = "Packet";
    // The device sends only the RFID tag ID, (valid only for D600 NFC devices)
    DataFormat[DataFormat["IdOnly"] = 2] = "IdOnly";
    // The device sends the tag type and RFID tag ID, (valid only for D600 NFC devices)
    DataFormat[DataFormat["TagTypeAndId"] = 10] = "TagTypeAndId";
    // The device sends only the tag data, (valid only for D600 NFC devices)
    DataFormat[DataFormat["DataOnly"] = 4] = "DataOnly";
    // The device sends the tag type and the tag data, (valid only for D600 NFC devices)
    DataFormat[DataFormat["TagTypeAndData"] = 12] = "TagTypeAndData";
})(DataFormat || (DataFormat = {}));
;
// defines the operational mode of the device
var TriggerMode;
(function (TriggerMode) {
    // The device triggers a read only by pressing the trigger button
    TriggerMode[TriggerMode["LocalOnly"] = 1] = "LocalOnly";
    // The device triggers a read by pressing the trigger button or by receiving the trigger command
    TriggerMode[TriggerMode["RemoteAndLocal"] = 2] = "RemoteAndLocal";
    // the device waits for the host to unlock the trigger
    TriggerMode[TriggerMode["AutoLock"] = 3] = "AutoLock";
    // the device locks and unlocks the trigger locally (default)
    TriggerMode[TriggerMode["NormalLock"] = 4] = "NormalLock";
    // The device triggers a read automatically without user intervention
    TriggerMode[TriggerMode["Presentation"] = 5] = "Presentation";
})(TriggerMode || (TriggerMode = {}));
;
// defines the reason as of how the device connects to the host
var ConnectReason;
(function (ConnectReason) {
    // The device connects to the host from unknown reason
    ConnectReason[ConnectReason["Unknown"] = 0] = "Unknown";
    // The device connects to the host just after power on
    ConnectReason[ConnectReason["PowerOn"] = 1] = "PowerOn";
    // The device connects to the host by reading the host address from a barcode
    ConnectReason[ConnectReason["Barcode"] = 2] = "Barcode";
    // The device connects to the host by user action (usually a press on the trigger button)
    ConnectReason[ConnectReason["UserAction"] = 3] = "UserAction";
    // The device connects to the host from a change of the host address in the profile configuration
    ConnectReason[ConnectReason["HostChange"] = 4] = "HostChange";
    // The device connects to the host after a retry (device coming back to the radio range)
    ConnectReason[ConnectReason["Retry"] = 5] = "Retry";
})(ConnectReason || (ConnectReason = {}));
;
// The start up role SPP defines the start up role when using the SPP profile.
var StartUpRoleSpp;
(function (StartUpRoleSpp) {
    // The device returns to acceptor mode, not initiating a connection to a host.
    StartUpRoleSpp[StartUpRoleSpp["Acceptor"] = 0] = "Acceptor";
    // The device uses the last role configuration upon startup.
    StartUpRoleSpp[StartUpRoleSpp["LastRole"] = 1] = "LastRole";
})(StartUpRoleSpp || (StartUpRoleSpp = {}));
;
// The connect beep configuration allows to turn off or on the connection beep when the scanner connects
var ConnectBeepConfig;
(function (ConnectBeepConfig) {
    // The device won't beep upon connection to a host.
    ConnectBeepConfig[ConnectBeepConfig["NoBeep"] = 0] = "NoBeep";
    // The device beeps when connecting to the host.
    ConnectBeepConfig[ConnectBeepConfig["Beep"] = 1] = "Beep";
})(ConnectBeepConfig || (ConnectBeepConfig = {}));
;
// The stand configuration defines the operational mode of the device when used with a stand.
var StandConfig;
(function (StandConfig) {
    // Bluetooth Classic:
    // Disabled the stand config property and sets the scanner as it is intended
    // Bluetooth LE:
    // Scanner does not switch to presentation mode
    StandConfig[StandConfig["Disabled"] = 0] = "Disabled";
    // Bluetooth Classic:
    // Mobile mode Works like today existing firmware Engine is always in trigger mode Engine hibernate enabled
    // Bluetooth LE:
    // Identical to disabled mode
    StandConfig[StandConfig["MobileMode"] = 1] = "MobileMode";
    // Bluetooth Classic:
    // Stand mode Engine always in presentation mode Engine hibernate
    // disabled Scanner turns on immediately Power timers disabled Connection retries forever
    // Bluetooth LE:
    // The device switches to presentation mode, always, in or out of the stand,
    StandConfig[StandConfig["StandMode"] = 2] = "StandMode";
    // Bluetooth Classic:
    // Detect mode On stand engine in presentation mode On stand engine
    // hibernate disabled On stand charging led state not show On stand
    // scanner turns on immediately On stand power timers disabled On stand
    // connection retries forever Off stand engine in level mode Off stand
    // battery led state reported Off stand engine hibernate enabled Off stand
    // power off timers running Off stand connection retries halt after max count
    // Bluetooth LE:
    // The device switches in or out of presentation mode when it's in or out respectively from the stand
    StandConfig[StandConfig["DetectMode"] = 3] = "DetectMode";
    // Bluetooth Classic:
    // Auto mode On stand engine in presentation mode On stand engine hibernate
    // disabled On stand charging led state not show On stand scanner turns on
    // immediately On stand power timers disabled On stand connection retries
    // forever Off stand does nothing, engine remains in presentation mode Off
    // stand trigger press causes engine to enter level mode Engine in level
    // mode battery led state reported Engine in level mode hibernate enabled
    // Engine in level mode power off timers running Engine in level mode
    // connection retries halt after max count
    // Bluetooth LE:
    // Same as DetectMode, but if you use the trigger button while it's out of the stand it switches to a normal trigger operation until it returns to the stand in which it switches to presentation mode.
    // If it is removed from the stand it stays in presentation mode until the trigger is pressed at least once.
    StandConfig[StandConfig["AutoMode"] = 4] = "AutoMode";
})(StandConfig || (StandConfig = {}));
;
// The mask to apply for each button that is pressed
var ButtonsState;
(function (ButtonsState) {
    // The left button is pressed.
    ButtonsState[ButtonsState["Left"] = 1] = "Left";
    // The right button is pressed.
    ButtonsState[ButtonsState["Right"] = 2] = "Right";
    // The middle button is pressed.
    ButtonsState[ButtonsState["Middle"] = 4] = "Middle";
    // The power button is pressed.
    ButtonsState[ButtonsState["Power"] = 8] = "Power";
    // The Ring is detached from the wrist unit.
    ButtonsState[ButtonsState["RingDetach"] = 16] = "RingDetach";
})(ButtonsState || (ButtonsState = {}));
;
// The mask to apply for each theme
var ThemeSelection;
(function (ThemeSelection) {
    // No theme.
    ThemeSelection[ThemeSelection["None"] = 0] = "None";
    // The Health theme.
    ThemeSelection[ThemeSelection["Health"] = 1] = "Health";
    // The Access theme.
    ThemeSelection[ThemeSelection["Access"] = 2] = "Access";
    // The Value theme.
    ThemeSelection[ThemeSelection["Value"] = 3] = "Value";
    // The Membership theme.
    ThemeSelection[ThemeSelection["Membership"] = 4] = "Membership";
})(ThemeSelection || (ThemeSelection = {}));
;
// Mask for the Theme selection property. It applies the theme selection on the given device(s) set with the mask
var ThemeSelectionMask;
(function (ThemeSelectionMask) {
    // Mask applied on the Default device
    ThemeSelectionMask[ThemeSelectionMask["Default"] = 1] = "Default";
    // Mask applied on the Nfc device
    ThemeSelectionMask[ThemeSelectionMask["Nfc"] = 2] = "Nfc";
    // Mask applied on the Default and Nfc devices
    ThemeSelectionMask[ThemeSelectionMask["DefaultNfc"] = 3] = "DefaultNfc";
    // Mask applied on the Barcode device
    ThemeSelectionMask[ThemeSelectionMask["Barcode"] = 4] = "Barcode";
    // Mask applied on the Default and Barcode devices
    ThemeSelectionMask[ThemeSelectionMask["DefaultBarcode"] = 5] = "DefaultBarcode";
    // Mask applied on the Nfc and Barcode devices
    ThemeSelectionMask[ThemeSelectionMask["NfcBarcode"] = 6] = "NfcBarcode";
    // Mask applied on the Default, Nfc and Barcode devices
    ThemeSelectionMask[ThemeSelectionMask["All"] = 7] = "All";
})(ThemeSelectionMask || (ThemeSelectionMask = {}));
;
// Define the Lasso experience
var LassoDeviceStatus;
(function (LassoDeviceStatus) {
    // Disable Lasso
    LassoDeviceStatus[LassoDeviceStatus["Disable"] = 0] = "Disable";
    // Enable Lasso
    LassoDeviceStatus[LassoDeviceStatus["Enable"] = 1] = "Enable";
})(LassoDeviceStatus || (LassoDeviceStatus = {}));
;
// Define the Single Partnership experience
var SinglePartnership;
(function (SinglePartnership) {
    // Disable Single Partnership
    SinglePartnership[SinglePartnership["Disable"] = 0] = "Disable";
    // Get a Single Partnership through our Web API
    SinglePartnership[SinglePartnership["WebApi"] = 1] = "WebApi";
    // Show a Single Partnership QRcode through our Web UI
    SinglePartnership[SinglePartnership["WebUI"] = 2] = "WebUI";
    // Set your own Service UUID for a Single Partnership
    SinglePartnership[SinglePartnership["Uuid"] = 3] = "Uuid";
    // Show a Single Partnership Web UI where you can input information about the device
    SinglePartnership[SinglePartnership["WebUIPrompt"] = 4] = "WebUIPrompt";
    // Set your own Device Id that will return a Single Partnership Web page with a QRcode to scan
    SinglePartnership[SinglePartnership["DeviceId"] = 5] = "DeviceId";
})(SinglePartnership || (SinglePartnership = {}));
;
// The Bluetooth technology used to make a discovery of devices in the vicinity
var BluetoothDiscoveryMode;
(function (BluetoothDiscoveryMode) {
    // Discovery for Bluetooth LE devices such as S550, S370, S320, S721.
    BluetoothDiscoveryMode[BluetoothDiscoveryMode["BluetoothLowEnergy"] = 1] = "BluetoothLowEnergy";
    // Discovery for Bluetooth Classic devices.
    BluetoothDiscoveryMode[BluetoothDiscoveryMode["BluetoothClassic"] = 2] = "BluetoothClassic";
})(BluetoothDiscoveryMode || (BluetoothDiscoveryMode = {}));
;
// Mask for the Decode Local Action selection property. It applies the decode local action selection on the given device(s) set with the mask
var DecodeLocalActionSelectionMask;
(function (DecodeLocalActionSelectionMask) {
    // Mask applied on the Good local decode action result
    DecodeLocalActionSelectionMask[DecodeLocalActionSelectionMask["Good"] = 1] = "Good";
    // Mask applied on the Bad local decode action result
    DecodeLocalActionSelectionMask[DecodeLocalActionSelectionMask["Bad"] = 2] = "Bad";
})(DecodeLocalActionSelectionMask || (DecodeLocalActionSelectionMask = {}));
;


/***/ }),

/***/ "./ts/httpTransport.ts":
/*!*****************************!*\
  !*** ./ts/httpTransport.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ajax: () => (/* binding */ Ajax),
/* harmony export */   "default": () => (/* binding */ HttpTransport)
/* harmony export */ });
/* harmony import */ var _jsonRpc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./jsonRpc */ "./ts/jsonRpc.ts");
/* harmony import */ var _rpcTransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rpcTransport */ "./ts/rpcTransport.ts");
/* harmony import */ var _gen_errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gen/errors */ "./ts/gen/errors.ts");
/* harmony import */ var _gen_eventIds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gen/eventIds */ "./ts/gen/eventIds.ts");




// below is to switch between xhr (if provided in options) or keep it as XMLHttpRequest
// let HttpRequest = xhr || XMLHttpRequest 
let HttpRequest = XMLHttpRequest;
class Ajax extends HttpRequest {
    constructor() {
        super();
    }
}
function sktGetXmlHttp(uri, logger, callback) {
    var xmlhttp;
    /* code for IE7+, Firefox, Chrome, Opera, Safari */
    if (window.XMLHttpRequest) {
        xmlhttp = new Ajax();
    }
    /* code for IE6, IE5 */
    // else {
    //   xmlhttp = new AjaxIE<T>('Microsoft.XMLHTTP');
    // }
    //https://stackoverflow.com/questions/41474445/xmlhttprequest-does-not-exist-on-type-window
    // if ((<any>window).XMLHttpRequest) {
    //   xmlhttp = new XMLHttpRequest();
    // } else {
    //   xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    // }
    xmlhttp = new Ajax();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            try {
                const jsonRpc = JSON.parse(xmlhttp.responseText);
                logger.log('<=', jsonRpc);
                callback(xmlhttp.status, xmlhttp.responseText);
            }
            catch (e) {
                callback(xmlhttp.status, JSON.stringify({ error: _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_COMMUNICATIONERROR, message: 'Did not receive a JSON object' }));
            }
        }
    };
    xmlhttp.sendJsonRpc = function (jsonRpc) {
        const jsonRpcString = JSON.stringify(jsonRpc);
        xmlhttp.open('POST', uri, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.send(jsonRpcString);
        logger.log('=>', jsonRpc);
    };
    return xmlhttp;
}
class InternalLogger {
    log(message, arg) {
    }
}
class HttpTransport extends _rpcTransport__WEBPACK_IMPORTED_MODULE_1__.BaseTransport {
    constructor(logger, xhr) {
        super();
        this.getXmlRequest = sktGetXmlHttp;
        this.logger = logger || new InternalLogger();
        this.xhr = xhr;
    }
    open(host, notification) {
        const newHandle = this.generateHandle();
        if (newHandle === 0) {
            const error = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcError(0, _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_INVALIDHANDLE, 'Invalid Handle');
            return Promise.reject(error);
        }
        this.host = host + '/Capture/v1/api';
        this.hostWebsocket = this.host.replace(/^https?:/, 'ws:');
        this.notification = notification;
        return Promise.resolve({ handle: newHandle });
    }
    close(handle) {
        const index = this.handles.findIndex(h => h.handle === handle);
        if (index === -1) {
            const error = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcError(0, _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_INVALIDHANDLE, 'Invalid Handle');
            return Promise.reject(error);
        }
        this.handles.splice(index, 1);
        return Promise.resolve(_gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_NOERROR);
    }
    send(handle, request) {
        const promise = new Promise((resolve, reject) => {
            const ajax = this.getXmlRequest(this.host, this.logger, (status, responseStr) => {
                if (status !== 200) {
                    let error = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcError(request.id, _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_COMMUNICATIONERROR, 'Unable To Communicate With Device');
                    // var error = new JRpcError(request.id, -10000, 'bloop')
                    if (request.method === 'openclient') {
                        error = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcError(request.id, _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_UNABLEOPENDEVICE, 'Unable To Open Device');
                    }
                    return reject(error);
                }
                try {
                    const response = JSON.parse(responseStr);
                    if (request.method === 'openclient') {
                        // we want to start the web service here if we can
                        this.openWebSocket(() => {
                            const res = response;
                            // send a waitForEvent
                            if (res.result && res.result.handle) {
                                const waitForEvent = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcRequest(1, 'waitforcaptureevent', { handle: res.result.handle });
                                const waitForEventString = JSON.stringify(waitForEvent);
                                this.websocket.send(waitForEventString);
                            }
                        });
                    }
                    return response.error ? reject(response) : resolve(response);
                }
                catch (e) {
                    const err = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcError(request.id, _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_INVALIDFORMAT, 'JSON Malformatted');
                    return reject(err);
                }
            });
            const index = this.handles.findIndex(h => h.handle === handle);
            if (index === -1) {
                return reject(_gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_INVALIDHANDLE);
            }
            ajax.sendJsonRpc(request);
        });
        return promise;
    }
    openWebSocket(callback) {
        const that = this;
        this.websocket = new WebSocket(this.hostWebsocket); //, 'jsonRpc');
        this.websocket.onopen = callback;
        this.websocket.onclose = event => {
            this.logger.log('websocket closed!!');
            this.logger.log('', event);
            if (event.code === 1006) {
                const error = new _jsonRpc__WEBPACK_IMPORTED_MODULE_0__.JRpcEvent(_gen_eventIds__WEBPACK_IMPORTED_MODULE_3__.CaptureEventIds.Error, _gen_eventIds__WEBPACK_IMPORTED_MODULE_3__.CaptureEventTypes.Ulong, _gen_errors__WEBPACK_IMPORTED_MODULE_2__["default"].ESKT_SERVICENOTCOMMUNICATING);
                that.notification(error);
            }
        };
        this.websocket.onmessage = (event) => {
            this.logger.log('receiving something through the websocket:');
            var json = JSON.parse(event.data);
            this.logger.log('', event);
            if (json.result) {
                if (json.result) {
                    const evt = json;
                    this.notification(evt);
                }
            }
            else if (json.error) {
                // const event = new JRpcEvent<{}>
                // this.notification(capture, json.error.code, json.error.message);
            }
        };
    }
}


/***/ }),

/***/ "./ts/jsonRpc.ts":
/*!***********************!*\
  !*** ./ts/jsonRpc.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CaptureEventResult: () => (/* binding */ CaptureEventResult),
/* harmony export */   JRpcError: () => (/* binding */ JRpcError),
/* harmony export */   JRpcEvent: () => (/* binding */ JRpcEvent),
/* harmony export */   JRpcEventDevicePresence: () => (/* binding */ JRpcEventDevicePresence),
/* harmony export */   JRpcEventDiscoveredDevice: () => (/* binding */ JRpcEventDiscoveredDevice),
/* harmony export */   JRpcRequest: () => (/* binding */ JRpcRequest),
/* harmony export */   JRpcResponse: () => (/* binding */ JRpcResponse),
/* harmony export */   JsonRpc: () => (/* binding */ JsonRpc)
/* harmony export */ });
/* harmony import */ var _captureEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./captureEvents */ "./ts/captureEvents.ts");
/* harmony import */ var _gen_eventIds__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gen/eventIds */ "./ts/gen/eventIds.ts");


class JsonRpc {
    constructor(id) {
        this.jsonrpc = '2.0';
        this.id = 0;
        this.id = id;
    }
}
;
// {
//     "jsonrpc": "2.0",
//     "result": {
//         "handle": 0,
//         "event": {
//             "id": 1,
//             "type": 6,
//             "value": {
//                 "guid": "{2EAAAA3F-B51E-4537-851C-31CA683C3BEF}",
//                 "name": "Socket D740 [E537BA]",
//                 "type": 196619
//             },
//             result: 0
//         }
//     }
// }
class CaptureEventResult {
    constructor(id, type, result, value, handle) {
        this.event = new _captureEvents__WEBPACK_IMPORTED_MODULE_0__.CaptureEvent(id, type, result, value);
        if (handle) {
            this.handle = handle;
        }
    }
}
class JRpcEvent {
    constructor(id, type, value, handle) {
        this.jsonrpc = '2.0';
        // set result to error code if present in the value. Otherwise default to 0.
        let res = id === _gen_eventIds__WEBPACK_IMPORTED_MODULE_1__.CaptureEventIds.Error ? value : 0;
        this.result = new CaptureEventResult(id, type, res, value, handle);
    }
}
;
class JRpcEventDevicePresence extends JRpcEvent {
    constructor(id, deviceInfo, handle) {
        super(id, _gen_eventIds__WEBPACK_IMPORTED_MODULE_1__.CaptureEventTypes.DeviceInfo, deviceInfo, handle);
    }
}
;
class JRpcEventDiscoveredDevice extends JRpcEvent {
    constructor(id, discoveredDeviceInfo) {
        super(id, _gen_eventIds__WEBPACK_IMPORTED_MODULE_1__.CaptureEventTypes.Object, discoveredDeviceInfo);
    }
}
;
class JRpcRequest extends JsonRpc {
    constructor(id, method, params) {
        super(id);
        this.method = method;
        if (params && params !== null) {
            this.params = params;
        }
    }
}
;
class JRpcResponse extends JsonRpc {
    constructor(id, response) {
        super(id);
        this.result = response;
    }
}
;
class JRpcError extends JsonRpc {
    constructor(id, code, message) {
        super(id);
        this.error = { code, message };
    }
}
;


/***/ }),

/***/ "./ts/maracaTransport.ts":
/*!*******************************!*\
  !*** ./ts/maracaTransport.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MaracaTransport)
/* harmony export */ });
/* harmony import */ var _rpcTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rpcTransport */ "./ts/rpcTransport.ts");
/* harmony import */ var _gen_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gen/errors */ "./ts/gen/errors.ts");


;
class InternalLogger {
    log(message, arg) {
    }
}
class MaracaTransport extends _rpcTransport__WEBPACK_IMPORTED_MODULE_0__.BaseTransport {
    constructor(depwindow, logger) {
        super();
        this.responses = [];
        this.logger = logger || new InternalLogger();
        if (depwindow) {
            this.window = depwindow;
        }
        else {
            this.window = window;
        }
        this.window.maraca = this.window.maraca || {
            receiveJsonRpc: (json) => void {},
            replyJsonRpc: (json) => void {},
        };
    }
    open(host, notification) {
        // WE SHOULD USE SYMBOL FOR THE KEY (HANDLE) TO IDENTIFY A TRANSPORT CLIENT
        // AND FOR THE RESPONSE CALLBACKS
        //     sendJsonRpc(jsonRpc, responseCallback)
        //      callbacks[jsonRpc.id] = responseCallback;
        //      window.webkit.messageHandlers.maracaSendJsonRpc.postMessage(jsonRpc)
        //
        //      window.maraca.replyJsonRpc(jsonRpcResponse)
        //      responseCallback = callbacks[jsonRpcResponse.id]
        // responseCallback(jsonRpcResponse)
        //
        //      window.maraca.receiveJsonRpc(jsonRpcEvent)
        // OnCaptureEvent(jsonRpcEvent)
        const newHandle = this.generateHandle();
        if (newHandle === 0) {
            return Promise.reject(_gen_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ESKT_INVALIDHANDLE);
        }
        this.window.maraca.receiveJsonRpc = (json) => {
            try {
                const jsonRpcDecoded = decodeURI(json);
                const jsonRpc = JSON.parse(jsonRpcDecoded);
                notification(jsonRpc);
            }
            catch (ex) {
                // should we log a warning here???
            }
        };
        this.window.maraca.replyJsonRpc = (json) => {
            const decodedJsonRpc = decodeURI(json);
            this.dispatchResponse(decodedJsonRpc);
        };
        return Promise.resolve({ handle: newHandle });
    }
    close(handle) {
        const index = this.handles.findIndex(h => h.handle === handle);
        if (index === -1) {
            return Promise.reject(_gen_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ESKT_INVALIDHANDLE);
        }
        this.handles.splice(index, 1);
        return Promise.resolve(_gen_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ESKT_NOERROR);
    }
    send(handle, request) {
        const jsonRpc = JSON.stringify(request);
        const promise = new Promise((resolve, reject) => {
            const response = {
                rpcId: request.id,
                responseCallback: (jsonRpcResponse) => {
                    resolve(jsonRpcResponse);
                }
            };
            const index = this.handles.findIndex(h => h.handle === handle);
            if (index === -1) {
                return reject(_gen_errors__WEBPACK_IMPORTED_MODULE_1__["default"].ESKT_INVALIDHANDLE);
            }
            this.responses.push(response);
            this.window.webkit.messageHandlers.maracaSendJsonRpc.postMessage(jsonRpc);
        });
        return promise;
    }
    dispatchResponse(jsonrpc) {
        try {
            const jsonRpc = JSON.parse(jsonrpc);
            // look for the corresponding callback
            const index = this.responses.findIndex(rpr => rpr.rpcId === jsonRpc.id);
            if (index !== -1) {
                const callback = this.responses[index];
                this.responses.splice(index, 1);
                callback.responseCallback(jsonRpc);
            }
            else {
                // should we log a warning here???
            }
        }
        catch (ex) {
            // should we log the exception here???
        }
    }
}


/***/ }),

/***/ "./ts/rpcTransport.ts":
/*!****************************!*\
  !*** ./ts/rpcTransport.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   BaseTransport: () => (/* binding */ BaseTransport)
/* harmony export */ });
// RPC Transport
//
// Interface for a transport layer used by CaptureJS
//
//  (c) 2019 Socket Mobile, Inc. All rights reserved
class BaseTransport {
    constructor() {
        this.handles = [];
    }
    generateHandle() {
        let newHandle;
        while (1) {
            newHandle = Math.floor(Math.random() * 100) + 1;
            if (this.handles.length === 0) {
                this.handles.push({ handle: newHandle });
                return newHandle;
            }
            if (this.handles.every(h => h.handle !== newHandle)) {
                this.handles.push({ handle: newHandle });
                return newHandle;
            }
        }
        return 0;
    }
}


/***/ }),

/***/ "./ts/transport.ts":
/*!*************************!*\
  !*** ./ts/transport.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Transport)
/* harmony export */ });
/* harmony import */ var _httpTransport__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./httpTransport */ "./ts/httpTransport.ts");
/* harmony import */ var _maracaTransport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./maracaTransport */ "./ts/maracaTransport.ts");


class Transport {
    static getTransport(logger, xhr) {
        let transport;
        if ((window.webkit) &&
            (window.webkit.messageHandlers) &&
            (window.webkit.messageHandlers.maracaSendJsonRpc)) {
            transport = new _maracaTransport__WEBPACK_IMPORTED_MODULE_1__["default"](null, logger);
        }
        else {
            transport = new _httpTransport__WEBPACK_IMPORTED_MODULE_0__["default"](logger, xhr);
        }
        return transport;
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./ts/index.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Capture: () => (/* reexport safe */ _capture__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   CaptureDataSourceFlags: () => (/* reexport safe */ _gen_dataSources__WEBPACK_IMPORTED_MODULE_8__.CaptureDataSourceFlags),
/* harmony export */   CaptureDataSourceID: () => (/* reexport safe */ _gen_dataSources__WEBPACK_IMPORTED_MODULE_8__.CaptureDataSourceID),
/* harmony export */   CaptureDataSourceStatus: () => (/* reexport safe */ _gen_dataSources__WEBPACK_IMPORTED_MODULE_8__.CaptureDataSourceStatus),
/* harmony export */   CaptureDeviceType: () => (/* reexport safe */ _gen_deviceTypes__WEBPACK_IMPORTED_MODULE_7__.CaptureDeviceType),
/* harmony export */   CaptureEvent: () => (/* reexport safe */ _captureEvents__WEBPACK_IMPORTED_MODULE_6__.CaptureEvent),
/* harmony export */   CaptureEventIds: () => (/* reexport safe */ _gen_eventIds__WEBPACK_IMPORTED_MODULE_5__.CaptureEventIds),
/* harmony export */   CaptureEventTypes: () => (/* reexport safe */ _gen_eventIds__WEBPACK_IMPORTED_MODULE_5__.CaptureEventTypes),
/* harmony export */   CaptureProperty: () => (/* reexport safe */ _captureProperty__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   CapturePropertyIds: () => (/* reexport safe */ _gen_propertyIdsTypes__WEBPACK_IMPORTED_MODULE_2__.CapturePropertyIds),
/* harmony export */   CapturePropertyTypes: () => (/* reexport safe */ _gen_propertyIdsTypes__WEBPACK_IMPORTED_MODULE_2__.CapturePropertyTypes),
/* harmony export */   ConnectBeepConfig: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.ConnectBeepConfig),
/* harmony export */   ConnectReason: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.ConnectReason),
/* harmony export */   Counter: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.Counter),
/* harmony export */   DataConfirmationBeep: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DataConfirmationBeep),
/* harmony export */   DataConfirmationLed: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DataConfirmationLed),
/* harmony export */   DataConfirmationMode: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DataConfirmationMode),
/* harmony export */   DataConfirmationRumble: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DataConfirmationRumble),
/* harmony export */   DataFormat: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DataFormat),
/* harmony export */   DeletePairing: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DeletePairing),
/* harmony export */   DeviceDataAcknowledgment: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.DeviceDataAcknowledgment),
/* harmony export */   Disconnect: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.Disconnect),
/* harmony export */   Flash: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.Flash),
/* harmony export */   JRpcError: () => (/* reexport safe */ _jsonRpc__WEBPACK_IMPORTED_MODULE_9__.JRpcError),
/* harmony export */   JRpcResponse: () => (/* reexport safe */ _jsonRpc__WEBPACK_IMPORTED_MODULE_9__.JRpcResponse),
/* harmony export */   JsonRpc: () => (/* reexport safe */ _jsonRpc__WEBPACK_IMPORTED_MODULE_9__.JsonRpc),
/* harmony export */   LocalDecodeAction: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.LocalDecodeAction),
/* harmony export */   MonitorDbg: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.MonitorDbg),
/* harmony export */   Notifications: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.Notifications),
/* harmony export */   PowerState: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.PowerState),
/* harmony export */   ProfileConfig: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.ProfileConfig),
/* harmony export */   ProfileSelect: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.ProfileSelect),
/* harmony export */   RumbleActionType: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.RumbleActionType),
/* harmony export */   SecurityMode: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.SecurityMode),
/* harmony export */   SktErrors: () => (/* reexport safe */ _gen_errors__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   SocketCam: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.SocketCam),
/* harmony export */   SoundActionType: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.SoundActionType),
/* harmony export */   SoundFrequency: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.SoundFrequency),
/* harmony export */   StandConfig: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.StandConfig),
/* harmony export */   StartUpRoleSpp: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.StartUpRoleSpp),
/* harmony export */   Timer: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.Timer),
/* harmony export */   Trigger: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.Trigger),
/* harmony export */   TriggerMode: () => (/* reexport safe */ _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__.TriggerMode)
/* harmony export */ });
/* harmony import */ var _capture__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./capture */ "./ts/capture.ts");
/* harmony import */ var _gen_errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gen/errors */ "./ts/gen/errors.ts");
/* harmony import */ var _gen_propertyIdsTypes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./gen/propertyIdsTypes */ "./ts/gen/propertyIdsTypes.ts");
/* harmony import */ var _gen_propertyValues__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./gen/propertyValues */ "./ts/gen/propertyValues.ts");
/* harmony import */ var _captureProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./captureProperty */ "./ts/captureProperty.ts");
/* harmony import */ var _gen_eventIds__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./gen/eventIds */ "./ts/gen/eventIds.ts");
/* harmony import */ var _captureEvents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./captureEvents */ "./ts/captureEvents.ts");
/* harmony import */ var _gen_deviceTypes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./gen/deviceTypes */ "./ts/gen/deviceTypes.ts");
/* harmony import */ var _gen_dataSources__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./gen/dataSources */ "./ts/gen/dataSources.ts");
/* harmony import */ var _jsonRpc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jsonRpc */ "./ts/jsonRpc.ts");












})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=captureJs-latest.map