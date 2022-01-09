export class Sonda {
    private _temperatura: number = 20;
    private _umidita: number = 50;
    private _luminosita: number = 500;

    get temperatura(): number {
        this._temperatura += getRandomInt(-4, +4) / 2;
        return this._temperatura;
    }

    get umidita(): number {
        this._umidita += getRandomInt(-10, +10) / 2;
        return this._umidita;
    }

    get luminosita(): number {
        this._luminosita = getRandomInt(0, 1000);
        return this._luminosita;
    }
}

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
