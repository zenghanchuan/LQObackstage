const Router = require("koa-router");
const router = new Router();

//引入
const Contacts = require('../../models/Contacts');


/**
 * @router POST /api/contacts/addcontact
 * @desc 添加联系我们的接口
 * @access 接口是公开的
 */
router.post("/addcontact",async ctx =>{
    const newContact = new Contacts({
        contact_name:ctx.request.body.contact_name,
        contact_email:ctx.request.body.contact_email,
        contact_phone:ctx.request.body.contact_phone,
        contact_question:ctx.request.body.contact_question,
    });
    
    await newContact
        .save()
        .then(contact =>{
            ctx.status = 200;
            ctx.body = {code:1,msg:'保存成功！'}
        })
        .catch(err =>{
            ctx.status = 404
            console.log(err);
        })

    
});

/**
 * @router GET /api/contacts/getcontact
 * @desc 获取联系我们的接口
 * @access 接口是公开的
 */
router.get("/getcontact",async ctx =>{
    // console.log(ctx.query.essay_type);
    await Contacts.find()
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
 * @router DELETE /api/contacts/deletecontact?contact_id=
 * @desc 删除联系我们的接口
 * @access 接口是公开的
 */
router.delete("/deletecontact",async ctx =>{
    //拿到id
    const contact_id = ctx.request.body.contact_id;
    await Contacts.deleteOne({_id:contact_id})
    .then(()=>{
        ctx.status = 200;
        ctx.body = {code:1,msg:'删除成功！'};
    })
    .catch(err =>{
        ctx.status = 404;
        console.log(err);
    })
});


module.exports = router.routes();
