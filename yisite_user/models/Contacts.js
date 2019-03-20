const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//实例化数据模板
const ContactsSchema = new Schema({
    contact_name:{
        type:String,
        required:true
    },
    contact_email:{
        type:String,
        required:true
    },
    contact_phone:{
        type:String,
        required:true
    },
    contact_question:{
        type:String,
        required:true
    }
});

//把模板对外公出
module.exports = Contacts = mongoose.model("contacts",ContactsSchema);