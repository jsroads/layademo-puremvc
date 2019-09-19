/**
 * Created by jsroads on 2019/9/19 . 9:42 上午
 * Note:
 */
import WarnCode from "../model/data/WarnCode";

export class CustomEventDispatcher extends Laya.EventDispatcher {
    constructor() {
        super();
        if (CustomEventDispatcher._i) {
            throw new Error(WarnCode.SINGLETON_MSG);
            return;
        }
    }

    private static _i: CustomEventDispatcher;

    static get i(): CustomEventDispatcher {
        if (!this._i) this._i = new CustomEventDispatcher();
        return this._i;
    }
}