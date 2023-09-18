'use strict'

// Задача: Рекурсивный обход дерева DOM:: Напишите функцию,
// которая рекурсивно обходит дерево DOM, начиная с указанного элемента,
// и выполняет определенное действие с каждым узлом (например, выводить информацию о теге в консоль).


function showDomElements(element) {
    if (element == null) {
        return;
    }
    console.log(element);

    mostrarNodosV2(element.firstElementChild);
    mostrarNodosV2(element.nextElementSibling);
}

showDomElements(document.body);

