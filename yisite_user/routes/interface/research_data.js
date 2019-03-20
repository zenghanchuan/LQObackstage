const Research = require('../../models/Research')
//核心研究页面获取数据
//获取消费者研究的数据
exports.findConsumer = async ctx =>{
    let result = await Research.find({re_type:'type_consumer'});
    if(result){
        return result;
    }
};
//获取满意度研究的数据
exports.findSatisfaction = async ctx =>{
    let result = await Research.find({re_type:'type_satisfaction'});
    if(result){
        return result;
    }
};
//获取房地产研究的数据
exports.findRealty = async ctx =>{
    let result = await Research.find({re_type:'type_realty'});
    if(result){
        return result;
    }
};
//获取公共服务研究的数据
exports.findPublicservice = async ctx =>{
    let result = await Research.find({re_type:'type_publicservice'});
    if(result){
        return result;
    }
};
//获取互联网用户研究的数据
exports.findInternetuser = async ctx =>{
    let result = await Research.find({re_type:'type_internetuser'});
    if(result){
        return result;
    }
};
//获取市场进入研究的数据
exports.findMarketaccess = async ctx =>{
    let result = await Research.find({re_type:'type_marketaccess'});
    if(result){
        return result;
    }
};
//获取广告媒介研究的数据
exports.findAdvertising = async ctx =>{
    let result = await Research.find({re_type:'type_advertising'});
    if(result){
        return result;
    }
};
//获取神秘顾客研究的数据
exports.findMysterycustomer = async ctx =>{
    let result = await Research.find({re_type:'type_mysterycustomer'});
    if(result){
        return result;
    }
};