/**
 * Created by jsroads on 2019/9/19 . 11:29 上午
 * Note:
 */
import Script = Laya.Script;
import Sprite = Laya.Sprite;
import AppScreen from "./AppScreen";

export default class ContentAdapter extends Script {
    /** @prop {name:top,tips:"上边界预留",type:Number,default:0}*/
    top: number = 0;
    /** @prop {name:top,tips:"下边界预留",type:Number,default:0}*/
    bottom: number = 0;
    /** @prop {name:top,tips:"左边界预留",type:Number,default:0}*/
    left: number = 0;
    /** @prop {name:right,tips:"右边界预留",type:Number,default:0}*/
    right: number = 0;

    constructor() {
        super();
    }

    public get myOwner(): Sprite {
        return <Sprite>this.owner;
    }

    onAwake(): void {
        this.myOwner.size(
            AppScreen.width - (this.left + this.right)
            , AppScreen.height - (this.top + this.bottom));
        if (this.left) {
            this.myOwner.x = this.left;
        }
        if (this.right) {
            this.myOwner.x = this.myOwner.width - this.right;
        }
        if (this.top) {
            this.myOwner.y = this.top;
        }
        if (this.bottom) {
            this.myOwner.y = this.myOwner.height - this.bottom;
        }
    }
}