const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//实例化数据模板
const ResearchSchema = new Schema({
    re_type:{
        type:String,
        required:true
    },
    re_define:{
        type:String,
        required:true
    },
    re_goal:{
        type:String,
        required:true
    },
    re_content:{
        type:String,
        required:true
    },
    re_model:{
        type:String,
        required:true
    },
    re_case:{
        type:String,
        required:true
    },

});

//把模板对外公出
module.exports = Research = mongoose.model("research",ResearchSchema);