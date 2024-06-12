let productName = document.getElementById("productName");
let nameTitle = document.getElementById("nameTitle");
let error = document.getElementById("existProduct");
if (error) {
    productName.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    productName.style.borderColor = "#d00";
    productName.style.marginBottom = "5px";
    productName.style.color = "#c40000";
    nameTitle.style.color = "#c40000";
} else {
    productName.style.boxShadow = "none";
    productName.style.borderColor = "-internal-light-dark(rgb(118, 118, 118), rgb(133, 133, 133))";
    productName.style.marginBottom = "15px";
    productName.style.color = "#1E1926";
    nameTitle.style.color = "#1E1926";
}


let numberInputs = document.querySelectorAll("input[type=number]");
numberInputs.forEach((input) => {
    if (input.value === "") input.value = 0;
});


let visibility = document.querySelectorAll("[name=visibility]");
let visibilityStatus = visibility[0].getAttribute("visibility");
let dateValue = document.getElementById("dateValue");
let dateTitle = document.getElementById("dateTitle");
document.querySelector(`[name=visibility][value=${visibilityStatus}]`).checked = true;
let checkedRadio = document.querySelector("[name=visibility]:checked");
if (checkedRadio.value !== "Scheduled") {
    dateValue.disabled = true;
    dateTitle.style.color = "#6c757d";
} else {
    dateValue.disabled = false;
    dateTitle.style.color = "#000";
}
visibility.forEach((radio) => {
    radio.onclick = () => {
        let dateValue = document.getElementById("dateValue");
        let dateTitle = document.getElementById("dateTitle");
        if (radio.value !== "scheduled") {
            dateValue.disabled = true;
            dateTitle.style.color = "#6c757d";
        } else {
            dateValue.disabled = false;
            dateTitle.style.color = "#000";
        }
    }
});

// let checkType = visibility[0].getAttribute("visibility");
// if(checkType == "published") {
//     visibility[0].checked = true;
// } else if(checkType == "scheduled") {
//     visibility[1].checked = true;
// } else {
//     visibility[2].checked = true;
// }




const classifyBtn = document.getElementById("addClassify");
const classifyName = document.getElementById("classify");
const classifyValue = document.getElementById("value");
const errorValue = document.getElementById("errorValue");
const classifyContainer = document.getElementById("classifyContainer");
const classifyHeader = document.getElementById("classifyHeader");
const deleteElement = document.getElementsByClassName("deleteElement");
let classifications = [];

if (classifyContainer) {
    classifyHeader.style.display = "flex";
}

classifyBtn.addEventListener("click", () => {
    if (classifyName.value == "" || classifyValue.value == "") {
        errorValue.innerHTML = "You can not let values empty.";
        errorValue.style.display = "block";
    } else {
        errorValue.style.display = "none";
        let redundant = false;
        classifications.forEach((value) => {
            if (classifyName.value == value.classification) {
                errorValue.innerHTML = "You can not add two classifications have the same name.";
                errorValue.style.display = "block";
                redundant = true;
            }
        });
        if (redundant !== true) {
            let newClassify = {
                classification: classifyName.value,
                value: classifyValue.value
            };
            classifications.push(newClassify);
            classifyHeader.style.display = "flex";
            classifyContainer.innerHTML += `
            <div style="display: flex;">
                <div style="width: 25%; min-width: fit-content; border: 1px solid #bbb; padding: 6px 13px;">${classifyName.value}</div>
                <div style="width: 75%; border: 1px solid #bbb;  padding: 6px 13px; display: flex; justify-content: space-between; align-items: center;">
                    <p>${classifyValue.value}</p>
                    <img src="/images/admin-img/delete.png" class="deleteElement" style="border: 0px;" onclick="deleteclassify(${classifications.length - 1})">
                </div>
                <input type="checkbox" name="classifications" value='${JSON.stringify(newClassify)}' checked hidden />
            </div>
            `;
            classifyName.value = "";
            classifyValue.value = "";
        }
    }
});

function deleteclassify(index) {
    classifications = classifications.filter((e) => e != classifications[index]);
    if (classifications.length == 0) {
        classifyHeader.style.display = "none";
    }
    classifyContainer.innerHTML = "";
    for (let i = 0; i < classifications.length; i++) {
        classifyContainer.innerHTML += `
            <div style="display: flex;">
                <div style="width: 25%; min-width: fit-content; border: 1px solid #bbb; padding: 6px 13px;">${classifications[i].classification}</div>
                <div style="width: 75%; border: 1px solid #bbb;  padding: 6px 13px; display: flex; justify-content: space-between; align-items: center;">
                    <p>${classifications[i].value}</p>
                    <img src="/images/admin-img/delete.png" class="deleteElement" style="border: 0px;" onclick="deleteclassify(${i})">
                </div>
                <input type="checkbox" name="classifications" value='${JSON.stringify(classifications[i])}' checked hidden />
            </div>
        `;
    }
}


