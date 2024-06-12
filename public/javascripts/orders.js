let orders, filteredOrders;
const options = { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
fetch('/admin/orders', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}).then((res) => {
  return res.json();
}).then((data) => {
  orders = data;
  filteredOrders = data;
  console.log(data);
  //pagination buttons
  let pageBtns = document.querySelector("#page-btns");
  let pagesCount = Math.ceil(data.length / 15);
  let currentPage = 1;
  // create list btns
  for (let i = 1; i <= pagesCount; i++) {
    let pageBtn = document.createElement("li");
    pageBtn.setAttribute("class", "page-btn");
    if (i == 1) pageBtn.classList.add("active");
    pageBtn.innerHTML = i;
    pageBtns.appendChild(pageBtn);
  }

  let paginationBullets = Array.from(document.querySelectorAll("#page-btns li"));
  let startIndex = (currentPage - 1) * 15;
  let endIndex = currentPage * 15;
  let productList = data.slice(startIndex, endIndex);
  paginationBullets.forEach((btn) => {
    btn.onclick = () => {
      paginationBullets.forEach(btn => btn.classList.remove("active"));
      btn.classList.add("active");
      currentPage = parseInt(btn.textContent);
      startIndex = (currentPage - 1) * 15;
      endIndex = currentPage * 15;
      checker();
      showProducts();


    }
  });


  //start page btn
  let startPage = document.querySelector(".start-page");
  startPage.onclick = () => {
    paginationBullets.forEach(btn => btn.classList.remove("active"));
    paginationBullets[0].classList.add("active");
    currentPage = 1;
    startIndex = (currentPage - 1) * 15;
    endIndex = currentPage * 15;
    checker();
    showProducts();
  }
  //next page btn
  let nextPage = document.querySelector(".next-page");
  nextPage.onclick = () => {
    currentPage += 1;
    paginationBullets.forEach(btn => btn.classList.remove("active"));
    paginationBullets[currentPage - 1].classList.add("active");
    checker();
    startIndex = (currentPage - 1) * 15;
    endIndex = currentPage * 15;
    showProducts();
  }
  //prev page btn
  let prevPage = document.querySelector(".prev-page");
  prevPage.onclick = () => {
    currentPage -= 1;
    paginationBullets.forEach(btn => btn.classList.remove("active"));
    paginationBullets[currentPage - 1].classList.add("active");
    checker();
    startIndex = (currentPage - 1) * 15;
    endIndex = currentPage * 15;
    showProducts();
  }
  //end page btn
  let endPage = document.querySelector(".end-page");
  endPage.onclick = () => {
    paginationBullets.forEach(btn => btn.classList.remove("active"));
    console.log(paginationBullets[-1]);
    paginationBullets[pagesCount - 1].classList.add("active");
    currentPage = pagesCount;
    startIndex = (currentPage - 1) * 15;
    endIndex = currentPage * 15;
    checker();
    showProducts();
  }


  let orderBody = document.getElementById("orderBody");
  let listKeys = document.querySelectorAll(".list-key");
  listKeys.forEach((key) => {
    key.onclick = () => {
      if (key.children[0].style.transform == "rotate(0deg)") {
        listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
        key.children[0].style.transform = "rotate(180deg)";
        if (key === listKeys[0]) {
          filteredOrders.sort(sortByDate);
        } else if (key === listKeys[1]) {
          filteredOrders.sort(sortByPayment);
        } else if (key === listKeys[2]) {
          filteredOrders.sort(sortByStatus);
        } else if (key === listKeys[3]) {
          filteredOrders.sort(sortByPrice);
        }
      } else {
        key.children[0].style.transform = "rotate(0deg)";
        filteredOrders.reverse();
      }
      showProducts();
    }
  });




  function showProducts() {
    productList = filteredOrders.slice(startIndex, endIndex);
    orderBody.innerHTML = "";
    productList.forEach((order) => {
      let orderDate = new Date(order.createdAt).toLocaleDateString("en-us", options);
      orderBody.innerHTML += `
      <div>
        <p>${order.invoice}</p>
      </div>
      <div>
        <p>${orderDate}</p>
      </div>
      <div>
        <p>${order.shippingAddress.name}</p>
      </div>
      <div>
        <p>${order.paymentMethod}</p>
      </div>
      <div>
        <p>${order.status}</p>
      </div>
      <div>
        <p>${order.orderPrice} EGP</p>
      </div>
      <div>
        <a href="/admin/order/${order._id}">
          <img src="/images/admin-img/edit.png" width="15px"
          style="margin: 0px 20px; cursor: pointer;">
        </a>
      </div>`;
    });
  }

  function checker() {
    if (currentPage == pagesCount) {
      if (pagesCount == 1) {
        prevPage.classList.add("disabled");
        startPage.classList.add("disabled");
        prevPage.disabled = true;
      } else {
        prevPage.classList.remove("disabled");
        startPage.classList.remove("disabled");
        prevPage.disabled = false;
      }
      nextPage.classList.add("disabled");
      endPage.classList.add("disabled");
      nextPage.disabled = true;
    } else if (currentPage == 1) {
      prevPage.classList.add("disabled");
      startPage.classList.add("disabled");
      prevPage.disabled = true;
      nextPage.disabled = false;
      nextPage.classList.remove("disabled");
      endPage.classList.remove("disabled");
    } else {
      prevPage.disabled = false;
      nextPage.disabled = false;
      nextPage.classList.remove("disabled");
      endPage.classList.remove("disabled");
      prevPage.classList.remove("disabled");
      startPage.classList.remove("disabled");
    }
  }
  checker();
});


