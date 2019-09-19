/**
 * Created by jsroads on 2019/9/19 . 10:06 上午
 * Note:
 */
import RedPoint from "../../model/vo/RedPoint";
import {RedPointType} from "../../model/data/GameConstans";
import EventDispatcher = Laya.EventDispatcher;

export default class SystemInstance extends EventDispatcher {
    public static UPDATE_RED_POINT: string = "UPDATE_RED_POINT";
    private points: RedPoint[] = [];

    public init() {
        this.points.push(
            new RedPoint(RedPointType.UPGRADE_USER_LEVEL),
            new RedPoint(RedPointType.FREE_GIFT)
        )
    }

    public addPoint(id: number, bool: boolean) {
        let found = this.points.some((element) => {
            return element.id === id;
        });
        if (!found) {
            this.points.push(new RedPoint(id, bool));
        }
    }

    public deletePoint(id: number) {
        let index = this.points.findIndex((element) => {
            return element.id === id;
        });
        if (index !== -1) {
            this.points.splice(index, 1);
        }
    }

    public updatePoint(data: RedPoint | RedPoint[], sendMsg: boolean) {
        if (data instanceof RedPoint) {
            let element = this.points.find((element: RedPoint) => {
                return element.id === data.id;
            });
            if (element) {
                element.has = data.has;
            }
            this.event(SystemInstance.UPDATE_RED_POINT, {list: [element]});
        } else if (data instanceof Array) {
            let list = [];
            data.forEach(((value, index, array) => {
                let element = this.points.find((element: RedPoint) => {
                    return element.id === value.id;
                });
                if (element) {
                    element.has = value.has;
                }
                list.push(element);
            }));
            this.event(SystemInstance.UPDATE_RED_POINT, {list: list});
        }
    }

    public hasPoint(id: number): boolean {
        let element = this.points.find((element: RedPoint) => {
            return element.id === id;
        });
        if (element) {
            return element.has;
        }
        return false;
    }
}