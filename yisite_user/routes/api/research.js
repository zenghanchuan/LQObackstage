const Router = require("koa-router");
const router = new Router();

//引入
const Research = require('../../models/Research');

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
 * @router POST /api/research/saveinfo
 * @desc 保存研究信息的接口
 * @access 接口是公开的
 */
router.post("/saveinfo",async ctx =>{
    const findResult =await Research.find({re_type:ctx.request.body.re_type});
    if(findResult.length>0){
        const re_type = ctx.request.body.re_type;
        const newobj = {};
        newobj.re_define=ctx.request.body.re_define;
        newobj.re_goal=ctx.request.body.re_goal;
        newobj.re_content=ctx.request.body.re_content;
        newobj.re_model=ctx.request.body.re_model;
        newobj.re_case=ctx.request.body.re_case;
        await Research.findOneAndUpdate(
            {re_type:re_type},
            {$set:newobj},
            {new:true}
            )
        .then(()=>{
            ctx.status = 200;
            ctx.body = {code:1,msg:'保存信息成功！'};
        })
        .catch(err =>{
            ctx.status = 404;
            console.log(err);
        });

    }else{
        const newone = new Research({
            re_type:ctx.request.body.re_type,
            re_define:ctx.request.body.re_define,
            re_goal:ctx.request.body.re_goal,
            re_content:ctx.request.body.re_content,
            re_model:ctx.request.body.re_model,
            re_case:ctx.request.body.re_case
        });
        await newone
            .save()
            .then(cases =>{
                ctx.status = 200;
                ctx.body = {code:1,msg:'保存成功！'}
            })
            .catch(err =>{
                ctx.status = 404
                console.log(err);
            })
        
    }

    
});

/**
 * @router GET /api/research/getinfo
 * @desc 获取研究信息的接口
 * @access 接口是公开的
 */
router.get("/getinfo",async ctx =>{
    // console.log(ctx.query.essay_type);
    await Research.find({re_type:ctx.query.re_type})
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


module.exports = router.routes();
