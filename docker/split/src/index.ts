import mqtt from 'mqtt';
import fs from 'fs';
import { Split } from './split';

let args = process.argv.slice(2);
let name = args[0];

let mqttClient = mqtt.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/split/+');
mqttClient.subscribe(name + '/+');

let stream = fs.createWriteStream('logsplit' + name + '.txt', { flags: 'a' });

let split = new Split();

mqttClient.on('message', (topic: string, message: Buffer) => {
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

let timer = setInterval(() => up(), 60 * 1000);

let up = () => {
    stream.write('On/off: ' + split.onOff + ' temperatura target: ' + split.tempTarget + ' velocità ventola: ' + split.velVentola + '\r\n');
}