let orderBody = document.getElementById('orderBody');
let searchBar = document.getElementById('search');
searchBar.addEventListener('keyup', search);

const divButtons = document.getElementById("pagination-div");


function search() {
  if (searchBar.value != '') {
    divButtons.style.display = "none";
  } else {
    divButtons.style.display = "flex";
  }
  console.log('test');
  console.log(searchBar.value);
  orderBody.innerHTML = '';
  for (let i = 0; i < orders.length; i++) {
    if (orders[i]._id.includes(searchBar.value)) {
      console.log(orders[i]);
      let orderDate = new Date(orders[i].createdAt).toLocaleDateString("en-us", options);
      orderBody.innerHTML += `
      <div>
        <p>${orders[i].invoice}</p>
      </div>
      <div>
        <p>${orderDate}</p>
      </div>
      <div>
        <p>${orders[i].shippingAddress.name}</p>
      </div>
      <div>
        <p>${orders[i].paymentMethod}</p>
      </div>
      <div>
        <p>${orders[i].status}</p>
      </div>
      <div>
        <p>${orders[i].orderPrice} EGP</p>
      </div>
      <div>
        <a href="/admin/order/${orders[i]._id}">
          <img src="/images/admin-img/edit.png" width="15px"
          style="margin: 0px 20px; cursor: pointer;">
        </a>
      </div>`;
    }
  }
}



/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/

let orderDate = document.querySelectorAll(".orderDate");
orderDate.forEach((date) => {
  date.innerHTML = new Date(date.innerHTML).toLocaleDateString("en-us", options);
});

/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/



function togglePopupDelete() {
  document.getElementById("popup-1").classList.toggle("active");
}

function createCSV() {
  let csvContent = "Order ID,Invoice,Subtotal,Shipping Cost,Total,Payment Method,Status,Customer,Created At,Updated At\n";
  orders.forEach((order) => {
    let row = order._id + "," + order.invoice + "," + order.cart.totalPrice + ","
      + order.shippingAddress + "," + order.orderPrice + "," + order.PaymentMethod + ","
      + order.status + "," + order.shippingAddress.name + "," + order.createdAt + "," + order.updatedAt + "\n";
    csvContent += row;
  });

  let data = new Blob([csvContent], { type: 'orders/csv' });
  saveFile(data, "test.csv");
}

function saveFile(blob, fileName) {
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);

  } else {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);
  }
}



/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/


function sortByPayment(a, b) {
  if (a.paymentMethod < b.paymentMethod) return -1;
  if (a.paymentMethod > b.paymentMethod) return 1;
}

function sortByStatus(a, b) {
  if (a.status.toLowerCase() < b.status.toLowerCase()) return -1;
  if (a.status.toLowerCase() > b.status.toLowerCase()) return 1;
}

function sortByPrice(a, b) {
  return a.orderPrice - b.orderPrice;
}

function sortByDate(a, b) {
  if (new Date(a.createdAt).valueOf() < new Date(b.createdAt).valueOf()) return -1;
  if (new Date(a.createdAt).valueOf() > new Date(b.createdAt).valueOf()) return 1;
}



/*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*//*/*/



/* filter orders by status */
let Status = document.getElementById("selectStatus");
Status.addEventListener("change", filterOrders);
function filterOrders() {
  let listKeys = document.querySelectorAll(".list-key");
  listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
  console.log(Status.value);
  if (Status.value === 'all') {
    filteredOrders = orders;
  } else {
    filteredOrders = orders.filter(order => order.status === Status.value);
  }

  console.log(filteredOrders);
  orderBody.innerHTML = '';
  filteredOrders.forEach((order) => {
    let orderDate = new Date(order.createdAt).toLocaleDateString("en-us", options);
    orderBody.innerHTML += `
    <div>
      <p>${order.invoice}</p>
    </div>
    <div>
      <p>${orderDate}</p>
    </div>
    <div>
      <p>${order.shippingAddress.name}</p>
    </div>
    <div>
      <p>${order.paymentMethod}</p>
    </div>
    <div>
      <p>${order.status}</p>
    </div>
    <div>
      <p>${order.orderPrice} EGP</p>
    </div>
    <div>
      <a href="/admin/order/${order._id}">
        <img src="/images/admin-img/edit.png" width="15px"
        style="margin: 0px 20px; cursor: pointer;">
      </a>
    </div>`;
  });
}
