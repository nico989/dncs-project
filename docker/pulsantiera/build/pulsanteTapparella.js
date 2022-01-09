"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PulsanteTapparella = /** @class */ (function () {
    function PulsanteTapparella(mqttClient) {
        this._message = '';
        this._topic = '';
        this._mqttClient = mqttClient;
    }
    Object.defineProperty(PulsanteTapparella.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PulsanteTapparella.prototype, "topic", {
        get: function () {
            return this._topic;
        },
        enumerable: true,
        configurable: true
    });
    PulsanteTapparella.prototype.call = function (stanza, action) {
        this._topic = stanza + '/tapparella';
        if (action == 0) {
            this.up();
        }
        else if (action == 1) {
            this.down();
        }
        else if (action == 2) {
            this.percent();
        }
    };
    PulsanteTapparella.prototype.up = function () {
        this._topic += '/up';
        this._mqttClient.publish(this._topic, this._message);
    };
    PulsanteTapparella.prototype.down = function () {
        this._topic += '/down';
        this._mqttClient.publish(this._topic, this._message);
    };
    PulsanteTapparella.prototype.percent = function () {
        this._topic += '/percentuale';
        this._message = getRandomInt(0, 100).toString();
        this._mqttClient.publish(this._topic, this._message);
    };
    return PulsanteTapparella;
}());
exports.PulsanteTapparella = PulsanteTapparella;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=pulsanteTapparella.js.map