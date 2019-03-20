!function(){
    var btn = document.getElementById("btn");
    btn.onclick = function(){
        var data = {
            name: document.getElementById("contact_name").value,
            email: document.getElementById("contact_email").value,
            phone: document.getElementById("contatc_phone").value,
            description: document.getElementById("contact_question").value
        };
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://120.77.214.89:3000/api/contacts/addcontact ",true);
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
    