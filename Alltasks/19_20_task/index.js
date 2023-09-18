'use strict';


//Реализовать виджет, отображающий список постов из любого паблика в VK (подойдет любой паблик, где постов очень много).
// Виджет должен иметь фиксированные размеры и возможность прокрутки.
// При прокрутке содержимого виджета до конца должны подгружаться новые посты.
// Необходимо реализовать возможность кэширования уже загруженных данных:
// если пользователь закрыл страницу, а потом снова открыл ее, виджет должен отображать все загруженные ранее данные
// (новые данные должны подгружаться из учетом уже загруженных ранее).
//
// При переполнении localStorage, данные, загруженные последними должны вытеснять данные загруженные первыми.




// ВАЖНО!
// данное приложение использует сервисный ключ доступа.
// он был взят из личного аккаунта vk.
// Пожалуйста, войдите в свой аккаунт и вставьте свой ключ в строку ниже:
let access_token = '';


let owner_id = '-57846937'; // MDK group
const COUNT = 5; // количество постов запрашиваемых с сервера.
let amountOfPostsTakenFromStorage = 0; // количество постов которое мы взяли из localstorage и показали на странице.

initApp();


// запрос на удаленный сервер за получением постов.
function getPosts(){
    let offset = localStorage.getItem('offset') - 0;
    let script = document.createElement('SCRIPT');
    script.src = `https://api.vk.com/method/wall.get?owner_id=${owner_id}&offset=${offset}&count=${COUNT}&filter=owner&access_token=${access_token}&v=5.131&callback=callbackFunc`;
    document.getElementsByTagName("head")[0].appendChild(script);
}
function callbackFunc(result) { // эту колбэк функцию вызывает скрипт после запроса за постами
    storagePosts(result.response.items) // кладем новые посты в localstorage
    showPosts(); // показываем посты
}


function initApp(){
    _initLocalStorage();

    if(!JSON.parse(localStorage.getItem('myPosts')).length){ // постов в localStorage нет, запрашиваем первую партию.
        getPosts();
    } else { // посты есть, показываем
        showPosts();
    }
}

function showPosts(){
    appendPosts(createHTMLPostElements(getPostsFromStorage())); // берем посты из localstorage, создаем html элементы постов и вставляем их в html
}

// В localStorage лежат 2 значения под ключами: 'myPosts' и 'offset'
// myPosts - массив который хранит в себе все ключи от постов под которыми они лежат в localStorage.
// offset - смещение, необходимое для выборки определённого подмножества записей (название взято из VK Api).
function _initLocalStorage(){
    let postsId = localStorage.getItem('myPosts');
    let offset = localStorage.getItem('offset');
    let size = localStorage.getItem('size');
    // если localstorage пустой, инициализируем
    if(!size){ // первым делом сохраним максимальный размер хранилища localStorage
        localStorage.setItem('size', String(getLocalStorageSize()));
    }
    if(!postsId){
        localStorage.setItem('myPosts', JSON.stringify([]));
    }
    if(!offset){
        localStorage.setItem('offset', 0);
    }
}

function storagePosts(posts){ // положить посты в localStorage
    let postsId = JSON.parse(localStorage.getItem('myPosts'));
    let offset = localStorage.getItem('offset')-0;
    try {
        for(let i = 0; i < COUNT; i++){
            localStorage.setItem(String(posts[i].id), JSON.stringify(posts[i]));
            postsId.push(posts[i].id);
        }

        localStorage.setItem('myPosts', JSON.stringify(postsId));
        offset -= -COUNT;
        localStorage.setItem('offset', offset);

    } catch(err){
        console.log(err);
        if(postsId.length){
            for(let i = 0; i < COUNT; i++){
                localStorage.removeItem(postsId[0]);
                postsId.shift();
            }
            localStorage.setItem('myPosts', JSON.stringify(postsId));
            amountOfPostsTakenFromStorage -= 5;
        }
    }
    showLocalStorageSize();
}
function appendPosts(posts){
    posts.forEach(post => {
        document.querySelector('.list').append(post)
    })
}

function getPostsFromStorage(){
    // функция возвращает массив постов в 'COUNT' количестве.

    let posts = [];
    let postsId = JSON.parse(localStorage.getItem('myPosts'));
    // начиная с позиции на которой мы остановились, взять 'COUNT' раз очередной пост из localstorage
    for(let i = amountOfPostsTakenFromStorage; i < amountOfPostsTakenFromStorage + COUNT; i++){
        let item = JSON.parse(localStorage.getItem(postsId[i]));
        posts.push(item);
    }

    amountOfPostsTakenFromStorage += COUNT; // увеличить количество постов взятое из localstorage на 'COUNT'
    return posts;
}


