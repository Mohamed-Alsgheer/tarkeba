const uploadImg = document.getElementById("uploadImg");
const imgContainer = document.getElementById("img-container");
let formType = document.getElementById("formType");
let imgFit = document.getElementById("objectFit");
let orderInput = document.querySelector("[name=order]");
let linkInput = document.querySelector("[name=linkStatus]:checked");
let urlInput = document.querySelector("[name=link]");
let fontColorInput = document.querySelector("[name=fontColor]");
let btnColorInput = document.querySelector("[name=btnColor]");
let x = document.getElementById("x");
let y = document.getElementById("y");
let cancelBtn = document.getElementById("cancel-btn");
let editBtn = document.getElementById("edit-btn");
let deleteBtn = document.getElementById("delete-btn");
let saveBtn = document.getElementById("save-btn");
let picture;
uploadImg.addEventListener("click", () => {
    slides.forEach((slide) => {
        slide.checked = false;
    });
    imgContainer.innerHTML = `
    <div>
        <img src="/images/admin-img/gallery.png" style="width: 80px;">
        <p style="color: #6c757d; padding 10px 0px;">1920 * 820</p>
    </div>
    `;
});
uploadImg.addEventListener("change", () => {
    console.log(uploadImg.files);
    picture = new FileReader();
    picture.readAsDataURL(uploadImg.files[0]);
    picture.onload = () => {
        imgContainer.innerHTML = "";
        if(picture.result == "") {
            imgContainer.innerHTML = `
            <div>
                <img src="/images/admin-img/gallery.png" style="width: 80px;">
                <p style="color: #6c757d; padding 10px 0px;">1920 * 820</p>
            </div>
            `;
        } else {
            imgContainer.innerHTML = `
            <img src="${picture.result}" id="currentImg" style="width: 100%; height: 100%; object-fit: contain; position: absolute;">
            `;
            imgInputs = document.querySelectorAll("[disabled]");
            document.querySelectorAll(".disable").forEach((doc) => doc.classList.add("active"));
            imgInputs.forEach((input) => input.disabled = false);

            document.querySelector("[value=none]").checked = true;
            document.querySelector("[name=order]").value = slides.length;
            document.querySelector("[name=link]").value = "";
            document.querySelector("[name=btnValue]").value = "";
            document.querySelector("[name=fontColor]").value = "#ffffff";
            document.querySelector("[name=btnColor]").value = "#4028df";
            document.querySelector("[name=x]").value = "50";
            document.querySelector("[name=y]").value = "50";
            
            editBtn.classList.remove("active");
            deleteBtn.classList.remove("active");
            cancelBtn.classList.remove("active");
            saveBtn.classList.add("active");
            formType.action = "/admin/saveImgSlider";
        }
    };
});


imgFit.addEventListener("change", () => {
    let currentImg = document.getElementById("currentImg");
    console.log(imgFit.value);
    currentImg.style.objectFit = imgFit.value;
});


let link = document.querySelectorAll("input[name=linkStatus]");
let linkStatus = Array.from(link).find(el => el.checked == true);
let url = document.getElementById("url");
let btnValue = document.getElementById("btnValue");
let coordinates = document.getElementById("coordinates");
let fontColor = document.getElementById("fontColor");
let btnColor = document.getElementById("btnColor");
let colors = document.getElementById("colors");
let btn;
link.forEach((el) => {
    el.onclick = () => {
        if(el.value == "onImg") {
            if(btn) btn.remove();
            url.classList.add("active");
            btnValue.classList.remove("active");
            coordinates.classList.remove("active");
            fontColor.classList.remove("active");
            btnColor.classList.remove("active");
            colors.classList.remove("active");
        } else if(el.value == "button") {
            if(imgContainer.children.length === 1) {
                if(!btn) btn = document.createElement('div');
                //create button//
                btn.setAttribute('id', 'imgslider-btn'); 
                btn.textContent = 'Click here';
                imgContainer.appendChild(btn);
            }
            url.classList.add("active");
            btnValue.classList.add("active");
            coordinates.classList.add("active");
            fontColor.classList.add("active");
            btnColor.classList.add("active");
            colors.classList.add("active");
        } else {
            if(btn) btn.remove();
            url.classList.remove("active");
            btnValue.classList.remove("active");
            coordinates.classList.remove("active");
            fontColor.classList.remove("active");
            btnColor.classList.remove("active");
            colors.classList.remove("active");

        }
    }
});



