let code = document.getElementById("code");
let codeTitle = document.getElementById("codeTitle");
let error = document.getElementById("existCoupon");
if(error) {
    code.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    code.style.borderColor = "#d00";
    code.style.marginBottom = "5px"; 
    code.style.color = "#c40000";
    codeTitle.style.color = "#c40000";
} else {
    code.style.boxShadow = "none";
    code.style.borderColor = "-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))";
    code.style.marginBottom = "15px"; 
    code.style.color = "#1E1926";
    codeTitle.style.color = "#1E1926";
}


let couponType = document.querySelectorAll("[name=couponType]");
couponType.onchange = (radio) => {
    let discountValue = document.getElementById("discountValue");
    let discountTitle = document.getElementById("discountTitle");
    if(radio.value == "FreeShipping") {
        discountValue.disabled = true;
        discountTitle.style.color = "#6c757d";
    } else {
        discountValue.disabled = false;
        discountTitle.style.color = "#000";
    }
}

let checkType = couponType[0].getAttribute("coupon-type");
if(checkType == "Percentage") {
    couponType[0].checked = true;
} else if(checkType == "Fixed amount") {
    couponType[1].checked = true;
} else {
    couponType[2].checked = true;
}