//引入koa
const Koa = require('koa');
//引入koa-json 使json数据更好看
const json = require('koa-json');
//引入koa-router
const KoaRouter = require('koa-router');
const router = require("./router/router");
//引入bodyparser
const bodyParser = require('koa-bodyparser');
//静态资源服务插件
const static = require('koa-static');
//引入path，它node自动提供的
const path = require('path');
//引入render，渲染html模板
const render = require('koa-ejs');
const views = require('koa-views');
//连接数据库需要
const mongoose = require("mongoose");
//跨域
const cors = require('koa-cors');

//引入接口
const users = require("./routes/api/users");
const aboutus = require("./routes/api/aboutus");
const research = require("./routes/api/research");
const cases = require("./routes/api/cases");
const news = require("./routes/api/news");
const contacts = require("./routes/api/contacts");



//实例化一个app
const app = new Koa();
//实例化apirouter对象
const apirouter = new KoaRouter();

// 配置静态资源
//app.use(require('koa-static')(path.join(__dirname, 'public')));
app.use(static(path.join(__dirname,'./public')));
app.use(views(path.join(__dirname,"./views"),{
    extension:"ejs"
}));



//json pretty
app.use(json());

//使用bodyparser后可获取ctx.request.body
app.use(bodyParser());

app.use(cors());

//koa中所有函数都会使用async 异步，它会给我们提供一个context上下文，context对象里面包含request、response等
// app.use(async ctx =>(ctx.body={msg:'hello koa!'}));

//连接数据库
mongoose
.connect(
    "mongodb://localhost:27017/yisite",
    { useNewUrlParser: true }
)
.then(()=>{
    console.log('mongodb 连接成功...');
})
.catch(err =>{
    console.log('mongodb 连接异常，异常原因：' +err);
});

//配置路由地址localhost:3000/api/users
apirouter.use('/api/users',users)
apirouter.use('/api/aboutus',aboutus)
apirouter.use('/api/research',research)
apirouter.use('/api/cases',cases)
apirouter.use('/api/news',news)
apirouter.use('/api/contacts',contacts)

//配置路由模块
app.use(apirouter.routes()).use(router.allowedMethods());
app.use(router.routes());
// router.get('/test',ctx =>(ctx.body = 'Hello Router!'));

//返回html需要配置模板引擎
//render(app,{
    //访问路径
//    root:path.join(__dirname,'views'),
    //对应布局
//    layout:false,
    //访问内容的尾缀
//    viewExt:'html',
    //缓存
 //   cache:false,
    //调试
 //   debug:false
//});

// // 加载模板引擎
// app.use(views(path.join(__dirname, './view'), {
//     extension: 'ejs'
// }));

//路由跳转 index,根路径下会自动寻找index.html,其他名字都不行
//router.get("/",async ctx =>{
 //   await ctx.render('index',{
 //       title:'Things i love'
 //   });
//});





//监听对应的端口号localhost:3000
app.listen(3000,()=>console.log("Server Started..."));


