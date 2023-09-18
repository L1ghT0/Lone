'use strict'

//Задача о замыканиях и области видимости: напишите функцию,
// которая возвращает другую функцию. Внутренняя функция должна иметь доступ к переменной,
// определенной во внешней функции, даже после того, как внешняя функция завершила свое выполнение.


function saveValue(){
    let value = 'someValue';
    return () => {
        return value;
    }
}


let saved = saveValue();
saveValue = null;

setTimeout(() => {
    console.log(saved());
},100)
