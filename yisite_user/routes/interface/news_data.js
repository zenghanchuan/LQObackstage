const News = require('../../models/News')

//新闻资讯页面获取数据
exports.findNews = async ctx =>{
    let result = await News.find();
    if(result){
        return result;
    }
}