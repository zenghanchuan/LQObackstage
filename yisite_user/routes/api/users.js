const Router = require("koa-router");
const jwt = require('jsonwebtoken');
var utility=require("utility");
const router = new Router();

//引入User
const User = require('../../models/User');

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
 * @router POST /api/users/register
 * @desc 注册接口地址
 * @access 接口是公开的
 */
// router.post("/register",async ctx =>{
//     const adminname =ctx.request.body.name;
//     const adminpassword = utility.md5(ctx.request.body.password);
//     const newUser = new User({
//         name:adminname,
//         password:adminpassword,
//         token:''
//     });
//     console.log(newUser);
//     newUser.save();
// });



/**
 * @router POST /api/users/login
 * @desc 登录接口地址
 * @access 接口是公开的
 */
router.post("/login",async ctx =>{
	
    const myname = ctx.request.body.name;
    const mypassword =ctx.request.body.password;
    const findResult = await User.find({name:myname});
    // console.log(findResult[0]);
    if (findResult.length>0){
        if(mypassword==findResult[0].password){
            ctx.status = 200;
            //生成token
            const token = jwt.sign(
                {
                    name:ctx.request.body
                },
                'suzhen',
                {
                    expiresIn:60*60*12
                }

            )
            ctx.body = {
                code:1,
                msg:'登录成功！',
                username:myname,
                token:token
            };
            // findResult[0].token = token;
            const newobj = {};
            newobj.name =  findResult[0].name;
            newobj.password = findResult[0].password;
            newobj.token = token;
       
            await User.findOneAndUpdate(
                {_id:findResult[0]._id},
                {$set:newobj},
                {new:true}
                )
        }else{
            ctx.status = 200;
            ctx.body = {code:2,msg:'密码错误！'};
        }
    }else{
        ctx.status = 200;
        ctx.body = {code:0,msg:'用户不存在！'}
    }
});

//检测token是否过期
router.post("/checktoken",async ctx =>{
    let myuser = ctx.request.body.username;
    // console.log('dayin123'+myuser);
    const findResult = await User.find({name:myuser});
    if(findResult.length>0){
        let token = findResult[0].token;
        jwt.verify(token,"suzhen",(error,decoded)=>{
            if(error){
                // console.log(error);
                ctx.body = {code:0,msg:'token已失效！'};
            }else{
                
                ctx.body = {code:1,msg:'token有效！'};

            }
        })
    }else{
        ctx.body = {code:2,msg:'用户名不存在！'};
    }
    
})

module.exports = router.routes();
