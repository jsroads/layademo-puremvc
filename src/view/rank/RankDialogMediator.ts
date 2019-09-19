/**
 * Created by jsroads on 2019-08-10.11:20
 * Note:
 */
import AppConstants from "../../AppConstants";
import RankDalog from "./RankDalog";
import Mediator = puremvc.Mediator;

export default class RankDialogMediator extends Mediator {
    public static NAME: string = "RankDialogMediator";

    constructor(mediatorName?: string, viewComponent?: any) {
        super(RankDialogMediator.NAME, new RankDalog());
    }

    public listNotificationInterests(): string[] {
        return [
            AppConstants.SHOW_RANK
        ];
    }

    public getViewComponent(): RankDalog {
        return <RankDalog>super.getViewComponent();
    }

    public handleNotification(notification: puremvc.INotification): void {
        switch (notification.getName()) {
            case AppConstants.SHOW_RANK:
                this.getViewComponent().open(false, notification.getBody());
                break;
            default:
        }
    }
}