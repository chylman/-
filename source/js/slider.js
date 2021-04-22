const slider = document.querySelector('.slider');
const sliderToggles = slider.querySelectorAll('.slider__toggle-item');
const sliderCards = slider.querySelectorAll('.slider__item');
const linkPlaceCards = document.querySelectorAll('.place-card__link');
const reviewsItems = document.querySelectorAll('.reviews__item');


const removeActiveSlider = () => {
  for (let i = 0; i < sliderCards.length; i++) {
    const element = sliderCards[i];

    element.classList.remove('slider__item--active');
  }
}

const removeActiveToggle = () => {
  for (let i = 0; i < sliderToggles.length; i++) {
    const element = sliderToggles[i];

    element.classList.remove('slider__toggle-item--active');
  }
}

const removeShowToggles = () => {
  for (let i = 0; i < sliderToggles.length; i++) {
    const element = sliderToggles[i];

    element.classList.remove('slider__toggle-item--show');
    element.classList.remove('slider__toggle-item--hidden');
  }
}

const removeActiveReview = () => {
  for (let i = 0; i < reviewsItems.length; i++) {
    const element = reviewsItems[i];

    element.classList.remove('reviews__item--active');
  }
}


const onLinkPlaceCards = (evt) => {
  const AvtiveClickElement = evt.target;
  let indexSlider = 0;
  removeActiveSlider();
  removeActiveToggle();
  removeActiveReview();
  removeShowToggles();

  for (let i = 0; i < linkPlaceCards.length; i++) {
    if (AvtiveClickElement === linkPlaceCards[i]) {
      indexSlider = i;
    }
  }

  if (indexSlider === (sliderToggles.length - 1)) {
    sliderToggles[indexSlider].classList.add('slider__toggle-item--show');
    sliderToggles[indexSlider - 1].classList.add('slider__toggle-item--show');
  } else {
    sliderToggles[indexSlider].classList.add('slider__toggle-item--show');
    sliderToggles[indexSlider + 1].classList.add('slider__toggle-item--show');
   }

  if (indexSlider > 0) {
    sliderToggles[0].classList.add('slider__toggle-item--hidden');
  }

  sliderToggles[indexSlider].classList.add('slider__toggle-item--active');
  sliderCards[indexSlider].classList.add('slider__item--active');
  reviewsItems[indexSlider].classList.add('reviews__item--active');


}

const onSliderTogglesClick = (evt) => {
  const parentClickElement = evt.target.parentElement;
  let indexSlider = 0;

  removeActiveSlider();
  removeActiveToggle();
  removeActiveReview();
  removeShowToggles();


  for (let i = 0; i < sliderToggles.length; i++) {
    if (parentClickElement === sliderToggles[i]) {
      indexSlider = i;
    }
  }

  if (indexSlider === (sliderToggles.length - 1)) {
    sliderToggles[indexSlider].classList.add('slider__toggle-item--show');
    sliderToggles[indexSlider - 1].classList.add('slider__toggle-item--show');
  } else {
    sliderToggles[indexSlider].classList.add('slider__toggle-item--show');
    sliderToggles[indexSlider + 1].classList.add('slider__toggle-item--show');
   }

  if (indexSlider > 0) {
    sliderToggles[0].classList.add('slider__toggle-item--hidden');
  }

  sliderCards[indexSlider].classList.add('slider__item--active');
  sliderToggles[indexSlider].classList.add('slider__toggle-item--active');
  reviewsItems[indexSlider].classList.add('reviews__item--active');
}

for (let i = 0; i < sliderToggles.length; i++) {
  const element = sliderToggles[i];
  element.addEventListener('click', onSliderTogglesClick);
}

for (let i = 0; i < linkPlaceCards.length; i++) {
  const element = linkPlaceCards[i];
  element.addEventListener('click', onLinkPlaceCards);
}

// Menu

const pageBody = document.querySelector('.page-body');
const buttonToggleMenu = document.querySelector('.main-navigation__toggle');
const navMain = document.querySelector('.main-navigation');

pageBody.classList.remove('page-body--no-js');
buttonToggleMenu.classList.add('main-navigation__toggle--close');

const onButtonMenuClick = (evt) => {
  evt.preventDefault();
  buttonToggleMenu.classList.toggle('main-navigation__toggle--close');
  buttonToggleMenu.classList.toggle('main-navigation__toggle--open');
  navMain.classList.toggle('main-navigation--open');
}

buttonToggleMenu.addEventListener('click', onButtonMenuClick)


// Popup


const popupOpenButtons = document.querySelectorAll('.link-shop');
const popupShop = document.querySelector('.popup-shop');
const popupCloseButtons = document.querySelectorAll('.close-button');

const onPoppupOpenClick = (evt) => {
  evt.preventDefault();
  popupShop.classList.remove('popup--hidden');
}

const onCloseButtonClick = () => {
  popupShop.classList.add('popup--hidden');
}


for (let i = 0; i < popupOpenButtons.length; i++) {
  const element = popupOpenButtons [i];

  element.addEventListener('click', onPoppupOpenClick);

}

for (let i = 0; i < popupCloseButtons.length; i++) {
  const element = popupCloseButtons[i];

  element.addEventListener('click', onCloseButtonClick);

}
