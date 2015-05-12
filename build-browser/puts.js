(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var puts = require('./main');
global.puts = puts;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./main":5}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var network_error_1 = require('./network-error');
var HttpError = (function (_super) {
    __extends(HttpError, _super);
    function HttpError(statusCode, message) {
        _super.call(this, message);
        this.name = 'HttpError';
        this.statusCode = statusCode;
    }
    return HttpError;
})(network_error_1.NetworkError);
exports.HttpError = HttpError;
var HttpNotFoundError = (function (_super) {
    __extends(HttpNotFoundError, _super);
    function HttpNotFoundError(message) {
        _super.call(this, 404, message);
        this.name = 'HttpNotFoundError';
    } //
    return HttpNotFoundError;
})(HttpError);
exports.HttpNotFoundError = HttpNotFoundError;
function createFromStatusCode(statusCode, message) {
    switch (statusCode) {
        case 404:
            return new HttpNotFoundError(message);
        default:
            return new HttpError(statusCode, message);
    }
}
exports.createFromStatusCode = createFromStatusCode;

},{"./network-error":7}],3:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var native_1 = require('./native');
var IOError = (function (_super) {
    __extends(IOError, _super);
    function IOError() {
        _super.apply(this, arguments);
        this.name = 'IOError';
    }
    return IOError;
})(native_1.Error);
exports.IOError = IOError;

},{"./native":6}],4:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var native_1 = require('./native');
var JSONParseError = (function (_super) {
    __extends(JSONParseError, _super);
    function JSONParseError() {
        _super.apply(this, arguments);
        this.name = 'JSONParseError';
    }
    return JSONParseError;
})(native_1.TypeError);
exports.JSONParseError = JSONParseError;

},{"./native":6}],5:[function(require,module,exports){
/**
 * The library man file, exporting everything.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./native'));
__export(require('./io-error'));
__export(require('./network-error'));
__export(require('./json-parse-error'));
var http = require('./http');
exports.http = http;
// 

},{"./http":2,"./io-error":3,"./json-parse-error":4,"./native":6,"./network-error":7}],6:[function(require,module,exports){
/*!
 * This module just exports the host's Error constructors.
 */
//
exports.Error = Error;
exports.TypeError = TypeError;
exports.ReferenceError = ReferenceError;
exports.RangeError = RangeError;
exports.EvalError = EvalError;
exports.URIError = URIError;
exports.SyntaxError = SyntaxError;

},{}],7:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var io_error_1 = require('./io-error');
var NetworkError = (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError() {
        _super.apply(this, arguments);
        this.name = 'NetworkError';
    }
    return NetworkError;
})(io_error_1.IOError);
exports.NetworkError = NetworkError;

},{"./io-error":3}]},{},[1])


//# sourceMappingURL=puts.js.map