x.addEventListener("change", () => {
    let button = document.getElementById("imgslider-btn");
    button.style.left = x.value + '%';
    console.log("hello");
});

y.addEventListener("change", () => {
    let button = document.getElementById("imgslider-btn");
    button.style.bottom = y.value + '%';
});



let slides = document.querySelectorAll("input[name=slide]");
slides.forEach((slide) => {
    slide.onchange = () => {
        uploadImg.value = '';
        imgContainer.innerHTML = `
        <img src="${slide.getAttribute("url")}" id="currentImg" style="width: 100%; height: 100%; object-fit: ${slide.getAttribute("object")}; position: absolute;">
        `;
        document.querySelectorAll(".disable").forEach((doc) => doc.classList.remove("active"));
        if(imgInputs != undefined) imgInputs.forEach((input) => input.disabled = true);
        if(document.querySelector("#imgslider-btn")) document.querySelector("#imgslider-btn").remove();
        
        document.querySelector("[name=order]").value = slide.getAttribute("order");
        imgFit.value = slide.getAttribute("object");
        let statusRadio = document.querySelectorAll("[name=linkStatus]");
        for(let i = 0; i < statusRadio.length; i++) {
            if (statusRadio[i].value === slide.getAttribute("linkStatus")) {
                statusRadio[i].checked = true;
              break;
            }
        }
        document.querySelector("[name=link]").value = slide.getAttribute("link");
        console.log(slide.getAttribute("link"));
        console.log(document.querySelector("[name=link]"));
        document.querySelector("[name=btnValue]").value = slide.getAttribute("btnVal");
        document.querySelector("[name=fontColor]").value = slide.getAttribute("fontColor");
        document.querySelector("[name=btnColor]").value = slide.getAttribute("btnColor");
        document.querySelector("[name=x]").value = slide.getAttribute("x");
        document.querySelector("[name=y]").value = slide.getAttribute("y");

        editBtn.classList.add("active");
        deleteBtn.classList.add("active");
        cancelBtn.classList.remove("active");
        saveBtn.classList.remove("active");
        url.classList.remove("active");
        btnColor.classList.remove("active");
        fontColor.classList.remove("active");
        colors.classList.remove("active");
        btnValue.classList.remove("active");
        coordinates.classList.remove("active");
    }
});

let imgInputs;
editBtn.onclick = (e) => {
    e.preventDefault();
    let linkInput = document.querySelector("[name=linkStatus]:checked");
    let selectedSlide = document.querySelector("[name=slide]:checked");
    imgInputs = document.querySelectorAll("[disabled]");
    document.querySelectorAll(".disable").forEach((doc) => doc.classList.add("active"));
    imgInputs.forEach((input) => input.disabled = false);
    //create button//
    if(selectedSlide.getAttribute("linkStatus") === "button") {
        console.log(selectedSlide);
        let btn = document.createElement('div');
        btn.setAttribute('id', 'imgslider-btn'); 
        btn.textContent = selectedSlide.getAttribute("btnval");
        btn.style.color = selectedSlide.getAttribute("fontColor");
        btn.style.background = selectedSlide.getAttribute("btnColor");
        btn.style.bottom = selectedSlide.getAttribute("y") + '%';
        btn.style.left = selectedSlide.getAttribute("x") + '%';
        imgContainer.appendChild(btn);
    }

    editBtn.classList.remove("active");
    deleteBtn.classList.remove("active");
    cancelBtn.classList.add("active");
    saveBtn.classList.add("active");
    console.log(linkInput.value);
    if(linkInput.value === "button") {
        console.log("button");
        url.classList.add("active");
        btnColor.classList.add("active");
        fontColor.classList.add("active");
        colors.classList.add("active");
        btnValue.classList.add("active");
        coordinates.classList.add("active");
    } else if(linkInput.value === "onImg") {
        console.log("on img");
        url.classList.add("active");
    }
    formType.action = "/admin/editImgSlider";
};

