"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var pulsanteLuce_1 = require("./pulsanteLuce");
var pulsanteTapparella_1 = require("./pulsanteTapparella");
var Pulsantiera = /** @class */ (function () {
    function Pulsantiera() {
        this._mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
        this._stream = fs_1.default.createWriteStream('logpulsantiera.txt', { flags: 'a' });
        this._stanze = ["cucina", "camera", "bagno"];
        this._pulsantiLuci = [new pulsanteLuce_1.PulsanteLuce(this._mqttClient), new pulsanteLuce_1.PulsanteLuce(this._mqttClient), new pulsanteLuce_1.PulsanteLuce(this._mqttClient)];
        this._pulsantiTapparelle = [new pulsanteTapparella_1.PulsanteTapparella(this._mqttClient), new pulsanteTapparella_1.PulsanteTapparella(this._mqttClient), new pulsanteTapparella_1.PulsanteTapparella(this._mqttClient)];
        this._rand = 0;
    }
    Pulsantiera.prototype.randomCommand = function () {
        this._rand = getRandomInt(0, 2);
        if (getRandomInt(0, 1) == 0) {
            this._pulsantiLuci[this._rand].call(this._stanze[this._rand], this._rand);
            this._stream.write('Pulsante luce: topic: ' + this._pulsantiLuci[this._rand].topic + ' message:' + this._pulsantiLuci[this._rand].message + '\r\n');
        }
        else {
            this._pulsantiTapparelle[this._rand].call(this._stanze[this._rand], this._rand);
            this._stream.write('Pulsante tapparella: topic: ' + this._pulsantiTapparelle[this._rand].topic + ' message:' + this._pulsantiTapparelle[this._rand].message + '\r\n');
        }
    };
    Pulsantiera.prototype.update = function () {
        var _this = this;
        this._timer = setInterval(function () { return _this._up(); }, 60 * 1000);
        this._up = function () {
            _this.randomCommand();
        };
    };
    return Pulsantiera;
}());
exports.Pulsantiera = Pulsantiera;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=pulsantiera.js.map