let editName = document.getElementById('edit-name');
let editNumber = document.getElementById('edit-number');
let editStreet = document.getElementById('edit-street');
let editHome = document.getElementById('edit-home');
let editCity = document.getElementById('edit-city');
let editState = document.getElementById('edit-state');


let cancelEdit = document.getElementById('cancel-edit');
let editAddressDiv = document.querySelector(".body-html");
let getAddressDetails = JSON.parse(localStorage.getItem('address'));
let addressId = localStorage.getItem('productId');
let addressDetails = JSON.parse(localStorage.getItem('addressId')).find((a) => a);

editAddressDiv.innerHTML = `
<div id="enter-address" style="display: block; width: 700px">
    <form id="edit-form-inputs">
        <h3>Full name</h3>
        <input type="text" id="edit-name" class="address-inputs" value="${addressDetails.name}">
        <h3>Phone number</h3>
        <input type="text" placeholder="+20XXXXXXXXXX" id="edit-phone" class="address-inputs" value="${addressDetails.phone}">
        <h3>Address</h3>
        <input type="text" placeholder="Street address.." id="edit-street" class="address-inputs" value="${addressDetails.street}">
        <input type="text" placeholder="Apt, Suite, Unit, Building" id="edit-home" class="address-inputs" value="${addressDetails.home}">
        <h3>City</h3>
        <input type="text" id="edit-city" class="address-inputs" value="${addressDetails.city}">
        <h3>State</h3>
        <select class="edit-state">
            <option hidden id="state-selected">${addressDetails.state}</option>
            <option>Cairo</option>
            <option>Giza</option>
        </select>
        <div>
            <input type="submit" style="margin-left: 0px; margin-right: 0px" value="Add address" class="btn" id="submit-address">
            <a href="profile.html" style="margin-left: 0px; margin-right: 0px" class="btn" id="cancel-edit" >Cancel</a>
        </div>
    </form>
</div>`;

//edit address variables//
let submitAddress = document.getElementById('edit-form-inputs');
let buyersName = document.getElementById('edit-name');
let buyersNumber = document.getElementById('edit-phone');
let buyersStreet = document.getElementById('edit-street');
let buyersHome = document.getElementById('edit-home');
let buyersCity = document.getElementById('edit-city');
let buyersState = document.querySelector('.edit-state');
let buyersStateValue;

//events//
buyersState.addEventListener("change", getBuyersState);
submitAddress.addEventListener("submit", submitDataAddress);


//functions//
function getBuyersState(e) {
    buyersStateValue = e.target.value;
}

function submitDataAddress(e) {
    e.preventDefault();
    let address = JSON.parse(localStorage.getItem("address"));
    let nameBuyersValue = buyersName.value;
    let phoneValue = buyersNumber.value;
    let streetValue = buyersStreet.value;
    let homeValue = buyersHome.value
    let cityValue = buyersCity.value;

    if(nameBuyersValue && phoneValue && streetValue && homeValue && cityValue && buyersStateValue) {
        let objAddress = {
            id: address ? address.length + 1 : 1,
            name: nameBuyersValue,
            phone: phoneValue,
            street: streetValue,
            home: homeValue,
            city: cityValue,
            state: buyersStateValue,
        };
        let newAddress = JSON.parse(localStorage.getItem("address")).find((a) => a.id == addressDetails.id);
        let anothrAddresses = JSON.parse(localStorage.getItem("address")).find((a) => a.id !== addressDetails.id);

        if(anothrAddresses == undefined) {
            localStorage.setItem('address', JSON.stringify([objAddress]));
        } else {
            if(anothrAddresses) {
                localStorage.setItem("address", JSON.stringify(anothrAddresses));
            }
            let dataAddresses = JSON.parse(localStorage.getItem("address"));
            localStorage.setItem("address", JSON.stringify([dataAddresses, objAddress]));
        }
        
        ////add address from data account////
        let emailUser = localStorage.getItem("email"); 
        let accountUser = JSON.parse(localStorage.getItem("dataAccount"));
        let AccountUsers = accountUser.find((account) => account.email !== emailUser);
        let getAccountUser = accountUser.filter((account) => account.email == emailUser);
        let getAddressAccount = getAccountUser.map((account) => account.address);

        let newDataAddress = getAddressAccount ? [...getAddressAccount, objAddress] : [objAddress];
        let objAccount = {
            username: localStorage.getItem("username"),
            email: localStorage.getItem("email"),
            password: localStorage.getItem("password"),
            address: JSON.parse(localStorage.getItem("address"))
        }
        console.log(objAccount);
        if(AccountUsers == undefined) {
            localStorage.setItem('dataAccount', JSON.stringify([objAccount]));
        } else {
            if(AccountUsers) {
                localStorage.setItem("dataAccount", JSON.stringify(AccountUsers));
            }
            let dataAccounts = JSON.parse(localStorage.getItem("dataAccount"));
            localStorage.setItem("dataAccount", JSON.stringify([dataAccounts, objAccount]));
        }
        
        buyersName.value = "";
        buyersNumber.value = "";
        buyersStreet.value = "";
        buyersHome.value = "";
        buyersCity.value = "";
        buyersState.value = "";
        window.location = "profile.html";
    } else {
        alert("enter your address");
    }
}