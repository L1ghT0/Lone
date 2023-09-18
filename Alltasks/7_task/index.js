'use strict'

//Задача о коллекции функций: у вас есть массив функций, напишите код, который вызовет каждую функцию в этом массиве и выведет их порядковый номер. Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// Вызвать первую функцию из массива.
// После завершения работы первой функции вызвать вторую функцию.
// После завершения работы второй функции вызвать третью функцию.
// И так далее, пока все функции в массиве не будут вызваны по порядку.


// initial data
function f1() {
    console.log('im a function number 1');
}

function f2() {
    console.log('im a function number 2')
}

function f3() {
    console.log('im a function number 3')
}

function f4() {
    console.log('im a function number 4')
}

function f5() {
    console.log('im a function number 5')
}

function f6() {
    console.log('im a function number 6');
}

let allFunctions = [f1, f2, f3, f4, f5, f6];




async function startAll(arr) {
    for(let i = 0; i < arr.length; i++){
        console.log(`func index: ${i}`)
        await arr[i]();
    }
}

startAll(allFunctions);