const inputFile = document.getElementById("file");
const imagesBody = document.getElementById("imagesBody");
const closeX = document.getElementsByClassName("closeX");
let images = [];
inputFile.addEventListener("change", () => {
    //imagesBody.innerHTML = "";
    for (let i = 0; i < inputFile.files.length; i++) {
        let picture = new FileReader();
        picture.readAsDataURL(inputFile.files[i]);
        picture.onload = () => {
            imagesBody.innerHTML += `
            <div style="display: grid; grid-template-columns: 1fr 7fr 1fr 1fr; width: 100%; align-items: center; margin-bottom: 25px;">
                <img src="${picture.result}" alt="" style="width: 40px; margin: 0px 5px">
                <input type="text" name="altText" value="${inputFile.files[i].name}" class="altImg" style="margin: 0px">
                <input type="number" name="orderOfImg" class="orderImg" value="${closeX.length}" style="margin: 0px 0px 0px 40%">
                <img class="closeX" src="/images/close.png" style="border: 0px; width: 12px; margin-left: 70%; cursor: pointer;" onclick="deleteImg(${i})">
            </div>
            `;
        };
        images.push(inputFile.files[i]);
    }
});


function deleteImg(index) {
    images.splice(index, 1);
    imagesBody.innerHTML = "";
    for (let i = 0; i < images.length; i++) {
        let picture = new FileReader();
        picture.readAsDataURL(images[i]);
        picture.onload = () => {
            imagesBody.innerHTML += `
                <div style="display: grid; grid-template-columns: 1fr 7fr 1fr 1fr; width: 100%; align-items: center; margin-bottom: 25px;">
                    <img src="${picture.result}" alt="" style="width: 40px;">
                    <input type="text" name="altText" value="${images[i].name}" class="altImg" style="margin: 0px">
                    <input type="number" name="orderOfImg" class="orderImg" value="${closeX.length}" style="margin: 0px 0px 0px 40%">
                    <img class="closeX" src="/images/close.png" style="border: 0px; width: 12px; margin-left: 70%; cursor: pointer;" onclick="deleteImg(${i})">
                </div>
            `;
        };
    }
}

function deleteStoredImg(element) {
    console.log(element.parentElement.parentElement);
    element.parentElement.parentElement.style.display = "none";
}


const ul = document.querySelector(".categories-list");
const categoryInput = document.querySelector(".categories-list input[list=categories]");
const selectedCategories = document.querySelectorAll(".categories-list li span");
let categories = [];
selectedCategories.forEach(category => categories.push(category.textContent));
function addCategory(e) {
    if (e.key == undefined) {
        let category = e.target.value.replace(/\s+/g, ' '); //removing unwanted space from user category
        if (category.length > 1 && !categories.includes(category)) {
            category.split(',').forEach(category => { //splitting each category from comma (,)
                categories.push(category); //add each category inside the array
                createTag();
            });
        }
        e.target.value = "";
    }
    console.log("hello");
    console.log(e.key);
}

categoryInput.addEventListener("keyup", addCategory);

function createTag() {
    //removing all li categories before adding so there will be no duplicate categories
    ul.querySelectorAll("li").forEach(li => li.remove());
    categories.slice().reverse().forEach(category => {
        let liCategory = `
        <li>
            <div>
                <img src="/images/X.png" style="width: 17px; padding-right: 5px;display: flex;" onclick="removeCategory(this, '${category}')">
            </div>
            <span>${category}</span>
            <input type="checkbox" name="categories" value="${category}" checked hidden />
        </li>`;
        ul.insertAdjacentHTML("afterbegin", liCategory);
    });
}

function removeCategory(el, category) {
    let index = categories.indexOf(category);
    categories.splice(index, 1); //removing selected category from the array
    console.log(category, index, categories);
    el.parentElement.parentElement.remove(); // removing li of removed category
}



const altImg = document.getElementsByClassName("altImg");
const orderImg = document.getElementsByClassName("orderImg");



const form = document.getElementById("createProduct");
form.onsubmit = () => {
    const filesList = new DataTransfer();

    images.forEach(file => {
        filesList.items.add(file);
    });

    inputFile.files = filesList.files;
    // let formData = new FormData();
    // formData.append('classifications', classifications);
    // formData.append('categories', categories);

    // fetch(form.action, {
    //     method: 'POST',
    //     body: formData
    // })
    // .then(res => res.json())
    // .then(res => console.log(res))
    // .catch(err => console.log(err));
}