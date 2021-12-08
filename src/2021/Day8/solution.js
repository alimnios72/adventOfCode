const fs = require('fs');
const UNIQUE_LENGTH = {2: 1, 3: 7, 4: 4, 7: 8};

function part1(err, data) {
    let outputs = data.split('\n')
        .map((line) => line.split('|')[1].trim())
        .reduce((acc, line) => [...acc, ...line.split(' ')], []);

    let digits = outputs.filter((num) => UNIQUE_LENGTH.hasOwnProperty(num.length));
    console.log(digits.length);
}

function part2(err, data) {
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();