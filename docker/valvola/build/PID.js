"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PID = /** @class */ (function () {
    function PID() {
        this._iError = 0;
        this._lastError = 0;
        this._lastTime = 0;
        this.kP = 0;
        this.kI = 0;
        this.kD = 0;
        this.maxI = Number.MAX_VALUE;
        this.target = 0;
        this.currentValue = 0;
    }
    PID.prototype.update = function () {
        var dt;
        var currentTime = Date.now();
        if (this._lastTime === 0) {
            dt = 0;
        }
        else {
            dt = (currentTime - this._lastTime) / 1000;
        }
        this._lastTime = currentTime;
        var error = (this.target - this.currentValue);
        this._iError = this._iError + error * dt;
        if (Math.abs(this._iError) > this.maxI) {
            this._iError = (this._iError > 0) ? this.maxI : -this.maxI;
        }
        var dError = 0;
        if (dt > 0) {
            dError = (error - this._lastError) / dt;
            this._lastError = error;
        }
        return (this.kP * error) + (this.kI * this._iError) + (this.kD * dError);
    };
    PID.prototype.reset = function () {
        this._iError = 0;
        this._lastError = 0;
        this._lastTime = 0;
    };
    return PID;
}());
exports.PID = PID;
//# sourceMappingURL=PID.js.map