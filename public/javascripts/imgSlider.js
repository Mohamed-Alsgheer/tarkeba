var prev = document.querySelector("#prev");
var next = document.querySelector("#next");
var sliderContainer = document.querySelector(".slider-container");
var sliderImages = Array.from(document.querySelectorAll(".slider-container .img-slider"));
var slidesCount = sliderImages.length;
var currentSlide = 1;


//create the main ul element 
var paginationElement = document.createElement('ul'); 

// set id on created element
paginationElement.setAttribute('id', 'pagination-ul');

//create list items
for(let i = 1; i <= slidesCount; i++) {
    var paginationItem = document.createElement('li'); 
    paginationItem.setAttribute('data-index', i);

    //append item to the main ul
    paginationElement.appendChild(paginationItem);
}

//add the created element to the page
document.getElementById("indicators").appendChild(paginationElement);

//get the new created ul
var paginationUl = document.getElementById("pagination-ul");


var paginationBullets = Array.from(document.querySelectorAll("#pagination-ul li"));


//loop through all bullet items
for(let i = 0; i < paginationBullets.length; i++) {
    paginationBullets[i].onclick = function() {
        currentSlide = parseInt(this.getAttribute('data-index'));
        checker();
    }
}



//autoplay slide images
let autoplaySlider = setInterval(autoplay, 5000);

function autoplay() {
    if(currentSlide < slidesCount) {
        currentSlide = parseInt(paginationBullets[currentSlide].getAttribute('data-index'));
        checker();
    } else {
        currentSlide = parseInt(paginationBullets[0].getAttribute('data-index'));
        checker();
    }
}

sliderContainer.addEventListener("mouseenter", () => clearInterval(autoplaySlider));
sliderContainer.addEventListener("mouseleave", () => autoplaySlider = setInterval(autoplay, 5000));

//next button
next.addEventListener("click", () => {
    if(currentSlide < slidesCount) {
        currentSlide++;
        checker();
    } else {
        currentSlide = 1;
        checker();
    }
});

//prev button
prev.addEventListener("click", () => {
    if(currentSlide > 1) {
        currentSlide--;
        checker();
    } else {
        currentSlide = slidesCount;
        checker();
    }
});

//create checker function 
function checker() {
    //remove all active classes
    removeAllActive();

    //set active class on the current slide
    sliderImages[currentSlide - 1].classList.add('active');

    //set active class on the current pagination item
    paginationUl.children[currentSlide - 1].classList.add('active');

}


//remove all active classes
function removeAllActive() {
    //loop through images
    sliderImages.forEach((img) => {
        img.classList.remove('active');
    });

    paginationBullets.forEach((bullet) => {
        bullet.classList.remove('active');
    });
}



//trigger the checker function
checker();