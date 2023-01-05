import './styles.css';

const aboutWorldCardArray = document.querySelectorAll('.about-card');

aboutWorldCardArray.forEach(function (i) {
    i.addEventListener('click', function (e){
        toggleAboutWorldCard(i);
    })
    i.removeEventListener("click", toggleAboutWorldCard);
})

const typingTexts = document.querySelectorAll('.typing-text');

let typingTextObservers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0 && entry.target.innerHTML.length === 0) {
            typeTitle(entry.target.dataset.title, entry.target.id);
        }
    })
})

typingTexts.forEach(titleElement => {
    typingTextObservers.observe(titleElement);
})

const elementsToAnimate = document.querySelectorAll('.anim');

let animationObservers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0 && !entry.target.classList.contains('animate__animated') && !entry.target.classList.contains('about-card')) {
            const animation = entry.target.dataset.animation;
            animateContent(entry.target, animation, delay);
        }
    })
})

elementsToAnimate.forEach(animationElement => {
    animationObservers.observe(animationElement);
})

const exploreSection = document.getElementById('explore');

let exploreObserver = new IntersectionObserver(  async (entry) => {
    const el = entry[0];
    if(el.intersectionRatio > 0){
        const worlds = document.querySelectorAll('.about-card');
        for(let i = 0; i< worlds.length; i++) {
            animateContent(worlds[i], 'fadeIn');
            worlds[i].style = 'opacity: 1';
            await delay(500);
        }
    }
})

exploreObserver.observe(exploreSection);


function toggleAboutWorldCard (el) {
    aboutWorldCardArray.forEach(function (i) {
        if(i !== this) {
            i.classList.add("active-world-short");
            i.classList.remove("active-world-full");
            i.querySelector(".full-title").classList.add('hidden');
            i.querySelector(".short-title").classList.remove('hidden');
        }
    })

    el.classList.add("active-world-full");
    el.querySelector(".short-title").classList.toggle('hidden');
    el.querySelector(".full-title").classList.toggle('hidden');
}

async function typeTitle (title, elementId) {
    const el =  document.getElementById(elementId);
    for(let i = 0; i < title.length; i++) {
        el.innerHTML += title.charAt(i);
        await delay();
    }
}

function delay (time = 50) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function animateContent(element, animation, duration = 1, prefix = 'animate__') {
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        if(element.id === 'whats-new-img'){
            element.style.animation = 'animate__rollInRight 1s ease-in';
            element.classList.remove('anim');
        }else {
            element.classList.add(`${prefix}animated`, animationName);
        }
        element.setAttribute('opacity', '1');

        function handleAnimationEnd(event) {
            event.stopPropagation();
            resolve('Animation ended');
        }

        element.addEventListener('animationed', handleAnimationEnd, {once: true});
    });
}
