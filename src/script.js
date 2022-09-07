"use strict"

// работать с DOM лучше после того, как загрузился window//
window.onload = function() {
    // ВЫПАДАЮЩЕЕ МЕНЮ //
    headerButton.addEventListener("click", toggleMenu); // открываем меню навигации
    // СКРОЛЛ НАВЕРХ //
    window.addEventListener('scroll', trackScroll); // отслеживаем скролл и вешаем функцию //
    scrollButton.addEventListener('click', backToTop); // отслеживаем клик и вешаем функцию //
    // CAROUSEL //
    rightButton.addEventListener('click', moveRight);
    leftButton.addEventListener('click', moveLeft);
}

///////////////////////////////         КОНСТАНТЫ         /////////////////////////////// 

const scrollButton = document.querySelector('.scroll_button');
const headerButton = document.querySelector('.header_button');
const header = document.querySelector('.header');

const leftButton = document.getElementById('button_left');
const rightButton = document.getElementById('button_right');
const carousel = document.querySelector('.carousel-line');
const carouselWrapper = document.querySelector('.carousel__wrapper');
let direction;



///////////////////////////////         ВЫПАДАЮЩЕЕ МЕНЮ         /////////////////////////////// 

function toggleMenu() {
    headerButton.classList.toggle('_active')
    header.classList.toggle('_active')
}



///////////////////////////////         СКРОЛЛ НАВЕРХ         /////////////////////////////// 


    // при скролле на высоту окна пользователя, делаем кнопку видимой //
    function trackScroll() {
        let scrolled = window.pageYOffset;
        let coords = (document.documentElement.clientHeight) - 1;
        
        if (scrolled > coords) {
            scrollButton.classList.add('scroll_button-active');
        }
        if (scrolled < coords) {
            scrollButton.classList.remove('scroll_button-active');
        }
    }

// при клике прокрутка вверх //
function backToTop() {
    window.scrollTo(pageXOffset, 0); // я хз, почему оно зачеркнуто, но оно работает
}


///////////////////////////////         CAROUSEL         /////////////////////////////// 


function moveRight() {
    direction = -1;
    carouselWrapper.style.justifyContent = 'flex-start';
    carousel.style.transform = 'translate(calc(-40vw - 28px))';  
}
  

function moveLeft() {
    if (direction === -1) {
      direction = 1;
      carousel.appendChild(carousel.firstElementChild);
    }
    carouselWrapper.style.justifyContent = 'flex-end';    
    carousel.style.transform = 'translate(calc(40vw + 28px))';  
    
}




carousel.addEventListener('transitionend', function() {
    if (direction === 1) {
            carousel.prepend(carousel.lastElementChild);
        } else {
            carousel.appendChild(carousel.firstElementChild);
        }

    carousel.style.transition = 'none';
    carousel.style.transform = 'translate(0)';
    setTimeout(() => {
        carousel.style.transition = 'all 1s';
    })
}, false);



