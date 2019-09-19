/**
 * Created by jsroads on 2019/6/15 . 10:35
 * Note:注册Command ，建立 Command 与Notification 之间的映射
 */

import AppConstants from "../../AppConstants";
import LoginCommand from "../command/LoginCommand";
import SimpleCommand = puremvc.SimpleCommand;
import INotification = puremvc.INotification;

export default class ControllerCommands extends SimpleCommand {
    constructor() {
        super();
    }

    public execute(note: INotification): void {
        //登录游戏
        this.facade.registerCommand(AppConstants.LOGIN, LoginCommand);
    }
}