function createHTMLPostElements(posts){
    // Создаем и сразу возвращаем массив html элементов с данными взятыми из массива posts
    return posts.map(post => {
        let postElement = _createPostElement(post); // пост элемент
        postElement.append(getPhotoWrapper(post.attachments)); // добавляем обертку с фото в пост-элемент
        return postElement ;
    })
}

function getPhotoWrapper(photos){
    let firstPhoto = true;
    let photoWrapper = document.createElement('div'); // оберта над фото
    photoWrapper.classList.add('photoWrapper'); // добавим класс для обертки

    for (let photo of photos){ // массив фотографий
        if(photo.type === 'photo'){ // но в массиве встречаются не только фотографии
            let photoElement = _createPhotoElement(photo.photo);

            // Первое фото - основное, имееет нормальный размер. Если есть остальные, делаем их меньше
            if(!firstPhoto){
                photoElement.classList.add('smallPhoto'); // добавляем класс со стилями,
            }
            firstPhoto = false;
            photoWrapper.append(photoElement); // добавляем все фото в обертку
        }
    }
    return photoWrapper
}

function _createPhotoElement(photo){
    let div = document.createElement('div');
    div.classList.add('photo');
    if(photo){
        div.style.backgroundImage=`url(${photo.sizes[2].url})`
        div.style.backgroundRepeat = "no-repeat";

        div.style.width = photo.sizes[2].width + 'px';
        div.style.height = photo.sizes[2].height + 'px';
    }

    return div;
}

function _createPostElement(post){

    let div = document.createElement('div'); // создаем сам пост
    div.classList.add('post');
    let p = document.createElement('p'); // создадим тег для основного текта поста
    p.innerText = post.text;

    if(post.attachments[0].photo){ // иногда фото отсутвует
        p.style.maxWidth = post.attachments[0].photo.sizes[2].width + 'px'; // ширина тектса не может быть больше чем ширина фото.
    }
    p.classList.add('text'); // добавим основные стили для текста

    div.append(p); // добавляем основной тект поста
    return div;
}

function checkPosition() {
    // Высота документа и высота экрана:
    const height = document.body.offsetHeight
    const screenHeight = window.innerHeight

    // Они могут отличаться: если на странице много контента,
    // высота документа будет больше высоты экрана (отсюда и скролл).

    // Записываем, сколько пикселей пользователь уже проскроллил:
    const scrolled = window.scrollY

    // Обозначим порог, по приближении к которому
    // будем показывать новые посты.
    // В нашем случае — четверть экрана до конца страницы:
    const threshold = height - screenHeight / 4

    // Отслеживаем, где находится низ экрана относительно страницы:
    const position = scrolled + screenHeight

    if (position >= threshold) { // мы пересекли полосу-порог, показываем новые посты.
        // если в localstorage элементов больше чем мы взяли, тогда показываем новые из localstorage
        if(JSON.parse(localStorage.getItem('myPosts')).length > amountOfPostsTakenFromStorage){
            showPosts();
        } else { // а иначе делаем запрос за новыми.
            getPosts();
        }
    }
}

;(() => {
    window.addEventListener('scroll', throttle(checkPosition, 250))
    window.addEventListener('resize', throttle(checkPosition, 250))
})()


function throttle(callee, timeout) {
    let timer = null

    return function perform(...args) {
        if (timer) return

        timer = setTimeout(() => {
            callee(...args)

            clearTimeout(timer)
            timer = null
        }, timeout)
    }
}




// ниже описанны функция для задачи 20.

// Реализовать функцию подсчета объема памяти занимаемого данными в LocalStorage для предыдущей задачи.
// При изменении данных в localStorage в консоль должен выводиться объем занятой памяти / максимальный размер хранилища.


function getLocalStorageSize(){
    let size = 0;
    if (localStorage) {
        let i = 0;
        try {
            // Test up to 10 MB
            for (i = 250; i <= 10000; i += 250) {
                localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
            }
        } catch (e) {
            localStorage.removeItem('test');
            size = i - 250;
        }
    }
    return size ;
}
function getLocalStorageSizeUsed(){
    let _lsTotal = 0,
        _xLen, _x;
    for (_x in localStorage) {
        if (!localStorage.hasOwnProperty(_x)) {
            continue;
        }
        _xLen = ((localStorage[_x].length + _x.length) * 2);
        _lsTotal += _xLen;
    }
    return (_lsTotal / 1024).toFixed(2);
}


function showLocalStorageSize(){
    console.log(`LocalStorage size left: ${getLocalStorageSize()} КБ`);
    console.log(`LocalStorage size is being used: ${getLocalStorageSizeUsed()} КБ`);
}