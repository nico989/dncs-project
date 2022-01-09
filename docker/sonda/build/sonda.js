"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Sonda = /** @class */ (function () {
    function Sonda() {
        this._temperatura = 20;
        this._umidita = 50;
        this._luminosita = 500;
    }
    Object.defineProperty(Sonda.prototype, "temperatura", {
        get: function () {
            this._temperatura += getRandomInt(-4, +4) / 2;
            return this._temperatura;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sonda.prototype, "umidita", {
        get: function () {
            this._umidita += getRandomInt(-10, +10) / 2;
            return this._umidita;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Sonda.prototype, "luminosita", {
        get: function () {
            this._luminosita = getRandomInt(0, 1000);
            return this._luminosita;
        },
        enumerable: true,
        configurable: true
    });
    return Sonda;
}());
exports.Sonda = Sonda;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=sonda.js.map