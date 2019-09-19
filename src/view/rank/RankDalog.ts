/**
 * Created by jsroads on 2019-08-10.11:20
 * Note:
 */
import {ui} from "../../ui/layaMaxUI";
import {IScene} from "../../model/interface/IScene";
import MyConfig from "../../com/config/MyConfig";
import BannerHelper from "../../com/utils/BannerHelper";
import GameData from "../../model/data/GameData";
import WXHelper from "../../com/utils/WXHelper";
import Event = Laya.Event;
import RankDialogUI = ui.my.RankDialogUI;

export const RANK_LIST_CONST = {
    RANK_OPEN: "rank_open"
};
export const RANK_TYPE = {
    FRIENDS: "friends"
};
export default class RankDalog extends RankDialogUI implements IScene {
    public NAME: string = "RankDalog";
    public bannerUpdateCount: number = 1;
    public bannerCurrentCount: number = 0;

    constructor() {
        super();
    }

    public onEnable(): void {
        this.size(MyConfig.width, MyConfig.height);
    }

    public onAwake() {
        this.closeBtn.on(Event.CLICK, this, () => {
            this.close();
        });
        this.bannerUpdateCount = BannerHelper.ins.getBannerInfoById(this.NAME);
    }

    public onOpened(param: any): void {
        param = {code: RANK_LIST_CONST.RANK_OPEN, key: RANK_TYPE.FRIENDS};
        param.width = this.container.width;
        param.height = this.container.height;
        param.x = this.container.x;
        param.y = this.container.y;
        param.score = GameData.ins.user.gold;
        console.log("param:" + JSON.stringify(param));
        this.container.postMsg(param);
        Laya.stage.addChild(this);
        WXHelper.ins.showBanner(this);
    }
}