'use strict'

let template = document.getElementById('template');

document.getElementById('add-template').addEventListener('click', (e)=>{
    let elem = document.createElement('div');

    // Клонируем содержимое шаблона для того, чтобы переиспользовать его несколько раз
    elem.append(template.content.cloneNode(true));

    document.body.append(elem);
})

