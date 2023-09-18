'use strict'

// Задача о замыканиях:
// напишите функцию, которая будет принимать массив функций и возвращать новую функцию,
// которая вызывает каждую функцию в этом массиве и возвращает массив результатов,
// полученных после вызова каждой функции.



// initial data

function f1() {
    console.log('im a function number 1');
    return 1;
}

function f2() {
    console.log('im a function number 2')
    return 2;

}

function f3() {
    console.log('im a function number 3')
    return 3;

}

function f4() {
    console.log('im a function number 4')
    return 4;

}

function f5() {
    console.log('im a function number 5')
    return 5;
}

function f6() {
    console.log('im a function number 6');
    return 6;
}

let allFunctions = [f1, f2, f3, f4, f5, f6];


function playAll(arr){
    return () => {
        return arr.map(func => func());
    }
}

let getAllResults = playAll(allFunctions);
console.log(getAllResults());
