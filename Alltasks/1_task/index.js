// Задача о палиндроме: напишите функцию, которая проверяет,
// является ли заданная строка палиндромом. Палиндром — это строка,
// которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).



function IsPalindrome(string){
    return string.split(' ').join('') === string.split(' ').join('').split('').reverse().join('');
}

console.log(IsPalindrome('123321'));
console.log(IsPalindrome('аргентина манит негра'));