cancelBtn.onclick = (e) => {
    e.preventDefault();
    document.querySelectorAll(".disable").forEach((doc) => doc.classList.remove("active"));
    imgInputs.forEach((input) => input.disabled = true);
    if(document.querySelector("#imgslider-btn")) document.querySelector("#imgslider-btn").remove();

    // imgFit.value = document.querySelector("[name=slide]:checked").getAttribute("object");
    // document.querySelector("[name=order]").value = document.querySelector("[name=slide]:checked").id;
    // document.querySelector("#currentImg").style.objectFit = document.querySelector("[name=slide]:checked").getAttribute("object");
    // document.querySelector("[name=link]").value = document.querySelector("[name=slide]:checked").getAttribute("linkStatus");
    // document.querySelector("[name=btnValue]").value = document.querySelector("[name=slide]:checked").getAttribute("btnVal");
    // document.querySelector("[name=fontColor]").value = document.querySelector("[name=slide]:checked").getAttribute("fontColor");
    // document.querySelector("[name=btnColor]").value = document.querySelector("[name=slide]:checked").getAttribute("btnColor");
    // document.querySelector("[name=x]").value = document.querySelector("[name=slide]:checked").getAttribute("x");
    // document.querySelector("[name=y]").value = document.querySelector("[name=slide]:checked").getAttribute("y");

    editBtn.classList.add("active");
    deleteBtn.classList.add("active");
    cancelBtn.classList.remove("active");
    saveBtn.classList.remove("active");
    url.classList.remove("active");
    btnColor.classList.remove("active");
    fontColor.classList.remove("active");
    colors.classList.remove("active");
    btnValue.classList.remove("active");
    coordinates.classList.remove("active");
}

let btnText = document.querySelector("[name=btnValue]");
btnText.addEventListener("keyup", () => {
    if(btnText.value == "") {
        document.querySelector("#imgslider-btn").textContent = "Click here";
    } else {
        document.querySelector("#imgslider-btn").textContent = btnText.value;
    }
});


let fontColorValue = document.querySelector("[name=fontColor]");
fontColorValue.oninput = () => {
    document.querySelector("#imgslider-btn").style.color = fontColorValue.value;
};

let btnColorValue = document.querySelector("[name=btnColor]");
btnColorValue.oninput = () => {
    document.querySelector("#imgslider-btn").style.background = btnColorValue.value;
};


// formType.onsubmit = (form) => {
//     form.preventDefault();
//     let dataForm = new FormData(formType);
//     console.log(dataForm);
// }

// saveBtn.onclick = (e) => {
//     let currentImg;
//     if(document.querySelector("input[name=slide]:checked")) {
//         currentImg = document.querySelector("input[name=slide]:checked").value;
//     } else {
//         currentImg = picture.result;
//     }
//     let imgSlider = {
//         img: currentImg,
//         objectFit: imgFit.value,
//         order: orderInput.value,
//         linkStatus: linkInput.value,
//         link: urlInput.value,
//         btnValue: btnText.value,
//         btnColor: btnColorInput.value,
//         fontColor: fontColorInput.value,
//         coordinates: {
//             x: x.value,
//             y: y.value
//         }
//     }
//     fetch('/admin/saveImgSlider', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ imgSlider: picture.result })
//     });
// }