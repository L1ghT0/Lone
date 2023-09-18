'use strict'
// Реализовать аналог библиотеки Math (можно назвать MathX) с базовым набором функций, используя замыкания:
// - вычисление N-го числа в ряду Фибоначчи
// - вычисление всех чисел в ряду Фибоначчи до числа N
// - вычисление N-го просто числа
// - вычисление всех простых чисел до числа N
//
//
// 	Будет плюсом, если задумаетесь и об оптимизации.



// решение 1.

// const MathX = {
//     _getFib(n, getAll){
//         let result = [];
//         let prevNumber = 0;
//         let currentNumber = 0;
//         let nextNumber = 1;
//         for(let i = 0; i < n; i++){
//             prevNumber = currentNumber;
//             currentNumber = nextNumber;
//             result.push(currentNumber);
//             nextNumber = prevNumber + currentNumber;
//         }
//         if(getAll){
//             return result;
//         } else {
//             return result[result.length - 1];
//         }
//     },
//     _getPrime(n, getAll){
//         let index = 0;
//         let Primes = [];
//
//         nextPrime:
//             for (let i = 1; ; i++) {
//                 for (let j = 2; j < i; j++){
//                     if(i % j === 0) continue nextPrime;
//                 }
//                 Primes.push(i);
//                 index++;
//                 if(index === n){
//                     if(getAll){
//                         return Primes;
//                     } else {
//                         return Primes[Primes.length - 1];
//                     }
//                 }
//             }
//     },
//
//     getFib(n){
//         return this._getFib(n, false);
//     },
//     getAllFib(n){
//         return this._getFib(n, true);
//     },
//     getPrime(n){
//         return this._getPrime(n, false);
//     },
//     getAllPrime(n){
//         return this._getPrime(n, true);
//     }
// }

// console.log('fib ->')
// console.log(MathX.getFib(7));
// console.log(MathX.getAllFib(5));
// console.log('prime ->')
// console.log(MathX.getPrime(10));
// console.log(MathX.getAllPrime(10));



// решение 2.

const MathX = (function (){
    let _getFib = function (n, getAll){
        let result = [];
        let prevNumber = 0;
        let currentNumber = 0;
        let nextNumber = 1;
        for(let i = 0; i < n; i++){
            prevNumber = currentNumber;
            currentNumber = nextNumber;
            result.push(currentNumber);
            nextNumber = prevNumber + currentNumber;
        }
        if(getAll){
            return result;
        } else {
            return result[result.length - 1];
        }
    }
    let _getPrime = function (n, getAll){
        let index = 0;
        let Primes = [];
        nextPrime:
            for (let i = 1; ; i++) {
                for (let j = 2; j < i; j++){
                    if(i % j === 0) continue nextPrime;
                }
                Primes.push(i);
                index++;
                if(index === n){
                    if(getAll){
                        return Primes;
                    } else {
                        return Primes[Primes.length - 1];
                    }
                }
            }
    }

    return new function (){
        this.getFib =       function (n) { return _getFib(n, false);}
        this.getAllFib =    function (n) { return _getFib(n, true);}
        this.getPrime =     function (n) { return _getPrime(n, false);}
        this.getAllPrime =  function (n) { return _getPrime(n, true);}
    }
}());


console.log('fib ->')
console.log(MathX.getFib(7));
console.log(MathX.getAllFib(5));
console.log('prime ->')
console.log(MathX.getPrime(10));
console.log(MathX.getAllPrime(10));