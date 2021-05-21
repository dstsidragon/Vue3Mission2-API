
const user = document.getElementById('user');
const signOut = document.getElementById('signOut');
const chkVerification = document.getElementById("chkVerification");
let productData ;
const productList = document.getElementById("productList");

// 讀取使用者名稱
const userName = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
user.innerHTML = userName;


// 登出
const signOutAdmin =(e)=>{
    axios.post(`${api_url}/logout`)
    .then(
        res=>{
            // console.log(res);
            if(res.data.success){
                alert(res.data.message);
                window.location="index.html";
            }else{
                alert("未知的錯誤!");
                window.location="product.html";
            }
        }
    )
};
signOut.addEventListener("click",signOutAdmin,false);


//取得商品列表
const getProduct = ()=>{
    axios.get(`${api_url}/api/${api_path}/products`)
    .then(
        res=>{
            console.log(res);
            productData = res.data.products;
            // console.log(productData);
            render();
        }
    ).catch(
        err=>{
            console.log(err);
        }
    )
};

//呈現資料在畫面
const render = ()=>{
    let str ="";
    productData.forEach((item,i) => {
        str += `
        <tr>
          <td>範例標題</td>
          <td width="120">
            範例原價
          </td>
          <td width="120">
            範例價格
          </td>
          <td width="100">
            <span class="">範例啟用狀態</span>
          </td>
          <td width="120">
            <button type="button" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id=""> 刪除 </button>
          </td>
        </tr>
      `;
    });
    productList.innerHTML = str;
};





// 初始化
function init(){
    getProduct();

};
init();
