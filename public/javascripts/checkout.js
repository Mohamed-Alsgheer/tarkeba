fetch('/coupons', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}).then((res) => {
  return res.json();
}).then((data) => {
  console.log(data);
  let coupons = data.filter(coupon => coupon.status === "Enabled");
  console.log(coupons);
  let checkBtn = document.getElementById("checkCode");
  let code = document.getElementById("coupon");
  let couponError = document.getElementById("coupon-error");
  let couponCode = document.getElementById("couponCode");
  let couponValue = document.getElementById("couponValue");
  let shippingPrice = document.getElementById("shippingPrice");
  let subTotal = document.getElementById("subTotal");
  let totalCost = document.getElementById("totalCost");
  let validCoupon = document.getElementById("validCoupon");
  let totalPrice = document.getElementById("totalPrice");
  checkBtn.onclick = () => {
    couponError.innerHTML = "";
    couponValue.innerHTML = "";
    couponCode.innerHTML = "";
    totalCost.innerHTML = (parseInt(subTotal.innerHTML) + parseInt(shippingPrice.innerHTML)) + " EGP";
    let validCoupon = coupons.find(coupon => coupon.code === code.value);
    if(validCoupon) {
      if(new Date() < new Date(validCoupon.endDate) || validCoupon.endDate == "_") {
        if(validCoupon.usageLimit === "unlimited" || parseInt(validCoupon.usageLimit) > 0) {
          if(validCoupon.discountValue !== "_") {
            let statusCode;
            if(validCoupon.status === "Fixed amount") {
              statusCode = " EGP" 
              totalCost.innerHTML = (parseInt(totalCost.innerHTML) - parseInt(validCoupon.discountValue)) + " EGP";
            } else {
              statusCode = "%";
              totalCost.innerHTML = (parseInt(totalCost.innerHTML) - (parseInt(totalCost.innerHTML) * parseInt(validCoupon.discountValue) / 100)) + " EGP";
            }
            couponCode.innerHTML = code.value;
            couponValue.innerHTML = validCoupon.discountValue + statusCode;
          } else {
            totalCost.innerHTML = (parseInt(totalCost.innerHTML) - parseInt(shippingPrice.innerHTML)) + "EGP";
            couponValue.innerHTML = validCoupon.status;
          }
          validCoupon.value = code.value;
        } else {
          couponError.innerHTML = "This coupon has expired.";
        }
      } else {
        couponError.innerHTML = "This coupon has expired.";
      }
    } else {
      couponError.innerHTML = "This coupon code is incorrect.";
    }
    totalPrice.value = parseInt(totalCost.innerHTML);
  }
});