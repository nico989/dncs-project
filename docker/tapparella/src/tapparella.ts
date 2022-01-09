export class Tapparella {
    private _percDown: number = 0;

    get percDown(): number {
        return this._percDown;
    }
    set percDown(value: number) {
        this._percDown = value;
    }

    reset() {
        this._percDown = 0;
    }
}
