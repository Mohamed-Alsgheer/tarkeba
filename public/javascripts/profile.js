
//variables//
let divAddress = document.querySelector('#addresss');
let newEmail = document.getElementById("new-email");
let confirmEmail = document.getElementById("confirm-email");
let currentPass = document.getElementById("current-pass");
let submitNewEmail = document.getElementById("subNewEmail");
let submitNewPass = document.getElementById("subNewPass");
let changeNameUser = document.getElementById("change-name");
let changePass = document.getElementById("change-pass");

//address variables//
let buyersName = document.getElementById('name-user');
let buyersNumber = document.getElementById('phone-number');
let buyersStreet = document.getElementById('street');
let buyersHome = document.getElementById('home-number');
let buyersCity = document.getElementById('city');
let buyersState = document.querySelector('.state');
let buyersStateValue;

//events//
//buyersState.addEventListener("change", getBuyersState);
//submitAddress.addEventListener("submit", submitDataAddress);
//submitNewEmail.addEventListener("click", changeEmail);



///function///
const inputsDiv = document.getElementById('form-inputs');
const inputsDivP = document.getElementById('enter-address');
const plus = document.getElementById("plus");

//documents input//
const newName = document.getElementById('new-name');
const confirmName = document.getElementById('confirm-name');
const checkPass = document.getElementById('current-pass');
const fullName = document.getElementById('name-user');
const phone = document.getElementById('phone-number');
const city = document.getElementById('city');
const county = document.getElementById('county');
const street = document.getElementById('street');
const formAddress = document.getElementById('form-inputs');
const oldPass = document.getElementById("old-pass");
const newPass = document.getElementById("new-pass");
const confirmPass = document.getElementById("confirm-pass");

//var errors//
const changeNameError1 = document.getElementById("changeNameError1");
const changeNameError2 = document.getElementById("changeNameError2");
const changePassError1 = document.getElementById("changePassError1");
const changePassError2 = document.getElementById("changePassError2");
const changePassError3 = document.getElementById("changePassError3");
const error1 = document.getElementById("err1");
const error2 = document.getElementById("err2");
const error3 = document.getElementById("err3");
const error4 = document.getElementById("err4");
const error5 = document.getElementById("err5");

if(changeNameError1 || changeNameError2) {
    document.getElementById("popup-1").classList.toggle("active");
}

if(changeNameError1) {
    newName.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    newName.style.borderColor = "#d00";
    newName.style.marginBottom = "5px";
} else {
    newName.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    newName.style.borderColor = "#1E1926";
    newName.style.marginBottom = "15px";
}

if(changeNameError2) {
    checkPass.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    checkPass.style.borderColor = "#d00";
    checkPass.style.marginBottom = "5px";
} else {
    checkPass.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    checkPass.style.borderColor = "#1E1926";
    checkPass.style.marginBottom = "15px";
}

if(changePassError1 || changePassError2 || changePassError3) {
    document.getElementById("popup-1").classList.toggle("active2");
}

if(changePassError1) {
    oldPass.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    oldPass.style.borderColor = "#d00";
    oldPass.style.marginBottom = "5px";
} else {
    oldPass.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    oldPass.style.borderColor = "#1E1926";
    oldPass.style.marginBottom = "15px";
}

if(changePassError2) {
    newPass.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    newPass.style.borderColor = "#d00";
    newPass.style.marginBottom = "5px";
} else {
    newPass.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    newPass.style.borderColor = "#1E1926";
    newPass.style.marginBottom = "15px";
}

if(changePassError3) {
    confirmPass.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    confirmPass.style.borderColor = "#d00";
    confirmPass.style.marginBottom = "5px";
} else {
    confirmPass.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    confirmPass.style.borderColor = "#1E1926";
    confirmPass.style.marginBottom = "15px";
}

if(error1) {
    fullName.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    fullName.style.borderColor = "#d00";
    plus.style.transform = "rotate(45deg)";
    inputsDivP.style.height = "600px";
    inputsDiv.style.display = "block";
} else {
    fullName.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    fullName.style.borderColor = "#ccc";
    plus.style.transform = "none";
    inputsDivP.style.height = "0px";
    inputsDiv.style.display = "none"; 
}

if(error2) {
    phone.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    phone.style.borderColor = "#d00";
    plus.style.transform = "rotate(45deg)";
    inputsDivP.style.height = "600px";
    inputsDiv.style.display = "block";
} else {
    phone.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    phone.style.borderColor = "#ccc";
    plus.style.transform = "none";
    inputsDivP.style.height = "0px";
    inputsDiv.style.display = "none"; 
}

if(error3) {
    city.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    city.style.borderColor = "#d00";
    plus.style.transform = "rotate(45deg)";
    inputsDivP.style.height = "600px";
    inputsDiv.style.display = "block";
} else {
    city.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    city.style.borderColor = "#ccc";
    plus.style.transform = "none";
    inputsDivP.style.height = "0px";
    inputsDiv.style.display = "none"; 
}

if(error4) {
    county.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    county.style.borderColor = "#d00";
    plus.style.transform = "rotate(45deg)";
    inputsDivP.style.height = "600px";
    inputsDiv.style.display = "block";
} else {
    county.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    county.style.borderColor = "#ccc";
    plus.style.transform = "none";
    inputsDivP.style.height = "0px";
    inputsDiv.style.display = "none"; 
}

if(error5) {
    street.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    street.style.borderColor = "#d00";
    plus.style.transform = "rotate(45deg)";
    inputsDivP.style.height = "600px";
    inputsDiv.style.display = "block";
} else {
    street.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    street.style.borderColor = "#ccc";
    plus.style.transform = "none";
    inputsDivP.style.height = "0px";
    inputsDiv.style.display = "none"; 
}


function canceledEnterData() {
    let inputsDiv = document.getElementById('enter-address');
    if(inputsDiv.style.display = "block") {
        inputsDiv.style.display = "none";
    }
}

function togglePopupName() {
    document.getElementById("popup-1").classList.toggle("active");
}

function togglePopupPassword() {
    document.getElementById("popup-1").classList.toggle("active2");
}

function togglePopupDeleteAccount() {
    document.getElementById("popup-1").classList.toggle("active3");
}
