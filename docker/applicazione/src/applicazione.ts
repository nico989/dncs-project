import mqtt from 'mqtt';
import fs from 'fs';

export class Applicazione {
    private _mqttClient = mqtt.connect('mqtt://10.0.0.1');
    private _stream = fs.createWriteStream('logapplicazione.txt', { flags: 'a' });

    private _stanze = ['cucina', 'bagno', 'camera'];
    private _topics = ['temperaturaTarget', 'umiditaTarget', 'luce/on', 'luce/off', 'luce/intensita', 'split/on', 'split/off', 'split/velocitaVentola', 'tapparella/up', 'tapparella/down', 'tapparella/percentuale', 'umidificatore/on', 'umidificatore/off', 'valvola/on', 'valvola/off'];

    private _timer: any;
    private _up: any;
    
    
    randomCommand() {
        let room = getRandomInt(0, 2);
        let topic: string = this._stanze[room] + '/';
        let message: string = '';

        let a = getRandomInt(0, 14);
        topic += this._topics[a];

        if (a == 0) {
            message = getRandomInt(18, 28).toString();
        }
        else if (a == 1) {
            message = getRandomInt(40, 60).toString();
        }
        else if (a == 4) {
            message = getRandomInt(0, 100).toString();
        }
        else if (a == 7) {
            message = getRandomInt(1, 5).toString();
        }
        else if (a == 10) {
            message = getRandomInt(0, 100).toString();
        }

        this._mqttClient.publish(topic, message);
        this._stream.write(topic + ' ' + message + '\r\n');
    }

    update() {
        this._timer = setInterval(() => this._up(), 60 * 1000);
        this._up = () => {
            this.randomCommand();
        }
    }
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
