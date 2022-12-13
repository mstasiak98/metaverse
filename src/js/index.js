const aboutWorldCardArrays = document.querySelectorAll('.about-card');

aboutWorldCardArrays.forEach(function (i) {
    i.addEventListener('click', function (e){
        toggleAboutWorldCard(i);
    })
    i.removeEventListener("click", toggleAboutWorldCard);
})

function toggleAboutWorldCard (el) {
    aboutWorldCardArrays.forEach(function (i) {
        i.classList.add("active-world-short");
        i.classList.remove("active-world-full");
        i.querySelector(".full-title").classList.add('hidden');
        i.querySelector(".short-title").classList.remove('hidden');
    })
    el.classList.add("active-world-full");
    el.querySelector(".short-title").classList.add('hidden');
    el.querySelector(".full-title").classList.toggle('hidden');
}

const mySection = document.querySelector(".about-section");


window.onscroll = function () {
    const scrollPercent = window.pageYOffset - (mySection.offsetTop + 50);
    console.log('scroll percent = ', scrollPercent);
    if(scrollPercent > 0) {
        console.log('pokaz teraz');
        mySection.classList.add('animate__animated', 'bounce');
    }
}

console.log('test', window.pageYOffset);