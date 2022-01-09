import { PID } from "./PID";

export class Valvola {
    private _pid = new PID();

    private _onOff: boolean = false;
    private _currentValue: number = 0;
    private _target: number = 0;
    private _openingPercent: number = 0;

    constructor() {
        this._pid.kP = 1;
        this._pid.kI = 0.5;
        this._pid.kD = 0.1;
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

    get openingPercent(): number {
        if (this._onOff)
            return this._openingPercent;
        else
            return 0;
    }

    update() {
        let val = this._pid.update();
        if (val < 0)
            val = 0;
        if (val > 1)
            val = 1;
        this._openingPercent = val * 100;
    }
}
