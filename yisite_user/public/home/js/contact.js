!function(){
    var btn = document.getElementById("btn");
    btn.onclick = function(){
        var data = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            description: document.getElementById("description").value
        };
        var xhr = new XMLHttpRequest();
        xhr.open("POST","/admin/contact",true);
        xhr.setRequestHeader("Content-type","application/json");
        xhr.send(JSON.stringify(data));
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4 && xhr.status == 200){
                if (JSON.parse(xhr.responseText).code == 1){
                    alert("发送成功，感谢你的联系！");
                }
                else{
                    alert("发送失败，请重试！");
                }
            }
        }
    }
}()  
    