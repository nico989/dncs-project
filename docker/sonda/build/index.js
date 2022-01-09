"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = __importDefault(require("mqtt"));
var fs_1 = __importDefault(require("fs"));
var sonda_1 = require("./sonda");
var args = process.argv.slice(2);
var name = args[0];
var mqttClient = mqtt_1.default.connect('mqtt://10.0.0.1');
var stream = fs_1.default.createWriteStream('logsonda' + name + '.txt', { flags: 'a' });
var sonda = new sonda_1.Sonda();
var timer = setInterval(function () { return up(); }, 60 * 1000);
var up = function () {
    var temp = sonda.temperatura;
    var umi = sonda.umidita;
    var lum = sonda.luminosita;
    mqttClient.publish(name + '/temperatura', temp.toString());
    mqttClient.publish(name + '/umidita', umi.toString());
    mqttClient.publish(name + '/luminosita', lum.toString());
    stream.write('Temperatura: ' + temp + ' umidita: ' + umi + ' luminosita: ' + lum + '\r\n');
};
//# sourceMappingURL=index.js.map