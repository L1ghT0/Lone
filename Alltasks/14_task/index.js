'use strict'

//Задача на промисы: напишите функцию, которая принимает URL изображения и возвращает промис,
// который разрешается с данными об изображении, когда оно загружено.
// Когда говорится "промис разрешается с данными об изображении", это означает,
// что промис должен быть успешно выполнен (resolved) с данными об изображении после того, как изображение будет загружено.


function getData(url){
    return new Promise((resolve, reject)=>{
        fetch(url).then(response=>{
            if(response.ok){
                return response.json();
            } else {
                reject(response.status);
            }
        }).then(data => {
            return resolve(data);
        })
    })
}


console.log(getData(url));
