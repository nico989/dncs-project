export class Umidificatore {
    private _delta: number = 0;

    private _onOff: boolean = false;
    private _currentValue: number = 0;
    private _target: number = 0;

    constructor(delta: number) {
        this._delta = delta;
    }

    get onOff(): boolean {
        return this._onOff;
    }
    set onOff(value: boolean) {
        this._onOff = value;
    }

    get currentValue(): number {
        return this._currentValue;
    }
    set currentValue(value: number) {
        this._currentValue = value;
    }

    get target(): number {
        return this._target;
    }
    set target(value: number) {
        this._target = value;
    }

    active(): string {
        if (this._onOff) {
            if (this.currentValue < this.target) {
                return "umidificazione";
            } else if (this.currentValue > this.target) {
                return "deumidificazione";
            } else {
                return "disabilitato";
            }
        }
        return "disabilitato";
    }
}
