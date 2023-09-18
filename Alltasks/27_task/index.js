'use strict'


let block = document.getElementById('block-one');

block.addEventListener('click', (e)=>{
    startAnimation(e.target);
})


function startAnimation(element){
    animate({
        duration: 3000,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            element.style.left = progress * 600 + 'px';
            element.style.width = progress * 80 + 'px';
            element.style.height = progress * 50 + 'px';
        }
    });
}









function animate({timing, draw, duration}) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего состояния анимации
        let progress = timing(timeFraction);

        draw(progress); // отрисовать её

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}
