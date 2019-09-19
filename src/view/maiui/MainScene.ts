/**
 * Created by jsroads on 2019/6/15 . 11:49
 * Note:
 */
import {ui} from "../../ui/layaMaxUI";
import Tween = Laya.Tween;
import MainUI = ui.smile.MainUI;
import {Fonts} from "../../model/data/GameConstans";

export default class MainScene extends MainUI {
    public static READY_EVENT: string = "ready_event";

    constructor() {
        super();
    }

    public onAwake(): void {
        this.titleText.font = Fonts.TEST;
        this.event(MainScene.READY_EVENT);
    }

    public onEnable(): void {
        this.alpha = 0;
        Tween.to(this, {alpha: 1}, 300)
    }

}