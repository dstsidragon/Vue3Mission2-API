
const user = document.getElementById('user');
const signOut = document.getElementById('signOut');
const chkVerification = document.getElementById("chkVerification");
let productData ;
const productList = document.getElementById("productList");
const productCount = document.getElementById("productCount");
//取得token
const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
axios.defaults.headers.common['Authorization'] = token;
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
    let dataLength=productData.length;

    productData.forEach((item,i) => {
        str += `
        <tr class="row ">
        
        <td  class="col-3 d-flex align-items-center"><img width="100%"  src="${item.imageUrl}" alt=""></td>
          <td class="col-2 d-flex align-items-center">${item.title}</td>
          <td  class="col-2 d-flex align-items-center">
            ${item.origin_price}
          </td>
          <td class="col-2 d-flex align-items-center">
            ${item.price}
          </td>
          <td  class="col-2 d-flex align-items-center">
          <div class="onoffswitch">
    <input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" ${item.is_enabled==1?"checked":""}>
    <label class="onoffswitch-label" for="myonoffswitch"></label>
</div>
          </td>
          <td class="col-1 d-flex align-items-center">
            <button type="button" id="del_${item.id}" class="btn btn-sm btn-outline-danger move deleteBtn" data-action="remove" data-id="${item.id}"> 刪除 </button>
          </td>
        </tr>
      `;
    });
    productList.innerHTML = str;
    productCount.innerHTML = dataLength;
    //賦予事件
    addEvent();
};

//動態賦予事件
const addEvent = ()=>{
    // 刪除事件
    productData.forEach((item,i) => {
        document.getElementById(`del_${item.id}`).addEventListener("click",delOneData,false);
    })
};

//刪除單一資料
const delOneData= (e)=>{
    const delId=e.target.dataset.id;
    axios.delete(`${api_url}/api/${api_path}/admin/product/${delId}`)
    .then(
        res=>{
            console.log(res);
            if(res.data.success){
                alert(`${res.data.message}`);
                getProduct();
    }else{
        alert('驗證錯誤，請重新登入!')
        window.location="index.html";
    }
        }
    ).catch(
        err=>{
            console.log(err)
        }
    )
    // 刷新畫面
    render();
};




// 初始化
function init(){
    getProduct();

};
init();
