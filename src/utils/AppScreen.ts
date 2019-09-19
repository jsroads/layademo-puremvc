/**
 * Created by jsroads on 2019/9/19 . 11:38 上午
 * Note:
 */
interface ISize {
    width: number;
    height: number;
}

export default class AppScreen {
    static get width(): number {
        return 750;
    }

    private static _height: number;

    static get height(): number {
        if (!this._height) {
            this._height = this.width * (Laya.Browser.clientHeight / Laya.Browser.clientWidth);
        }
        return this._height;
    }

    private static _halfWidth: number;

    static get halfWidth(): number {
        if (!this._halfWidth) this._halfWidth = this.width * 0.5;
        return this._halfWidth;
    }

    private static _halfHeight: number;

    static get halfHeight(): number {
        if (!this._halfHeight) this._halfHeight = this.height * 0.5;
        return this._halfHeight;
    }

    private static _size: ISize;
    static get size(): ISize {
        if (!this._size) this._size = {width: this.width, height: this.height};
        return this._size;
    }

    /**
     * 判断刘海屏 统一处理
     */
    public static largeScreen(): boolean {
        return (Laya.Browser.clientWidth / Laya.Browser.clientHeight) <= (414 / 896) ? true : false;
    }

    /**
     * 大屏幕 广告错位
     */
    public static bigScreen(): boolean {
        return (Laya.Browser.clientWidth / Laya.Browser.clientHeight) < (375 / 667) ? true : false;
    }
}