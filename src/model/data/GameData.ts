/**
 * Created by jsroads on 2019-06-18 . 15:43
 * Note:
 */
import UserVO from "../vo/UserVO";
import {StorageType} from "./GameConstans";
import Browser = Laya.Browser;

export default class GameData {
    private _frineds: any[];

    constructor() {
    }

    private static _i: GameData;

    static get i(): GameData {
        if (!this._i) this._i = new GameData();
        return this._i;
    }

    private _user: UserVO = new UserVO();

    get user(): UserVO {
        return this._user;
    }

    set user(value: UserVO) {
        this._user = value;
    }

    private _serverList: any[];

    get serverList(): any[] {
        if (!this._serverList) {
            this._serverList = [
                {type: StorageType.USER, data: this.user},
                {type: StorageType.FRIENDS, data: this.user},
                {type: StorageType.SYS, data: this.user},
            ]
        }
        return this._serverList;
    }



    init(callBack) {

        GameLocalStorage.ins.getDataByKey(GameLocalStorage.USER, (usr) => {
            if (usr) {
                SMHelper.ins.assignObject(this.user, usr);
            }
            GameData.ins.user.init();
            if (callBack) callBack();
            let isSameDay = true;
            if (GameData.ins.user.loginDays) {
                isSameDay = TimeTrans.ins.timeStampIsSameDay(GameData.ins.user.loginTimeStamp, Browser.now());
                if (!isSameDay) this.updateNewDays();
            } else {
                this.updateNewDays();
            }
            SystemDa
        });
    }

    public dayDataUpdate() {
        //TODO 每日更新写这
    }

    private updateNewDays() {
        GameData.ins.user.loginDays++;
        GameData.ins.user.loginTimeStamp = TimeTrans.ins.getTodayMinTimeStamp();
        GameData.ins.dayDataUpdate();
    }
}