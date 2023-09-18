'use strict'

addElement();

function addElement(){
    let div = document.createElement('div');
    div.style.width = 100 + 'px';
    div.style.height = 100 + 'px';
    div.style.backgroundColor = 'red';
    div.style.margin = '20px';


    document.body.append(div);
}