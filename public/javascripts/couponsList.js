fetch('http://localhost:3000/admin/couponsData', {
  method: 'GET',
  headers: { 'Content-Type': 'application/json; charset=UTF-8' }
}).then((res) => {
  return res.json();
}).then((coupons) => {
  console.log(coupons);
  //paination buttons
  let pageBtns = document.querySelector("#page-btns");
  let pagesCount = Math.ceil(coupons.length / 15);
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
  let couponList = coupons.slice(startIndex, endIndex);
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


  let couponsBody = document.querySelector("#coupons-body");
  let listKeys = document.querySelectorAll(".list-key");
  listKeys.forEach((key) => {
    key.onclick = () => {
      if (key.children[0].style.transform == "rotate(0deg)") {
        listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
        key.children[0].style.transform = "rotate(180deg)";
        if (key === listKeys[0]) {
          coupons.sort(sortByCode);
        } else if (key === listKeys[1]) {
          coupons.sort(sortByType);
        } else if (key === listKeys[2]) {
          coupons.sort(sortByDiscount);
        } else if (key === listKeys[3]) {
          coupons.sort(sortByStatus);
        } else if (key === listKeys[4]) {
          coupons.sort(sortByStartDate);
        } else if (key === listKeys[5]) {
          coupons.sort(sortByEndDate);
        }
      } else {
        key.children[0].style.transform = "rotate(0deg)";
        coupons.reverse();
      }
      showProducts();
    }
  });


  //search bar 
  let searchBar = document.getElementById('search');
  let divButtons = document.getElementById("pagination-div");
  searchBar.addEventListener('keyup', search);
  function search() {
    if (searchBar.value !== '') {
      divButtons.style.display = "none";
    } else {
      divButtons.style.display = "flex";
    }
    couponsBody.innerHTML = "";
    for (let i = 0; i < coupons.length; i++) {
      if (coupons[i].code.toLowerCase().includes(searchBar.value.toLowerCase())) {
        couponsBody.innerHTML += `
        <div>
          <p>${coupons[i].code}</p>
        </div>
        <div>
          <p>${coupons[i].type}</p>
        </div>
        <div>
          <p id="coupon${coupons[i]._id}">
            ${coupons[i].discountValue}
          </p>
        </div>
        <div>
          <p>${coupons[i].status}</p>
        </div>
        <div>
          <p>${coupons[i].startDate}</p>
        </div>
        <div>
          <p>${coupons[i].endDate}</p>
        </div>
        <div style="justify-content: center;">
          <form action="/admin/deleteProduct" method="POST" style="align-items: baseline;">
            <input type="text" value="${coupons[i]._id}" name="deleteBtn" hidden>
            <a href="/admin/coupon/${coupons[i]._id}">
              <img src="/images/admin-img/edit.png"
              style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
            </a>
            <input type="image" src="/images/admin-img/delete.png"
            style="margin-left: 8px; cursor: pointer; width: 15px;"
            formaction="/admin/deleteProduct">
          </form>
        </div>`;
        let discountValue = document.querySelector(`#coupon${coupons[i]._id}`), suffix = "";
        if (coupons[i].type == "Percentage") {
          suffix = "%";
        } else if (coupons[i].type == "Fixed amount") {
          suffix = "EGP";
        }
        discountValue.innerHTML += suffix;
      }
    }
  }



  function showProducts() {
    couponList = coupons.slice(startIndex, endIndex);
    couponsBody.innerHTML = "";
    couponList.forEach((coupon) => {
      couponsBody.innerHTML += `
      <div>
        <p>${coupon.code}</p>
      </div>
      <div>
        <p>${coupon.type}</p>
      </div>
      <div>
        <p id="coupon${coupon._id}">
          ${coupon.discountValue}
        </p>
      </div>
      <div>
        <p>${coupon.status}</p>
      </div>
      <div>
        <p>${coupon.startDate}</p>
      </div>
      <div>
        <p>${coupon.endDate}</p>
      </div>
      <div style="justify-content: center;">
        <form action="/admin/deleteProduct" method="POST" style="align-items: baseline;">
          <input type="text" value="${coupon._id}" name="deleteBtn" hidden>
          <a href="/admin/coupon/${coupon._id}">
            <img src="/images/admin-img/edit.png"
            style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
          </a>
          <input type="image" src="/images/admin-img/delete.png"
          style="margin-left: 8px; cursor: pointer; width: 15px;"
          formaction="/admin/deleteProduct">
        </form>
      </div>`;
      let discountValue = document.querySelector(`#coupon${coupon._id}`), suffix = "";
      if (coupon.type == "Percentage") {
        suffix = "%";
      } else if (coupon.type == "Fixed amount") {
        suffix = "EGP";
      }
      discountValue.innerHTML += suffix;
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

function sortByCode(a, b) {
  if (a.code.toLowerCase() < b.code.toLowerCase()) return -1;
  if (a.code.toLowerCase() > b.code.toLowerCase()) return 1;
  return 0;
}

function sortByType(a, b) {
  if (a.type < b.type) return -1;
  if (a.type > b.type) return 1;
  return 0;
}

function sortByStatus(a, b) {
  if (a.status < b.status) return -1;
  if (a.status > b.status) return 1;
  return 0;
}

function sortByDiscount(a, b) {
  if (parseInt(a.discountValue) < parseInt(b.discountValue)) return -1;
  if (parseInt(a.discountValue) > parseInt(b.discountValue)) return 1;
  if (a.discountValue === "_") return 1;
  if (b.discountValue === "_") return -1;
  return 0;
}

function sortByStartDate(a, b) {
  if (new Date(a.startDate) < new Date(b.startDate)) return -1;
  if (new Date(a.startDate) > new Date(b.startDate)) return 1;
  return 0;
}

function sortByEndDate(a, b) {
  if (new Date(a.endDate) < new Date(b.endDate)) return -1;
  if (new Date(a.endDate) > new Date(b.endDate)) return 1;
  if (a.endDate === "_") return 1;
  if (b.endDate === "_") return -1;
  return 0;
}

