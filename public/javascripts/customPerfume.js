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
            <div style="display: grid; grid-template-columns: 1fr 6fr 1fr 1.5fr 0.5fr; width: 100%; align-items: center; margin-bottom: 25px;">
                <img src="${picture.result}" alt="" style="width: 40px; margin: 0px 5px">
                <input type="text" name="altText" value="${inputFile.files[i].name}" class="altImg" style="margin: 0px; width: 90%;">
                <input type="number" name="orderOfImg" class="orderImg" value="${closeX.length}" style="margin: 0px;">
                <div style="display: flex; align-items: center; justify-content: center;">
                    <input type="checkbox" name="selectedImages" value="${closeX.length}" style="width: 19px; heigth: 19px;">
                </div>
                <img class="closeX" src="/images/close.png" style="border: 0px; width: 12px; margin-left: 15%; cursor: pointer;" onclick="deleteImg(${i})">
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
                <div style="display: grid; grid-template-columns: 1fr 6fr 1fr 1.5fr 0.5fr; width: 100%; align-items: center; margin-bottom: 25px;">
                    <img src="${picture.result}" alt="" style="width: 40px;">
                    <input type="text" name="altText" value="${images[i].name}" class="altImg" style="margin: 0px; width: 90%;">
                    <input type="number" name="orderOfImg" class="orderImg" value="${closeX.length}" style="margin: 0px;">
                    <div style="display: flex; align-items: center; justify-content: center;">
                        <input type="checkbox" name="selectedImages" value="${closeX.length}" style="width: 19px; heigth: 19px;">
                    </div>
                    <img class="closeX" src="/images/close.png" style="border: 0px; width: 12px; margin-left: 15%; cursor: pointer;" onclick="deleteImg(${i})">
                </div>
            `;
        };
    }
}

function deleteStoredImg(element) {
    console.log(element.parentElement.parentElement);
    element.parentElement.parentElement.style.display = "none";
}

const form = document.getElementById("customProduct");
form.onsubmit = () => {
    const filesList = new DataTransfer();

    images.forEach(file => {
        filesList.items.add(file);
    });

    inputFile.files = filesList.files;

    let selectedImages = document.querySelectorAll("[name=selectedImages]");
    let imagesOrder = Array.from(document.querySelectorAll("[name=orderOfImg]"));
    imagesOrder.forEach((order, i) => selectedImages[i].value = order.value);

}