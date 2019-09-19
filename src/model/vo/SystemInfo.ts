/**
 * Created by jsroads on 2019/9/19 . 9:05 上午
 * Note:
 */
export default class SystemInfo {
    // static get i(): SystemInfo {
    //     if(!this._i)this._i = new SystemInfo();
    //     return this._i;
    private static _i: SystemInfo;

    // }
    private _sessionId: string;

    get sessionId(): string {
        return this._sessionId;
    }

    set sessionId(value: string) {
        this._sessionId = value;
    }

    private _networkType: string = "wifi";

    get networkType(): string {
        return this._networkType;
    }

    set networkType(value: string) {
        this._networkType = value;
    }
}
