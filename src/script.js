"use strict"

import projects from './projects.js';

// работать с DOM лучше после того, как загрузился window//
window.onload = function() {
    // ВЫПАДАЮЩЕЕ МЕНЮ //
    headerButton.addEventListener("click", toggleMenu); // открываем меню навигации
    // СКРОЛЛ НАВЕРХ //
    window.addEventListener('scroll', trackScroll); // отслеживаем скролл и вешаем функцию //
    scrollButton.addEventListener('click', backToTop); // отслеживаем клик и вешаем функцию //
    // CAROUSEL //
    createProjects();
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


///////////////////////////////         PROJECTS         /////////////////////////////// 

class Element {
    constructor(parentNode, tag = 'div', className = '', content = '') {
        const element = document.createElement(tag);
        element.classList = className;
        element.textContent = content;
        parentNode.append(element);
        this.node = element;
    }
}
class Image {
    constructor(parentNode, src = '', tag = 'img', className = '') {
        const img = document.createElement(tag);
        img.classList = className;
        img.src = src;
        parentNode.append(img);
        this.node = img;
    }
}

class Link {
    constructor(parentNode, href = '', tag = 'a', className = '', target = '_blank') {
        const a = document.createElement(tag);
        a.href = href;
        a.classList = className;
        a.href = href;
        a.target = target;
        parentNode.append(a);
        this.node = a;
    }
}

// структура проекта //
class Project extends Element {
    constructor (parentNode, data) {
        super (parentNode, 'div', 'carousel__item');
        this.link = new Link(this.node, data.link, 'a', 'carousel__link');
        this.picture = new Element(this.node.firstChild, 'div', 'carousel__picture');
        this.img = new Image(this.node.firstChild.firstChild, data.img);
        this.name = new Element(this.node.firstChild, 'h3', 'default', data.name);
    }
}

function createProjects() {
    const projectsReverse = projects.reverse();
    console.log(projects)
    while (projectsReverse.length > 0) {
        let current = projects.pop();
        let project = new Project(carousel, current);
    }
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



