/////account page/////
let LoginForm = document.getElementById("LoginForm");
let RegForm = document.getElementById("RegForm");
let Indicator = document.getElementById("Indicator");

//transform function//
function register() {
    RegForm.style.transform ="translateX(450px)";
    LoginForm.style.transform ="translateX(450px)";
    Indicator.style.transform ="translateX(0px)";
}

function login() {
    RegForm.style.transform ="translateX(0px)";
    LoginForm.style.transform ="translateX(0px)";
    Indicator.style.transform ="translateX(100px)";
}

//let regbtn = document.getElementById("regbtn");
//let usernameX = document.getElementById("nameX");
//let emailX = document.getElementById("emailX");
//let passX = document.getElementById("passX");
//let shortPass = document.getElementById("pass2X");

//register errors function//
let username = document.getElementById("username");
let email = document.getElementById("emailInput");
let pass = document.getElementById("pass");
let confirmPass = document.getElementById("confirm-pass");
let userName = document.getElementById("userName");
let EmailRegister = document.getElementById("emailRegister");
let passwordRegister = document.getElementById("passwordRegister");
//var errors/
let error1 = document.getElementById("err1");
let error2 = document.getElementById("err2");
let error3 = document.getElementById("err3");
let error4 = document.getElementById("err4");

if(error1) {
    username.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    username.style.borderColor = "#d00";
    userName.style.color = "#c40000";
    RegForm.style.transform = "translateX(450px)";
    LoginForm.style.transform ="translateX(450px)";
    Indicator.style.transform ="translateX(0px)";
} else {
    username.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    username.style.borderColor = "#ccc";  
    userName.style.color = "#1E1926";
}

if(error2) {
    email.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    email.style.borderColor = "#d00";
    EmailRegister.style.color = "#c40000";
    RegForm.style.transform = "translateX(450px)";
    LoginForm.style.transform ="translateX(450px)";
    Indicator.style.transform ="translateX(0px)";
} else {
    email.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    email.style.borderColor = "#ccc";
    EmailRegister.style.color = "#1E1926";
}

if(error3) {
    pass.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    pass.style.borderColor = "#d00";
    passwordRegister.style.color = "#c40000";
    RegForm.style.transform = "translateX(450px)";
    LoginForm.style.transform ="translateX(450px)";
    Indicator.style.transform ="translateX(0px)";
} else {
    pass.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    pass.style.borderColor = "#ccc";
    passwordRegister.style.color = "#1E1926";
}

if(error4) {
    confirmPass.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    confirmPass.style.borderColor = "#d00";
    passwordRegister.style.color = "#c40000";
    RegForm.style.transform = "translateX(450px)";
    LoginForm.style.transform ="translateX(450px)";
    Indicator.style.transform ="translateX(0px)";
} else {
    confirmPass.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    confirmPass.style.borderColor = "#ccc";
    passwordRegister.style.color = "#1E1926";
}

//login errors function//
let email2 = document.getElementById("email2");
let pass2 = document.getElementById("pass2");
let emailHeader = document.getElementById("email");
let passwordHeader = document.getElementById("password");
//var errors//
let errorLog1 = document.getElementById("errlog1");
let errorLog2 = document.getElementById("errlog2");
let successReset = document.getElementById("successReset");

if(errorLog1) {
    email2.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    email2.style.borderColor = "#d00";
    emailHeader.style.color = "#c40000";
} else {
    email2.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    email2.style.borderColor = "#ccc";
    emailHeader.style.color = "#1E1926";
}

if(errorLog2) {
    pass2.style.boxShadow = "0 0 0 3px rgba(221,0,0,.1) inset";
    pass2.style.borderColor = "#d00";
    passwordHeader.style.color = "#c40000";
} else {
    pass2.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    pass2.style.borderColor = "#ccc";
    passwordHeader.style.color = "#1E1926";
}

if(successReset) {
    pass2.style.boxShadow = "0 0 0 3px rgba(0,221,0,.1) inset";
    pass2.style.borderColor = "#006946";
    passwordHeader.style.color = "#006946";
} else {
    pass2.style.boxShadow = "0 0 0 0px rgba(0,0,0,.0) inset";
    pass2.style.borderColor = "#ccc";
    passwordHeader.style.color = "#1E1926";
}

