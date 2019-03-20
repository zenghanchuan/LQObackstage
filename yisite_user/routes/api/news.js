const Router = require("koa-router");
const router = new Router();

//引入
const News = require('../../models/News');


/**
 * @router POST /api/news/addnews
 * @desc 添加新闻资讯的接口
 * @access 接口是公开的
 */
router.post("/addnews",async ctx =>{
    const newNews = new News({
        news_title:ctx.request.body.news_title,
        news_content:ctx.request.body.news_content,
        news_time:ctx.request.body.news_time
    });
    // console.log(newCase);
    // console.log(ctx.request.body);
    await newNews
        .save()
        .then(news =>{
            ctx.status = 200;
            ctx.body = {code:1,msg:'保存成功！'}
        })
        .catch(err =>{
            ctx.status = 404
            console.log(err);
        })

    
});

/**
 * @router GET /api/news/getnews
 * @desc 获取新闻资讯的接口
 * @access 接口是公开的
 */
router.get("/getnews",async ctx =>{
    // console.log(ctx.query.essay_type);
    await News.find()
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
 * @router DELETE /api/news/deletenews?news_id=
 * @desc 删除新闻资讯的接口
 * @access 接口是公开的
 */
router.delete("/deletenews",async ctx =>{
    //拿到id
    const news_id = ctx.request.body.news_id;
    await News.deleteOne({_id:news_id})
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
 * @router POST /api/cases/updatenews?news_id=
 * @desc 编辑新闻资讯的接口
 * @access 接口是公开的
 */
router.post("/updatenews",async ctx =>{
    //拿到id
    const news_id = ctx.request.body.news_id;
    const newobj = {};
    newobj.news_time=ctx.request.body.news_time;
    newobj.news_title=ctx.request.body.news_title;
    newobj.news_content=ctx.request.body.news_content;
    await News.findOneAndUpdate(
        {_id:news_id},
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

