/**
 * Created by jsroads on 2019/6/14 . 18:40
 * Note:创建Mediator，并把它注册到View.
 */

import AppMediator from "../../AppMediator";
import SimpleCommand = puremvc.SimpleCommand;

export default class ViewPrepCommand extends SimpleCommand {
    public constructor() {
        super();
    }

    public execute(notification: puremvc.INotification): void {
        //游戏主舞台
        this.facade.registerMediator(new AppMediator());
    }
}