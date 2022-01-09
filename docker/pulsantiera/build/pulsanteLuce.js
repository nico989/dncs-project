"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PulsanteLuce = /** @class */ (function () {
    function PulsanteLuce(mqttClient) {
        this._message = '';
        this._topic = '';
        this._mqttClient = mqttClient;
    }
    Object.defineProperty(PulsanteLuce.prototype, "message", {
        get: function () {
            return this._message;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PulsanteLuce.prototype, "topic", {
        get: function () {
            return this._topic;
        },
        enumerable: true,
        configurable: true
    });
    PulsanteLuce.prototype.call = function (stanza, action) {
        this._topic = stanza + '/luce';
        if (action == 0) {
            this.on();
        }
        else if (action == 1) {
            this.off();
        }
        else if (action == 2) {
            this.intensity();
        }
    };
    PulsanteLuce.prototype.on = function () {
        this._topic += '/on';
        this._mqttClient.publish(this._topic, this._message);
    };
    PulsanteLuce.prototype.off = function () {
        this._topic += '/off';
        this._mqttClient.publish(this._topic, this._message);
    };
    PulsanteLuce.prototype.intensity = function () {
        this._topic += '/intensita';
        this._message = getRandomInt(0, 100).toString();
        this._mqttClient.publish(this._topic, this._message);
    };
    return PulsanteLuce;
}());
exports.PulsanteLuce = PulsanteLuce;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//# sourceMappingURL=pulsanteLuce.js.map