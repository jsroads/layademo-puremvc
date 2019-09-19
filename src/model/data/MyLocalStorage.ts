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

    write(key: string, value: any, callBack?: Function) {
        Laya.LocalStorage.setJSON(key, JSON.stringify(value));
        if (callBack) callBack();
    }

    read(key: string, callBack: Function, defaultValue?: any): any {
        let value = Laya.LocalStorage.getJSON(key);
        if (callBack) {
            callBack(value || defaultValue, key);
        } else {
            return value || defaultValue;
        }
    }

    clearByKey(key: string) {
        Laya.LocalStorage.removeItem(key);
    }

    clearAll() {
        Laya.LocalStorage.clear();
    }
}