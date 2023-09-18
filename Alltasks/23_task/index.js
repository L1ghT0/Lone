'use strict'
let input = document.getElementById('password');
let passwordDifficulty = document.createElement('div');
input.after(passwordDifficulty);

input.addEventListener('input', (e)=>{
    let password = e.target.value;
    passwordDifficultyHandler(password);
});

function passwordDifficultyHandler(password){
    function passwordLengthHandler(password){
        let {short, medium, mediumLong, long} = {short: 0, medium: 2, mediumLong: 3, long: 4};

        if(password.length < 6)  return short; // length 1-5
        if(password.length >= 6 && password.length < 10) return medium; // length 6-9
        if(password.length >= 10 && password.length < 15) return mediumLong; // length 10-14
        if(password.length >= 15 ) return long; // length > 15

        return 0;
    }

    function passwordSymbolsHandler(password){
        let difficulty = -1;

        if(password.match(/[a-zа-я]/)) difficulty++;
        if(password.match(/[A-ZА-Я]/)) difficulty++;
        if(password.match(/\d/g)) difficulty++;
        if(password.match(/[^0-9A-ZА-Яa-zа-я]/g)) difficulty++;

        return difficulty;
    }

    function getDifficulty(lengthDifficulty, symbolDifficulty){
        if(lengthDifficulty < 0 || typeof lengthDifficulty !== 'number') return '';

        let difficulty = lengthDifficulty + symbolDifficulty;

        if(difficulty < 4) {
            let message =  lengthDifficulty  < 2 // in case password's difficulty is easy, we add message to help improving it
                ? ' (Password is too easy. Try to make it longer)'
                : ' (Password is too easy. Try to add some symbols)'
            return 'Easy' + message;
        }
        if(difficulty >= 4 && difficulty < 6) return 'medium';
        if(difficulty >= 6) return 'hard';

        return '';
    }

    let lengthDifficulty = 0;
    let symbolDifficulty = 0;

    lengthDifficulty += passwordLengthHandler(password);
    symbolDifficulty += passwordSymbolsHandler(password);
    return passwordDifficulty.innerText = getDifficulty(lengthDifficulty, symbolDifficulty);
}
