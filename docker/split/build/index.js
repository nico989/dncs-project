"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var split_1 = require("./split");
var args = process.argv.slice(2);
var name = args[0];
var mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/split/+');
mqttClient.subscribe(name + '/+');
var stream = fs_1.default.createWriteStream('logsplit' + name + '.txt', { flags: 'a' });
var split = new split_1.Split();
mqttClient.on('message', function (topic, message) {
    if (topic == name + '/split/on') {
        split.onOff = true;
    }
    else if (topic == name + '/split/off') {
        split.onOff = false;
    }
    else if (topic == name + '/split/velocitaVentola') {
        split.velVentola = +message;
    }
    else if (topic == name + '/temperaturaTarget') {
        split.tempTarget = +message;
    }
});
var timer = setInterval(function () { return up(); }, 60 * 1000);
var up = function () {
    stream.write('On/off: ' + split.onOff + ' temperatura target: ' + split.tempTarget + ' velocità ventola: ' + split.velVentola + '\r\n');
};
//# sourceMappingURL=index.js.map