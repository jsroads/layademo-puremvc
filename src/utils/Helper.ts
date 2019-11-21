/**
 * Created by jsroads on 2019/9/19 . 1:15 下午
 * Note:
 */
export default class Helper {
    private static _i: Helper;

    static get i(): Helper {
        if (!this._i) this._i = new Helper();
        return this._i;
    }

    /**
     *
     * @param value key1=value1&key2=value2……
     */
    public static splitKV(value: string): any {
        let result = {};
        let allStrings: Array<string> = value.split("&");
        if (allStrings && allStrings.length) {
            allStrings.forEach(element => {
                if (!element && element.trim().length > 0) {
                    let pairs: Array<string> = element.split("=");
                    if (!pairs && pairs.length == 2) {
                        result[pairs[0]] = pairs[1];
                    }
                }
            });
        }
        return result;
    }

    /**
     * 深度克隆
     * 对象可以完全脱离原对象
     */
    public deepCopy(source): any {
        let target: any = Array.isArray(source) ? [] : {};
        for (var k in source) {
            if (typeof source[k] === 'object') {
                target[k] = this.deepCopy(source[k])
            } else {
                target[k] = source[k]
            }
        }
        return target
    }

    /**
     * 直接赋值
     * @param src 被赋值对象
     * @param ret 赋值对象
     */
    public assignObject(ret: any, src: any,): any {
        for (var k in src) {
            ret[k] = typeof src[k] === 'object' ? this.assignObject(src[k] ? src[k] : {}, ret[k]) : src[k];
        }
        return ret
    }

    public objectToArray(data: any) {
        let list = Object.keys(data).map((value, index, array) => {
            return data[value];
        });
        return list
    }


    public rewardsFromString(reward: string): Array<any> {
        let array = reward.split(";");
        array.forEach(((value, index, array1) => {
            array1[index] = Helper.i.oneRewardFromStr(value);
        }));
        return array;
    }

    public oneRewardFromStr(str: string): any {
        let value = str.split(","), reward: any;
        reward = {id: parseInt(value[0]), count: parseInt(value[1])};
        return reward;
    }
}