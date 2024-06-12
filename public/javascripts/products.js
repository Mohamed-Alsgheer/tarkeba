/////menu items/////
const x = document.getElementById("closeX");
const iconNumber = document.querySelector(".icon");
const textTotal = document.querySelector(".total-products");
const noProducts = document.querySelector(".No_products");
const menuIcon = document.getElementById("menu-icon-open");
//menuitems.style.maxHeight = "0px";

//mobile enterFace//
function menutoggle() {
    let menuitems = document.getElementById("menuitems");
    console.log('function work');
    if(!menuitems.classList.contains("active")) {
        menuitems.classList.add("active");
    } else {
        menuitems.classList.remove("active");
    }
}



//open menu//
let cartMenu = document.querySelector(".menu-cart-products");
let cartProductsDoom = document.querySelector(".menu-productsss");
function openMenuProducts() {
    console.log('jjjjj');
    if(cartMenu.style.display == 'block') {
        console.log("menu products close");
        cartMenu.style.display = 'none';
    } else {
        console.log('djdjfjc');
        cartMenu.style.display = 'block';
        cartProductsDoom.style.display = 'block';
        console.log("menu products work");
    }    
    /*
    if(localStorage.getItem("cartNumbers") == 0) {
        console.log("no products");
        noProducts.style.display = "block";
        textTotal.style.display = "none";
    }
    if(localStorage.getItem("cartNumbers") > 0) {
        noProducts.style.display = "none";
        console.log("exist products");
        textTotal.style.display = "block";
        let cartCost = localStorage.getItem("totalCost");
        textTotal.innerHTML = `total: ${cartCost}LE`;
    }*/
}

//let itemDetails = document.querySelector("#product-js");
const searchBar = document.getElementById("searchBar");
const searchIcon = document.getElementById("searchIcon");
const inputSearch = document.getElementById("inputSearch");
searchIcon.onclick = () => {
    if(window.innerWidth > 600) {
        if(searchBar.style.width === "250px") {
            searchBar.style.width = "0px";
            inputSearch.style.padding = "0px";
        } else {
            searchBar.style.width = "250px";
            inputSearch.style.padding = "0px 10px";
        }
    } else {
        if(searchBar.style.height === "50px") {
            searchBar.style.height = "0px";
            inputSearch.style.padding = "0px";
            inputSearch.style.height = "0px";
        } else {
            searchBar.style.height = "50px";
            inputSearch.style.padding = "0px 10px";
            inputSearch.style.height = "30px";
        }
    }
}


/*
if(addedItem) {  
    if(productDetails == undefined) {  
        addedItem.map((item) => {
            cartProductsDoom.innerHTML += `
            <div class="product-in-menu">
                <img src="tarkeba-img/blackX.png" id="delete-product" class="cancel" onclick="deleteProduct(${item.id})">
                <div class= "ay7aga">
                    <div>
                        <img src="${item.tag}" alt="" style="cursor: pointer;" onclick='saveItemData(${item.id})'>
                        </div>
                        <div>
                        <p style="text-align: left; cursor: pointer;" onclick='saveItemData(${item.id})'>${item.name}</p>
                        <p style="text-align: left;" id= "size1">${item.size}ml</p>
                        <p style="text-align: left;">${item.type}</p>
                        <p style="text-align: left;">${item.price} x ${item.inCart}</p>
                    </div>
                </div>
                <hr>
                </div>`;
        });
        if(cartMenu) {
            cartMenu.style.display = "block";
            cartMenu.style.display = "none";
        }
    } else {
        if(cartProductsDoom) {
            addedItem.map((productDetails) => {

                cartProductsDoom.innerHTML += `
                <div  class="product-in-menu">
                    <img src="tarkeba-img/blackX.png" id="delete-product" class="cancel" onclick="deleteProduct(${productDetails.id})">
                    <div class= "ay7aga">
                        <div>
                            <img src="${productDetails.tag}" alt="" style="cursor: pointer;" onclick='saveItemData(${productDetails.id})'>
                        </div>
                        <div>
                            <p style="text-align: left; cursor: pointer;" onclick='saveItemData(${productDetails.id})'>${productDetails.name}</p>
                            <p style="text-align: left;" id= "size1">${productDetails.size}ml</p>
                            <p style="text-align: left;">${productDetails.type}</p>
                            <p style="text-align: left;">${productDetails.price} x ${productDetails.inCart}</p>
                        </div>
                    </div>
                    <hr>
                </div>`;
            });
            cartMenu.style.display = "block";
            cartMenu.style.display = "none";
        }
    }
}
*/

