!function(){
    var title = document.title;
    var a = document.querySelectorAll(".header>div>ul>li>a");
    if (title == "首页"){
        a[0].className = "on";
    }
    else if(title == ("关于我们" || "关于易思特" || "易思特优势" || "易思特团队" || "组织架构"|| "易思特技术" || "易思特文化")){
        a[1].className = "on";
    }
    else if(title == ("核心研究" || "消费者研究" || "满意度研究" || "房地产研究" || "公共服务研究"|| "互联网用户研究" || "市场进入研究" || "广告媒介研究" || "神秘顾客研究")){
        a[2].className = "on";
    }
    else if(title == "成功案例"){
        a[3].className = "on";
    }
    else if(title == "新闻资讯"){
        a[4].className = "on";
    }
    else{
        a[5].className = "on";
    }
}()