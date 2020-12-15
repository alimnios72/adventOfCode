const fs = require('fs');

const SEARCH = 2020;

function numbersGame(err, data) {
    let numbers = data.split(",").map(Number);
    let count = new Map();
    let indices = new Map();

    // Game initialization
    for (let i = 0; i < numbers.length; i++) {
        let times = 0;
        if (count.has(numbers[i])) {
            times = count.get(numbers[i]);
        }
        times++;
        count.set(numbers[i], times);
        indices.set(numbers[i], [i + 1]);
    }

    for (let i = numbers.length; i < SEARCH; i++) {
        let prev = numbers[numbers.length - 1];
        let next = getNextNumber(i, prev, count, indices);
        numbers.push(next);
    }
    console.log(numbers[numbers.length - 1]);
}

function getNextNumber(i, prev, count, indices) {
    let next;
    if (count.has(prev) && count.get(prev) === 1) {
        next = 0;
    } else {
        let arr = indices.get(prev);
        next = i - arr.shift();
    }

    let times = 0;
    if (count.has(next)) {
        times = count.get(next);
    }
    times++;
    count.set(next, times);

    let arr = [];
    if (indices.has(next)) {
        arr = indices.get(next);
    }
    arr.push(i + 1);
    indices.set(next, arr)

    return next;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', numbersGame);
}

main();