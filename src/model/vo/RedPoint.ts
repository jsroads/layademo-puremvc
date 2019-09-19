/**
 * Created by jsroads on 2019/9/19 . 9:32 上午
 * Note:
 */
export default class RedPoint {
    constructor(id: number, has?: boolean, group?: number[]) {
        this._id = id;
        this._has = has || false;
        this._group = group || [0];
    }

    private _id: number;

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    private _has: boolean;

    get has(): boolean {
        return this._has;
    }

    set has(value: boolean) {
        this._has = value;
    }

    private _group: number[];

    get group(): number[] {
        return this._group;
    }

    set group(value: number[]) {
        this._group = value;
    }
}