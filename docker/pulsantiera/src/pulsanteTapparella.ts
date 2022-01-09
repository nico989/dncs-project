export class PulsanteTapparella {
    private _mqttClient: any;
    private _message: string = '';
    private _topic: string = '';

    constructor(mqttClient: any) {
        this._mqttClient = mqttClient;
    }
    
    get message(): string {
        return this._message;
    }

    get topic(): string {
        return this._topic;
    }

    call(stanza: string, action: number) {
        this._topic = stanza + '/tapparella';
        if (action == 0) {
            this.up();
        } else if (action == 1) {
            this.down();
        } else if (action == 2) {
            this.percent();
        }
    }

    up() {
        this._topic += '/up';
        this._mqttClient.publish(this._topic, this._message);
    }

    down() {
        this._topic += '/down';
        this._mqttClient.publish(this._topic, this._message);
    }

    percent() {
        this._topic += '/percentuale';
        this._message = getRandomInt(0, 100).toString();
        this._mqttClient.publish(this._topic, this._message);
    } 

}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
