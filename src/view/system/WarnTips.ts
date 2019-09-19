/**
 /**
 * Created by jsroads on 2019-06-17 . 15:20
 * Note:
 */
import {ui} from "../../ui/layaMaxUI";
import MyConfig from "../../com/config/MyConfig";
import WarnTipsUI = ui.my.WarnTipsUI;

export class WarnTips extends WarnTipsUI {
    constructor(autoDestory = false) {
        super();
        this.autoDestroyAtClosed = autoDestory;
    }

    private static _i: WarnTips;

    public static get i(): WarnTips {
        this._i = new WarnTips();
        return this._i;
    }

    public tips(param: string) {
        this.open(false, param)
    }

    open(closeOther?: boolean, param?: any): void {
        Laya.Scene.load("mykj/system/WarnTips.scene", Laya.Handler.create(this, () => {
            Laya.stage.addChild(this);
            this.zOrder = 10000;
            this.onOpened(param);
            this.alpha = 1;
            this.descriptionTxt.text = param;
            this.pos((MyConfig.width - this.width) / 2, MyConfig.height * 0.4);
            this.showByTween();
        }));
    }

    /**
     * 动画收起完成
     */
    public completeHanderIn(): void {
        Laya.Tween.clearAll(this);
        this.removeSelf();
    }

    private showByTween(): void {
        Laya.Tween.clearAll(this);
        Laya.timer.clearAll(this);
        Laya.Tween.to(this, {y: MyConfig.height * 0.3}, 1000
            , Laya.Ease.backOut, Laya.Handler.create(this, this.completeHanderOut), 0, true, true);
    }

    /**
     * 动画打开完成
     */
    private completeHanderOut(weav): void {
        Laya.Tween.to(this, {alpha: 0.3}, 300
            , Laya.Ease.backIn, Laya.Handler.create(this, this.completeHanderIn), 0, true, true);
    }

}

