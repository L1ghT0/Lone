'use strict'

// Необходимо реализовать простое поле ввода адреса с функцией геокодинга:
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов
// (Яндекс.Карты, ДаДата, GraphHopper), подбирается адрес.
// Найденные данные должны отображаться в выпадающем списке, из которого можно выбрать подходящее значение.








// В данной задаче используется сервис (ДаДата)
// Для запроса необходим token. для получения токена нужно зарегестрироваться или войти в свой аккаунт:
// https://dadata.ru/api/suggest/address/#registration_popup
// в профиле скопируйте ваш API-ключ
// запишите свой API-ключ в строку ниже
let token = "";


async function getSuggestions(address){
    if(!address) return

    let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address";
    let options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + token
        },
        body: JSON.stringify({query: address})
    }
    let response = await fetch(url, options)
    let data = await response.json()
    return data.suggestions;
}


let timerId;
document.getElementById('address').addEventListener('input', (e)=>{
    clearInterval(timerId);

    timerId = setInterval(()=>{
        clearInterval(timerId);

        getSuggestions(e.target.value).then(addresses=>{
            if(e.target.value === '') {
                hideSuggestions();
            } else {
                showSuggestions(addresses);
            }
        });
    },300)

})


function showSuggestions(suggestions){
    let list = document.getElementById('list');
    list.style.display = 'flex'
    list.innerHTML = '';

    let data = suggestions.map(address => {
        let span = document.createElement('span');
        span.innerText = address.value;
        return span;
    })
    list.append(...data);
}

function hideSuggestions(){
    let list = document.getElementById('list');
    list.style.display = 'none';
}

// click событие на вспывающие адреса
document.getElementById('list').addEventListener('click', (e)=>{
    if(e.target.tagName !== 'SPAN') return;

    // запишем в наш input.value выбранный адрес и направим на него фокус
    let input = document.getElementById('address');
    input.value = e.target.innerText;
    input.focus();
})