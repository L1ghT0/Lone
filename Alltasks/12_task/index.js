'use strict'


// Задача на работу с объектами: создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.


let book = {
    _name: 'StoryBook',
    _author: 'John',
    _published: 1980,

    get name(){
        return this._name;
    },
    set name(name){
        this._name = name;
    },

    get author(){
        return this.author;
    },
    set author(author){
        this.author = author;
    },

    get published(){
        return this.author;
    },
    set published(date){
        this.published = date;
    }
}


console.log(book);
book.name = 'NewStoryBook';
console.log(book.name);
