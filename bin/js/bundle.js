(function () {
    'use strict';

    class AppScreen {
        static get width() {
            return 750;
        }
        static get height() {
            if (!this._height) {
                this._height = this.width * (Laya.Browser.clientHeight / Laya.Browser.clientWidth);
            }
            return this._height;
        }
        static get halfWidth() {
            if (!this._halfWidth)
                this._halfWidth = this.width * 0.5;
            return this._halfWidth;
        }
        static get halfHeight() {
            if (!this._halfHeight)
                this._halfHeight = this.height * 0.5;
            return this._halfHeight;
        }
        static get size() {
            if (!this._size)
                this._size = { width: this.width, height: this.height };
            return this._size;
        }
        static largeScreen() {
            return (Laya.Browser.clientWidth / Laya.Browser.clientHeight) <= (414 / 896) ? true : false;
        }
        static bigScreen() {
            return (Laya.Browser.clientWidth / Laya.Browser.clientHeight) < (375 / 667) ? true : false;
        }
    }

    var Script = Laya.Script;
    class ContentAdapter extends Script {
        constructor() {
            super();
            this.top = 0;
            this.bottom = 0;
            this.left = 0;
            this.right = 0;
        }
        get myOwner() {
            return this.owner;
        }
        onAwake() {
            this.myOwner.size(AppScreen.width - (this.left + this.right), AppScreen.height - (this.top + this.bottom));
            if (this.left) {
                this.myOwner.x = this.left;
            }
            if (this.right) {
                this.myOwner.x = this.myOwner.width - this.right;
            }
            if (this.top) {
                this.myOwner.y = this.top;
            }
            if (this.bottom) {
                this.myOwner.y = this.myOwner.height - this.bottom;
            }
        }
    }

    class GameConfig {
        constructor() {
        }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("utils/ContentAdapter.ts", ContentAdapter);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "none";
    GameConfig.alignV = "top";
    GameConfig.alignH = "left";
    GameConfig.startScene = "smile/Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class AppConstants {
    }
    AppConstants.SHOW_LOGIN = "show_login";
    AppConstants.LOGIN = "login";
    AppConstants.LOGIN_SUCCESS = "login_success";
    AppConstants.AUTHORIZE_COMPLETE = "authorize_complete";
    AppConstants.HEART_START = "heart_start";
    AppConstants.LOADING_SUCCESS = "loading_success";
    AppConstants.FLLOW_INIT = "fllow_init";
    AppConstants.CLOSE_LOADING = "close_loading";
    AppConstants.SHOW_RANK = "show_rank";
    AppConstants.UPDATE_USER = "update_user";
    AppConstants.UPDATE_GOLD = "update_gold";
    AppConstants.NETWORK_STATUS_CHANGE = "network_status_change";
    AppConstants.REMOVE_MADIATOR = "remove_madiator";

    var METHOD_TYPE;
    (function (METHOD_TYPE) {
        METHOD_TYPE["JSON"] = "json";
        METHOD_TYPE["TEXT"] = "text";
        METHOD_TYPE["XML"] = "xml";
        METHOD_TYPE["ARRAY_BUFFER"] = "arraybuffer";
    })(METHOD_TYPE || (METHOD_TYPE = {}));
    var RES_TYPE;
    (function (RES_TYPE) {
        RES_TYPE["POST"] = "post";
        RES_TYPE["GET"] = "get";
        RES_TYPE["head"] = "head";
    })(RES_TYPE || (RES_TYPE = {}));
    const URL = "";
    const SessionId = "";
    const Success = 0;
    class Https extends Laya.HttpRequest {
        constructor() {
            super();
            this.http.timeout = 10000;
        }
        sendMassage(data, callback) {
            this.emit(data, callback, true);
        }
        login(data, callback) {
            this.emit(data, callback, false);
        }
        emit(data, callback, need) {
            this.once(Laya.Event.COMPLETE, this, (e) => {
                this.offAll();
                if (e.code == Success) {
                    if (callback)
                        callback(e.data);
                }
                else {
                    throw new Error(e);
                }
            });
            this.once(Laya.Event.ERROR, this, (e) => {
                this.offAll();
            });
            let headers = ["Content-Type", "application/json", "sessionId"];
            if (need)
                headers.push(SessionId);
            let msg = JSON.stringify(data);
            this.send(URL + data.url, msg, RES_TYPE.POST, METHOD_TYPE.JSON, headers);
        }
    }

    class BaseProxy extends puremvc.Proxy {
        constructor(proxyName, data) {
            super(proxyName, data);
        }
        send(msg, callBack) {
            let xhr = new Https();
            xhr.sendMassage(msg, callBack);
        }
        login(msg, callBack) {
            let xhr = new Https();
            xhr.login(msg, callBack);
        }
        responseCallBack(data) {
            this.setData(data);
        }
    }
    BaseProxy.NAME = "BaseProxy";

    class MyLocalStorage {
        static get i() {
            if (!this._i)
                this._i = new MyLocalStorage();
            return this._i;
        }
        write(key, value, callBack) {
            console.log("smile----:" + JSON.stringify(value));
            Laya.LocalStorage.setItem(key, JSON.stringify(value));
            if (callBack)
                callBack();
        }
        read(key, callBack, defaultValue) {
            let value = Laya.LocalStorage.getItem(key);
            if (callBack) {
                callBack(JSON.parse(value) || defaultValue, key);
            }
            else {
                return JSON.parse(value) || defaultValue;
            }
        }
        clearByKey(key) {
            Laya.LocalStorage.removeItem(key);
        }
        clearAll() {
            Laya.LocalStorage.clear();
        }
    }

    var Goods;
    (function (Goods) {
        Goods[Goods["GOLD"] = -1] = "GOLD";
        Goods[Goods["MILK"] = -2] = "MILK";
    })(Goods || (Goods = {}));
    var Fonts;
    (function (Fonts) {
        Fonts["TEST"] = "test";
    })(Fonts || (Fonts = {}));
    var PayType;
    (function (PayType) {
        PayType["MAGIC"] = "magic";
        PayType["OFFLINE"] = "offline";
        PayType["WHEEL"] = "wheel";
        PayType["BOX"] = "box";
        PayType["UPGRADEHUNT"] = "upgradehunt";
    })(PayType || (PayType = {}));
    var Money;
    (function (Money) {
        Money["SHARE"] = "share";
        Money["VIDEO"] = "video";
        Money["FREE"] = "free";
    })(Money || (Money = {}));
    var StorageType;
    (function (StorageType) {
        StorageType["USER"] = "user";
        StorageType["FRIENDS"] = "friends";
        StorageType["SYS"] = "sys";
    })(StorageType || (StorageType = {}));
    var RedPointType;
    (function (RedPointType) {
        RedPointType[RedPointType["UPGRADE_USER_LEVEL"] = 1] = "UPGRADE_USER_LEVEL";
        RedPointType[RedPointType["FREE_GIFT"] = 2] = "FREE_GIFT";
    })(RedPointType || (RedPointType = {}));

    class WarnCode {
    }
    WarnCode.SEVER_ERROR = "服务器正在优化";
    WarnCode.GOLD_NOT_ENOUGH = "金币不足";
    WarnCode.MAX_LEVEL = "已达当前等级上限";
    WarnCode.VIDEO = "视频获得";
    WarnCode.SHARE = "分享获得";
    WarnCode.FRE = "免费获得";
    WarnCode.SINGLETON_MSG = "this singleton already constructed!";

    class CustomEventDispatcher extends Laya.EventDispatcher {
        constructor() {
            super();
            if (CustomEventDispatcher._i) {
                throw new Error(WarnCode.SINGLETON_MSG);
                return;
            }
        }
        static get i() {
            if (!this._i)
                this._i = new CustomEventDispatcher();
            return this._i;
        }
    }

    var CustomEventConstants;
    (function (CustomEventConstants) {
        CustomEventConstants["RED_POINT_CHECK"] = "red_point_check";
    })(CustomEventConstants || (CustomEventConstants = {}));

    class UserVO {
        constructor() {
            this._gold = 3000;
            this._nickName = "游客";
            this._userId = "-10086";
            this._level = 0;
            this._offLineTimeStamp = 0;
            this._loginTimeStamp = 0;
            this._loginDays = 0;
        }
        get gold() {
            return this._gold;
        }
        set gold(value) {
            this._gold = value;
            this.write();
            this.checkRedPoint([RedPointType.UPGRADE_USER_LEVEL]);
        }
        get nickName() {
            return this._nickName;
        }
        set nickName(value) {
            this._nickName = value;
        }
        get userId() {
            return this._userId;
        }
        set userId(value) {
            this._userId = value;
        }
        get level() {
            return this._level;
        }
        set level(value) {
            this._level = value;
        }
        get offLineTimeStamp() {
            return this._offLineTimeStamp;
        }
        set offLineTimeStamp(value) {
            this._offLineTimeStamp = value;
            this.write();
        }
        get loginTimeStamp() {
            return this._loginTimeStamp;
        }
        set loginTimeStamp(value) {
            this._loginTimeStamp = value;
        }
        get loginDays() {
            return this._loginDays;
        }
        set loginDays(value) {
            this._loginDays = value;
            this.write();
        }
        init() {
        }
        write() {
            let ins = JSON.parse(JSON.stringify(this));
            MyLocalStorage.i.write(StorageType.USER, ins, () => {
            });
        }
        read() {
            let ins = JSON.parse(JSON.stringify(this));
            MyLocalStorage.i.read(StorageType.USER, (value) => {
            }, ins);
        }
        checkRedPoint(list) {
            CustomEventDispatcher.i.event(CustomEventConstants.RED_POINT_CHECK, { list: list });
        }
    }

    var Browser = Laya.Browser;
    class GameData {
        constructor() {
            this._user = new UserVO();
        }
        static get i() {
            if (!this._i)
                this._i = new GameData();
            return this._i;
        }
        get user() {
            return this._user;
        }
        set user(value) {
            this._user = value;
        }
        get serverList() {
            if (!this._serverList) {
                this._serverList = [
                    { type: StorageType.USER, data: this.user },
                    { type: StorageType.FRIENDS, data: this.user },
                    { type: StorageType.SYS, data: this.user },
                ];
            }
            return this._serverList;
        }
        init(callBack) {
            GameLocalStorage.ins.getDataByKey(GameLocalStorage.USER, (usr) => {
                if (usr) {
                    SMHelper.ins.assignObject(this.user, usr);
                }
                GameData.ins.user.init();
                if (callBack)
                    callBack();
                let isSameDay = true;
                if (GameData.ins.user.loginDays) {
                    isSameDay = TimeTrans.ins.timeStampIsSameDay(GameData.ins.user.loginTimeStamp, Browser.now());
                    if (!isSameDay)
                        this.updateNewDays();
                }
                else {
                    this.updateNewDays();
                }
            });
        }
        dayDataUpdate() {
        }
        updateNewDays() {
            GameData.ins.user.loginDays++;
            GameData.ins.user.loginTimeStamp = TimeTrans.ins.getTodayMinTimeStamp();
            GameData.ins.dayDataUpdate();
        }
    }

    class Helper {
        static get i() {
            if (!this._i)
                this._i = new Helper();
            return this._i;
        }
        static splitKV(value) {
            let result = {};
            let allStrings = value.split("&");
            if (allStrings && allStrings.length) {
                allStrings.forEach(element => {
                    if (!element && element.trim().length > 0) {
                        let pairs = element.split("=");
                        if (!pairs && pairs.length == 2) {
                            result[pairs[0]] = pairs[1];
                        }
                    }
                });
            }
            return result;
        }
        deepCopy(source) {
            let target = Array.isArray(source) ? [] : {};
            for (var k in source) {
                if (typeof source[k] === 'object') {
                    target[k] = this.deepCopy(source[k]);
                }
                else {
                    target[k] = source[k];
                }
            }
            return target;
        }
        assignObject(ret, src) {
            for (var k in src) {
                ret[k] = typeof src[k] === 'object' ? this.assignObject(src[k] ? src[k] : {}, ret[k]) : src[k];
            }
            return ret;
        }
        objectToArray(data) {
            let list = Object.keys(data).map((value, index, array) => {
                return data[value];
            });
            return list;
        }
        rewardsFromString(reward) {
            let array = reward.split(";");
            array.forEach(((value, index, array1) => {
                array1[index] = Helper.i.oneRewardFromStr(value);
            }));
            return array;
        }
        oneRewardFromStr(str) {
            let value = str.split(","), reward;
            reward = { id: parseInt(value[0]), count: parseInt(value[1]) };
            return reward;
        }
    }

    var Browser$1 = Laya.Browser;
    const oneDayTimeStamp = 1 * 24 * 60 * 60 * 1000;
    const cnMonthWords = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    const BEI_JING = 8 * 60 * 60 * 1000;
    class TimeTrans$1 {
        static get i() {
            if (!this._i)
                this._i = new TimeTrans$1();
            return this._i;
        }
        getDateByTimeStamp(timeStamp) {
            return this.buildDateBySplitSign({ timeStamp });
        }
        getYYYYMMDDHHmmDateByTimeStamp(timeStamp) {
            return this.buildYYYYMMDDHHmmDateBySplitSign({ timeStamp });
        }
        getCNDateByTimeStamp(timeStamp) {
            return this.buildDateBySplitSign({
                timeStamp,
                yearSign: "年",
                monthSign: "月",
                daySign: "日 "
            });
        }
        getDateByTimeStampEndWithDay(timeStamp) {
            let dateStr = this.getDateByTimeStamp(timeStamp);
            return dateStr.split(' ')[0];
        }
        getDateByTimeStampEndWithMonth(timeStamp) {
            let dateStr = this.getDateByTimeStamp(timeStamp);
            return `${dateStr.split('-')[0]}-${dateStr.split('-')[1]}`;
        }
        getCNDateByTimeStampEndWithDay(timeStamp) {
            let dateStr = this.getCNDateByTimeStamp(timeStamp);
            return dateStr.split(' ')[0];
        }
        getCNDateByTimeStampEndWithMonth(timeStamp) {
            let dateStr = this.getDateByTimeStamp(timeStamp);
            return `${dateStr.split('-')[0]}年${dateStr.split('-')[1]}月`;
        }
        getTodayMinTimeStamp() {
            return this.getMinTimeStampByTimeStamp(Browser$1.now());
        }
        getTodayMaxTimeStamp() {
            return this.getMaxTimeStampByTimeStamp(Browser$1.now());
        }
        getYesterdayMinTimeStamp() {
            return this.getMinTimeStampByTimeStamp(Browser$1.now()) - oneDayTimeStamp;
        }
        getYesterdayMaxTimeStamp() {
            return this.getMaxTimeStampByTimeStamp(Browser$1.now()) - oneDayTimeStamp;
        }
        getMinTimeStampByTimeStamp(timeStamp) {
            let nowDate = new Date(timeStamp);
            nowDate.setHours(0);
            nowDate.setMinutes(0);
            nowDate.setMilliseconds(0);
            let minTime = nowDate.setSeconds(0);
            return minTime;
        }
        getMaxTimeStampByTimeStamp(timeStamp) {
            let nowDate = new Date(timeStamp);
            nowDate.setHours(23);
            nowDate.setMinutes(59);
            nowDate.setMilliseconds(999);
            let maxTime = nowDate.setSeconds(59);
            return maxTime;
        }
        getCurrentWeekMinTimeStamp() {
            return this.getWeekMinTimeStampByTimeStamp(Browser$1.now());
        }
        getCurrentWeekMaxTimeStamp() {
            return this.getWeekMaxTimeStampByTimeStamp(Browser$1.now());
        }
        getWeekMinTimeStampByTimeStamp(timeStamp) {
            let minTime = this.getMinTimeStampByTimeStamp(timeStamp);
            let now = new Date(minTime);
            let dayOfWeek = now.getDay();
            if (dayOfWeek == 0) {
                dayOfWeek = 7;
            }
            return minTime - (dayOfWeek - 1) * oneDayTimeStamp;
        }
        getWeekMaxTimeStampByTimeStamp(timeStamp) {
            let maxTime = this.getMaxTimeStampByTimeStamp(timeStamp);
            let now = new Date(maxTime);
            let dayOfWeek = now.getDay();
            if (dayOfWeek == 0) {
                dayOfWeek = 7;
            }
            return maxTime + (7 - dayOfWeek) * oneDayTimeStamp;
        }
        getCurrentMonthMinTimeStamp() {
            return this.getMonthMinTimeStampByTimeStamp(Browser$1.now());
        }
        getCurrentMonthMaxTimeStamp() {
            return this.getMonthMaxTimeStampByTimeStamp(Browser$1.now());
        }
        getMonthMinTimeStampByTimeStamp(timeStamp) {
            let date = new Date(timeStamp);
            date.setDate(1);
            return this.getMinTimeStampByTimeStamp(date.getTime());
        }
        getMonthMaxTimeStampByTimeStamp(timeStamp) {
            let date = new Date(timeStamp);
            date.setDate(1);
            date.setMonth(date.getMonth() + 1);
            return (this.getMaxTimeStampByTimeStamp(date.getTime()) - oneDayTimeStamp);
        }
        getCNTimeByTimeStamp(mss) {
            let string = "";
            let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = (mss % (1000 * 60)) / 1000;
            seconds = Math.ceil(seconds);
            if (hours != 0) {
                string = hours + "小时" + minutes + "分" + seconds + "秒";
            }
            else {
                if (minutes != 0) {
                    string = +minutes + "分" + seconds + "秒";
                }
                else {
                    if (seconds != 0) {
                        string = seconds + "秒";
                    }
                }
            }
            return string;
        }
        getWeekDayByTimeStamp(timeStamp) {
            let date = new Date(timeStamp);
            let weekDay = date.getDay();
            if (weekDay == 0) {
                weekDay = 7;
            }
            return weekDay;
        }
        getCNWeekDayByTimeStamp(timeStamp) {
            let cnWeekWord = ["天", "一", "二", "三", "四", "五", "六"];
            let date = new Date(timeStamp);
            let weekDay = date.getDay();
            return `星期${cnWeekWord[weekDay]}`;
        }
        getNewTimeStampByAddDay(timeStamp, addDayCount) {
            return timeStamp + (oneDayTimeStamp * addDayCount);
        }
        getCurrentDateWeekCountInYear() {
            return this.getWeekCountInYearByTimeStamp(Browser$1.now());
        }
        getCurrentDateMonthCountInYear() {
            return this.getMonthCountInYearByTimeStamp(Browser$1.now());
        }
        getCurrentDateMonthCNNameInYear() {
            return `${cnMonthWords[this.getMonthCountInYearByTimeStamp(Browser$1.now())]}月`;
        }
        getMonthCNNameInYearByTimeStamp(timeStamp) {
            return `${cnMonthWords[this.getMonthCountInYearByTimeStamp(timeStamp)]}月`;
        }
        getWeekCountInYearByTimeStamp(timeStamp) {
            let today = new Date(timeStamp);
            let firstDay = new Date(today.getFullYear(), 0, 1);
            let dayOfWeek = firstDay.getDay();
            let spendDay = 1;
            if (dayOfWeek != 0) {
                spendDay = 7 - dayOfWeek + 1;
            }
            firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
            let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / oneDayTimeStamp);
            let result = Math.ceil(d / 7);
            return result + 1;
        }
        getMonthCountInYearByTimeStamp(timeStamp) {
            var today = new Date(timeStamp);
            let result = today.getMonth();
            return result + 1;
        }
        timeStampIsSameWeek(timeStamp1, timeStamp2) {
            let old_count = Math.floor((timeStamp1 + BEI_JING) / oneDayTimeStamp);
            let now_other = Math.floor((timeStamp2 + BEI_JING) / oneDayTimeStamp);
            return Math.floor((old_count + 3) / 7) == Math.floor((now_other + 3) / 7);
        }
        timeStampIsSameMonth(timeStamp1, timeStamp2) {
            let date1 = new Date(timeStamp1);
            let date2 = new Date(timeStamp2);
            return (date1.getMonth() == date2.getMonth()) && (date1.getFullYear() == date2.getFullYear());
        }
        timeStampIsSameDay(timeStamp1, timeStamp2) {
            let old_count = Math.floor(timeStamp1 / oneDayTimeStamp);
            let now_other = Math.floor(timeStamp2 / oneDayTimeStamp);
            return old_count === now_other;
        }
        buildDateBySplitSign({ timeStamp, yearSign = "-", monthSign = "-", daySign = " ", hourSign = ":", minuteSign = ":", secondSign = "" }) {
            if (timeStamp) {
                timeStamp = Number(timeStamp);
            }
            let date = new Date(timeStamp);
            let Y = date.getFullYear() + yearSign;
            let M = (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1) + monthSign) : (date.getMonth() + 1) + monthSign);
            let D = date.getDate() < 10 ? '0' + date.getDate() + daySign : date.getDate() + daySign;
            let h = date.getHours() < 10 ? '0' + date.getHours() + hourSign : date.getHours() + hourSign;
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + minuteSign : date.getMinutes() + minuteSign;
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + secondSign : date.getSeconds() + secondSign;
            return Y + M + D + h + m + s;
        }
        buildYYYYMMDDHHmmDateBySplitSign({ timeStamp, yearSign = "-", monthSign = "-", daySign = " ", hourSign = ":", minuteSign = ":", secondSign = "" }) {
            if (timeStamp) {
                timeStamp = Number(timeStamp);
            }
            let date = new Date(timeStamp);
            let Y = date.getFullYear() + yearSign;
            let M = (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1) + monthSign) : (date.getMonth() + 1) + monthSign);
            let D = date.getDate() < 10 ? '0' + date.getDate() + daySign : date.getDate() + daySign;
            let h = date.getHours() < 10 ? '0' + date.getHours() + hourSign : date.getHours() + hourSign;
            let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + secondSign : date.getSeconds() + secondSign;
            if (date.getFullYear() == new Date(Browser$1.now()).getFullYear()) {
                return M + D + h + m;
            }
            return Y + M + D + h + m;
        }
    }

    var Browser$2 = Laya.Browser;
    class LoginProxy extends BaseProxy {
        constructor(proxyName, data) {
            super(LoginProxy.NAME, {});
            this.data.count = 0;
        }
        login(message) {
            if (Browser$2.onMiniGame) {
                window.platform.i.login((res) => {
                    this.loginServer(res.code);
                });
            }
            else {
                this.loginServer("");
            }
        }
        loginServer(code) {
            {
                this.data.count = GameData.i.serverList.length;
                GameData.i.serverList.forEach(((value, index, array) => {
                    MyLocalStorage.i.read(value.type, this.completed.bind(this));
                }));
            }
        }
        completed(value, key) {
            this.data.count--;
            switch (key) {
                case StorageType.USER:
                    Helper.i.assignObject(GameData.i.user, value);
                    let isSameDay = true;
                    if (GameData.i.user.loginDays) {
                        isSameDay = TimeTrans$1.i.timeStampIsSameDay(GameData.i.user.loginTimeStamp, Browser$2.now());
                        if (!isSameDay)
                            this.updateEveryDay();
                    }
                    else {
                        this.updateEveryDay();
                    }
                    break;
                case StorageType.FRIENDS:
                    break;
                case StorageType.SYS:
                    break;
            }
            if (this.data.count === 0) {
                this.sendNotification(AppConstants.LOGIN_SUCCESS, { data: "OK" });
            }
            else if (this.data.count < 0) {
                console.log("错误的消息");
            }
        }
        updateEveryDay() {
        }
    }
    LoginProxy.NAME = "LoginProxy";

    var SimpleCommand = puremvc.SimpleCommand;
    class LoginCommand extends SimpleCommand {
        constructor() {
            super();
        }
        execute(notification) {
            let proxy = this.facade.retrieveProxy(LoginProxy.NAME);
            proxy.login(notification.getBody());
        }
    }

    var SimpleCommand$1 = puremvc.SimpleCommand;
    class ControllerCommands extends SimpleCommand$1 {
        constructor() {
            super();
        }
        execute(note) {
            this.facade.registerCommand(AppConstants.LOGIN, LoginCommand);
        }
    }

    var SimpleCommand$2 = puremvc.SimpleCommand;
    class ModelPrepCommand extends SimpleCommand$2 {
        constructor() {
            super();
        }
        execute(note) {
            this.facade.registerProxy(new LoginProxy());
        }
    }

    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var smile;
        (function (smile) {
            class LoadUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("smile/Load");
                }
            }
            smile.LoadUI = LoadUI;
            REG("ui.smile.LoadUI", LoadUI);
            class MainUI extends Laya.Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("smile/Main");
                }
            }
            smile.MainUI = MainUI;
            REG("ui.smile.MainUI", MainUI);
        })(smile = ui.smile || (ui.smile = {}));
    })(ui || (ui = {}));

    var Tween = Laya.Tween;
    var MainUI = ui.smile.MainUI;
    class MainScene extends MainUI {
        constructor() {
            super();
        }
        onAwake() {
            this.titleText.font = Fonts.TEST;
            this.event(MainScene.READY_EVENT);
        }
        onEnable() {
            this.alpha = 0;
            Tween.to(this, { alpha: 1 }, 300);
        }
    }
    MainScene.READY_EVENT = "ready_event";

    class LoadHelper {
        static get i() {
            if (!this._i)
                this._i = new LoadHelper();
            return this._i;
        }
        parseSources(obj) {
            let baseAssetsList = [], element;
            for (let key in obj) {
                element = null;
                switch (key) {
                    case "scene_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.JSON);
                        break;
                    case "atlas_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.ATLAS);
                        break;
                    case "prefab":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.PREFAB);
                        break;
                    case "json_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.JSON);
                        break;
                    case "font_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.XML);
                        break;
                    case "text_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.TEXT);
                        break;
                    case "image_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.IMAGE);
                        break;
                    case "sk_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.BUFFER);
                        break;
                    case "particles_assets":
                        if (obj[key].length > 0)
                            element = this.loadList(obj[key], Laya.Loader.JSON);
                        break;
                    case "resourceOptions":
                        if (obj[key])
                            element = this.loadJsons(obj[key], Laya.Loader.JSON);
                        break;
                    default:
                        break;
                }
                if (element)
                    baseAssetsList = baseAssetsList.concat(element);
            }
            return baseAssetsList;
        }
        getUrlEncode(url, type) {
            if (url.indexOf(".json") !== -1 || url.indexOf(".fnt") != -1)
                return "utf8";
            return "ascii";
        }
        loadList(array, type) {
            let list = [], element;
            for (let i = 0; i < array.length; i++) {
                if (array[i])
                    element = { url: array[i], type: type };
                if (element)
                    list.push(element);
            }
            return list;
        }
        loadJsons(obj, type) {
            let list = [], element;
            for (let key in obj) {
                if (obj[key])
                    element = { url: obj[key], type: type };
                if (element)
                    list.push(element);
            }
            return list;
        }
    }

    class ResConfig {
        static get fntDictionary() {
            return this._fntDictionary;
        }
        static set fntDictionary(value) {
            this._fntDictionary = value;
        }
        static get configs() {
            if (!this._configs.length) {
                this._configs.push(ResConfig.appConfigPath, ResConfig.resConfigPath);
            }
            return this._configs;
        }
        static get options() {
            return this._options;
        }
        static set options(value) {
            this._options = value;
        }
    }
    ResConfig.appConfigPath = "res/jsons/appconfig.json";
    ResConfig.resConfigPath = "res/jsons/resconfig.json";
    ResConfig.lightRes = [""];
    ResConfig._configs = [];
    ResConfig._options = {};
    ResConfig._fntDictionary = {};

    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var Browser$3 = Laya.Browser;
    var Tween$1 = Laya.Tween;
    var LoadUI = ui.smile.LoadUI;
    class LoadingView extends LoadUI {
        constructor() {
            super();
            this.autoDestroyAtClosed = true;
        }
        onAwake() {
            this.bar.value = 0;
            this.bar.changeHandler = new Handler(this, this.changeValue, null, false);
            this.logoMovie.play(0, true);
            Laya.loader.on(Event.ERROR, this, (e) => {
                console.log("Laya.loader:ERROR" + JSON.stringify(e));
            });
            let assets = ResConfig.options.resConfig;
            let jsonsOptions = assets.jsonsOptions, resources = [], info = assets.baseInfo;
            for (let key in jsonsOptions) {
                let option = jsonsOptions[key];
                resources.push(option);
                let res = Laya.loader.getRes(option);
                if (res)
                    Laya.loader.clearRes(option);
            }
            resources.push("img_empty.png");
            resources = resources.concat(LoadHelper.i.parseSources(assets));
            this.versionText.text = ResConfig.options.appConfig.gameOptions.version;
            if (!Browser$3.onMiniGame) {
                let subpackages = LoadHelper.i.parseSources(ResConfig.options.appConfig.subpackages);
                resources = resources.concat(subpackages);
            }
            Laya.loader.load(resources, Handler.create(this, (sucess) => {
                if (sucess) {
                    if (Browser$3.onMiniGame) {
                        window.platform.i.menuShareMessage();
                        console.log("smile------开放域:" + JSON.stringify("发送数据"));
                        Laya.MiniAdpter.sendAtlasToOpenDataContext("res/atlas/rank.atlas");
                        Laya.MiniAdpter.sendSinglePicToOpenDataContext("rank/fontclip_rank.png");
                        this.loadSubpackages();
                    }
                }
            }), this.bar.changeHandler);
        }
        onEnable() {
            this.alpha = 0;
            this.zOrder = 1200;
            Tween$1.to(this, { alpha: 1 }, 50);
        }
        changeValue(progress) {
            if (this.bar && this.bar.value >= 1) {
                if (!Browser$3.onMiniGame) {
                    this.bar.value = 1;
                    this.bar.changeHandler.clear();
                    this.event(LoadingView.LOAD_COMPLETE);
                }
                else {
                    this.bar.value = 0;
                }
                return;
            }
            if (this.bar) {
                this.bar.value = progress;
            }
        }
        loadSubpackages() {
            let packages = ResConfig.options.appConfig.subpackages;
            if (!packages.length) {
                console.log("smile------:" + JSON.stringify("分包已经加载成功"));
                this.bar.changeHandler.clear();
                this.event(LoadingView.LOAD_COMPLETE);
                return;
            }
            let url = packages.shift()["name"], self = this;
            let loadTask = window.platform.i.loadSubpackage({
                name: url,
                success: function (res) {
                    self.loadSubpackages();
                },
                fail: function (res) {
                },
                complete: function (res) {
                }
            });
            console.log("smile------loadTask.onProgressUpdate:" + loadTask.onProgressUpdate);
            loadTask.onProgressUpdate((res) => {
                this.bar.value = res.progress / 100;
                console.log('下载进度', res.progress);
            });
        }
    }
    LoadingView.LOAD_COMPLETE = "load_complete";

    var Mediator = puremvc.Mediator;
    var Tween$2 = Laya.Tween;
    var Ease = Laya.Ease;
    class LoadingMadiator extends Mediator {
        constructor(mediatorName) {
            super(LoadingMadiator.NAME);
        }
        onRegister() {
            this.getViewComponent().on(LoadingView.LOAD_COMPLETE, this, () => {
                this.sendNotification(AppConstants.LOADING_SUCCESS);
            });
        }
        getViewComponent() {
            if (!this.viewComponent) {
                this.viewComponent = new LoadingView();
            }
            return super.getViewComponent();
        }
        listNotificationInterests() {
            return [
                AppConstants.LOGIN_SUCCESS,
                AppConstants.CLOSE_LOADING
            ];
        }
        handleNotification(notification) {
            switch (notification.getName()) {
                case AppConstants.LOGIN_SUCCESS:
                    this.getViewComponent().open();
                    break;
                case AppConstants.CLOSE_LOADING:
                    this.sendNotification(AppConstants.REMOVE_MADIATOR, LoadingMadiator.NAME);
                    Tween$2.to(this.getViewComponent(), { alpha: 0 }, 300, Ease.strongIn, Laya.Handler.create(this, () => {
                        this.getViewComponent().destroy();
                    }));
                    break;
                default:
            }
        }
    }
    LoadingMadiator.NAME = "LoadingMadiator";

    class RedPoint {
        constructor(id, has, group) {
            this._id = id;
            this._has = has || false;
            this._group = group || [0];
        }
        get id() {
            return this._id;
        }
        set id(value) {
            this._id = value;
        }
        get has() {
            return this._has;
        }
        set has(value) {
            this._has = value;
        }
        get group() {
            return this._group;
        }
        set group(value) {
            this._group = value;
        }
    }

    var EventDispatcher = Laya.EventDispatcher;
    class SystemInstance extends EventDispatcher {
        constructor() {
            super(...arguments);
            this.points = [];
        }
        init() {
            this.points.push(new RedPoint(RedPointType.UPGRADE_USER_LEVEL), new RedPoint(RedPointType.FREE_GIFT));
        }
        addPoint(id, bool) {
            let found = this.points.some((element) => {
                return element.id === id;
            });
            if (!found) {
                this.points.push(new RedPoint(id, bool));
            }
        }
        deletePoint(id) {
            let index = this.points.findIndex((element) => {
                return element.id === id;
            });
            if (index !== -1) {
                this.points.splice(index, 1);
            }
        }
        updatePoint(data, sendMsg) {
            if (data instanceof RedPoint) {
                let element = this.points.find((element) => {
                    return element.id === data.id;
                });
                if (element) {
                    element.has = data.has;
                }
                this.event(SystemInstance.UPDATE_RED_POINT, { list: [element] });
            }
            else if (data instanceof Array) {
                let list = [];
                data.forEach(((value, index, array) => {
                    let element = this.points.find((element) => {
                        return element.id === value.id;
                    });
                    if (element) {
                        element.has = value.has;
                    }
                    list.push(element);
                }));
                this.event(SystemInstance.UPDATE_RED_POINT, { list: list });
            }
        }
        hasPoint(id) {
            let element = this.points.find((element) => {
                return element.id === id;
            });
            if (element) {
                return element.has;
            }
            return false;
        }
    }
    SystemInstance.UPDATE_RED_POINT = "UPDATE_RED_POINT";

    var Mediator$1 = puremvc.Mediator;
    var Browser$4 = Laya.Browser;
    class SystemMediator extends Mediator$1 {
        constructor(mediatorName, viewComponent) {
            super(SystemMediator.NAME, new SystemInstance());
        }
        onRegister() {
            CustomEventDispatcher.i.on(CustomEventConstants.RED_POINT_CHECK, this, () => {
            });
            this.getViewComponent().on(SystemInstance.UPDATE_RED_POINT, this, () => {
            });
        }
        getViewComponent() {
            return super.getViewComponent();
        }
        listNotificationInterests() {
            return [
                AppConstants.HEART_START,
                AppConstants.NETWORK_STATUS_CHANGE,
                AppConstants.REMOVE_MADIATOR
            ];
        }
        handleNotification(notification) {
            switch (notification.getName()) {
                case AppConstants.HEART_START:
                    this.heartStart();
                    break;
                case AppConstants.NETWORK_STATUS_CHANGE:
                    this.changeNetWork();
                    break;
                case AppConstants.REMOVE_MADIATOR:
                    this.facade.removeMediator(notification.getBody());
                    break;
                default:
            }
        }
        heartStart() {
            const HEART_INTERVAL = 60 * 1000;
            Laya.timer.loop(HEART_INTERVAL, this, () => {
                GameData.i.user.offLineTimeStamp = Browser$4.now();
            });
        }
        changeNetWork() {
        }
    }
    SystemMediator.NAME = "SystemMediator";

    var Mediator$2 = puremvc.Mediator;
    var Browser$5 = Laya.Browser;
    var Handler$1 = Laya.Handler;
    var BitmapFont = Laya.BitmapFont;
    class AppMediator extends Mediator$2 {
        constructor(mediatorName) {
            super(AppMediator.NAME);
        }
        onRegister() {
            this.frameComplete();
        }
        getViewComponent() {
            return super.getViewComponent();
        }
        listNotificationInterests() {
            return [
                AppConstants.LOADING_SUCCESS,
                AppConstants.UPDATE_USER,
                AppConstants.UPDATE_GOLD
            ];
        }
        handleNotification(notification) {
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
        frameComplete() {
            this.facade.registerMediator(new LoadingMadiator());
            this.facade.registerMediator(new SystemMediator());
            this.configsLoad();
        }
        fllowStyle() {
            [
                { name: Fonts.TEST, url: "bitmapfont/test.fnt" }
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
                Laya.stage.addChild(this.viewComponent);
            }
        }
        registerMediator() {
        }
        initListener() {
        }
        checkGuide() {
        }
        checkDialog() {
        }
        configsLoad() {
            Laya.loader.load(ResConfig.configs, Handler$1.create(null, (sucess) => {
                let appConfig = Laya.loader.getRes(ResConfig.appConfigPath);
                ResConfig.options.appConfig = appConfig;
                let resConfig = Laya.loader.getRes(ResConfig.resConfigPath);
                ResConfig.options.resConfig = resConfig;
                let info = ResConfig.options.appConfig.gameOptions;
                let paths = [info.basePath, info.name, info.platform, info.version];
                if (Browser$5.onMiniGame) {
                    Laya.URL.basePath = paths.join("/") + "/";
                }
                this.sendNotification(AppConstants.LOGIN, { appId: info.appId });
            }));
        }
    }
    AppMediator.NAME = "AppMediator";

    var SimpleCommand$3 = puremvc.SimpleCommand;
    class ViewPrepCommand extends SimpleCommand$3 {
        constructor() {
            super();
        }
        execute(notification) {
            this.facade.registerMediator(new AppMediator());
        }
    }

    var MacroCommand = puremvc.MacroCommand;
    class StartupCommand extends MacroCommand {
        constructor() {
            super();
        }
        initializeMacroCommand() {
            this.addSubCommand(ControllerCommands);
            this.addSubCommand(ModelPrepCommand);
            this.addSubCommand(ViewPrepCommand);
        }
    }

    var Facade = puremvc.Facade;
    class ApplicationFacade extends Facade {
        constructor() {
            super();
        }
        static getInstance() {
            if (!this.instance)
                this.instance = new ApplicationFacade();
            return (this.instance);
        }
        initializeFacade() {
            super.initializeFacade();
            this.registerCommand(ApplicationFacade.START_UP, StartupCommand);
        }
        startup(stage) {
            this.sendNotification(ApplicationFacade.START_UP, stage);
            this.removeCommand(ApplicationFacade.START_UP);
        }
    }
    ApplicationFacade.START_UP = "start_up";

    class BaseSDK {
        login(callBack) {
        }
    }

    const JSONS_OPTIONS = "jsonsOptions";
    const SHARE = "share";
    class JsonPool {
        static get i() {
            if (!this._i)
                this._i = new JsonPool();
            return this._i;
        }
        get share() {
            if (!this._share)
                this._share = JsonPool.i.getJsonByKey(SHARE);
            return this._share;
        }
        getJsonByKey(key, value) {
            value = value || JSONS_OPTIONS;
            return Laya.loader.getRes(ResConfig.options[value][key]);
        }
    }

    var Browser$6 = Laya.Browser;
    class WxSDK extends BaseSDK {
        constructor() {
            super();
            this._shareList = [];
            this.api = wx;
        }
        login(callBack) {
            super.login(null);
            this.api.login({
                success: (res) => {
                    console.log(`login调用成功${res.code}`);
                    callBack(res);
                },
                fail: (res) => {
                    console.log(`login调用失败`);
                },
                complete: () => {
                },
            });
        }
        get shareList() {
            if (!this._shareList.length) {
                let gameOptions = ResConfig.options.appConfig.gameOptions;
                let head = [gameOptions.basePath, gameOptions.name, gameOptions.platform].join("/");
                for (let key in JsonPool.i.share) {
                    let item = Helper.i.deepCopy(JsonPool.i.share[key]);
                    if (item.show > 0) {
                        item.imageUrl = head + "/" + item.imageUrl;
                        this._shareList.push(item);
                    }
                }
            }
            return this._shareList;
        }
        menuShareMessage() {
            if (!Browser$6.onMiniGame)
                return;
            window.platform.i.onShareAppMessage(() => {
                let msg = this.getMessage();
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
                };
            });
            this.showShareMenu();
        }
        showShareMenu() {
            let shareObj = {
                withShareTicket: true,
                success: (scope) => {
                },
                fail: () => {
                },
                complete: () => {
                }
            };
            window.platform.i.showShareMenu(shareObj);
        }
        getMessage(idx = -1) {
            idx = idx === -1 ? Math.floor(Math.random() * this.shareList.length) : idx;
            return this.shareList[idx];
        }
        getSDKVersion() {
            return this.api.getSystemInfoSync().SDKVersion;
        }
        compareVersion(v1, v2) {
            v1 = v1.split('.');
            v2 = v2.split('.');
            const len = Math.max(v1.length, v2.length);
            while (v1.length < len) {
                v1.push('0');
            }
            while (v2.length < len) {
                v2.push('0');
            }
            for (let i = 0; i < len; i++) {
                const num1 = parseInt(v1[i]);
                const num2 = parseInt(v2[i]);
                if (num1 > num2) {
                    return 1;
                }
                else if (num1 < num2) {
                    return -1;
                }
            }
            return 0;
        }
    }

    var Browser$7 = Laya.Browser;
    class Platform {
        platformConfig() {
            let PLATFORM_NAME = Browser$7.onMiniGame ? "wx" : "web";
            switch (PLATFORM_NAME) {
                case "wx":
                    window.platform.i = new WxSDK();
                    break;
                case "tt":
                    break;
                default:
            }
        }
    }

    var Logger = log4ts.Logger;
    var LoggerConfig = log4ts.LoggerConfig;
    var BasicLayout = log4ts.BasicLayout;
    var ConsoleAppender = log4ts.ConsoleAppender;
    var LogLevel = log4ts.LogLevel;
    class Main {
        constructor() {
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            Laya.MouseManager.multiTouchEnabled = false;
            UIConfig.closeDialogOnSide = true;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError = true;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            Laya.ClassUtils.regClass("laya.effect.ColorFilterSetter", Laya.ColorFilterSetter);
            Laya.ClassUtils.regClass("laya.effect.GlowFilterSetter", Laya.GlowFilterSetter);
            Laya.ClassUtils.regClass("laya.effect.BlurFilterSetter", Laya.BlurFilterSetter);
            window.platform = new Platform();
            window.platform.platformConfig();
            ApplicationFacade.getInstance().startup(Laya.stage);
            this.layout = new BasicLayout();
            this.appender = new ConsoleAppender();
            this.appender.setLayout(this.layout);
            this.config = new LoggerConfig(this.appender, LogLevel.ALL);
            this.logger = new Logger("sango", true);
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
    new Main();

}());
