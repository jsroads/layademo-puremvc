/**
 * Created by jsroads on 2019-06-17 . 15:42
 * Note:
 */
import BaseProxy from "./BaseProxy";
import AppConstants from "../../AppConstants";
import GameData from "../data/GameData";
import MyLocalStorage from "../data/MyLocalStorage";
import {StorageType} from "../data/GameConstans";
import Helper from "../../utils/Helper";
import TimeTrans from "../../utils/TimeTrans";
import Browser = Laya.Browser;

export default class LoginProxy extends BaseProxy {
    public static NAME: string = "LoginProxy";

    constructor(proxyName?: string, data?: any) {
        super(LoginProxy.NAME, {});
        this.data.count = 0;
    }

    public login(message: any) {
        if (Browser.onMiniGame) {
            window.platform.i.login((res)=>{
                this.loginServer(res.code);
            })
        } else {
            this.loginServer("");
        }
    }

    public loginServer(code?: string) {
        let hasServer = false;//是否使用服务器
        if (hasServer) {
            this.send({url: "/xxx/xxx", code: code}, () => {

            })
        } else {
            this.data.count = GameData.i.serverList.length;
            GameData.i.serverList.forEach(((value, index, array) => {
                MyLocalStorage.i.read(value.type, this.completed.bind(this));

            }))
        }
    }

    completed(value, key) {
        this.data.count--;
        console.log(`completed---key:${key}`);
        switch (key) {
            case StorageType.USER:
                Helper.i.assignObject(GameData.i.user, value);
                let isSameDay = true;
                if (GameData.i.user.loginDays) {
                    isSameDay = TimeTrans.i.timeStampIsSameDay(GameData.i.user.loginTimeStamp, Browser.now());
                    if (!isSameDay) this.updateEveryDay();
                } else {
                    this.updateEveryDay();
                }
                break;
            case StorageType.FRIENDS:
                break;
            case StorageType.SYS:
                break;
        }
        if(this.data.count === 0){
            this.sendNotification(AppConstants.LOGIN_SUCCESS, {data: "OK"});
        }else if(this.data.count<0){
            console.log("错误的消息");
        }
    }

    private updateEveryDay() {
        //TODO 每天更新 重置的数据
    }
}