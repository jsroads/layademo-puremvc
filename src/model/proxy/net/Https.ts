/**
 * Created by jsroads on 2019/9/18 . 7:18 下午
 * Note:
 */
export enum METHOD_TYPE {
    JSON = "json",
    TEXT = "text",
    XML = "xml",
    ARRAY_BUFFER = "arraybuffer"
}

export enum RES_TYPE {
    POST = "post",
    GET = "get",
    head = "head"
}

const URL: string = "";
const SessionId: string = "";
const Success: number = 0;
export default class Https extends Laya.HttpRequest {
    constructor() {
        super();
        this.http.timeout = 10000;
    }

    public sendMassage(data: any, callback?: Function): void {
        this.emit(data, callback, true);
    }

    public login(data: any, callback?: Function,): void {
        this.emit(data, callback, false);
    }

    private emit(data: any, callback?: Function, need?: boolean) {
        this.once(Laya.Event.COMPLETE, this, (e: any) => {
            this.offAll();
            if (e.code == Success) {
                if (callback) callback(e.data);
            } else {
                throw new Error(e);
            }
        });
        this.once(Laya.Event.ERROR, this, (e: any) => {
            this.offAll()
        });
        let headers: any[] = ["Content-Type", "application/json", "sessionId"];
        if (need) headers.push(SessionId);
        let msg = JSON.stringify(data);
        this.send(URL + data.url, msg, RES_TYPE.POST, METHOD_TYPE.JSON, headers);
    }
}