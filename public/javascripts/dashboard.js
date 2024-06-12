let bestSelling = document.querySelector("#best-selling");
fetch('http://localhost:3000/admin', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}).then((res) => {
    return res.json();
}).then((data) => {
    data[1].filter(product => product.sold !== 0);
    data[1].sort(bySold);
    console.log(data[0]);
    console.log(data[1]);
    data[1].slice(0, 5).forEach((product) => {
        let orderLength = data[0].filter((order) => {
            //console.log(order);
            for(let i = 0; i < order.cart.selectedProduct.length; i++) {
                if(order.cart.selectedProduct[i]._id == product._id) {
                    return order;
                }
            }
        }).length;
        bestSelling.innerHTML += `
        <div class="product-div" style="display: flex;">
            <img src="${product.images[0].url}" width="60px">
            <p style="padding: 13px 5px 0px 5px;">${product.name}</p>
        </div>
        <div class="product-div">
            <p style="padding: 10px 5px 5px 0px;">${product.pricing.price} EGP</p>
            <p style="color: #878a99; font-size: 13px;">Price</p>
        </div>
        <div class="product-div">
            <p style="padding: 10px 5px 5px 0px;">${product.overallRating}</p>
            <p style="color: #878a99; font-size: 13px;">Rating</p>
        </div>
        <div class="product-div">
            <p style="padding: 10px 5px 5px 0px;">${product.stock}</p>
            <p style="color: #878a99; font-size: 13px;">Stock</p>
        </div>
        <div class="product-div">
            <p style="padding: 10px 5px 5px 0px;">${orderLength * product.pricing.price} EGP</p>
            <p style="color: #878a99; font-size: 13px;">Amount</p>
        </div>
        `
    });


}).catch((error) => {
    console.log(error);
});

function bySold(a, b) {
    return parseInt(b.sold) - parseInt(a.sold);
}