import mqtt from 'mqtt';
import fs from 'fs';
import { Tapparella } from './tapparella';

let args = process.argv.slice(2);
let name = args[0];

let mqttClient = mqtt.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/tapparella/+');

let stream = fs.createWriteStream('logtapparella' + name + '.txt', { flags: 'a' });

let tapparella = new Tapparella();

mqttClient.on('message', (topic: string, message: Buffer) => {
    if (topic == name + '/tapparella/up') {
        tapparella.percDown = 0;
    } else if (topic == name + '/tapparella/down') {
        tapparella.percDown = 100;
    } else if (topic == name + '/tapparella/percentuale') {
        tapparella.percDown = +message;
    }
});

let timer = setInterval(() => up(), 60 * 1000);

let up = () => {
    stream.write('Percentuale abbassamento tapparella: ' + tapparella.percDown + '%' + '\r\n');
}
