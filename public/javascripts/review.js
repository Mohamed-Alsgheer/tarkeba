let reviewsBody = document.getElementById('reviewsBody');
fetch('/admin/reviewsData', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
}).then((res) => {
    return res.json();
}).then((products) => {
    console.log(products);


    //pagination buttons
    let pageBtns = document.querySelector("#page-btns");
    let pagesCount = Math.ceil(products.length / 10);
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
    let startIndex = (currentPage - 1) * 10;
    let endIndex = currentPage * 10;
    let productList = products.slice(startIndex, endIndex);
    paginationBullets.forEach((btn) => {
        btn.onclick = () => {
            paginationBullets.forEach(btn => btn.classList.remove("active"));
            btn.classList.add("active");
            currentPage = parseInt(btn.textContent);
            startIndex = (currentPage - 1) * 10;
            endIndex = currentPage * 10;
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
        startIndex = (currentPage - 1) * 10;
        endIndex = currentPage * 10;
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
        startIndex = (currentPage - 1) * 10;
        endIndex = currentPage * 10;
        showProducts();
    }
    //prev page btn
    let prevPage = document.querySelector(".prev-page");
    prevPage.onclick = () => {
        currentPage -= 1;
        paginationBullets.forEach(btn => btn.classList.remove("active"));
        paginationBullets[currentPage - 1].classList.add("active");
        checker();
        startIndex = (currentPage - 1) * 10;
        endIndex = currentPage * 10;
        showProducts();
    }
    //end page btn
    let endPage = document.querySelector(".end-page");
    endPage.onclick = () => {
        paginationBullets.forEach(btn => btn.classList.remove("active"));
        console.log(paginationBullets[-1]);
        paginationBullets[pagesCount - 1].classList.add("active");
        currentPage = pagesCount;
        startIndex = (currentPage - 1) * 10;
        endIndex = currentPage * 10;
        checker();
        showProducts();
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


    function showProducts() {
        productList = products.slice(startIndex, endIndex);
        reviewsBody.innerHTML = "";
        productList.forEach((product) => {
            product.reviews.forEach((review) => {
                reviewsBody.innerHTML += `
                <div class="review-div">
                    <div class="comment" style="border-bottom: 0px; margin: 0px;">
                        <div style="display: flex; align-items: center;">
                            <img src="${product.images[0].url}" alt="${product.images[0].altText}" style="width: 60px;">
                            <div style="padding: 10px 5px 0px 5px;">
                                <p style="margin-bottom: 10px;">${product.name}</p>
                                <p style="font-size: 14px; color: #6c757d;">Reviewed by ${review.name}</p>
                            </div>
                        </div>
                        <div class="reviewDiv">
                            <p class="reviewerDate">${review.date}</p>
                            <span class="mediaStyleDiv">
                                <p class="productRate">${review.rating}</p>
                                <div class="reviewNumber">
                                    <i class="fa-regular fa-star mediaStyleStar"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                    <i class="fa-regular fa-star"></i>
                                </div>
                                <input type="number" class="starCount" name="rating" value="${review.rating}"
                                    hidden>
                            </span>
                        </div>
                    </div>
                    <div style="display: flex; align-items: flex-end; justify-content: space-between;">
                        <p class="reviewerRate" style="overflow-wrap: break-word;">${review.comment}</p>
                        <img src="/images/admin-img/delete.png" class="remove-review">
                    </div>
                    <div class="confirm-div">
                        <p class="reviewerRate" style="color: #c40000;">Review flagged for deletion.</p>
                        <div class="action-btns-div">
                            <button class="cancel-btn btn">Cancel</button>
                            <button class="btn delete-btn">Delete</button>
                        </div>
                    </div>
                </div>`;
            });
        });
        reviewNumber = document.querySelectorAll(".reviewNumber");
        starCountReview = document.getElementsByClassName("starCount");
        for (let i = 0; i < reviewNumber.length; i++) {
            for (let j = 0; j < starCountReview[i].value; j++) {
                reviewNumber[i].children[j].classList.add("fa-solid");
            }
        }
    }



    let searchBar = document.getElementById('reviewSearch');
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
        reviewsBody.innerHTML = '';
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < products[i].reviews.length; j++) {
                if (products[i].reviews[j].comment.toLowerCase().includes(searchBar.value)
                    || products[i].reviews[j].name.toLowerCase().includes(searchBar.value)
                    || products[i].name.toLowerCase().includes(searchBar.value)) {
                    reviewsBody.innerHTML += `
                    <div class="review-div">
                        <div class="comment" style="border-bottom: 0px; margin: 0px;">
                            <div style="display: flex; align-items: center;">
                                <img src="${products[i].images[0].url}" alt="${products[i].images[0].altText}" style="width: 60px;">
                                <div style="padding: 10px 5px 0px 5px;">
                                    <p style="margin-bottom: 10px;">${products[i].name}</p>
                                    <p style="font-size: 14px; color: #6c757d;">Reviewed by ${products[i].reviews[j].name}</p>
                                </div>
                            </div>
                            <div class="reviewDiv">
                                <p class="reviewerDate">${products[i].reviews[j].date}</p>
                                <span class="mediaStyleDiv">
                                    <p class="productRate">${products[i].reviews[j].rating}</p>
                                    <div class="reviewNumber">
                                        <i class="fa-regular fa-star mediaStyleStar"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                        <i class="fa-regular fa-star"></i>
                                    </div>
                                    <input type="number" class="starCount" name="rating" value="${products[i].reviews[j].rating}"
                                        hidden>
                                </span>
                            </div>
                        </div>
                        <div style="display: flex; align-items: flex-end; justify-content: space-between;">
                            <p class="reviewerRate" style="overflow-wrap: break-word;">${products[i].reviews[j].comment}</p>
                            <img src="/images/admin-img/delete.png" class="remove-review">
                        </div>
                        <div class="confirm-div">
                            <p class="reviewerRate" style="color: #c40000;">Review flagged for deletion.</p>
                            <div class="action-btns-div">
                                <button class="cancel-btn btn">Cancel</button>
                                <button class="btn delete-btn">Delete</button>
                            </div>
                        </div>
                    </div>`;
                }
            }
            reviewNumber = document.querySelectorAll(".reviewNumber");
            starCountReview = document.getElementsByClassName("starCount");
            for (let i = 0; i < reviewNumber.length; i++) {
                for (let j = 0; j < starCountReview[i].value; j++) {
                    reviewNumber[i].children[j].classList.add("fa-solid");
                }
            }
        }
    }
});























let reviewNumber = document.querySelectorAll(".reviewNumber");
let starCountReview = document.getElementsByClassName("starCount");
for (let i = 0; i < reviewNumber.length; i++) {
    for (let j = 0; j < starCountReview[i].value; j++) {
        reviewNumber[i].children[j].classList.add("fa-solid");
    }
}

let reviewDiv = document.querySelectorAll(".review-div");
let deleteBtn = document.querySelectorAll(".remove-review");
let cancelBtn = document.querySelectorAll(".cancel-btn");

reviewDiv.forEach(div => {
    div.addEventListener("mouseenter", () => { if (!div.children[2].classList.contains('active')) div.children[1].children[1].classList.add('active') });
    div.addEventListener("mouseleave", () => div.children[1].children[1].classList.remove('active'));
});

deleteBtn.forEach(btn => {
    btn.onclick = () => {
        btn.classList.remove('active');
        btn.parentNode.parentNode.children[2].classList.add('active');
    }
});

cancelBtn.forEach(btn => {
    btn.onclick = () => {
        console.log(btn.parentNode);
        btn.parentNode.parentNode.classList.remove('active');
    }
});