"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Split = /** @class */ (function () {
    function Split() {
        this._onOff = false;
        this._tempTarget = 0;
        this._velVentola = 0;
    }
    Object.defineProperty(Split.prototype, "onOff", {
        get: function () {
            return this._onOff;
        },
        set: function (value) {
            this._onOff = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Split.prototype, "tempTarget", {
        get: function () {
            if (this._onOff)
                return this._tempTarget;
            else
                return 0;
        },
        set: function (value) {
            this._tempTarget = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Split.prototype, "velVentola", {
        get: function () {
            if (this._onOff)
                return this._velVentola;
            else
                return 0;
        },
        set: function (value) {
            this._velVentola = value;
        },
        enumerable: true,
        configurable: true
    });
    Split.prototype.reset = function () {
        this._onOff = false;
        this._tempTarget = 0;
        this._velVentola = 0;
    };
    return Split;
}());
exports.Split = Split;
//# sourceMappingURL=split.js.map