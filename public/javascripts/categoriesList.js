fetch('/admin/categoriesData', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
}).then((res) => {
  return res.json();
}).then((categories) => {
  console.log(categories);
  //paination buttons
  let pageBtns = document.querySelector("#page-btns");
  let pagesCount = Math.ceil(categories.length / 15);
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
  let categoryList = categories.slice(startIndex, endIndex);
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














  let categoriesBody = document.querySelector("#categories-body");
  let listKeys = document.querySelectorAll(".list-key");
  listKeys.forEach((key) => {
    key.onclick = () => {
      if (key.children[0].style.transform === "rotate(0deg)") {
        listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
        key.children[0].style.transform = "rotate(180deg)";
        if (key === listKeys[0]) {
          categories.sort(sortByName);
        } else if (key === listKeys[1]) {
          categories.sort(sortByItem);
        } else if (key === listKeys[2]) {
          categories.sort(sortByParent);
        } else if (key === listKeys[3]) {
          categories.sort(sortByStatus);
        }
      } else {
        key.children[0].style.transform = "rotate(0deg)";
        categories.reverse();
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
    categoriesBody.innerHTML = "";
    for (let i = 0; i < categories.length; i++) {
      let searchValue = searchBar.value.toLowerCase();
      if (categories[i].name.toLowerCase().includes(searchValue) || categories[i].parent.toLowerCase().includes(searchValue)) {
        let category = categories[i];
        categoriesBody.innerHTML += `
        <div>
          <p>${category.name}</p>
        </div>
        <div>
          <p>${category.items}</p>
        </div>
        <div>
          <p>${category.parent}</p>
        </div>
        <div>
          <p id="visibileDate${category._id}">${category.visibility}</p>
        </div>
        <div>
          <form action="/admin/deleteCategory/${category._id}" method="POST"
          style="align-items: baseline; width: 100%; display: flex; justify-content: center;">
            <a href="/admin/category/${category._id}">
              <img src="/images/admin-img/edit.png"
              style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
            </a>
            <input type="image" src="/images/admin-img/delete.png"
            style="margin-left: 8px; cursor: pointer; width: 15px;"
            formaction="/admin/deleteCategory/${category._id}">
          </form>
        </div>`;
        let visibileDate = document.querySelector(`#visibileDate${category._id}`);
        if (category.visibility == "Scheduled") visibileDate.innerHTML = new Date(category.publishDate).toLocaleDateString("en-us", { dateStyle: "medium" });
      }
    }
  }







  function showProducts() {
    categoryList = categories.slice(startIndex, endIndex);
    categoriesBody.innerHTML = "";
    categoryList.forEach((category) => {
      categoriesBody.innerHTML += `
      <div>
        <p>${category.name}</p>
      </div>
      <div>
        <p>${category.items}</p>
      </div>
      <div>
        <p>${category.parent}</p>
      </div>
      <div>
        <p id="visibileDate${category._id}">${category.visibility}</p>
      </div>
      <div>
        <form action="/admin/deleteCategory/${category._id}" method="POST"
        style="align-items: baseline; width: 100%; display: flex; justify-content: center;">
          <a href="/admin/category/${category._id}">
            <img src="/images/admin-img/edit.png"
            style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
          </a>
          <input type="image" src="/images/admin-img/delete.png"
          style="margin-left: 8px; cursor: pointer; width: 15px;"
          formaction="/admin/deleteCategory/${category._id}">
        </form>
      </div>`;
      let visibileDate = document.querySelector(`#visibileDate${category._id}`);
      if (category.visibility == "Scheduled") visibileDate.innerHTML = new Date(category.publishDate).toLocaleDateString("en-us", { dateStyle: "medium" });
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


let postDate = document.querySelectorAll(".postDate");
postDate.forEach((date) => {
  date.innerHTML = new Date(date.innerHTML).toLocaleDateString("en-us", { dateStyle: "medium" });
});


function sortByName(a, b) {
  if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
  if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
  return 0;
}

function sortByParent(a, b) {
  if (a.parent.toLowerCase() == "none") return -1;
  if (a.parent.toLowerCase() < b.parent.toLowerCase()) return -1;
  if (a.parent.toLowerCase() > b.parent.toLowerCase()) return 1;
  return 0;
}

function sortByItem(a, b) {
  return a.items - b.items;
}

function sortByStatus(a, b) {
  if (a.visibility == "Scheduled" && b.visibility == "Scheduled") {
    if (new Date(a.publishDate) < new Date(b.publishDate)) return -1;
    if (new Date(a.publishDate) > new Date(b.publishDate)) return 1;
  }
  if (a.visibility.toLowerCase() < b.visibility.toLowerCase()) return -1;
  if (a.visibility.toLowerCase() > b.visibility.toLowerCase()) return 1;
  return 0;
}