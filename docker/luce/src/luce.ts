export class Luce {
    private _onOff: boolean = false;
    private _intensita: number = 0;

    get onOff(): boolean {
        return this._onOff;
    }
    set onOff(value: boolean) {
        this._onOff = value;
    }

    get intensita(): number {
        if (this._onOff)
            return this._intensita;
        else
            return 0;
    }
    set intensita(value: number) {
        this._intensita = value;
    }

    reset() {
        this._onOff = false;
        this._intensita = 0;
    }
}
