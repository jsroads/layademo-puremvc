/**
 * Created by jsroads on 2018/11/15.下午8:26
 * Note:
 */
import Browser = Laya.Browser;

const oneDayTimeStamp = 1 * 24 * 60 * 60 * 1000;
const cnMonthWords = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];

/**
 * 转换帮助
 */
export default class TimeTrans {
    private static _i: TimeTrans;

    static get i(): TimeTrans {
        if (!this._i) this._i = new TimeTrans();
        return this._i;
    }

    //根据时间戳转换成时间格式(2018-10-24 16:28:35)
    //params: timeStamp number/string 需要转换的时间戳

    //return string 转换后的时间
    getDateByTimeStamp(timeStamp) {
        return this.buildDateBySplitSign({timeStamp});
    }

    //只有YYYY-MM-DD HH-mm
    //如果时间戳转换后的时间和当前时间是同一年,则省略年份
    getYYYYMMDDHHmmDateByTimeStamp(timeStamp) {
        return this.buildYYYYMMDDHHmmDateBySplitSign({timeStamp})
    }


    //根据时间戳转换成时间格式(2018年10月24日 16:28:35)
    //params: timeStamp number/string 需要转换的时间戳
    //return string 转换后的时间
    //0000年00月00日
    getCNDateByTimeStamp(timeStamp) {
        return this.buildDateBySplitSign({
            timeStamp,
            yearSign: "年",
            monthSign: "月",
            daySign: "日 "
        });
    }

    //获取不带时分秒的日期格式
    //0000-00-00
    getDateByTimeStampEndWithDay(timeStamp) {
        let dateStr = this.getDateByTimeStamp(timeStamp);
        return dateStr.split(' ')[0];
    }

    //获取只有年和月的日期格式
    //0000-00
    getDateByTimeStampEndWithMonth(timeStamp) {
        let dateStr = this.getDateByTimeStamp(timeStamp);
        return `${dateStr.split('-')[0]}-${dateStr.split('-')[1]}`;
    }

    //获取不带时分秒的日期格式(中文)
    //0000年00月00日
    getCNDateByTimeStampEndWithDay(timeStamp) {
        let dateStr = this.getCNDateByTimeStamp(timeStamp);
        return dateStr.split(' ')[0];
    }

    //获取只有年和月的日期格式
    //0000-00
    getCNDateByTimeStampEndWithMonth(timeStamp) {
        let dateStr = this.getDateByTimeStamp(timeStamp);
        return `${dateStr.split('-')[0]}年${dateStr.split('-')[1]}月`;
    }

    //获取今日的最小时间戳
    getTodayMinTimeStamp() {
        return this.getMinTimeStampByTimeStamp(Browser.now());
    }

    //获取今日的最大时间戳
    getTodayMaxTimeStamp() {
        return this.getMaxTimeStampByTimeStamp(Browser.now());
    }

    //获取昨日的最小时间戳
    getYesterdayMinTimeStamp() {
        return this.getMinTimeStampByTimeStamp(Browser.now()) - oneDayTimeStamp;
    }


    //获取昨日的最大时间戳
    getYesterdayMaxTimeStamp() {
        return this.getMaxTimeStampByTimeStamp(Browser.now()) - oneDayTimeStamp;
    }

    //通过一个时间戳获取该时间戳对应的日期最小时间戳
    getMinTimeStampByTimeStamp(timeStamp) {
        let nowDate = new Date(timeStamp);
        nowDate.setHours(0);
        nowDate.setMinutes(0);
        nowDate.setMilliseconds(0);
        let minTime = nowDate.setSeconds(0);
        return minTime;
    }


    //通过一个时间戳获取该时间戳对应的日期最大时间戳
    getMaxTimeStampByTimeStamp(timeStamp) {
        let nowDate = new Date(timeStamp);
        nowDate.setHours(23);
        nowDate.setMinutes(59);
        nowDate.setMilliseconds(999);
        let maxTime = nowDate.setSeconds(59);
        return maxTime;
    }

    //获取本周最小时间戳
    getCurrentWeekMinTimeStamp() {
        return this.getWeekMinTimeStampByTimeStamp(Browser.now());
    }

    //获取本周最大时间戳
    getCurrentWeekMaxTimeStamp() {
        return this.getWeekMaxTimeStampByTimeStamp(Browser.now());
    }

