const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//实例化数据模板
const NewsSchema = new Schema({
    news_title:{
        type:String,
        required:true
    },
    news_content:{
        type:String,
        required:true
    },
    news_time:{
        type:String,
        required:true
    }
});

//把模板对外公出
module.exports = News = mongoose.model("news",NewsSchema);