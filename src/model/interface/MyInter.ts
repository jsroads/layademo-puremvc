/**
 * Created by jsroads on 2019/9/18 . 7:15 下午
 * Note:
 */
export interface IReward {
    id: number;
    count: number;
    type?: number;
}

export interface IBanner {
    NAME: string;
    updateBannerCount: number;
    currentBannerCount: number;
}