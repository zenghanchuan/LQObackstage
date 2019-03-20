const Router = require("koa-router");
const router = new Router();

//引入
const Cases = require('../../models/Cases');

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
 * @router POST /api/cases/addcase
 * @desc 添加成功案例的接口
 * @access 接口是公开的
 */
router.post("/addcase",async ctx =>{
    const newCase = new Cases({
        essay_type:ctx.request.body.essay_type,
        essay_title:ctx.request.body.essay_title,
        essay_imgbase:ctx.request.body.essay_imgbase,
        essay_content:ctx.request.body.essay_content,
    });
    // console.log(newCase);
    // console.log(ctx.request.body);
    await newCase
        .save()
        .then(cases =>{
            ctx.status = 200;
            ctx.body = {code:1,msg:'保存成功！'}
        })
        .catch(err =>{
            ctx.status = 404
            console.log(err);
        })

    
});

/**
 * @router GET /api/cases/getcase
 * @desc 获取成功案例的接口
 * @access 接口是公开的
 */
router.get("/getcase",async ctx =>{
    // console.log(ctx.query.essay_type);
    await Cases.find({essay_type:ctx.query.essay_type})
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
 * @router DELETE /api/cases/deletecase
 * @desc 删除成功案例的接口
 * @access 接口是公开的
 */
router.delete("/deletecase",async ctx =>{
    //拿到id
    const essay_id = ctx.request.body.essay_id;
    await Cases.deleteOne({_id:essay_id})
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
 * @router POST /api/cases/updatecase
 * @desc 编辑成功案例的接口
 * @access 接口是公开的
 */
router.post("/updatecase",async ctx =>{
    //拿到id
    const essay_id = ctx.request.body.essay_id;
    const newobj = {};
    newobj.essay_type=ctx.request.body.essay_type;
    newobj.essay_title=ctx.request.body.essay_title;
    newobj.essay_imgbase=ctx.request.body.essay_imgbase;
    newobj.essay_content=ctx.request.body.essay_content;
    await Cases.findOneAndUpdate(
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
