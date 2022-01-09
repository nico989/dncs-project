import mqtt from 'mqtt';
import fs from 'fs';
import { Luce } from './luce';

let args = process.argv.slice(2);
let name = args[0];

let mqttClient = mqtt.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/luce/+');

let stream = fs.createWriteStream('logluce' + name + '.txt', { flags: 'a' });

let luce = new Luce();

mqttClient.on('message', (topic: string, message: Buffer) => {
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

let timer = setInterval(() => up(), 60 * 1000);

let up = () => {
    stream.write('On/off: ' + luce.onOff + ' intensita: ' + luce.intensita + '%' + '\r\n');
}
