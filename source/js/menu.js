const pageBody = document.querySelector('.page-body');
const buttonToggleMenu = document.querySelector('.main-navigation__toggle');
const navMain = document.querySelector('.main-navigation');

pageBody.classList.remove('page-body--no-js');
buttonToggleMenu.classList.add('main-navigation__toggle--close');

const onButtonMenuClick = () => {
  buttonToggleMenu.classList.toggle('main-navigation__toggle--close');
  buttonToggleMenu.classList.toggle('main-navigation__toggle--open');
  navMain.classList.toggle('main-navigation--open');
}

console.log(navMain)
