'use strict'

//Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }.
// Напишите код, который сортирует этот массив по возрастанию возраста,
// а при равных возрастах сортирует по алфавиту по полю name.


//initial data
let Users = [
    {
        name: 'John',
        age: 30,
    },
    {
        name: 'Viktor',
        age: 29,
    },
    {
        name: 'Andrew',
        age: 28,
    },
    {
        name: 'Sasha',
        age: 30,
    },
    {
        name: 'Ana',
        age: 28,
    },
    {
        name: 'Noname',
        age: 19,
    }];



function sort(arr){
    return arr.sort((a , b) => {
        if(a.age === b.age){
            return a.name >  b.name ? 1 : -1;
        }
        return a.age -  b.age;
    });
}

console.log(sort(Users));