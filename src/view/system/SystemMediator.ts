/**
 * Created by jsroads on 2019-07-04.16:58
 * Note:
 */
import AppConstants from "../../AppConstants";
import GameData from "../../model/data/GameData";
import {CustomEventConstants} from "../../events/CustomEventConstants";
import {CustomEventDispatcher} from "../../events/CustomEventDispatcher";
import SystemInstance from "./SystemInstance";
import Mediator = puremvc.Mediator;
import Browser = Laya.Browser;

export default class SystemMediator extends Mediator {
    public static NAME: string = "SystemMediator";

    constructor(mediatorName?: string, viewComponent?: any) {
        super(SystemMediator.NAME, new SystemInstance());
    }

    public onRegister(): void {
        CustomEventDispatcher.i.on(CustomEventConstants.RED_POINT_CHECK, this, () => {

        });
        this.getViewComponent().on(SystemInstance.UPDATE_RED_POINT, this, () => {

        });
    }

    getViewComponent(): SystemInstance {
        return <SystemInstance>super.getViewComponent();
    }

    public listNotificationInterests(): string[] {
        return [
            AppConstants.HEART_START,
            AppConstants.NETWORK_STATUS_CHANGE,
            AppConstants.REMOVE_MADIATOR
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
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

    private heartStart() {
        const HEART_INTERVAL: number = 60 * 1000;//60 秒
        Laya.timer.loop(HEART_INTERVAL, this, () => {
            GameData.i.user.offLineTimeStamp = Browser.now();
        })
    }

    private changeNetWork() {

    }
}