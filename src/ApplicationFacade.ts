/**
 * Created by jsroads on 2019/6/14 . 17:15
 * Note:
 */
import StartupCommand from "./controller/core/StartupCommand";
import IFacade = puremvc.IFacade;
import Facade = puremvc.Facade;

/**
 * ApplicationFacade 类对象负责初始化Controller（控制器），建立Command与Notification 名之间的映射；
 * 并执行一个Command注册所有的 Model 和View。它是PureMVC应用程序的入口。
 * @author jsroads
 */
export class ApplicationFacade extends Facade implements IFacade {
    /**
     * 这里仅仅定义Notification（通知）常量    --    START_UP （private），标识应用程序启动
     * 其它Notification（通知）常量抽离到ApplicationConstants中定义，这样更简洁、清晰
     */
    public static START_UP: string = "start_up";

    constructor() {
        super()
    }

    public static getInstance(): ApplicationFacade {
        if (!this.instance) this.instance = new ApplicationFacade();
        return <ApplicationFacade>(this.instance);
    }

    /**
     * 为了ApplicationFacade结构更清晰和简洁。
     * 将注册Command、Proxy、View&Mediator的工作抽离到
     * ControllerCommands.ts、ModelPrepCommand.ts、ViewPrepCommand.ts。
     *
     * 注册应用程序启动Startup命令，应用程序启动时执行 StartupCommand
     * StartupCommand中将执行以下操作：
     * ControllerCommand -- 初始化应用程序事件与Command之间的映射关系；
     * ModelPrepCommand --    Model 初始化，初始化应用程序启动过程中需要用到的Proxy，并注册；
     * ViewPrepCommand    --    View 初始化，唯一创建并注册ApplicationMediator，它包含其他所有View Component并在启动时创建它们
     */
    public initializeFacade(): void {
        super.initializeFacade();
        this.registerCommand(ApplicationFacade.START_UP, StartupCommand);
    }

    /**
     * 启动PureMVC，在应用程序中调用此方法，并传递应用程序本身的引用
     * @param stage    -    PureMVC应用程序的根视图 root，包含其它所有的View Componet
     */
    public startup(stage: any): void {
        this.sendNotification(ApplicationFacade.START_UP, stage);
        this.removeCommand(ApplicationFacade.START_UP);//PureMVC初始化完成，注销STARUP命令
    }
}