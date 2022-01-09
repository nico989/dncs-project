"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Umidificatore = /** @class */ (function () {
    function Umidificatore(delta) {
        this._delta = 0;
        this._onOff = false;
        this._currentValue = 0;
        this._target = 0;
        this._delta = delta;
    }
    Object.defineProperty(Umidificatore.prototype, "onOff", {
        get: function () {
            return this._onOff;
        },
        set: function (value) {
            this._onOff = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Umidificatore.prototype, "currentValue", {
        get: function () {
            return this._currentValue;
        },
        set: function (value) {
            this._currentValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Umidificatore.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (value) {
            this._target = value;
        },
        enumerable: true,
        configurable: true
    });
    Umidificatore.prototype.active = function () {
        if (this._onOff) {
            if (this.currentValue < this.target) {
                return "umidificazione";
            }
            else if (this.currentValue > this.target) {
                return "deumidificazione";
            }
            else {
                return "disabilitato";
            }
        }
        return "disabilitato";
    };
    return Umidificatore;
}());
exports.Umidificatore = Umidificatore;
//# sourceMappingURL=umidificatore.js.map