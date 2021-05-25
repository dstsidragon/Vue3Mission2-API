


const app = {
    data:{
        //取得token
        token: document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        // 讀取使用者名稱
        userName: document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
        productData: [],
        dataLength: 0,
    },
     // 登出
     signOutAdmin(e) {
        axios.post(`${api_url}/logout`)
            .then(
                res => {
                    // console.log(res);
                    if (res.data.success) {
                        alert(res.data.message);
                        window.location = "index.html";
                    } else {
                        alert("未知的錯誤!");
                        window.location = "product.html";
                    }
                }
            )
    },
    //取得商品列表
getProduct(){
    axios.get(`${api_url}/api/${api_path}/products`)
    .then(
        res=>{
            // console.log(res);
            // console.log(res.data.success);
            if(res.data.success){
            this.data.productData = res.data.products;
            // console.log(productData);
            this.render();
        }else{
            alert('驗證錯誤，請重新登入!');
            console.log(btnVerification);
            // window.location="index.html";
        }
        }
    ).catch(
        err=>{
            console.log(err);
        }
    )
    signOut.addEventListener("click",this.signOutAdmin,false);
},
//呈現資料在畫面
 render(){
    let str ="";
    this.data.dataLength=this.data.productData.length;

    this.data.productData.forEach((item,i) => {
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
          <td  class="col-1 d-flex align-items-center">
          <input class="carNum" type="number" value="1"  id="productNum_${item.id}">
          </td>
          <td class="col-2 d-flex align-items-center">
            <button type="button" id="car_${item.id}"  class="btn btn-sm btn-outline-info move deleteBtn" data-action="remove" data-id="${item.id}"> 加入購物車 </button>
          </td>
        </tr>
      `;
    });
    document.getElementById("productList").innerHTML = str;
    document.getElementById("productCount").innerHTML = this.data.dataLength;
    //賦予事件
    this.addEvent();
},

//動態賦予事件
addEvent (){
    // 購物車事件
    this.data.productData.forEach((item,i) => {
        document.getElementById(`car_${item.id}`).addEventListener("click",this.addCart,false);
    })
},

//加入購物車
addCart(e){
   alert("先不要點啦~ 我還沒做，晚點補上QQ")
    // 刷新畫面
    app.render();
},



// 初始化
init(){
    this.getProduct();

},
     // 初始化
    init() {
        //設定token
        axios.defaults.headers.common['Authorization'] = this.data.token;
        document.getElementById('user').innerHTML = this.data.userName;
        //取得產品
        this.getProduct();

        //事件
        

    },

};
app.init();





