'use strict'

// Вычислить размер коллстэка в основных браузерах: Chrome, Firefox, Opera и Safari (если есть возможность).


let i = 0;

const func = () => {
    i++;
    func();
};

try {
    func();
} catch (e) {
    console.log(i);
}
