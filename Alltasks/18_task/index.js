'use strict'
// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

function getLocalStorageSize(){
    localStorage.clear();
    if (localStorage && !localStorage.getItem('size')) {
        let i = 0;
        try {
            // Test up to 10 MB
            for (i = 250; i <= 10000; i += 250) {
                localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            }
        } catch (e) {
            localStorage.removeItem('test');
            localStorage.setItem('size', i - 250);
        }
    }
    let result  = localStorage.getItem('size');
    localStorage.clear();
    return result;
}

console.log(`${getLocalStorageSize()} Кб`);