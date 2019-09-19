/**
 * Created by jsroads on 2019-07-12.14:21
 * Note:
 */
export class PayOnOff {
    public static close: boolean;
    public static passThousand: boolean;
    public static shortVideoId: string;
    public static longVideoId: string;
    public static bannerId: Array<string> = [];
    public static bannerList: Array<string> = [];
    public static URL: any = {
        video: "common/img_video.png",
        share: "common/img_share.png",
        free: "common/img_free.png"
    };
    private static bannerIndex: number = -1;

    static get nextBannerId(): string {
        if (!PayOnOff.bannerList.length) {
            return ""
        }
        let idx = (PayOnOff.bannerIndex++) / PayOnOff.bannerList.length;
        return PayOnOff.bannerList[idx];
    };
}