fetch('/admin/productsData', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' }
}).then((res) => {
  return res.json();
}).then((products) => {
  console.log(products);
  //paination buttons
  let pageBtns = document.querySelector("#page-btns");
  let pagesCount = Math.ceil(products.length / 15);
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
  let productList = products.slice(startIndex, endIndex);
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












  let productsBody = document.querySelector("#products-body");
  let listKeys = document.querySelectorAll(".list-key");
  listKeys.forEach((key) => {
    key.onclick = () => {
      if (key.children[0].style.transform === "rotate(0deg)") {
        listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
        key.children[0].style.transform = "rotate(180deg)";
        if (key === listKeys[0]) {
          products.sort(sortByName);
        } else if (key === listKeys[1]) {
          products.sort(sortByQuantity);
        } else if (key === listKeys[2]) {
          products.sort(sortByPrice);
        } else if (key === listKeys[3]) {
          products.sort(sortByRating);
        }
      } else {
        key.children[0].style.transform = "rotate(0deg)";
        products.reverse();
      }
      showProducts();
    }
  });


  //search bar 
  let searchBar = document.getElementById('search');
  let divButtons = document.getElementById("pagination-div");
  searchBar.addEventListener('keyup', search);
  function search() {
    if (searchBar.value != '') {
      divButtons.style.display = "none";
    } else {
      divButtons.style.display = "flex";
    }
    productsBody.innerHTML = "";
    for (let i = 0; i < products.length; i++) {
      if (products[i].name.toLowerCase().includes(searchBar.value.toLowerCase())) {
        let product = products[i];
        productsBody.innerHTML += `
        <div id="nameDiv">
          <img src="${product.images[0].url}" style="width: 50px;">
          <p>${product.name}</p>
        </div>
        <div>
          <p>${(product.stock) ? product.stock + " in" : "Out of"} stock</p>
        </div>
        <div>
          <p>${product.pricing.price} EGP</p>
        </div>
        <div style="font-size: 14px; gap: 5px;">
          <div class="starRate" style="padding: 0px;">
            <div class="numReviews2" style="margin: 0px; padding: 0px;">
              <i class="fa-regular fa-star mediaStyleStar"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <p class="productRate" style="margin: 0px;font-size: 14px; color: #fff">
                ${product.overallRating}</p>
          </div>
          <span style="color: #555;">(${product.numReviews})</span>
          <input type="number" value="${product.overallRating}" class="avgRating" hidden>
        </div>
        <div>
          <form action="/admin/deleteProduct" method="POST"
            style="align-items: baseline; width: 100%; display: flex; justify-content: center;">
            <a href="/admin/product/${product._id}">
              <img src="/images/admin-img/edit.png"
              style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
            </a>
            <input type="text" value="${product._id}" name="deleteBtn" hidden>
            <input type="image" src="/images/admin-img/delete.png"
            style="margin-left: 8px; cursor: pointer; width: 15px;"
            formaction="/admin/deleteProduct">
          </form>
      </div>`;

      }
    }
    ////average rating////
    avgRating = document.getElementsByClassName("avgRating");
    numReviews = document.querySelectorAll(".numReviews2");
    for (let i = 0; i < numReviews.length; i++) {
      for (let j = 0; j < avgRating[i].value; j++) {
        numReviews[i].children[j].classList.add("fa-solid");
      }
    }
  }







  function showProducts() {
    productList = products.slice(startIndex, endIndex);
    productsBody.innerHTML = "";
    productList.forEach((product) => {
      productsBody.innerHTML += `
        <div id="nameDiv">
          <img src="${product.images[0].url}" style="width: 50px;">
          <p>${product.name}</p>
        </div>
        <div>
          <p>${(product.stock) ? product.stock + " in" : "Out of"} stock</p>
        </div>
        <div>
          <p>${product.pricing.price} EGP</p>
        </div>
        <div style="font-size: 14px; gap: 5px;">
          <div class="starRate" style="padding: 0px;">
            <div class="numReviews2" style="margin: 0px; padding: 0px;">
              <i class="fa-regular fa-star mediaStyleStar"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
              <i class="fa-regular fa-star"></i>
            </div>
            <p class="productRate" style="margin: 0px;font-size: 14px; color: #fff">
                ${product.overallRating}</p>
          </div>
          <span style="color: #555;">(${product.numReviews})</span>
          <input type="number" value="${product.overallRating}" class="avgRating" hidden>
        </div>
        <div>
          <form action="/admin/deleteProduct" method="POST"
            style="align-items: baseline; width: 100%; display: flex; justify-content: center;">
            <a href="/admin/product/${product._id}">
              <img src="/images/admin-img/edit.png"
              style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
            </a>
            <input type="text" value="${product._id}" name="deleteBtn" hidden>
            <input type="image" src="/images/admin-img/delete.png"
            style="margin-left: 8px; cursor: pointer; width: 15px;"
            formaction="/admin/deleteProduct">
          </form>
      </div>`;

      ////average rating////
      avgRating = document.getElementsByClassName("avgRating");
      numReviews = document.querySelectorAll(".numReviews2");
      for (let i = 0; i < numReviews.length; i++) {
        for (let j = 0; j < avgRating[i].value; j++) {
          numReviews[i].children[j].classList.add("fa-solid");
        }
      }
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

function sortByName(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
}

function sortByRating(a, b) {
  if (a.overallRating < b.overallRating) return -1;
  if (a.overallRating > b.overallRating) return 1;

  return a.numReviews - b.numReviews;
}

function sortByQuantity(a, b) {
  return a.stock - b.stock;
}

function sortByPrice(a, b) {
  return a.pricing.price - b.pricing.price;
}

////average rating////
let avgRating = document.getElementsByClassName("avgRating");
let numReviews = document.querySelectorAll(".numReviews2");
for (let i = 0; i < numReviews.length; i++) {
  for (let j = 0; j < avgRating[i].value; j++) {
    numReviews[i].children[j].classList.add("fa-solid");
  }
}