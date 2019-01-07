let body = document.body;

let materialNum = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let numArr = [];

for (let i = 0; i < 4; i += 1) {
    let num = materialNum.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    numArr.push(num);
}

console.log(numArr);

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

const asyncFunc = event => {
    event.preventDefault();
    let answer = input.value;
    console.log(answer, numArr, answer === numArr.join(''));
}
form.addEventListener('submit', asyncFunc)
