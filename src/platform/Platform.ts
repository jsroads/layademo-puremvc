import WxSDK from "./WxSDK";
import Browser = Laya.Browser;
/**
 * 平台数据接口。
 * 由于每款游戏通常需要发布到多个平台上，所以提取出一个统一的接口用于开发者获取平台数据信息
 * 通过这种方式封装平台逻辑，以保证整体结构的稳定
 */
export default class Platform implements IPlatform{
     public i:any;
    /**
     * 平台配置
     */
    public platformConfig(){
        let PLATFORM_NAME = Browser.onMiniGame?"wx":"web";//平台名字，决定引用哪个平台的API实现，wx，tt 或者其他平台
        switch (PLATFORM_NAME) {
            case "wx":
                window.platform.i= new WxSDK();
                break;
            case "tt":
                break;
            default:
        }
    }
}
export interface IPlatform{
    i:any;
    platformConfig():void;
}
declare global {
    interface Window { platform: IPlatform }
}
