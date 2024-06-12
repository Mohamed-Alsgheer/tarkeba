document.querySelectorAll(".states").forEach((state) => {
    if(state.getAttribute("possibility") == "true") {
        state.checked = true;
        state.parentNode.classList.add("active");
    }
})



let selectAllBtn = document.getElementById("selectAll");
selectAllBtn.addEventListener('click', selectAll);

function selectAll() {
    let states = document.querySelectorAll(".states");
    states.forEach((state) => {
        state.checked = true;
        state.parentNode.classList.add("active");
    });
}

function selectState(state) {
    if(state.children[0].checked == false) {
        state.children[0].checked = true;
        state.classList.add("active");
    } else {
        state.children[0].checked = false;
        state.classList.remove("active");
    }
}


let submit = document.querySelector("input[type='submit']"), deliveryPlaces = [];
submit.onclick = function(e) {
    let price = document.querySelector("input[name='shippingPrice']");
    let states = document.querySelectorAll(".states");
    let counter = 0;
    states.forEach((state) => {
        if(state.checked == true) {
            counter++;
            deliveryPlaces.push({
                state: state.value,
                possibility: true
            });
        } else {
            deliveryPlaces.push({
                state: state.value,
                possibility: false
            });
        }
    });
    if(counter == 0 || price == "") {
        e.preventDefault();
    } else {
        fetch('/admin/updateShippingData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                deliveryPlaces: deliveryPlaces
            })
        });
    }
}



// fetch("https://api.github.com/users/mohamed-cpp/repos")
// .then(response => response.json())
// .then(result => console.log(result[10]))
// .catch(error => console.log('error', error));

