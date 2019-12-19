import GameConfig from "./GameConfig";
import {ApplicationFacade} from "./ApplicationFacade";
import Platform from "./platform/Platform";
import Logger = log4ts.Logger;
import IAppender = log4ts.IAppender;
import ILayout = log4ts.ILayout;
import LoggerConfig = log4ts.LoggerConfig;
import BasicLayout = log4ts.BasicLayout;
import ConsoleAppender = log4ts.ConsoleAppender;
import LogLevel = log4ts.LogLevel;

class Main {
    private logger: Logger;
    private appender: IAppender;
    private layout: ILayout;
    private config: LoggerConfig;

    constructor() {
        //根据IDE设置初始化引擎
        if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
        else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
        Laya["Physics"] && Laya["Physics"].enable();
        Laya["DebugPanel"] && Laya["DebugPanel"].enable();
        Laya.stage.scaleMode = GameConfig.scaleMode;
        Laya.stage.screenMode = GameConfig.screenMode;
        Laya.stage.alignV = GameConfig.alignV;
        Laya.stage.alignH = GameConfig.alignH;
        //兼容微信不支持加载scene后缀场景
        Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
        //关闭多点触摸
        Laya.MouseManager.multiTouchEnabled = false;
        UIConfig.closeDialogOnSide = true;
        //打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
        if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
        if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
        if (GameConfig.stat) Laya.Stat.show();
        Laya.alertGlobalError = true;

        //激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
        Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
    }

    onVersionLoaded(): void {
        //激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
        Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
    }

    onConfigLoaded(): void {
        //提前注册 滤镜的几个类
        Laya.ClassUtils.regClass("laya.effect.ColorFilterSetter", Laya.ColorFilterSetter);
        Laya.ClassUtils.regClass("laya.effect.GlowFilterSetter", Laya.GlowFilterSetter);
        Laya.ClassUtils.regClass("laya.effect.BlurFilterSetter", Laya.BlurFilterSetter);
        //加载IDE指定的场景
        // GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        //初始化平台信息
        window.platform = new Platform();
        window.platform.platformConfig();
        //初始化puremvc 框架  完成后 从 AppMediator.ts
        ApplicationFacade.getInstance().startup(Laya.stage);

        this.layout = new BasicLayout();
        this.appender = new ConsoleAppender();
        this.appender.setLayout(this.layout);
        this.config = new LoggerConfig(this.appender,LogLevel.ALL);
        this.logger = new Logger("sango",true);
        Logger.setConfig(this.config);
        this.logger.error("this is an error");
        this.logger.warn("this is a warn");
        this.logger.log("this is a log");
        this.logger.info("this is an info");
        this.logger.debug("this is a debug");
        this.logger.fatal("this is a fatal");
        this.logger.trace("this is a trace");
    }


}

//激活启动类
new Main();
