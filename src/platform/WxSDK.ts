/**
 * Created by jsroads on 2019/9/19 . 2:24 下午
 * Note:
 */
import BaseSDK from "./BaseSDK";
import ResConfig from "../utils/ResConfig";
import JsonPool from "../model/data/JsonPool";
import Helper from "../utils/Helper";
import Browser = Laya.Browser;

interface IShare {
    id: number;
    imageUrl: string;
    title: string;
    show: number;
}

export default class WxSDK extends BaseSDK {
    constructor() {
        super();
        this.api = wx;
    }

    protected login(callBack) {
        super.login(null);
        this.api.login({
            success: (res) => {
                console.log(`login调用成功${res.code}`);
                callBack(res)
            },
            fail: (res) => {
                console.log(`login调用失败`);
            },
            complete: () => {

            },
        })
    }

    get shareList(): any[] {
        if (!this._shareList.length) {
            let gameOptions = ResConfig.options.appConfig.gameOptions;
            let head = [gameOptions.basePath, gameOptions.name, gameOptions.platform].join("/");
            for (let key in JsonPool.i.share) {
                let item: any = Helper.i.deepCopy(JsonPool.i.share[key]);
                if (item.show > 0) {
                    item.imageUrl = head + "/" + item.imageUrl;
                    this._shareList.push(item);
                }
            }
        }
        return this._shareList;
    }

    private _shareList: any[] = [];

    /**
     * 菜单分享信息
     */
    public menuShareMessage() {
        if (!Browser.onMiniGame) return;
        window.platform.i.onShareAppMessage(() => {
            let msg: IShare = this.getMessage();
            return {
                title: msg.title,
                imageUrl: msg.imageUrl,
                success: (scope) => {
                    console.log("onShareAppMessage:success");
                },
                fail: () => {
                    console.log("onShareAppMessage:fail");
                },
                complete: () => {

                }
            }
        });
        this.showShareMenu();
    }

    /**
     * 显示 系统分享菜单
     */
    public showShareMenu() {
        let shareObj = {
            withShareTicket: true,
            success: (scope) => {
                // console.log("showShareMenu:success");
            },
            fail: () => {
                // console.log("showShareMenu:fail");
            },
            complete: () => {
                // console.log("showShareMenu:complete");
            }
        };
        window.platform.i.showShareMenu(shareObj);
    }

    private getMessage(idx: number = -1) {
        idx = idx === -1 ? Math.floor(Math.random() * this.shareList.length) : idx;
        return this.shareList[idx];
    }

    public getSDKVersion() {
        return this.api.getSystemInfoSync().SDKVersion;
    }

    private compareVersion(v1, v2) {
        v1 = v1.split('.');
        v2 = v2.split('.');
        const len = Math.max(v1.length, v2.length);
        while (v1.length < len) {
            v1.push('0')
        }
        while (v2.length < len) {
            v2.push('0')
        }
        for (let i = 0; i < len; i++) {
            const num1 = parseInt(v1[i]);
            const num2 = parseInt(v2[i]);

            if (num1 > num2) {
                return 1
            } else if (num1 < num2) {
                return -1
            }
        }
        return 0
    }
}