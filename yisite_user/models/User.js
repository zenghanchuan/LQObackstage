const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//实例化数据模板
const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:
    {
        type:String,
        required:true
    }
});

//把模板对外公出
module.exports = User = mongoose.model("users",UserSchema);