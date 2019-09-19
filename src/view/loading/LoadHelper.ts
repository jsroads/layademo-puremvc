/**
 * Created by jsroads on 2019/9/19 . 11:51 上午
 * Note:
 */
export default class LoadHelper {
    private static _i: LoadHelper;

    public static get i(): LoadHelper {
        if (!this._i) this._i = new LoadHelper();
        return this._i;
    }

    public parseSources(obj): Array<any> {
        let baseAssetsList: Array<any> = [], element: any;
        for (let key in obj) {
            element = null;
            switch (key) {
                case "scene_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.JSON);
                    break;
                case "atlas_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.ATLAS);
                    break;
                case "prefab":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.PREFAB);
                    break;
                case "json_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.JSON);
                    break;
                case "font_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.XML);
                    break;
                case "text_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.TEXT);
                    break;
                case "image_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.IMAGE);
                    break;
                case "sk_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.BUFFER);
                    break;
                case "particles_assets":
                    if (obj[key].length > 0) element = this.loadList(obj[key], Laya.Loader.JSON);
                    break;
                case "resourceOptions":
                    if (obj[key]) element = this.loadJsons(obj[key], Laya.Loader.JSON);
                    break;
                default:
                    break;
            }
            if (element) baseAssetsList = baseAssetsList.concat(element);
        }
        return baseAssetsList;
    }

    public getUrlEncode(url: string, type: string): string {
        if (url.indexOf(".json") !== -1 || url.indexOf(".fnt") != -1)
            return "utf8";
        return "ascii";
    }


    private loadList(array, type) {
        let list: Array<any> = [], element: any;
        for (let i = 0; i < array.length; i++) {
            if (array[i]) element = {url: array[i], type: type};
            if (element) list.push(element);
        }
        return list;
    }

    private loadJsons(obj, type) {
        let list: Array<any> = [], element: any;
        for (let key in obj) {
            if (obj[key]) element = {url: obj[key], type: type};
            if (element) list.push(element);
        }
        return list;
    }
}