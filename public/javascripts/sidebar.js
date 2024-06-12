let sidebarBtn = document.querySelector("#sidebar-btn");
let sidebar = document.querySelector(".side-menu");
let header = document.querySelector(".admin-header");
let body = document.querySelector(".dashboard-body");
let subMenu = document.querySelectorAll(".sub-menu");
let childMenu = document.querySelectorAll(".child-menu");
let arrows = document.querySelectorAll(".more");

if (window.innerWidth <= 750) {
  sidebar.style.opacity = 0;
}

subMenu.forEach((menu) => {
  menu.onclick = () => {
    let index = menu.getAttribute("index");
    if (!arrows[index].classList.contains("active")) {
      console.log('test1');
      arrows[index].classList.add("active");
      childMenu[index].style.maxHeight = "100%";
      childMenu[index].style.height = "auto";
    } else {
      arrows[index].classList.remove("active");
      childMenu[index].style.maxHeight = "0px";
    }
  }
});

sidebarBtn.onclick = () => {
  if (sidebar.style.opacity == 1) {
    sidebar.style.opacity = 0;
    sidebar.style.left = '-250px';
    if (window.innerWidth > 750) {
      header.style.width = '100%';
      body.style.margin = '68px 0px 0px 0px';
    } else {
      body.style.filter = 'brightness(1)';
      body.style.background = 'rgba(0, 0, 0, 0)';
    }
  } else {
    sidebar.style.opacity = 1;
    sidebar.style.left = '0px';
    if (window.innerWidth > 750) {
      header.style.width = 'calc(100% - 250px)';
      body.style.margin = '68px 0px 0px 250px';
    } else {
      body.style.filter = 'brightness(0.6)';
      body.style.background = 'rgba(0, 0, 0, 0.4)';
    }
  }
};

const dayOfWeek = 3;
let sidebarBox = document.querySelectorAll(".sidebar-box");

switch (true) {
  case window.location.href.includes('/admin/users'):
    sidebarBox[1].style.background = "#E4ABFF";
    sidebarBox[1].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/productList'):
    sidebarBox[2].style.background = "#E4ABFF";
    sidebarBox[2].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/product'):
    sidebarBox[2].style.background = "#E4ABFF";
    sidebarBox[2].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/categoriesList'):
    sidebarBox[2].style.background = "#E4ABFF";
    sidebarBox[2].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/category'):
    sidebarBox[2].style.background = "#E4ABFF";
    sidebarBox[2].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/order'):
    sidebarBox[3].style.background = "#E4ABFF";
    sidebarBox[3].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/shipping'):
    sidebarBox[4].style.background = "#E4ABFF";
    sidebarBox[4].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/couponsList'):
    sidebarBox[5].style.background = "#E4ABFF";
    sidebarBox[5].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/coupon'):
    sidebarBox[5].style.background = "#E4ABFF";
    sidebarBox[5].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/imgSliderControl'):
    sidebarBox[6].style.background = "#E4ABFF";
    sidebarBox[6].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/reviews'):
    sidebarBox[7].style.background = "#E4ABFF";
    sidebarBox[7].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/feedback'):
    sidebarBox[7].style.background = "#E4ABFF";
    sidebarBox[7].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/customPerfume'):
    sidebarBox[8].style.background = "#E4ABFF";
    sidebarBox[8].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/about'):
    sidebarBox[9].style.background = "#E4ABFF";
    sidebarBox[9].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/policies'):
    sidebarBox[10].style.background = "#E4ABFF";
    sidebarBox[10].style.borderRadius = "5px";
    break;
  case window.location.href.includes('/admin/questions'):
    sidebarBox[11].style.background = "#E4ABFF";
    sidebarBox[11].style.borderRadius = "5px";
    break;
  default:
    sidebarBox[0].style.background = "#E4ABFF";
    sidebarBox[0].style.borderRadius = "5px";
}