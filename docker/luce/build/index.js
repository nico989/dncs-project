"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var luce_1 = require("./luce");
var args = process.argv.slice(2);
var name = args[0];
var mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/luce/+');
var stream = fs_1.default.createWriteStream('logluce' + name + '.txt', { flags: 'a' });
var luce = new luce_1.Luce();
mqttClient.on('message', function (topic, message) {
    if (topic == name + '/luce/on') {
        luce.onOff = true;
    }
    else if (topic == name + '/luce/off') {
        luce.onOff = false;
    }
    else if (topic == name + '/luce/intensita') {
        luce.intensita = +message;
    }
});
var timer = setInterval(function () { return up(); }, 60 * 1000);
var up = function () {
    stream.write('On/off: ' + luce.onOff + ' intensita: ' + luce.intensita + '%' + '\r\n');
};
//# sourceMappingURL=index.js.map