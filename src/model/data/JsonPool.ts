/**
 * Created by jsroads on 2019/9/19 . 3:30 下午
 * Note:
 */
import ResConfig from "../../utils/ResConfig";

const JSONS_OPTIONS: string = "jsonsOptions";
const SHARE: string = "share";//分享

export default class JsonPool {

    static get i(): JsonPool {
        if(!this._i)this._i = new JsonPool();
        return this._i;
    }
    private static _i:JsonPool;

    private  _share: any;

    public  get share(): any {
        if (!this._share) this._share = JsonPool.i.getJsonByKey(SHARE);
        return this._share;
    }
    public  getJsonByKey(key: string, value?: string): any {
        value = value || JSONS_OPTIONS;
        return Laya.loader.getRes(ResConfig.options[value][key]);
    }
}