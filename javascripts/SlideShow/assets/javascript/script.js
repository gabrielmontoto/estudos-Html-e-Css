let b = "";
let v = `${b}`;

// document.querySelectorAll()
// document.querySelector('#idName')
// document.querySelector('.className')
// document.getElementsByTagName('div')
// document.getElementById('divName')
const query = (element) => document.querySelector(element);
const queryAll = (element) => document.querySelectorAll(element);
let currentSlide = 0;

let totalSliders = queryAll(".slide_content");
query(".sliders_holder").style.width = `calc(100vw * ${totalSliders.length})`;
query(".slider_controls").style.height = `${
  query(".sliders_container").clientHeight
}px`;

query(".arrow_left").addEventListener("click", goBackSlider);
query(".arrow_right").addEventListener("click", goNextSlider);

setupPhotos();
function setupPhotos() {
  for (let index = 0; index < totalSliders.length; index++) {
    const element = totalSliders[index];
    console.log(element);
    element.style.backgroundImage = `url('../SlideShow/assets/images/paisagem${
      index + 1
    }.jpg')`;
  }
}

function goBackSlider() {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = totalSliders.length - 1;
  }
  updateMargin();
}
function goNextSlider() {
  currentSlide++;
  if (currentSlide > totalSliders.length - 1) {
    currentSlide = 0;
  }
  updateMargin();
}

function updateMargin() {
  let sliderContainerWidth = query(".slide_content").clientWidth;
  let newMargin = currentSlide * sliderContainerWidth;
  query(".sliders_holder").style.marginLeft = `-${newMargin}px`;
}

setInterval(() => {
  goNextSlider();
}, 5000);