    //获取指定时间戳的周的最小时间戳
    getWeekMinTimeStampByTimeStamp(timeStamp) {
        let minTime = this.getMinTimeStampByTimeStamp(timeStamp);
        let now = new Date(minTime);
        let dayOfWeek = now.getDay();
        if (dayOfWeek == 0) {
            dayOfWeek = 7
        }
        return minTime - (dayOfWeek - 1) * oneDayTimeStamp;
    }


    //获取指定时间戳的周的最大时间戳
    getWeekMaxTimeStampByTimeStamp(timeStamp) {
        let maxTime = this.getMaxTimeStampByTimeStamp(timeStamp);
        let now = new Date(maxTime);
        let dayOfWeek = now.getDay();
        if (dayOfWeek == 0) {
            dayOfWeek = 7
        }
        return maxTime + (7 - dayOfWeek) * oneDayTimeStamp;
    }

    //获取本月最小时间戳
    getCurrentMonthMinTimeStamp() {
        return this.getMonthMinTimeStampByTimeStamp(Browser.now());
    }

    //获取本月最大的时间戳
    getCurrentMonthMaxTimeStamp() {
        return this.getMonthMaxTimeStampByTimeStamp(Browser.now());
    }

    //获取指定时间戳对应月份的最小时间戳
    getMonthMinTimeStampByTimeStamp(timeStamp) {
        let date = new Date(timeStamp);
        date.setDate(1);
        return this.getMinTimeStampByTimeStamp(date.getTime());
    }

    //获取指定时间戳对应月份的最大时间戳
    getMonthMaxTimeStampByTimeStamp(timeStamp) {
        let date = new Date(timeStamp);
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        return (this.getMaxTimeStampByTimeStamp(date.getTime()) - oneDayTimeStamp);
    }

