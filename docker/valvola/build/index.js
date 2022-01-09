"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var valvola_1 = require("./valvola");
var args = process.argv.slice(2);
var name = args[0];
var mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/valvola/+');
mqttClient.subscribe(name + '/+');
var stream = fs_1.default.createWriteStream('logvalvola' + name + '.txt', { flags: 'a' });
var valvola = new valvola_1.Valvola();
mqttClient.on('message', function (topic, message) {
    if (topic == name + '/valvola/on') {
        valvola.onOff = true;
    }
    else if (topic == name + '/valvola/off') {
        valvola.onOff = false;
    }
    else if (topic == name + '/temperatura') {
        valvola.currentValue = +message;
    }
    else if (topic == name + '/temperaturaTarget') {
        valvola.target = +message;
    }
});
var timer = setInterval(function () { return up(); }, 60 * 1000);
var up = function () {
    valvola.update();
    stream.write('On/off: ' + valvola.onOff + ' target: ' + valvola.target + ' percentuale apertura valvola: ' + valvola.openingPercent + '%' + '\r\n');
};
//# sourceMappingURL=index.js.map