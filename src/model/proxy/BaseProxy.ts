/**
 * Created by jsroads on 2019-06-17 . 15:42
 * Note:
 */
import Https from "./net/Https";

export default class BaseProxy extends puremvc.Proxy implements puremvc.IProxy {
    public static NAME: string = "BaseProxy";

    constructor(proxyName?: string, data?: any) {
        super(proxyName, data);
    }

    public send(msg: any, callBack?: Function) {
        let xhr = new Https();
        xhr.sendMassage(msg, callBack);
    }

    public login(msg: any, callBack: Function) {
        let xhr = new Https();
        xhr.login(msg, callBack);
    }

    protected responseCallBack(data: any) {
        this.setData(data);
    }
}