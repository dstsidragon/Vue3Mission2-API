

const btnForm = document.getElementById("btn-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const form = document.getElementById("form");






// 登入
const ClickBtnForm = (e)=>{ 
    console.log(username.value);
    console.log(password.value);
e.preventDefault();
    //信箱驗證
    const myreg = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    
    console.log(myreg.test(username.value));
    const adminInfo = {
        username:username.value,
        password:password.value
    }
    console.log(adminInfo);
    if(username!=""&&myreg.test(username.value)&&password!=""){
        axios.post(`${api_url}/admin/signin`,adminInfo)
    .then(
        res=>{
            console.log(res);
        }
    ).catch(err=>{
        console.dir(err)
    })
    }
    
};




// 監聽事件

// 表單按鈕點擊
btnForm.addEventListener("click",ClickBtnForm,false);

