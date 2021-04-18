//-- main
var CURRENT_PAGE = 1;
showRandomImage();
document.getElementById("current-page").nextElementSibling.click();

// do Pagination
function doPagination(e) {
  let page_number = e.target.textContent;

  if (page_number == ">>") {
    CURRENT_PAGE = CURRENT_PAGE == 5 ? 1 : CURRENT_PAGE + 1;
  }

  if (Number(page_number) <= 5) {
    CURRENT_PAGE = Number(page_number);
  }

  //clear style from others :p
  let list_btn_page = e.target.parentElement.children;

  for (var i = 0; i < list_btn_page.length; i++) {
    if (i != 0 && i != 6) {
      list_btn_page[i].className = "buttonpage page-btn-style";
    }
  }

  //do some styling to the current page number
  if (Number(page_number) <= 5) 
  e.target.className = "buttonpage current-page-btn-style";
  if (page_number == ">>")
  list_btn_page[CURRENT_PAGE].className = "buttonpage current-page-btn-style";


  document.getElementById(
    "current-page"
  ).textContent = `Page ${CURRENT_PAGE} of 5`;

  pagination(CURRENT_PAGE * 3 - 3, CURRENT_PAGE * 3);
}
//Pagination
function pagination(from, to) {
  //get the list of articles
  var list_article = document.querySelector("#list-articles").children;
  //limit the list to just display the 3 first ones by default
  for (var i = from; i < to; i++) {
    list_article[i].classList.remove("d-none");
  }
  //hide the rest of the list
  for (var i = 0; i < from; i++) {
    list_article[i].classList.add("d-none");
  }
  //hide the rest of the list
  if (to < list_article.length)
    for (var i = to; i < list_article.length - 1; i++) {
      list_article[i].classList.add("d-none");
    }
  console.log(list_article.length);
}

//Search fonctionality
function onSearch(event) {
  var typed_val = event.target.value.toLowerCase();
  var list_article = document.querySelectorAll(".article");

  //--hide the slider to show up the result
  if (typed_val != "") {
    document.getElementById("imgslide").classList.replace("d-block", "d-none");
    document.getElementById("quote").classList.replace("d-flex", "d-none");
  } else {
    document.getElementById("imgslide").classList.replace("d-none", "d-block");
    document.getElementById("quote").classList.replace("d-none", "d-flex");
  }

  //-- filter articles by title
  for (var i = 0; i < list_article.length; i++) {
    var title_article = list_article[
      i
    ].children[1].children[0].children[0].textContent.toLowerCase();
    if (title_article.includes(typed_val) == false)
      list_article[i].classList.add("d-none");
    else list_article[i].classList.remove("d-none");
  }
  console.log(list_article);
}

//Slider
function showRandomImage() {
  var theImages = new Array();
  theImages[0] = "img/IMG_1.jpg";
  theImages[1] = "img/IMG_2.jpg";
  theImages[2] = "img/IMG_3.jpg";

  var j = 0; //hadi madarti biha walo ?
  var p = theImages.length;
  var preBuffer = new Array();

  for (i = 0; i < p; i++) {
    preBuffer[i] = new Image();
    preBuffer[i].src = theImages[i];
  }

  var whichImage = Math.round(Math.random() * (p - 1));
  document.getElementById("imgslide").src = theImages[whichImage];
}

//-- show up the rest of the article's content when readmore's button is clicked
function readmore(event) {
  var dots = event.target.parentElement.children[2].children[0];
  var moreText = event.target.parentElement.children[2].children[1];
  var btnText = event.target;

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
