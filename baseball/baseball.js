let body = document.body;

let materialNum;

let numArr;
function generateNum () {
    materialNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    numArr = [];
    for (let i = 0; i < 4; i += 1) {
        let num = materialNum.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        numArr.push(num);
    }
}

generateNum();
console.log(numArr);

let explain = document.createElement('p');
document.body.append(explain);
explain.textContent = '네자리 숫자를 입력하세요.'
let result = document.createElement('h1');
body.append(result);
let form = document.createElement('form');
document.body.append(form);
let input = document.createElement('input');
form.append(input);
input.type = 'text';
input.maxLength = 4;
let button = document.createElement('button');
button.textContent = '입력';
form.append(button);

let wrong = 0;

const asyncFunc = event => {
    event.preventDefault();
    let answer = input.value;
    console.log(answer, numArr, answer === numArr.join(''));
    if (answer === numArr.join('')) {
        result.textContent = '홈런';
        input.value = '';
        input.focus();
        generateNum();
        wrong = 0;
    } else {
        let strike = 0;
        let ball = 0;
        for (let i = 0; i < numArr.length; i++) {
            if (Number(answer[i]) === numArr[i]) {
                strike++;
            } else {
                if (numArr.indexOf(Number(answer[i])) > -1) {
                    ball++;
                }
            }
        }
        wrong++;
        if (wrong > 3) {
            result.textContent = `u fucked up. Game reset. The Answer was ${numArr.join('')}. Guess new Number.`;
            generateNum();
            wrong = 0;
        } else {
            result.textContent = `${strike}strike, ${ball}ball, You got ${4 - wrong} chance`;
        }
    }
}
form.addEventListener('submit', asyncFunc)
