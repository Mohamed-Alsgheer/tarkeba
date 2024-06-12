let productName = document.getElementById("product-name");
let productLink = document.getElementById("product-link");
let productColorSelect = document.getElementById("product-color");
let productInputs = document.getElementById("inputs");
let productColorTag = document.querySelector(".select-color");
let quantityProductCustom = document.getElementById("input-number");
let productColorValue;
let productColorName;
let cartNumbersC = JSON.parse(localStorage.getItem('cartNumbers'));

/////events/////
productColorSelect.addEventListener("change", getProductColor);
productInputs.addEventListener("submit", createProductFun);

/////functions/////
function getProductColor(e) {
    productColorTag = e.target;
    productColorValue = e.target.value;
}

function createProductFun(e) {
    e.preventDefault();
    let allProducts = JSON.parse(localStorage.getItem("productsInCart"));
    let nameValue = productName.value;
    let linkValue = productLink.value;
    let qtyValue = quantityProductCustom.value;
    //products number//
    localStorage.setItem("cartNumbers", JSON.parse(localStorage.getItem('cartNumbers')) + parseInt(qtyValue)) 
    //create product//
    if(nameValue && linkValue && productColorValue) {
        let obj = {
            id: allProducts ? allProducts.length + 100 : 100,
            inCart: qtyValue,
            tag: productColorValue,
            type: "custom",
            name: nameValue,
            link: linkValue,
            price: 100,
            size: 60,
        };
        let newProducts = allProducts ? [...allProducts, obj] : [obj];
        localStorage.setItem("productsInCart", JSON.stringify(newProducts));

        //total cost//
        let cartCost = localStorage.getItem('totalCost');
        if(cartCost != null) {
            cartCost = parseInt(cartCost);
            localStorage.setItem("totalCost", cartCost + obj.price * parseInt(qtyValue));
            console.log(cartCost);
        } else {
            localStorage.setItem("totalCost", obj.price * parseInt(qtyValue));
        }
        
        productName.value = "";
        productLink.value = "";
        productColorSelect.value = "";
        window.location = "tarkeba.html";
    } else {
        alert("enter your data");
    }
    
}

function ProductsNumber() {
    if(cartNumbersC == undefined) {
        localStorage.setItem("cartNumbers", 0);   
    }
}

ProductsNumber();
