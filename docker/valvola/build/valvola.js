"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PID_1 = require("./PID");
var Valvola = /** @class */ (function () {
    function Valvola() {
        this._pid = new PID_1.PID();
        this._onOff = false;
        this._currentValue = 0;
        this._target = 0;
        this._openingPercent = 0;
        this._pid.kP = 1;
        this._pid.kI = 0.5;
        this._pid.kD = 0.1;
    }
    Object.defineProperty(Valvola.prototype, "onOff", {
        get: function () {
            return this._onOff;
        },
        set: function (value) {
            this._onOff = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Valvola.prototype, "currentValue", {
        get: function () {
            return this._currentValue;
        },
        set: function (value) {
            this._currentValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Valvola.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Valvola.prototype, "openingPercent", {
        get: function () {
            if (this._onOff)
                return this._openingPercent;
            else
                return 0;
        },
        enumerable: true,
        configurable: true
    });
    Valvola.prototype.update = function () {
        var val = this._pid.update();
        if (val < 0)
            val = 0;
        if (val > 1)
            val = 1;
        this._openingPercent = val * 100;
    };
    return Valvola;
}());
exports.Valvola = Valvola;
//# sourceMappingURL=valvola.js.map