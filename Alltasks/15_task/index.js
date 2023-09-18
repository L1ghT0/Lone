'use strict'

// Задача на асинхронность: напишите асинхронную функцию, которая использует
// ключевое слово await для ожидания выполнения других асинхронных операций,
// и возвращает результат выполнения.

// initial data
let promises = [
    new Promise(resolve => setTimeout(() => resolve(1), 3000)), // 1
    new Promise(resolve => setTimeout(() => resolve(2), 2000)), // 2
    new Promise(resolve => setTimeout(() => resolve(3), 1000))  // 3
]

async function handleAllPromises(promises){
    return await Promise.all(promises)
}

handleAllPromises(promises).then(console.log)

