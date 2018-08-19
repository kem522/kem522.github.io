// variables
const menu = document.querySelector('.menu');
const burger = document.querySelector('.burger');
const title = document.querySelector('h1');

// functions
const onResize = function() {
  if (window.innerWidth < 768) {
    title.innerHTML = 'KT';
    title.setAttribute('data-text', 'KT');
  } else if (window.innerWidth < 1440) {
    title.innerHTML = 'KATIE';
    title.setAttribute('data-text', 'KATIE');
  } else {
    title.innerHTML = 'KATHERINE';
    title.setAttribute('data-text', 'KATHERINE');
  }
};

const menuAnimation = function() {
  if (menu.classList.contains('active')) {
    menu.classList.remove('active');
    menu.firstElementChild.classList.remove('fadein');
    burger.firstElementChild.classList.remove('rotate1');
    burger.lastElementChild.classList.remove('rotate2');
    setTimeout(() => {
      menu.firstElementChild.childNodes.forEach(child => {
        if (child.nodeName === 'LI') child.classList.remove('slideIn');
      });
    }, 1500);
  } else {
    menu.classList.add('active');
    setTimeout(() => {
      menu.firstElementChild.childNodes.forEach(child => {
        if (child.nodeName === 'LI') child.classList.add('slideIn');
      });
    }, 1500);
    menu.firstElementChild.classList.add('fadein');
    burger.firstElementChild.classList.add('rotate1');
    burger.lastElementChild.classList.add('rotate2');
  }
};

//event listeners
window.addEventListener('resize', onResize);
burger.addEventListener('click', menuAnimation);

//run
onResize();
