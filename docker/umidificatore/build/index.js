"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var umidificatore_1 = require("./umidificatore");
var args = process.argv.slice(2);
var name = args[0];
var mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/umidificatore/+');
mqttClient.subscribe(name + '/+');
var stream = fs_1.default.createWriteStream('logumidificatore' + name + '.txt', { flags: 'a' });
var umidificatore = new umidificatore_1.Umidificatore(0.5);
mqttClient.on('message', function (topic, message) {
    if (topic == name + '/umidificatore/on') {
        umidificatore.onOff = true;
    }
    else if (topic == name + '/umidificatore/off') {
        umidificatore.onOff = false;
    }
    else if (topic == name + '/umidita') {
        umidificatore.currentValue = +message;
    }
    else if (topic == name + '/umiditaTarget') {
        umidificatore.target = +message;
    }
});
var timer = setInterval(function () { return up(); }, 60 * 1000);
var up = function () {
    stream.write('On/off: ' + umidificatore.onOff + ' target: ' + umidificatore.target + ' umidita attuale: ' + umidificatore.currentValue + ' funzione: ' + umidificatore.active() + '\r\n');
};
//# sourceMappingURL=index.js.map