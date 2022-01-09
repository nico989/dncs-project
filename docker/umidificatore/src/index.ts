import mqtt from 'mqtt';
import fs from 'fs';
import { Umidificatore } from './umidificatore';

let args = process.argv.slice(2);
let name = args[0];

let mqttClient = mqtt.connect('mqtt://10.0.0.1');
mqttClient.subscribe(name + '/umidificatore/+');
mqttClient.subscribe(name + '/+');

let stream = fs.createWriteStream('logumidificatore' + name + '.txt', { flags: 'a' });

let umidificatore = new Umidificatore(0.5);

mqttClient.on('message', (topic: string, message: Buffer) => {
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

let timer = setInterval(() => up(), 60 * 1000);

let up = () => {
    stream.write('On/off: ' + umidificatore.onOff + ' target: ' + umidificatore.target + ' umidita attuale: ' + umidificatore.currentValue + ' funzione: ' + umidificatore.active() + '\r\n');
}
