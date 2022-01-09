"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var tapparella_1 = require("./tapparella");
var args = process.argv.slice(2);
var name = args[0];
var mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/tapparella/+');
var stream = fs_1.default.createWriteStream('logtapparella' + name + '.txt', { flags: 'a' });
var tapparella = new tapparella_1.Tapparella();
mqttClient.on('message', function (topic, message) {
    if (topic == name + '/tapparella/up') {
        tapparella.percDown = 0;
    }
    else if (topic == name + '/tapparella/down') {
        tapparella.percDown = 100;
    }
    else if (topic == name + '/tapparella/percentuale') {
        tapparella.percDown = +message;
    }
});
var timer = setInterval(function () { return up(); }, 60 * 1000);
var up = function () {
    stream.write('Percentuale abbassamento tapparella: ' + tapparella.percDown + '%' + '\r\n');
};
//# sourceMappingURL=index.js.map