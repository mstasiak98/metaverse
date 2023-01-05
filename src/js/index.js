const aboutWorldCardArray = document.querySelectorAll('.about-card');

aboutWorldCardArray.forEach(function (i) {
    i.addEventListener('click', function (e){
        toggleAboutWorldCard(i);
    })
    i.removeEventListener("click", toggleAboutWorldCard);
})

const typingTexts = document.querySelectorAll('.typing-text');

typingTextObservers = new IntersectionObserver((entries) => {
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

animationObservers = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.intersectionRatio > 0 && !entry.target.classList.contains('animate__animated') && !entry.target.classList.contains('about-card')) {
            const animation = entry.target.dataset.animation;
            this.animate(entry.target, animation, delay);
        }
    })
})

elementsToAnimate.forEach(animationElement => {
    animationObservers.observe(animationElement);
})

const exploreSection = document.querySelector('.explore');

exploreObserver = new IntersectionObserver(  async (entry) => {
    if(entry[0].intersectionRatio > 0){
        const worlds = document.querySelectorAll('.about-card');
        for(let i = 0; i< worlds.length; i++) {
            this.animate(worlds[i], 'fadeIn');
            worlds[i].style[0] = 'opacity: 1';
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

function animate(element, animation, duration = 1, prefix = 'animate__') {
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        if(element.id === 'whats-new-img'){
            element.style.animation = 'animate__rollInRight 1s ease-in';
            element.classList.remove('anim');
        }else {
            element.classList.add(`${prefix}animated`, animationName);
        }
        element.style[0] = 'opacity: 1 !important';
        function handleAnimationEnd(event) {
            event.stopPropagation();
            resolve('Animation ended');
        }

        element.addEventListener('animationed', handleAnimationEnd, {once: true});
    });
}
