/**
 * Created by hortor on 16/3/30.
 */
/**
 * 活动类型
 */
enum ActivityType {
    LIFE_CARD = 1,                      // 终生月卡;
    CAT_GO ,                            // 招财猫;
    BLACK_MARKET,                       // 黑市;
    SMASHING_GOLDEN_EGGS,               // 砸金蛋;
    TOTAL_DIAMOND_CONSUMPTION,          // 钻石消耗累计;
    FIRST_RECHARGE_DOUBLE_DIAMOND,      // 首充双倍;
    CHRISTMAS_DOUBLE_MONEY,             // 圣诞双倍;
    RECHARGE_GIFT,                      // 累积充值;
    FIRST_RECHARGE_GIFT,                // 首充3元礼包;
    MONTH_CARD,                         // 月卡活动;
    GROWTH_FUND,                        // 成长基金;
    WORTHBOX,                           // 超值宝箱;
};

/**
 * 活动工具类
 */
class ActivityUtil {

    /**
     * 活动是否开启
     * @param type
     * @returns {boolean}
     */
    static hasActivityOpened(type){
        if (!gm.dataManage.activityTime || !gm.dataManage.activityTime.activity[type]){
            return false;
        }
        var serverTime = gm.timeManage.getCurrentTime();
        var beginTime = gm.dataManage.activityTime.activity[type].beginTime;
        var endTime = gm.dataManage.activityTime.activity[type].endTime;

        if (!!beginTime){
            // 还未开始;,
            if (serverTime < new Date(beginTime).getTime()) return false;
        }
        if (!!endTime){
            // 已结束;
            if (serverTime >= new Date(endTime).getTime()) return false;
        }
        return true;
    }

    /**
     * 获取活动
     * @param type
     * @returns {any}
     */
    static getActivityInfo(type){
        if (!gm.dataManage.activityTime || !gm.dataManage.activityTime.activity[type]){
            return null;
        }
        return gm.dataManage.activityTime.activity[type];
    }
}