const Cases = require('../../models/Cases');

//成功案例页面获取数据
exports.findCases = async ctx =>{
    let result = await Cases.find();
    if(result){
        return result;
    }
};