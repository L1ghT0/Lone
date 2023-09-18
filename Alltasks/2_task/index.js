
// Задача о странных числах: Напишите функцию,
// которая принимает число и возвращает true, если это число является странным,
// и false в противном случае. Странным числом считается число,
// которое равно сумме всех своих делителей, кроме самого себя.


function isWierdNumber(number){
    if(typeof number !== 'number'){
        return false;
    }
    let sum = 0;
    for(let i = 1; i < number; i++){
        sum += number % i === 0 ? i : 0;
    }
    return sum === number;
}


console.log(isWierdNumber(6));