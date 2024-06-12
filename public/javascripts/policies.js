let edit = document.querySelector("#edit");
let cancel = document.querySelector("#cancel");
let showPolicies = document.querySelector("#show-privacy");
let editPolicies = document.querySelector("#edit-privacy");
editPolicies.addEventListener('keyup', resizeHeight);

edit.onclick = (e) => {
    if(edit.value == "Edit") {
        e.preventDefault();
        edit.value = "Save";
        cancel.style.display = "block";
        showPolicies.style.display = "none";
        editPolicies.style.display = "block";
        resizeHeight();
    }
}

cancel.onclick = (e) => {
    e.preventDefault();
    edit.value = "Edit";
    cancel.style.display = "none";
    showPolicies.style.display = "block";
    editPolicies.style.display = "none";
}

function resizeHeight() {
    console.log("test", editPolicies.scrollHeight);
    editPolicies.style.height = `${editPolicies.scrollHeight}px`;
}


let policyType = document.querySelector("[name=policyType]");
let privacy = document.getElementById("privacy");
let returns = document.getElementById("return");
let shipping = document.getElementById("shipping");
let terms = document.getElementById("terms");
policyType.addEventListener("change", () => {
    edit.value = "Edit";
    cancel.style.display = "none";
    showPolicies.style.display = "block";
    editPolicies.style.display = "none";
    if(policyType.value == "privacy") {
        privacy.style.display = "block";
        returns.style.display = "none";
        shipping.style.display = "none";
        terms.style.display = "none";
        editPolicies = document.querySelector("#edit-privacy");
        showPolicies = document.querySelector("#show-privacy");
    } else if(policyType.value == "returns") {
        privacy.style.display = "none";
        returns.style.display = "block";
        shipping.style.display = "none";
        terms.style.display = "none";
        editPolicies = document.querySelector("#edit-return");
        showPolicies = document.querySelector("#show-return");
    } else if(policyType.value == "shipping") {
        privacy.style.display = "none";
        returns.style.display = "none";
        terms.style.display = "none";
        shipping.style.display = "block";
        editPolicies = document.querySelector("#edit-shipping");
        showPolicies = document.querySelector("#show-shipping");
    } else {
        privacy.style.display = "none";
        returns.style.display = "none";
        terms.style.display = "block";
        shipping.style.display = "none";
        editPolicies = document.querySelector("#edit-terms");
        showPolicies = document.querySelector("#show-terms");
    }
});