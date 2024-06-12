let product = document.querySelectorAll(".product");
let increaseBtn = document.querySelectorAll(".next");
let decreaseBtn = document.querySelectorAll(".prev");
let deleteBtn = document.querySelectorAll(".deleteProduct");
let qtyInStock = document.querySelectorAll(".qtyInStock");
let productQty = document.querySelectorAll(".productQty");
let qtyInput = document.querySelectorAll(".qtyInput");
let removeCheckbox = document.querySelectorAll(".removeCheckbox");

/* change product quantity + 1 */
increaseBtn.forEach((btn, index) => {
    btn.onclick = () => {
        let currentQty = parseInt(productQty[index].textContent);
        let QtyAvailable = parseInt(qtyInStock[index].value);
        if (currentQty === QtyAvailable) {
            btn.classList.add("disable");
        } else {
            productQty[index].textContent = currentQty + 1;
            qtyInput[index].value = currentQty + 1;
        }
        decreaseBtn[index].classList.remove("disable");
    }
});

// function plusOne(index) {
//     var myRequest = new XMLHttpRequest();
//     myRequest.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             //console.log(myRequest);
//             //console.log(this.response);
//             const cartBody = document.querySelector("#cartBody");
//             cartBody.innerHTML = this.response;
//         }
//     }
//     myRequest.open("GET", `/increasProduct/${index}`, true);
//     myRequest.send();
// }

/* change product quantity - 1 */
decreaseBtn.forEach((btn, index) => {
    btn.onclick = () => {
        let currentQty = parseInt(productQty[index].textContent);
        if (currentQty === 2) {
            btn.classList.add("disable");
            productQty[index].textContent = currentQty - 1;
            qtyInput[index].value = currentQty - 1;
        } else if (currentQty !== 1) {
            productQty[index].textContent = currentQty - 1;
            qtyInput[index].value = currentQty - 1;
        }
        increaseBtn[index].classList.remove("disable");
    }
});

// function minusOne(index) {
//     var myRequest = new XMLHttpRequest();
//     myRequest.onreadystatechange = function () {
//         if (this.readyState === 4 && this.status === 200) {
//             //console.log(myRequest);
//             //console.log(this.response);
//             const cartBody = document.querySelector("#cartBody");
//             cartBody.innerHTML = this.response;
//         }
//     }
//     myRequest.open("GET", `/decreasProduct/${index}`, true);
//     myRequest.send();
// }

/* remove product */
deleteBtn.forEach((btn, index) => {
    btn.onclick = () => {
        product[index].classList.add("remove");
        removeCheckbox[index].checked = true;
    }
});