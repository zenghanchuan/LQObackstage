const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//实例化数据模板
const AboutusSchema = new Schema({
    essay_type:{
        type:String,
        required:true
    },
    essay_title:{
        type:String,
        required:true
    },
    essay_content:{
        type:String,
        required:true
    }
});

//把模板对外公出
module.exports = Aboutus = mongoose.model("aboutus",AboutusSchema);