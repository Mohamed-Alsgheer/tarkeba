let users, filteredUsers;
fetch('/admin/staffsData', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json; charset=UTF-8' }
}).then((res) => {
    return res.json();
}).then((data) => {
    console.log(data);
    users = data;
    filteredUsers = data
    //paination buttons
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
    let usersList = data.slice(startIndex, endIndex);
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














    let usersBody = document.querySelector("#users-body");
    let listKeys = document.querySelectorAll(".list-key");
    listKeys.forEach((key) => {
        key.onclick = () => {
            if (key.children[0].style.transform === "rotate(0deg)") {
                listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
                key.children[0].style.transform = "rotate(180deg)";
                if (key === listKeys[0]) {
                    filteredUsers.sort(sortByName);
                } else if (key === listKeys[1]) {
                    filteredUsers.sort(sortByDate);
                } else if (key === listKeys[2]) {
                    filteredUsers.sort(sortByRole);
                }
            } else {
                key.children[0].style.transform = "rotate(0deg)";
                filteredUsers.reverse();
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
        usersBody.innerHTML = "";
        for (let i = 0; i < users.length; i++) {
            let searchValue = searchBar.value.toLowerCase();
            if (users[i].username.toLowerCase().includes(searchValue) || users[i].email.toLowerCase().includes(searchValue) || users[i].phone.toLowerCase().includes(searchValue)) {
                usersBody.innerHTML += `
                <div>
                    <p>${users[i].username}</p>
                </div>
                <div>
                    <p>${users[i].email}</p>
                </div>
                <div>
                    <p>${users[i].phone}</p>
                </div>
                <div>
                    <p id="registerDate${users[i]._id}">${users[i].createdAt}</p>
                </div>
                <div>
                    <p>${users[i].role}</p>
                </div>
                <div>
                    <form action="/admin/deleteUser/${users[i]._id}" method="POST"
                        style="align-items: baseline; width: 100%; display: flex; justify-content: flex-start;">
                        <a href="/admin/users/userDetails/${users[i]._id}">
                            <img src="/images/admin-img/edit.png"
                                style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
                        </a>
                        <input type="image" src="/images/admin-img/delete.png"
                            style="margin-left: 8px; cursor: pointer; width: 15px;"
                            formaction="/admin/deleteUser/${users[i]._id}">
                    </form>
                </div>`;
                let registerDate = document.querySelector(`#registerDate${users[i]._id}`);
                registerDate.innerHTML = new Date(users[i].createdAt).toLocaleDateString("en-us", { dateStyle: "medium" });
            }
        }
    }



    /* filter orders by role */
    let role = document.getElementById("selectRole");
    let roleOptions = users.map(user => user.role).filter((role, index, arr) => arr.indexOf(role) === index);
    console.log(roleOptions);
    for (let i = 0; i < roleOptions.length; i++) {
        const option = document.createElement('option');
        option.text = roleOptions[i];
        option.value = roleOptions[i];
        role.appendChild(option);
    }
    role.addEventListener("change", filterUsers);



    function showProducts() {
        usersList = filteredUsers.slice(startIndex, endIndex);
        usersBody.innerHTML = "";
        usersList.forEach((user) => {
            usersBody.innerHTML += `
            <div>
                <p>${user.username}</p>
            </div>
            <div>
                <p>${user.email}</p>
            </div>
            <div>
                <p>${user.phone}</p>
            </div>
            <div>
                <p id="registerDate${user._id}">${user.createdAt}</p>
            </div>
            <div>
                <p>${user.role}</p>
            </div>
            <div>
                <form action="/admin/deleteUser/${user._id}" method="POST"
                    style="align-items: baseline; width: 100%; display: flex; justify-content: flex-start;">
                    <a href="/admin/users/userDetails/${user._id}">
                        <img src="/images/admin-img/edit.png"
                            style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
                    </a>
                    <input type="image" src="/images/admin-img/delete.png"
                        style="margin-left: 8px; cursor: pointer; width: 15px;"
                        formaction="/admin/deleteUser/${user._id}">
                </form>
            </div>`;
            let registerDate = document.querySelector(`#registerDate${user._id}`);
            registerDate.innerHTML = new Date(user.createdAt).toLocaleDateString("en-us", { dateStyle: "medium" });
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




function filterUsers() {
    let role = document.getElementById("selectRole");
    let usersBody = document.querySelector("#users-body");
    let listKeys = document.querySelectorAll(".list-key");
    listKeys.forEach((el) => el.children[0].style.transform = "rotate(0deg)");
    if (role.value === 'all') {
        filteredUsers = users;
    } else {
        filteredUsers = users.filter(user => user.role === role.value);
    }

    console.log(filteredUsers);
    usersBody.innerHTML = '';
    filteredUsers.forEach((user) => {
        usersBody.innerHTML += `
        <div>
            <p>${user.username}</p>
        </div>
        <div>
            <p>${user.email}</p>
        </div>
        <div>
            <p>${user.phone}</p>
        </div>
        <div>
            <p id="registerDate${user._id}">${user.createdAt}</p>
        </div>
        <div>
            <p>${user.role}</p>
        </div>
        <div>
            <form action="/admin/deleteUser/${user._id}" method="POST"
                style="align-items: baseline; width: 100%; display: flex; justify-content: flex-start;">
                <a href="/admin/users/userDetails/${user._id}">
                    <img src="/images/admin-img/edit.png"
                        style="margin-right: 5px; margin-left: 5px; cursor: pointer; width: 15px;">
                </a>
                <input type="image" src="/images/admin-img/delete.png"
                    style="margin-left: 8px; cursor: pointer; width: 15px;"
                    formaction="/admin/deleteUser/${user._id}">
            </form>
        </div>`;
        let registerDate = document.querySelector(`#registerDate${user._id}`);
        registerDate.innerHTML = new Date(user.createdAt).toLocaleDateString("en-us", { dateStyle: "medium" });
    });
}


let registerDate = document.querySelectorAll(".registerDate");
const options = { month: 'short', day: 'numeric', year: 'numeric' };
registerDate.forEach((date) => {
    date.innerHTML = new Date(date.innerHTML).toLocaleDateString("en-us", options);
});

function sortByName(a, b) {
    if (a.username.toLowerCase() < b.username.toLowerCase()) return -1;
    if (a.username.toLowerCase() > b.username.toLowerCase()) return 1;
    return 0;
}

function sortByDate(a, b) {
    if (new Date(a.createdAt) < new Date(b.createdAt)) return -1;
    if (new Date(a.createdAt) > new Date(b.createdAt)) return 1;
    return 0;
}

function sortByRole(a, b) {
    if (a.role.toLowerCase() < b.role.toLowerCase()) return -1;
    if (a.role.toLowerCase() > b.role.toLowerCase()) return 1;
    return 0;
}