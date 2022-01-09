export class Split {
    private _onOff: boolean = false;
    private _tempTarget: number = 0;
    private _velVentola: number = 0;

    get onOff(): boolean {
        return this._onOff;
    }
    set onOff(value: boolean) {
        this._onOff = value;
    }

    get tempTarget(): number {
        if (this._onOff)
            return this._tempTarget;
        else
            return 0;
    }
    set tempTarget(value: number) {
        this._tempTarget = value;
    }

    get velVentola(): number {
        if (this._onOff)
            return this._velVentola;
        else
            return 0;
    }
    set velVentola(value: number) {
        this._velVentola = value;
    }

    reset() {
        this._onOff = false;
        this._tempTarget = 0;
        this._velVentola = 0;
    }
}
