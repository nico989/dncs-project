"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tapparella = /** @class */ (function () {
    function Tapparella() {
        this._percDown = 0;
    }
    Object.defineProperty(Tapparella.prototype, "percDown", {
        get: function () {
            return this._percDown;
        },
        set: function (value) {
            this._percDown = value;
        },
        enumerable: true,
        configurable: true
    });
    Tapparella.prototype.reset = function () {
        this._percDown = 0;
    };
    return Tapparella;
}());
exports.Tapparella = Tapparella;
//# sourceMappingURL=tapparella.js.map