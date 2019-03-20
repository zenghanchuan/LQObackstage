
var route = require("koa-router")();


//前台GET路由
route.get("/",async (ctx,next)=>{
    let result1 = await require("../routes/interface/cases_data").findCases();
    let result2 = await require("../routes/interface/news_data").findNews();
    let result = {cases:result1,news:result2};
    // console.log(result);
    await ctx.render("./home/index",{data:result});
});

//关于我们
//关于易思特
route.get("/about",async (ctx,next)=>{
    let result = await require("../routes/interface/aboutus_data").findAboutyst();
    await ctx.render("./home/about.ejs",{data:result});
});
//易思特优势
route.get("/advantage",async (ctx,next)=>{
    let result = await require("../routes/interface/aboutus_data").findYstadvantage();
    await ctx.render("./home/advantage.ejs",{data:result});
});
//易思特团队
route.get("/yisite_team",async (ctx,next)=>{
    let result = await require("../routes/interface/aboutus_data").findYstteam();
    await ctx.render("./home/yisite_team.ejs",{data:result});
});
//组织架构
route.get("/organization",async (ctx,next)=>{
    let result = await require("../routes/interface/aboutus_data").findStructure();
    await ctx.render("./home/organization.ejs",{data:result});
});
//易思特技术
route.get("/technology",async (ctx,next)=>{
    let result = await require("../routes/interface/aboutus_data").findYsttechnology();
    await ctx.render("./home/technology.ejs",{data:result});
});
//易思特文化
route.get("/culture",async (ctx,next)=>{
    let result = await require("../routes/interface/aboutus_data").findYstculture();
    await ctx.render("./home/culture.ejs",{data:result});
});



//核心研究
//消费者研究
route.get("/research",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findConsumer();
    await ctx.render("./home/research.ejs",{data:result});
});
//满意度研究
route.get("/research_satisfaction",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findSatisfaction();
    await ctx.render("./home/research_satisfaction.ejs",{data:result});
});
//房地产研究
route.get("/research_realty",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findRealty();
    await ctx.render("./home/research_realty.ejs",{data:result});
});
//公共服务研究
route.get("/research_publicservice",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findPublicservice();
    await ctx.render("./home/research_publicservice.ejs",{data:result});
});
//互联网用户研究
route.get("/research_internetuser",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findInternetuser();
    await ctx.render("./home/research_internetuser.ejs",{data:result});
});
//市场进入研究
route.get("/research_marketaccess",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findMarketaccess();
    await ctx.render("./home/research_marketaccess.ejs",{data:result});
});
//广告媒介研究
route.get("/research_advertising",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findAdvertising();
    await ctx.render("./home/research_advertising.ejs",{data:result});
});
//神秘顾客研究
route.get("/research_mysterycustomer",async (ctx,next)=>{
    let result = await require("../routes/interface/research_data").findMysterycustomer();
    await ctx.render("./home/research_mysterycustomer.ejs",{data:result});
});



//成功案例
route.get("/successCase",async (ctx,next)=>{
    let result = await require("../routes/interface/cases_data").findCases();
    await ctx.render("./home/successCase.ejs",{data:result});
});
//具体案例
route.get("/detailCase",async (ctx,next)=>{
    await ctx.render("./home/detailCase.ejs");
});


//新闻资讯
route.get("/news",async (ctx,next)=>{
    let result = await require("../routes/interface/news_data").findNews();
    await ctx.render("./home/news.ejs",{data:result});
});

//联系我们
route.get("/contact",async (ctx,next)=>{
    await ctx.render("./home/contact.ejs");
});

//新闻详情
route.get("/news_msg",async (ctx,next)=>{
    await ctx.render("./home/news_msg.ejs");
});







module.exports = route;

