import mqtt from 'mqtt';
import fs from 'fs';
import { PulsanteLuce } from './pulsanteLuce';
import { PulsanteTapparella } from './pulsanteTapparella';

export class Pulsantiera {
    private _mqttClient = mqtt.connect('mqtt://10.0.0.1');
    private _stream = fs.createWriteStream('logpulsantiera.txt', { flags: 'a' });

    private _stanze = ["cucina", "camera", "bagno"];
    private _pulsantiLuci = [new PulsanteLuce(this._mqttClient), new PulsanteLuce(this._mqttClient), new PulsanteLuce(this._mqttClient)];
    private _pulsantiTapparelle = [new PulsanteTapparella(this._mqttClient), new PulsanteTapparella(this._mqttClient), new PulsanteTapparella(this._mqttClient)];
    private _rand: number = 0;

    private _timer: any;
    private _up: any;

    randomCommand() {
        this._rand = getRandomInt(0, 2);
        if (getRandomInt(0, 1) == 0) {
            this._pulsantiLuci[this._rand].call(this._stanze[this._rand], this._rand);
            this._stream.write('Pulsante luce: topic: ' + this._pulsantiLuci[this._rand].topic + ' message:' + this._pulsantiLuci[this._rand].message + '\r\n');
        } else {
            this._pulsantiTapparelle[this._rand].call(this._stanze[this._rand], this._rand);
            this._stream.write('Pulsante tapparella: topic: ' + this._pulsantiTapparelle[this._rand].topic + ' message:' + this._pulsantiTapparelle[this._rand].message + '\r\n');
        }   
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
