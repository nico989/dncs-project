import mqtt from 'mqtt';
import fs from 'fs';
import { Valvola } from './valvola';

let args = process.argv.slice(2);
let name = args[0];

let mqttClient = mqtt.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/valvola/+');
mqttClient.subscribe(name + '/+');

let stream = fs.createWriteStream('logvalvola' + name + '.txt', { flags: 'a' });

let valvola = new Valvola();

mqttClient.on('message', (topic: string, message: Buffer) => {
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

let timer = setInterval(() => up(), 60 * 1000);

let up = () => {
    valvola.update();
    stream.write('On/off: ' + valvola.onOff + ' target: ' + valvola.target + ' percentuale apertura valvola: ' + valvola.openingPercent + '%' + '\r\n');
}
