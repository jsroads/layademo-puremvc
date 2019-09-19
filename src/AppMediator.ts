/**
 * Created by jsroads on 2019/6/14 . 18:53
 * Note:
 */
import MainScene from "./view/maiui/MainScene";
import AppConstants from "./AppConstants";
import LoadingMadiator from "./view/loading/LoadingMadiator";
import SystemMediator from "./view/system/SystemMediator";
import ResConfig from "./utils/ResConfig";
import {Fonts} from "./model/data/GameConstans";
import Mediator = puremvc.Mediator;
import Browser = Laya.Browser;
import Handler = Laya.Handler;
import BitmapFont = Laya.BitmapFont;

export default class AppMediator extends Mediator {
    public static NAME: string = "AppMediator";

    constructor(mediatorName?: string) {
        super(AppMediator.NAME);
    }

    public onRegister(): void {
        this.frameComplete();//框架初始化完成
    }

    public getViewComponent(): MainScene {
        return <MainScene>super.getViewComponent();
    }

    public listNotificationInterests(): string[] {
        return [
            AppConstants.LOADING_SUCCESS,
            AppConstants.UPDATE_USER,
            AppConstants.UPDATE_GOLD
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        switch (notification.getName()) {
            case AppConstants.LOADING_SUCCESS:
                this.fllowStyle();
                break;
            case AppConstants.UPDATE_USER:
                break;
            case AppConstants.UPDATE_GOLD:
                break;
            default:
        }
    }

    private frameComplete() {
        //注册 加载
        this.facade.registerMediator(new LoadingMadiator());
        //注册 系统管理
        this.facade.registerMediator(new SystemMediator());
        this.configsLoad();
    }


    private fllowStyle() {
        // if(Browser.onMiniGame)GameAuthorize.getWXSetting();
        [
            {name: Fonts.TEST, url: "bitmapfont/test.fnt"}
        ].forEach((value, index, array) => {
            let bf = new BitmapFont();
            ResConfig.fntDictionary[value.name] = bf;
            bf.loadFont(value.url, Laya.Handler.create(this, () => {
                bf.autoScaleSize = true;
                Laya.Text.registerBitmapFont(value.name, bf);
            }));
        });
        if (!this.viewComponent) {
            this.viewComponent = new MainScene();
            this.viewComponent.on(MainScene.READY_EVENT, this, () => {
                this.registerMediator();
                this.initListener();
                this.checkGuide();
                this.checkDialog();
                this.sendNotification(AppConstants.HEART_START);
                this.sendNotification(AppConstants.CLOSE_LOADING);
            });
            //注意 用舞台添加了 我们的主界面
            Laya.stage.addChild(this.viewComponent);
        }
    }


    /**
     * 注册后续 Mediator
     */
    private registerMediator() {
        //TODO 后续 Mediator
    }

    /**
     * 监听主界面 事件注册
     */
    private initListener() {

    }

    /**
     * 检测 新手引导
     */
    private checkGuide() {

    }

    /**
     * 检测主动弹窗
     */
    private checkDialog() {

    }

    /**
     * 轻量加载 配置文件
     */
    private configsLoad() {
        Laya.loader.load(ResConfig.configs, Handler.create(null, (sucess) => {
            let appConfig = Laya.loader.getRes(ResConfig.appConfigPath);
            ResConfig.options.appConfig = appConfig;
            let resConfig = Laya.loader.getRes(ResConfig.resConfigPath);
            ResConfig.options.resConfig = resConfig;
            let info = ResConfig.options.appConfig.gameOptions;
            let paths = [info.basePath, info.name, info.platform, info.version];
            if (Browser.onMiniGame) {
                Laya.URL.basePath = paths.join("/") + "/";
                // Laya.MiniAdpter.nativefiles = assets.nativefiles;
            }
            this.sendNotification(AppConstants.LOGIN, {appId: info.appId});
        }));
    }
}