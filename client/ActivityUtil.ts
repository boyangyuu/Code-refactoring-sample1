/**
 * Created by hortor on 16/3/30.
 */
/**
 * 活动类型
 */
enum ActivityType {

    // 活动页面中的活动
    LIFE_CARD = 1,                      // 终生月卡; todo delete
    CAT_GO = 2,                            // 招财猫; d
    BLACK_MARKET = 3,                       // 黑市; d
    SMASHING_GOLDEN_EGGS = 4,               // 砸金蛋; d
    TOTAL_DIAMOND_CONSUMPTION = 5,          // 钻石消耗累计; d
    
    RECHARGE_GIFT = 8,                      // 累积充值; d
    //FIRST_RECHARGE_GIFT = 9,                // 首充3元礼包; todo delete
    MONTH_CARD = 10,                         // 月卡活动; d 
    GROWTH_FUND = 11,                        // 成长基金; d
    WORTHBOX = 12,                           // 超值宝箱; 12
    NEWGIFT = 13,                             // 首充礼包
    VIPGIFT = 14,                             // VIP礼包

    //others
    FIRST_RECHARGE_DOUBLE_DIAMOND = 6,      // 首充双倍; 
};

/**
 * 活动工具类
 */


class ActivityUtil {

    public static config = [
        {
            arrName : "newbag",
            arrBarName : "首充奖励",
            type : ActivityType.NEWGIFT,
        },
        {
            arrName : "vip",
            arrBarName : "VIP福利",
            type : ActivityType.VIPGIFT,
        },        
        {
            arrName : "lifecard",
            arrBarName : "终身卡",
            type : ActivityType.LIFE_CARD,
        },   
        {
            arrName : "cat",
            arrBarName : "招财猫",
            type : ActivityType.CAT_GO,
        },   
        {
            arrName : "black",
            arrBarName : "超值限购",
            type : ActivityType.BLACK_MARKET,
        },  
        {
            arrName : "egg",
            arrBarName : "砸金蛋",
            type : ActivityType.SMASHING_GOLDEN_EGGS,
        },   
        {
            arrName : "costdiamond",
            arrBarName : "钻石返利",
            type : ActivityType.TOTAL_DIAMOND_CONSUMPTION,
        }, 
        {
            arrName : "accu",
            arrBarName : "累充福利",
            type : ActivityType.RECHARGE_GIFT,
        },   
        {
            arrName : "month",
            arrBarName : "月卡促销",
            type : ActivityType.MONTH_CARD,
        }, 
        {
            arrName : "growth_fund",
            arrBarName : "成长基金",
            type : ActivityType.GROWTH_FUND,
        },   
        {
            arrName : "worthBox",
            arrBarName : "超值宝箱",
            type : ActivityType.WORTHBOX,
        },                                                   
    ]



    /**
     * 活动是否开启
     * @param type
     * @returns {boolean}
     */
    static hasActivityOpened(type){

        switch (type){
            case ActivityType.NEWGIFT:
            case ActivityType.VIPGIFT:
            return true;
        }


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