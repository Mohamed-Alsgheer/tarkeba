let actionBtns = document.querySelector(".action-btns");
let confirmFDiv = document.querySelector(".confirm-div");
let questionDiv = document.querySelectorAll(".questionDiv");
let editQues = Array.from(document.querySelectorAll(".edit-ques"));
let deleteQues = document.querySelectorAll(".delete-ques");
let cancelBtn = document.querySelectorAll(".cancel-btn");
let question = document.querySelector("[name=question]");
let answer = document.querySelector("[name=answer]");
let submitQues = document.querySelector("#submitQues");
let updateQues = document.querySelector("#updateQues");
let cancelUpdate = document.querySelector("#cancelUpdate");


questionDiv.forEach(div => {
    div.addEventListener("mouseenter", () => {if(!div.children[3].classList.contains('active')) div.children[0].classList.add('active')});
    div.addEventListener("mouseleave", () => div.children[0].classList.remove('active'));
});

editQues.forEach((btn) => {
    btn.onclick = () => {
        fetch('http://localhost:3000/admin/questionsData', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json; charset=UTF-8' }
        }).then((res) => {
            return res.json();
        }).then((data) => {
            console.log(data);
            console.log(editQues.indexOf(btn));
            question.value = data[editQues.indexOf(btn)].question;
            answer.innerHTML = data[editQues.indexOf(btn)].answer;
            submitQues.style.display = "none";
            updateQues.style.display = "block";
            cancelUpdate.style.display = "block";
            
            //scroll to top
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

deleteQues.forEach((btn) => {
    btn.onclick = () => {
        btn.parentNode.classList.remove('active');
        btn.parentNode.parentNode.children[3].classList.add('active');
    }
});

cancelBtn.forEach(btn => {
    btn.onclick = () => {
        console.log(btn.parentNode);
        btn.parentNode.parentNode.classList.remove('active');
    }
});

cancelUpdate.onclick = (e) => {
    e.preventDefault();
    question.value = "";
    answer.innerHTML = "";
    submitQues.style.display = "block";
    updateQues.style.display = "none";
    cancelUpdate.style.display = "none";
}