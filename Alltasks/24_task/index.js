'use strict'

let url = 'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true'

async function getUsers(){
    let response =  await fetch(url);
    return await response.json();
}

getUsers().then(users => {
    let totalUsers = users.length;
    let items_on_page = 50;
    let getUsers = createPortions(0, items_on_page);
    appendNewUsers(getUsers(users));
    createPaginator(items_on_page, totalUsers, users)
});

function appendNewUsers(users){
    document.getElementById('table').innerHTML = '';
    createTableHeader(users);
    createTableElements(users);
}

function createTableHeader(users){
    let tr = document.createElement('tr');
    let user = users[0];
    let keys = Object.keys(user);
    for (let key of keys){
        let th = document.createElement('th');
        th.innerText = key;
        tr.append(th);
    }
    document.getElementById('table').append(tr)
}

function createTableElements(users){
    let tRows = users.map(user => {
        let tr = document.createElement('tr');
        let userData = Object.entries(user);
        for( let [key, value] of userData){
            let td = document.createElement('td');
            td.innerText = `${key}: ${value}`;
            tr.append(td);
        }
        return tr;
    })
    document.getElementById('table').append(...tRows)
}


function createPortions(start, amount){
    let currentPosition = start * amount;
    let lastPosition = currentPosition + amount;

    return (data) => {
        let result = [];
        for (let i = currentPosition; i < lastPosition; i++){
            result.push(data[i]);
        }
        return result;
    }
}


function sortTable(index){
    let table = document.getElementById('table')
    let sortedRows = Array.from(table.rows)
        .slice(1)
        .sort((rowA, rowB) => rowA.cells[index].innerHTML > rowB.cells[index].innerHTML ? 1 : -1);
    console.log(sortedRows);
    table.append(...sortedRows);
}

document.getElementById('table').addEventListener('click', (e)=>{
    if(e.target.tagName !== 'TH'){
        return
    }
    let table = document.getElementById('table')
    let cells = table.rows[0].cells;

    let i = 0;
    for(let cell of cells){
        if(e.target.innerText === cell.innerText){
            sortTable(i);
        }
        i++;
    }
})



function createPaginator(count, maxLength, users){
    let pages = Math.ceil(maxLength / count);
    let paginator = document.createElement('div');
    paginator.classList.add('paginator');

    for(let i = 1; i < pages + 1; i++){
        let span = document.createElement('span');
        span.innerText = i;
        paginator.append(span);
    }
    document.getElementById('list').prepend(paginator);

    paginator.addEventListener('click', (e)=>{
        if(e.target.tagName !== 'SPAN'){
            return
        }
        let getUsers = createPortions(Number(e.target.innerText - 1), count);
        appendNewUsers(getUsers(users));
    })
}




