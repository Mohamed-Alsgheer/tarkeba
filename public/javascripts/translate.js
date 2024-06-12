///language direction///
const getLang = localStorage.getItem("language");
const body = document.documentElement;
const ar = document.getElementById("ar");
const en = document.getElementById("en");
const arrow1 = document.getElementById("arrow1");
const arrow2 = document.getElementById("arrow2");
const home = document.getElementById("home");
const profile = document.getElementById("profile");
const logOut = document.getElementById("logOut");
const account = document.getElementById("account");
const questions = document.getElementById("q&a");
const noProduct = document.getElementById("noProduct");
const goToCart = document.getElementById("gotocart");
const questionsTitle = document.getElementById("questionsTitle");
const ques1 = document.getElementById("ques1");
const ques2 = document.getElementById("ques2");
const ques3 = document.getElementById("ques3");
const ques4 = document.getElementById("ques4");
const ques5 = document.getElementById("ques5");
const ques6 = document.getElementById("ques6");
const ans1 = document.getElementById("ans1");
const ans2 = document.getElementById("ans2");
const ans22 = document.getElementById("ans22");
const ans3 = document.getElementById("ans3");
const ans4 = document.getElementById("ans4");
const ans44 = document.getElementById("ans44");
const ans5 = document.getElementById("ans5");
const ans6 = document.getElementById("ans6");
const ans66 = document.getElementById("ans66");
const note1 = document.getElementById("note1");
const note2 = document.getElementById("note2");
const createProduct = document.getElementById("createProduct");
const yourAccount = document.getElementById("yourAccount");
const questions2 = document.getElementById("q&a2");
const links = document.getElementById("links");
const contact = document.getElementById("contact");
const socialMedia = document.getElementById("soc-media");
const title1 = document.getElementById("title1");
const title2 = document.getElementById("title2");
const title3 = document.getElementById("title3");
const titleMen = document.getElementById("title-men");
const titleWomen = document.getElementById("title-women");
const sentence1 = document.getElementById("sentence1");
const sentence2 = document.getElementById("sentence2");
const custom = document.getElementById("custom");
const buyingSuccess = document.getElementById("buying-succeeded");
const detalis1 = document.querySelectorAll("detalis1");
const detalis2 = document.getElementsByClassName("detalis2");
const add1 = document.getElementsByClassName("addToCart1");
const add2 = document.getElementsByClassName("addToCart2");

if(getLang) {
    if(getLang == "rtl") {
        language("rtl");
    } else {
        language("ltr");
    }
} else {
    localStorage.setItem("language", "ltr")
}

function languageBottuns() {
    if(body.dir == "rtl") {
        en.style.display = "block";
        ar.style.display = "none";
        home.innerHTML = "الرئيسية";
        questions.innerHTML = "الأسئلة";
        if(account) {
            account.innerHTML = "الحساب";
        }
        if(profile) {
            profile.innerHTML = "الملف الشخصي";
            logOut.innerHTML = "تسجيل الخروج";
        }
        note1.innerHTML = "جميع العطور المعروضة تركيبات";
        note2.innerHTML = ".ليست أصلية";
        yourAccount.innerHTML = "حسابك";
        questions2.innerHTML = "الأسئلة الشائعة";
        createProduct.innerHTML = "إنشاء عطر";
        links.innerHTML = "روابط مفيدة";
        contact.innerHTML = "الاتصال";
        socialMedia.innerHTML = "التواصل الاجتماعي";
        if(noProduct) {
            noProduct.innerHTML = "عربة التسوق فارغة";
        }
        if(goToCart) {
            goToCart.innerHTML = "عرض عربة التسوق";
        }
        //home page//
        if(title1) {
            title1.innerHTML = "احصل على افضل";
            title2.innerHTML = "التركيبات من";
            title3.innerHTML = "افضل العطور";
            sentence1.innerHTML = "إذا لم تتمكن من العثور على العطور التي تناسبك ، فيمكننا صنع";
            sentence2.innerHTML = "عطر مخصص لك";
            custom.innerHTML = "تخصيص &#8592;";
            if(buyingSuccess) {
                buyingSuccess.innerHTML = "نجحت عملية الشراء.";
            }
            titleMen.innerHTML = "العطور الرجالية";
            titleWomen.innerHTML = "العطور النسائية";
            detalis1.innerHTML = "التفاصيل";
            detalis2.innerHTML = "التفاصيل";
            add2.innerHTML = "اضف للعربة";
            add1.innerHTML = "اضف للعربة";
        }
        if(arrow1 && arrow2) {
            arrow2.style.display = "block";
            arrow1.style.display = "none";
        }
        //questions page//
        if(questionsTitle) {
            questionsTitle.innerHTML = "الأسئلة الشائعة";
            ques1.innerHTML = "كم تبلغ تكلفة الشحن؟";
            ques2.innerHTML = "كم من الوقت يستغرق التسليم؟";
            ques3.innerHTML = "ما هي طرق الدفع المتاحة؟";
            ques4.innerHTML = "هل لديكم مكان لاستلام طلبي منه والتحقق من المنتجات الأخرى بنفسي؟";
            ques5.innerHTML = "ماذا لو لم يعجبني طلبي؟";
            ques6.innerHTML = "كيف استبدل المنتج؟";
            ans1.innerHTML = ".التوصيل داخل القاهرة والجيزة بـ 20 جنيه";
            ans2.innerHTML = "يستغرق التوصيل 2-4 أيام عمل.";
            ans22.innerHTML = "(تُستثنى أيام الجمعة والعطلات الرسمية).";
            ans3.innerHTML = "فقط الدفع عند الاستلام.";
            ans4.innerHTML = "نعم ، يمكنك استلام طلبك والتحقق من العطور الأخرى";
            ans44.innerHTML = "من مكاني هنا العنوان: امبابة ، صفط اللبن ، شارع الديب ، الدور الثاني.";
            ans5.innerHTML = "إذا لم تكن راضيًا عن طلبك فيحق لك إرجاعه مرة أخرى برسوم توصيل 20 جنيه.";
            ans6.innerHTML = "يمكنك استبدال العطر خلال 3 أيام من استلامه.";
            ans66.innerHTML = "رسوم الأستبدال 20 جنيه.";
        }
    }
    if(body.dir == "ltr") {
        ar.style.display = "block";
        en.style.display = "none";
        if(arrow1 && arrow2) {
            arrow2.style.display = "none";
            arrow1.style.display = "block";
        }
    }
}
languageBottuns();



ar.addEventListener("click", () => language("rtl"));
en.addEventListener("click", () => language("ltr"));

function language(dir) {
    document.documentElement.setAttribute("dir", dir);
    localStorage.setItem("language", dir);
}

function refresh() {
    setTimeout(() => {
        window.location.reload();
    }, 200)
}