let body = document.body;
let numbers = [...Array(46).keys()]

let num;

numbers.shift(0)

let pickedNum = Math.floor(Math.random()*45) +1;

do {
    num = pickedNum;
    for (let j = 0; j <= i; j++) {
        if (num === result[j]) break;
    }
    if (j < i) continue;
    result[i] = num;
    i++;
} while (i < 6)
for (let i = 0; i < 6; i++) {
    console.log(result[i] + ',');
}
