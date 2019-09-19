import LoadingView from "./LoadingView";
import AppConstants from "../../AppConstants";
import Mediator = puremvc.Mediator;
import Tween = Laya.Tween;
import Ease = Laya.Ease;

/**
 * Created by jsroads on 2019-06-17 . 14:02
 * Note:
 */
export default class LoadingMadiator extends Mediator {
    public static NAME: string = "LoadingMadiator";

    constructor(mediatorName?: string) {
        super(LoadingMadiator.NAME);
    }

    public onRegister(): void {
        this.getViewComponent().on(LoadingView.LOAD_COMPLETE, this, () => {
            this.sendNotification(AppConstants.LOADING_SUCCESS);
        });
    }

    getViewComponent(): LoadingView {
        if(!this.viewComponent){
            this.viewComponent = new LoadingView();
        }
        return <LoadingView>super.getViewComponent();
    }

    public listNotificationInterests(): string[] {
        return [
            AppConstants.LOGIN_SUCCESS,
            AppConstants.CLOSE_LOADING
        ];
    }

    public handleNotification(notification: puremvc.INotification): void {
        switch (notification.getName()) {
            case AppConstants.LOGIN_SUCCESS:
                this.getViewComponent().open();
                break;
            case AppConstants.CLOSE_LOADING:
                this.sendNotification(AppConstants.REMOVE_MADIATOR, LoadingMadiator.NAME);
                Tween.to(this.getViewComponent(), {alpha: 0}, 300, Ease.strongIn, Laya.Handler.create(this, () => {
                    this.getViewComponent().destroy();
                }));
                break;
            default:
        }
    }
}