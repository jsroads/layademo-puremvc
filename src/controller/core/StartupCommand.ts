/**
 * Created by jsroads on 2019/6/14 . 17:29
 * 应用程序启动时执行的 MacroCommand.
 * StartupCommand中将执行以下操作：
 *    ControllerCommands   --    初始化应用程序事件与Command之间的映射关系；
 *    ModelPrepCommand     --    Model 初始化，初始化应用程序启动过程中需要用到的Proxy，并注册；
 *    ViewPrepCommand      --    View 初始化，唯一创建并注册ApplicationMediator，包含其他所有View Component并在启动时创建它们
 */
import MacroCommand = puremvc.MacroCommand;
import ControllerCommands from "./ControllerCommands";
import ModelPrepCommand from "./ModelPrepCommand";
import ViewPrepCommand from "./ViewPrepCommand";

export default class StartupCommand extends MacroCommand {
    constructor() {
        super();
    }

    //添加子Command 初始化MacroCommand.
    public initializeMacroCommand(): void {
        /**
         * 命令会按照“先进先出”（FIFO）的顺序被执行.
         * 在用户与数据交互之前，Model必须处于一种一致的已知的状态.
         * 一旦Model 初始化完成，View视图就可以显示数据允许用户操作与之交互.
         * 因此，一般“ 开启”（startup ）过程首先Model初始化，然后View初始化。
         */
        this.addSubCommand(ControllerCommands);
        this.addSubCommand(ModelPrepCommand);
        this.addSubCommand(ViewPrepCommand);
    }
}