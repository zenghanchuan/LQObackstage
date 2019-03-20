const Aboutus = require('../../models/Aboutus');

//关于我们页面获取数据
//获取关于易思特的数据
exports.findAboutyst = async ctx =>{
    let result = await Aboutus.find({essay_type:'type_aboutyst'});
    if(result){
        return result;
    }
};
//获取易思特优势的数据
exports.findYstadvantage = async ctx =>{
    let result = await Aboutus.find({essay_type:'type_ystadvantage'});
    if(result){
        return result;
    }
};
//获取易思特团队的数据 
exports.findYstteam = async ctx =>{
    let result = await Aboutus.find({essay_type:'type_ystteam'});
    if(result){
        return result;
    }
};
//获取组织架构的数据
exports.findStructure = async ctx =>{
    let result = await Aboutus.find({essay_type:'type_structure'});
    if(result){
        return result;
    }
};
//获取易思特技术的数据
exports.findYsttechnology = async ctx =>{
    let result = await Aboutus.find({essay_type:'type_technology'});
    if(result){
        return result;
    }
};
//获取易思特文化的数据
exports.findYstculture = async ctx =>{
    let result = await Aboutus.find({essay_type:'type_ystculture'});
    if(result){
        return result;
    }
};