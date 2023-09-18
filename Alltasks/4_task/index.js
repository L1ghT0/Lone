'use strict'

//Разработать функцию, изменяющую окончание слов в зависимости от падежа. Например:
// 112 сообщения
// 12 сообщений
// 1 сообщение
// 1024 пользователя
// 1026 пользователей
// 121 пользователь`
//
//
// 	Функцию надо упаковать в модуль.


const makeWordEnding = (function (){

    // У большинства существительных(а может и у всех) есть 3 разных окончания в зависимости от числа.
    function getEndings(endign){ // эту функцию можно расширить, чтобы она смогла проверять на другия окончания.
        // Возвращаемое значение: массив из 3 окончаний, заполняется по следующему порядку:
        // 1. arr[0] - окончание сущ. при количестве 0
        // 2. arr[1] - окончание сущ. при количестве окончающ. на 1 (например: 1, 101, 92321), кроме '11'
        // 3. arr[2] - окончание сущ. при количестве в диапазоне 2-4 включительно 2 и 4.
        switch (endign){    // проверяем окончание существительного в именительном падеже в ед. числе
            case "ие":
                return ['ий', 'ие', 'ия']; // каждый кейс возвращает массив из 3х возможных окончаний.
            case 'ль':
                return ['лей', 'ль', 'ля'];
            case 'ия':
                return ['ий', 'ия', 'ии'];
            case 'на':
                return ['н', 'на', 'ны'];
            case 'ко':
                return ['к', 'ко', 'ков'];
            default:
                return endign;
        }
        // данная функция никогда не сможет покрыть все 100% окончаний всех сущ. в русском языке из-за особенностей языка.
    }
    function setEnding(amount, string, endings){
        // проверка на числа: от 10 до 20, 0, числа оканчивающиеся на 0 и оканчивающиеся на 5-9.
        if(amount >= 10 && amount < 20 || amount % 10 > 4 || amount === 0 || amount % 10 === 0){
            return `${amount} ` + string.substring(0, string.length - 2) + endings[0];
        }
        if(amount % 10 === 1 && amount !== 11){ // проверка окончания числа на 1 кроме числа 11
            return `${amount} ` + string.substring(0, string.length - 2) + endings[1];
        }
        if(amount % 10 > 1 && 5 > amount % 10){ // проверка окончания числа в диапазоне > 1 и 5 <
            return `${amount} ` + string.substring(0, string.length - 2) + endings[2];
        }
    }

    return function (amount, string) {
        if(!string || typeof string !== 'string') { // функиця не работает с пустой строкой или если это вообще не строка
            return false;
        }

        let endings = getEndings(string.substring(string.length - 2)); // передаем последние 2 символа строки как окончание
        return setEnding(amount, string, endings);
    }
}());


console.log(makeWordEnding(120, 'сообщение'));
console.log(makeWordEnding(10, 'пользователь'));
console.log(makeWordEnding(15, 'организация'));
console.log(makeWordEnding(5, 'рубль'));
console.log(makeWordEnding(13, 'яблоко'));
console.log(makeWordEnding(11, 'машина'));