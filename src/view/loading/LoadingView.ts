/**
 * Created by jsroads on 2019/6/14 . 15:06
 * Note:
 */
import {ui} from "../../ui/layaMaxUI";
import LoadHelper from "./LoadHelper";
import ResConfig from "../../utils/ResConfig";
import Event = Laya.Event;
import Handler = Laya.Handler;
import Browser = Laya.Browser;
import Tween = Laya.Tween;
import LoadUI = ui.smile.LoadUI;
import AppScreen from "../../utils/AppScreen";

export default class LoadingView extends LoadUI {
    public static LOAD_COMPLETE: string = "load_complete";

    constructor() {
        super();
        this.autoDestroyAtClosed = true;
    }

    public onAwake() {
        this.bar.value = 0;
        this.bar.changeHandler = new Handler(this, this.changeValue, null, false);
        this.logoMovie.play(0,true);
        Laya.loader.on(Event.ERROR, this, (e) => {
            console.log("Laya.loader:ERROR" + JSON.stringify(e));
        });
        let assets = ResConfig.options.resConfig;
        let jsonsOptions = assets.jsonsOptions, resources = [], info = assets.baseInfo;
        for (let key in jsonsOptions) {
            let option = jsonsOptions[key];
            resources.push(option);
            let res = Laya.loader.getRes(option);
            if (res) Laya.loader.clearRes(option);
        }
        resources.push("img_empty.png");
        resources = resources.concat(LoadHelper.i.parseSources(assets));
        this.versionText.text = ResConfig.options.appConfig.gameOptions.version;
        if (!Browser.onMiniGame) {
            let subpackages: Array<any> = LoadHelper.i.parseSources(ResConfig.options.appConfig.subpackages);
            resources = resources.concat(subpackages);
        }
        Laya.loader.load(resources, Handler.create(this, (sucess) => {
            // console.log("smile------resources:" + JSON.stringify(sucess));
            if (sucess) {
                if (Browser.onMiniGame) {
                    window.platform.i.menuShareMessage();
                    console.log("smile------开放域:" + JSON.stringify("发送数据"));
                    Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/rank.atlas");
                    // //使用接口将json投促函到子域
                    // Laya.MiniAdpter.sendJsonDataToDataContext("json/reward.json");
                    Laya.MiniAdpter.sendSinglePicToOpenDataContext("rank/fontclip_rank.png");
                    this.loadSubpackages();
                }
            }
        }), this.bar.changeHandler);
    }

    public onEnable(): void {
        this.alpha = 0;
        this.zOrder = 1200;
        Tween.to(this, {alpha: 1}, 50);
    }

    private changeValue(progress): void {
        // console.log("mini加载进度：" + Math.floor(progress * 100) + "%");
        if (this.bar && this.bar.value >= 1) {
            if (!Browser.onMiniGame) {
                this.bar.value = 1;
                this.bar.changeHandler.clear();
                this.event(LoadingView.LOAD_COMPLETE);
            } else {
                this.bar.value = 0;
            }
            return;
        }
        if (this.bar) {
            this.bar.value = progress;
        }
    }

    private loadSubpackages() {
        let packages = ResConfig.options.appConfig.subpackages, count: number = 0;
        if (!packages.length) {
            console.log("smile------:" + JSON.stringify("分包已经加载成功"));
            this.bar.changeHandler.clear();
            this.event(LoadingView.LOAD_COMPLETE);
            return;
        }
        let url = packages.shift()["name"],self = this;
        let loadTask = window.platform.i.loadSubpackage({
            name: url, // name 可以填 name 或者 root
            success: function (res) {
                // 分包加载成功后通过 success 回调
                self.loadSubpackages();
            },
            fail: function (res) {
                // 分包加载失败通过 fail 回调
            },
            complete: function (res) {
            }
        });
        console.log("smile------loadTask.onProgressUpdate:" + loadTask.onProgressUpdate);
        loadTask.onProgressUpdate((res) => {
            this.bar.value = res.progress / 100;
            console.log('下载进度', res.progress);
            // console.log('已经下载的数据长度', res.totalBytesWritten);
            // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })
    }
}
