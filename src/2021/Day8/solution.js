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
    let entries = data.split('\n')
        .map((line) => {
            let [ patterns, output ] = line.split('|').map((patterns) => patterns.trim().split(' '));
            return { patterns, output };
        });

    let sum = entries.reduce((acc, entry) => {
        let digits = getDigits(entry.patterns);
        let outputNum = getOutputNumber(digits, entry.output);

        return acc + outputNum;
    }, 0);

    console.log(sum);
}

function getDigits(patterns) {
    let digits = {};
    let map = {};

    // Find implicit substitutions
    patterns.forEach((key) => {
        digits[key] = UNIQUE_LENGTH[key.length];
        map[UNIQUE_LENGTH[key.length]] = key;
    });

    // Number 4 is contained in number 9
    patterns.forEach((key) => {
        if (digits[key] == null && key.length === 6 && contains(map[4], key)) {
            digits[key] = 9;
            map[9] = key;
        }
    });

    // Number 7 is contained in number 3
     patterns.forEach((key) => {
        if (digits[key] == null && key.length === 5 && contains(map[7], key)) {
            digits[key] = 3;
            map[3] = key;
        }
    });

    // Number 7 is contained in number 0
    patterns.forEach((key) => {
        if (digits[key] == null && key.length === 6 && contains(map[7], key)) {
            digits[key] = 0;
            map[0] = key;
        }
    });

    // Number 6 is the only remaining with 6 letters
    patterns.forEach((key) => {
        if (digits[key] == null && key.length === 6) {
            digits[key] = 6;
            map[6] = key;
        }
    });

    // Number 5 is contained in number 6
    patterns.forEach((key) => {
        if (digits[key] == null && key.length === 5 && contains(key, map[6])) {
            digits[key] = 5;
            map[5] = key;
        }
    });

     // Number 2 is the only remaining with 5 letters
     patterns.forEach((key) => {
        if (digits[key] == null && key.length === 5) {
            digits[key] = 2;
            map[2] = key;
        }
    });

    return digits;
}

function contains(key1, key2) {
    for (let i = 0; i < key1.length; i++) {
        if (key2.indexOf(key1[i]) === -1) return false;
    }

    return true;
}

function getOutputNumber(digits, output) {
    let num = output.reduce((acc, key) => {
        for (let d in digits) {
            if (d.length === key.length && contains(d, key)) {
                return acc + digits[d]
            }
        }
        return '';
    },'');

    return parseInt(num, 10);
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();