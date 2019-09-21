/**
 * Created by jsroads on 2019/9/18 . 8:04 下午
 * Note:
 */
export default class MyLocalStorage {
    private static _i: MyLocalStorage;

    static get i(): MyLocalStorage {
        if (!this._i) this._i = new MyLocalStorage();
        return this._i;
    }

    write(key: any, value: any, callBack?: Function) {
        console.log("smile----:" + JSON.stringify(value));
        Laya.LocalStorage.setItem(key, JSON.stringify(value));
        if (callBack) callBack();
    }

    read(key: string, callBack: Function, defaultValue?: any): any {
        let value = Laya.LocalStorage.getItem(key);
        if (callBack) {
            callBack(JSON.parse(value) || defaultValue, key);
        } else {
            return JSON.parse(value) || defaultValue;
        }
    }

    clearByKey(key: string) {
        Laya.LocalStorage.removeItem(key);
    }

    clearAll() {
        Laya.LocalStorage.clear();
    }
}