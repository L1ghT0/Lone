'use strict'

// Задача 9. Реализовать функцию конвертации JSON в строку

// 1. Лучшее решение
function convertJsonToString(json) {
    if (json) return JSON.stringify(json);
    return;
}

// 2. Бесполезное решение
function myConvertJsonToString(json) {
    if (!json) return;

    return `{${Object.entries(json).map(([key, value]) => {
        let valueForJSON = typeof value === 'object'
            ? Array.isArray(value) ? `[${[...value]}]` // если это массив - копируем и добавляем скобки
            : myConvertJsonToString(value) // если это объект - вызываем эту же функцию и передаем этот объект
            : typeof value === "number" ? value : `"${value}"` // если это число - скобок не нужно

        return `"${key}":${valueForJSON}`
    }).join(',')}}`
}




let string = myConvertJsonToString(
    {
        name: "john",
        age: 18,
        test: [1, 2],
        test2: {
            anotherTest: 10
        }
    }
)

console.log(string);
