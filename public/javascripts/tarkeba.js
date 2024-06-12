/////product gallery/////
const ratingCount = document.getElementById("ratingCount");
const starCountReview = document.getElementsByClassName("starCount");


////review stars////
const reviewStars = document.querySelectorAll(".review i");
reviewStars.forEach((starRegular, index) => {
    starRegular.addEventListener('click', () => {
        reviewStars.forEach(starSolid => starSolid.classList.remove("fa-solid", "checked"));
        for(let i = 0; i <= index; i++) {
            reviewStars[i].classList.add("fa-solid", "checked");
        }
        const starCount = document.querySelectorAll(".review i.checked").length;
        ratingCount.value = starCount;
    }); 
    
});

////user rating////
const reviewNumber = document.querySelectorAll(".reviewNumber");
for(let i = 0; i < reviewNumber.length; i++) {
    for(let j = 0; j < starCountReview[i].value; j++) {
        reviewNumber[i].children[j].classList.add("fa-solid");
    }
}

////add review////
let popups = document.querySelectorAll(".popup");
let addReview = Array.from(document.querySelectorAll(".addReview"));
let closeBtn = Array.from(document.querySelectorAll(".close-btn"));
addReview.forEach((btn) => {
    btn.onclick = (e) => {
        e.preventDefault();
        popups[addReview.indexOf(btn)].classList.add("active");
    }
});

closeBtn.forEach((btn) => btn.onclick = () => popups.forEach(popup => popup.classList.remove("active")));
