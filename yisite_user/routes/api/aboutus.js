const Router = require("koa-router");
const router = new Router();

//引入
const Aboutus = require('../../models/Aboutus');

/**
 * @router GET /api/users/test
 * @desc 测试接口地址
 * @access 接口是公开的
 */
router.get("/test",async ctx =>{
    ctx.status =200;
    ctx.body = {msg:'user works...'};
});



/**
 * @router POST /api/aboutus/addpara
 * @desc 添加段落的接口
 * @access 接口是公开的
 */
router.post("/addpara",async ctx =>{
    const newPara = new Aboutus({
        essay_type:ctx.request.body.essay_type,
        essay_title:ctx.request.body.essay_title,
        essay_content:ctx.request.body.essay_content,
    });
    await newPara
        .save()
        .then(posts =>{
            ctx.status = 200;
            ctx.body = {code:1,msg:'保存成功！'}
        })
        .catch(err =>{
            ctx.status = 404
            console.log(err);
        })
});

/**
 * @router GET /api/aboutus/getpara
 * @desc 获取段落的接口
 * @access 接口是公开的
 */
router.get("/getpara",async ctx =>{
    // console.log(ctx.query.essay_type);
    await Aboutus.find({essay_type:ctx.query.essay_type})
        .sort({date:-1})
        .then(posts =>{
            ctx.status = 200;
            ctx.body = posts;
        })
        .catch(err =>{
            ctx.status = 404;
            console.log(err);
        })
});

/**
 * @router DELETE /api/aboutus/deletepara
 * @desc 删除段落的接口
 * @access 接口是公开的
 */
router.delete("/deletepara",async ctx =>{
    //拿到id
    const essay_id = ctx.request.body.essay_id;
    await Aboutus.deleteOne({_id:essay_id})
    .then(()=>{
        ctx.status = 200;
        ctx.body = {code:1,msg:'删除成功！'};
    })
    .catch(err =>{
        ctx.status = 404;
        console.log(err);
    })
});

/**
 * @router POST /api/aboutus/updatepara
 * @desc 编辑段落的接口
 * @access 接口是公开的
 */
router.post("/updatepara",async ctx =>{
    //拿到id
    const essay_id = ctx.request.body.essay_id;
    const newobj = {};
    newobj.essay_type=ctx.request.body.essay_type;
    newobj.essay_title=ctx.request.body.essay_title;
    newobj.essay_content=ctx.request.body.essay_content;
    console.log(newobj);
    await Aboutus.findOneAndUpdate(
        {_id:essay_id},
        {$set:newobj},
        {new:true}
        )
    .then(()=>{
        ctx.status = 200;
        ctx.body = {code:1,msg:'更新成功！'};
    })
    .catch(err =>{
        ctx.status = 404;
        console.log(err);
    });
});

module.exports = router.routes();




