/**
 * Created by jsroads on 2019/9/19 . 11:04 上午
 * Note:
 */
export default class ResConfig {
    static get fntDictionary(): any {
        return this._fntDictionary;
    }

    static set fntDictionary(value: any) {
        this._fntDictionary = value;
    }
    public static appConfigPath = "res/jsons/appconfig.json";
    public static resConfigPath = "res/jsons/resconfig.json";
    private static lightRes: string[] = [""];

    private static _configs: string[] = [];

    static get configs(): string[] {
        if (!this._configs.length) {
            this._configs.push(ResConfig.appConfigPath, ResConfig.resConfigPath);
        }
        return this._configs;
    }

    private static _options: any = {};

    static get options(): any {
        return this._options;
    }
    static set options(value: any) {
        this._options = value;
    }

    private static _fntDictionary:any = {};
}
