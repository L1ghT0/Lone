'use strict'


// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.


// 1. Лучшее решение
function convertStringToJson(string){
    if(string && typeof string === 'string') return JSON.parse(string);
    return ;
}


// 2. Бесполезное решение
function myConvertStringToJson(string){
   if(!(string[0] === '{' && string[string.length - 1] === '}')) return;
    let result = string.split('');

    let arrStart = false;
    for(let i = 0; i < result.length; i++){
        if(result[i] === '['){
            arrStart = true;
        }
        if(result[i] === ']'){
            arrStart = false;
        }
        if(arrStart && result[i] == ','){
            result[i] = ';'
        }
    }

    let test = result.join('').slice(1, string.length-1).split(',').map(value => {
        value = value.replaceAll(';',',')
        if(value.match(/\[/)){
            myConvertStringToJson(value.split(':')[1]);
            return [value.split(':')[0].replaceAll('"', ''), value.split(':')[1].replaceAll('[', '').replaceAll(']', '').split(',')]
        }
        if(value.match('{')){
            return [value.split(':')[0].replaceAll('"', ''), myConvertStringToJson(value.substring(value.match('{').index, value.length))]
        }
        return value.split(':').map(value => value.replaceAll('"', '')).map(value => +value ? +value : value)
    })
    return Object.fromEntries(test);
}




let string = JSON.stringify({
    name: "john",
    age: 18,
    array: [1, 2,],
    object: {
        someValue: 10,
    }
})
console.log(string);

let myJson = myConvertStringToJson(string);
let json = convertStringToJson(string)

console.log(myJson);
// console.log(JSON.stringify(json));
