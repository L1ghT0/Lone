'use strict'





let form = document.querySelector('form');
form.addEventListener('submit', (e)=>{
    e.preventDefault();

    let data = getData(form);
    showData(data);
    clearForm(form);
})


function getData(form){
    const firstInput = form.querySelector('[name="firstInput"]')
    const secondInput = form.querySelector('[name="secondInput"]')
    return {
        firstInputValue: firstInput.value,
        secondInputValue: secondInput.value
    }
}


function showData(data){
    let frame = document.getElementById('frame');
    let frameData = document.querySelector('.data');
    frameData.innerHTML = '';

    for (let value in data){
        let span = document.createElement('span');
        span.innerText = value + ': ' + data[`${value}`]
        frameData.append(span);
    }

    frame.style.display = 'flex';
}


function clearForm(form){
    form.querySelectorAll(`[name]`).forEach(input => input.value = '');
}

// cancel frame
document.getElementById('cancel').addEventListener('click', (e)=>{
    document.getElementById('frame').style.display = 'none';
})