/**
 * Created by jsroads on 2019-06-18 . 15:39
 * Note:
 */
import MyLocalStorage from "../data/MyLocalStorage";
import {RedPointType, StorageType} from "../data/GameConstans";
import {CustomEventDispatcher} from "../../events/CustomEventDispatcher";
import {CustomEventConstants} from "../../events/CustomEventConstants";

export default class UserVO {
    constructor() {
    }

    private _gold: number = 3000;
    get gold(): number {
        return this._gold;
    }

    set gold(value: number) {
        this._gold = value;
        this.write();
        this.checkRedPoint([RedPointType.UPGRADE_USER_LEVEL]);
    }

    private _nickName: string = "游客";

    get nickName(): string {
        return this._nickName;
    }

    set nickName(value: string) {
        this._nickName = value;
    }

    private _userId: string = "-10086";

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    private _level: number = 0;

    get level(): number {
        return this._level;
    }

    set level(value: number) {
        this._level = value;
    }


    private _offLineTimeStamp: number = 0;//离线时间戳

    get offLineTimeStamp(): number {
        return this._offLineTimeStamp;
    }

    set offLineTimeStamp(value: number) {
        this._offLineTimeStamp = value;
        this.write();
    }

    private _loginTimeStamp: number = 0;//登录时间戳

    get loginTimeStamp(): number {
        return this._loginTimeStamp;
    }

    set loginTimeStamp(value: number) {
        this._loginTimeStamp = value;
    }

    private _loginDays: number = 0;//登录天数

    get loginDays(): number {
        return this._loginDays;
    }

    set loginDays(value: number) {
        this._loginDays = value;
        this.write();
    }


    public init() {
        //TODO 初始化最原始数据
    }


    public write() {
        let ins = JSON.parse(JSON.stringify(this));
        MyLocalStorage.i.write(StorageType.USER, ins, () => {

        });
    }

    public read() {
        let ins = JSON.parse(JSON.stringify(this));
        MyLocalStorage.i.read(StorageType.USER, (value) => {

        }, ins);
    }

    public checkRedPoint(list: number[]) {
        CustomEventDispatcher.i.event(CustomEventConstants.RED_POINT_CHECK, {list: list})
    }
}