import mqtt from 'mqtt';
import fs from 'fs';
import { Sonda } from './sonda';

let args = process.argv.slice(2);
let name = args[0];

let mqttClient = mqtt.connect('mqtt://10.0.0.1');

let stream = fs.createWriteStream('logsonda' + name + '.txt', { flags: 'a' });

let sonda = new Sonda();

let timer = setInterval(() => up(), 60 * 1000);

let up = () => {
    let temp = sonda.temperatura;
    let umi = sonda.umidita;
    let lum = sonda.luminosita;

    mqttClient.publish(name + '/temperatura', temp.toString());
    mqttClient.publish(name + '/umidita', umi.toString());
    mqttClient.publish(name + '/luminosita', lum.toString());

    stream.write('Temperatura: ' + temp + ' umidita: ' + umi + ' luminosita: ' + lum + '\r\n');
}
