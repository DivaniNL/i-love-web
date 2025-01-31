

// Variables
let slideIndex = 1;
let sliderScrollPos = 0;
let currentScrollPos;
let lastscrolledSlidePos;
let oneSlideScrollWidth;
let slideCount;
let isButtonScroll = false;
let previousScrollPos = 0;
let hasReset = false;

// Carousel slider elements
let sliderInit = document.querySelector(".carousel_slides");
let sliderArrowsContainer = document.querySelector(".carousel_arrows");
let sliderArrows = document.querySelectorAll(".carousel_arrow");
let leftArrow = document.querySelector(".arrow_prev_btn");
let rightArrow = document.querySelector(".arrow_next_btn");
let allSlides = document.querySelectorAll(".carousel_slide");

// Code Logic
declareSlideWidth();
fillSlides();

document.body.onresize = function () {
  declareSlideWidth();
};

const debouncedCheckScrollPos = debounce(checkScrollPos, 100);
sliderInit.addEventListener("scroll", debouncedCheckScrollPos);

// Left arrow click event
leftArrow.addEventListener("click", () => {
  isButtonScroll = true;
  slideIndex -= 1;
  if (slideIndex < 1) {
    slideIndex = slideCount;
  }
  allSlides.forEach((slide) => slide.classList.remove("active"));
  document
    .querySelector(".carousel_slide[data-slide='" + slideIndex + "']")
    .classList.add("active");
  sliderScrollPos = currentScrollPos - oneSlideScrollWidth;
  sliderInit.scrollTo({
    left: sliderScrollPos,
    behavior: "smooth",
  });
  leftArrow.classList.add("scrolling");
  sliderInit.classList.add("scrolling");
  setTimeout(() => {
    leftArrow.classList.remove("scrolling");
    sliderInit.classList.remove("scrolling");
  }, 550);
});

// Right arrow click event
rightArrow.addEventListener("click", () => {
  isButtonScroll = true;
  slideIndex += 1;
  if (slideIndex > slideCount) {
    slideIndex = 1;
  }
  console.log(slideIndex)
  allSlides.forEach((slide) => slide.classList.remove("active"));
  document
    .querySelector(".carousel_slide[data-slide='" + slideIndex + "']")
    .classList.add("active");
  sliderScrollPos = currentScrollPos + oneSlideScrollWidth;
  sliderInit.scrollTo({
    left: sliderScrollPos,
    behavior: "smooth",
  });
  rightArrow.classList.add("scrolling");
  sliderInit.classList.add("scrolling");
  setTimeout(() => {
    rightArrow.classList.remove("scrolling");
    sliderInit.classList.remove("scrolling");
  }, 550);
});



function declareSlideWidth() {
  slideCount = document.querySelectorAll(".carousel_slide").length;
  let sliderWidth = sliderInit.scrollWidth;
  currentScrollPos = sliderInit.scrollLeft;
  oneSlideScrollWidth = sliderWidth / slideCount;
  lastscrolledSlidePos = sliderWidth - oneSlideScrollWidth;
}



function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function checkScrollPos(e) {
  currentScrollPos = sliderInit.scrollLeft;
  if (isButtonScroll) {
    if (currentScrollPos > previousScrollPos) {
      if (currentScrollPos >= lastscrolledSlidePos - oneSlideScrollWidth) {
        sliderInit.appendChild(sliderInit.firstElementChild);
      }
    } else {
      if (currentScrollPos <= 2) {
        sliderInit.prepend(sliderInit.lastElementChild);
      }
    }
  } else {
    if (currentScrollPos > previousScrollPos) {
      if (currentScrollPos >= lastscrolledSlidePos - oneSlideScrollWidth * 3) {
        sliderInit.classList.add("disable_scroll");
        setTimeout(() => {
          slideIndex += 1;
          sliderInit.appendChild(sliderInit.firstElementChild);
        }, 150);
      }
      if (hasReset) {
        slideIndex += 1;
        if (slideIndex > 10) {
          slideIndex = 1;
        }
      } else {
        hasReset = true;
      }
    } else {
      if (currentScrollPos <= oneSlideScrollWidth * 3) {
        sliderInit.classList.add("disable_scroll");
        setTimeout(() => {
          slideIndex -= 1;
          sliderInit.prepend(sliderInit.lastElementChild);
        }, 150);
      }
      slideIndex -= 1;
      if (slideIndex < 1) {
        slideIndex = 10;
      }
    }
    allSlides.forEach((slide) => slide.classList.remove("active"));
    document
      .querySelector(".carousel_slide[data-slide='" + slideIndex + "']")
      .classList.add("active");
  }
  previousScrollPos = currentScrollPos;
  isButtonScroll = false;
  sliderInit.classList.add("disable_scroll");
  setTimeout(() => {
    sliderInit.classList.remove("disable_scroll");
  }, 250);
}
function fillSlides() {
    allSlides.forEach((slide, i) => {
      i++;
      slideInt = i;
      let slideIString = slideInt + "/" + slideCount;
      slide.setAttribute("data-slide", i);
      slideInitContainer = document.createElement("span");
      slideInitContainer.classList.add("text_accent");
      slideInitContainer.textContent = slideIString;
  
      slideDesc = slide.querySelector(".text_small");
      slideDesc.prepend(slideInitContainer);
    });
    sliderInit.prepend(sliderInit.lastElementChild);
  }