    //通过一个数字类型的毫秒数,转换成X小时Y分Z秒格式
    getCNTimeByTimeStamp(mss) {
        let string = "";
        let hours = Math.floor((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((mss % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = (mss % (1000 * 60)) / 1000;
        seconds = Math.ceil(seconds);
        if (hours != 0) {
            string = hours + "小时" + minutes + "分" + seconds + "秒";
        } else {
            if (minutes != 0) {
                string = +minutes + "分" + seconds + "秒";
            } else {
                if (seconds != 0) {
                    string = seconds + "秒";
                }
            }
        }
        return string;
    }

    //通过时间戳获取该时间戳是星期几的数字:和系统的Date.getDay()不同点在于,如果周日系统返回0,该函数返回7
    getWeekDayByTimeStamp(timeStamp) {
        let date = new Date(timeStamp);
        let weekDay = date.getDay();
        if (weekDay == 0) {
            weekDay = 7
        }
        return weekDay;
    }

    //通过时间戳获取该时间戳是中文的星期几
    getCNWeekDayByTimeStamp(timeStamp) {
        let cnWeekWord = ["天", "一", "二", "三", "四", "五", "六"];
        let date = new Date(timeStamp);
        let weekDay = date.getDay();
        return `星期${cnWeekWord[weekDay]}`;
    }

    //在旧的时间戳上添加天数,从而获取新的时间戳
    getNewTimeStampByAddDay(timeStamp, addDayCount) {
        return timeStamp + (oneDayTimeStamp * addDayCount);
    }

    //获取当前时间在今年的第几个星期
    getCurrentDateWeekCountInYear() {
        return this.getWeekCountInYearByTimeStamp(Browser.now());
    }

    //获取当前时间在今年的第几个月
    getCurrentDateMonthCountInYear() {
        return this.getMonthCountInYearByTimeStamp(Browser.now());
    }

    //获取当前时间在今年的第几个月(中文)
    getCurrentDateMonthCNNameInYear() {
        return `${cnMonthWords[this.getMonthCountInYearByTimeStamp(Browser.now())]}月`;
    }

    //获取当前时间在今年的第几个月(中文)
    getMonthCNNameInYearByTimeStamp(timeStamp) {
        return `${cnMonthWords[this.getMonthCountInYearByTimeStamp(timeStamp)]}月`;
    }


    //获取指定时间戳是年份的第几个星期
    getWeekCountInYearByTimeStamp(timeStamp) {
        let today = new Date(timeStamp);
        let firstDay = new Date(today.getFullYear(), 0, 1);
        let dayOfWeek = firstDay.getDay();
        let spendDay = 1;
        if (dayOfWeek != 0) {
            spendDay = 7 - dayOfWeek + 1;
        }
        firstDay = new Date(today.getFullYear(), 0, 1 + spendDay);
        let d = Math.ceil((today.valueOf() - firstDay.valueOf()) / oneDayTimeStamp);
        let result = Math.ceil(d / 7);
        return result + 1;
    }


    //获取指定时间戳是年份的第几月
    getMonthCountInYearByTimeStamp(timeStamp) {
        var today = new Date(timeStamp);
        let result = today.getMonth();
        return result + 1;
    }

    //判断两个时间戳是否是同一周
    timeStampIsSameWeek(timeStamp1, timeStamp2) {
        let old_count = Math.floor(timeStamp1 / oneDayTimeStamp);
        let now_other = Math.floor(timeStamp2 / oneDayTimeStamp);
        return Math.floor((old_count + 4) / 7) == Math.floor((now_other + 4) / 7);
    }

    //判断两个时间戳是否是同一月
    timeStampIsSameMonth(timeStamp1, timeStamp2) {
        let date1 = new Date(timeStamp1);
        let date2 = new Date(timeStamp2);
        return (date1.getMonth() == date2.getMonth()) && (date1.getFullYear() == date2.getFullYear())
    }

    //判断两个时间戳是否是同一天
    timeStampIsSameDay(timeStamp1: number, timeStamp2: number) {
        let old_count = Math.floor(timeStamp1 / oneDayTimeStamp);
        let now_other = Math.floor(timeStamp2 / oneDayTimeStamp);
        return old_count === now_other;
    }


    //转换通用方法
    //可调用此方法进行扩展
    buildDateBySplitSign({
                             timeStamp,
                             yearSign = "-",
                             monthSign = "-",
                             daySign = " ",
                             hourSign = ":",
                             minuteSign = ":",
                             secondSign = ""
                         }) {
        if (timeStamp) {
            timeStamp = Number(timeStamp);
        }
        // if (Object.is(timeStamp, NaN)) {
        //     throw new Error("timeStamp 不能转换成时间格式,请检测输入参数");
        // }
        let date = new Date(timeStamp);
        let Y = date.getFullYear() + yearSign;
        let M = (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1) + monthSign) : (date.getMonth() + 1) + monthSign);
        let D = date.getDate() < 10 ? '0' + date.getDate() + daySign : date.getDate() + daySign;
        let h = date.getHours() < 10 ? '0' + date.getHours() + hourSign : date.getHours() + hourSign;
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + minuteSign : date.getMinutes() + minuteSign;
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + secondSign : date.getSeconds() + secondSign;
        return Y + M + D + h + m + s;
    }

    //转换通用方法
    //可调用此方法进行扩展
    buildYYYYMMDDHHmmDateBySplitSign({
                                         timeStamp,
                                         yearSign = "-",
                                         monthSign = "-",
                                         daySign = " ",
                                         hourSign = ":",
                                         minuteSign = ":",
                                         secondSign = ""
                                     }) {
        if (timeStamp) {
            timeStamp = Number(timeStamp);
        }
        // if (Object.is(timeStamp, NaN)) {
        //     throw new Error("timeStamp 不能转换成时间格式,请检测输入参数");
        // }
        let date = new Date(timeStamp);
        let Y = date.getFullYear() + yearSign;
        let M = (date.getMonth() + 1 < 10 ? ('0' + (date.getMonth() + 1) + monthSign) : (date.getMonth() + 1) + monthSign);
        let D = date.getDate() < 10 ? '0' + date.getDate() + daySign : date.getDate() + daySign;
        let h = date.getHours() < 10 ? '0' + date.getHours() + hourSign : date.getHours() + hourSign;
        let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + secondSign : date.getSeconds() + secondSign;
        if (date.getFullYear() == new Date(Browser.now()).getFullYear()) {
            //相同的年
            return M + D + h + m;
        }
        return Y + M + D + h + m;
    }
}

/***********************************************************************************************
 * 函数和参数说明:
 *
 *
 * 通过时间戳获取yyyy-MM-dd HH:mm:ss格式的日期:
 * getDateByTimeStamp(timeStamp)
 *
 * 通过时间戳获取yyyy年MM月dd HH:mm:ss格式的日期:
 * getCNDateByTimeStamp(timeStamp)
 *
 * 扩展通过时间戳转换成日期格式函数,可通过参数自定义日期格式:
 * buildDateBySplitSign({timeStamp,yearSign = "-",monthSign = "-",daySign = " ",hourSign = ":",minuteSign = ":",secondSign = ""})
 *
 * 通过时间戳获取日期yyyy-MM-dd(不包含时间):
 * getDateByTimeStampEndWithDay(timeStamp)
 *
 * 通过时间戳获取日期yyyy年MM月dd(不包含时间):
 * getCNDateByTimeStampEndWithDay(timeStamp)
 *
 * 通过时间戳获取日期yyyy-MM(不包含时间):
 * getDateByTimeStampEndWithMonth(timeStamp)
 *
 * 通过时间戳获取日期yyyy月MM(不包含时间):
 * getCNDateByTimeStampEndWithMonth(timeStamp)
 *
 * 获取今日的最小时间戳:
 * getTodayMinTimeStamp()
 *
 * 获取今日的最大时间戳:
 * getTodayMaxTimeStamp()
 *
 * 获取昨日的最小时间戳:
 * getYesterdayMinTimeStamp()
 *
 * 获取昨日的最大时间戳:
 * getYesterdayMaxTimeStamp()
 *
 * 通过一个时间戳获取该时间戳对应的日期最小时间戳:
 * getMinTimeStampByTimeStamp(timeStamp)
 *
 * 通过一个时间戳获取该时间戳对应的日期最大时间戳:
 * getMaxTimeStampByTimeStamp(timeStamp)
 *
 * 获取本周最小时间戳:
 * getCurrentWeekMinTimeStamp()
 *
 * 获取本周最大时间戳:
 * getCurrentWeekMaxTimeStamp();
 *
 * 获取指定时间戳的周的最小时间戳:
 * getWeekMinTimeStampByTimeStamp(timeStamp)
 *
 * 获取指定时间戳的周的最大时间戳:
 * getWeekMaxTimeStampByTimeStamp(timeStamp)
 *
 * 获取本月最小时间戳:
 * getCurrentMonthMinTimeStamp()
 *
 * 获取本月最大的时间戳:
 * getCurrentMonthMaxTimeStamp()
 *
 * 获取指定时间戳对应月份的最小时间戳:
 * getMonthMinTimeStampByTimeStamp(timeStamp)
 *
 * 获取指定时间戳对应月份的最大时间戳:
 * getMonthMaxTimeStampByTimeStamp(timeStamp)
 *
 * 通过一个数字类型的毫秒数,转换成X小时Y分Z秒格式:
 * getCNTimeByTimeStamp(mss)
 *
 * 通过时间戳获取该时间戳是星期几的数字:和系统的Date.getDay()不同点在于,如果周日系统返回0,该函数返回7
 * getWeekDayByTimeStamp(timeStamp)
 *
 * 通过时间戳获取该时间戳是中文的星期几:
 * getCNWeekDayByTimeStamp(timeStamp)
 *
 *在旧的时间戳上添加天数,从而获取新的时间戳:
 * getNewTimeStampByAddDay(timeStamp, addDayCount)
 *
 * 获取当前时间在今年的第几个星期:
 * getCurrentDateWeekCountInYear()
 *
 * 获取当前时间在今年的第几个月:
 * getCurrentDateMonthCountInYear()
 *
 * 获取当前时间在今年的第几个月(中文):
 * getCurrentDateMonthCNNameInYear()
 *
 * 获取指定时间戳的月份名(中文):
 * getMonthCNNameInYearByTimeStamp(timeStamp)
 *
 * 获取指定时间戳是年份的第几个星期:
 * getWeekCountInYearByTimeStamp(timeStamp)
 *
 * 获取指定时间戳是年份的第几月:
 * getMonthCountInYearByTimeStamp(timeStamp)
 *
 * 判断两个时间戳是否是同一周:
 * timeStampIsSameWeek(timeStamp1, timeStamp2)
 *
 * 判断两个时间戳是否是同一月:
 * timeStampIsSameMonth(timeStamp1, timeStamp2)
 *
 *
 ***********************************************************************************************/