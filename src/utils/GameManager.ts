/**
 * Created by jsroads on 2019/9/19 . 1:23 下午
 * Note:
 */
import {Goods} from "../model/data/GameConstans";

export default class GameManager {
    public getIconById(id: number): string {
        let icon = "";
        switch (id) {
            case Goods.GOLD:
                icon = "common/gold.png";
                break;
            case Goods.MILK:
                icon = "common/milk.png";
                break;
            default:
        }
        return icon;
    }
}
