const fs = require('fs');
const OPENING = ['{', '[', '(', '<'];
// const CLOSING = ['}', ']', ')', '>'];
const MATCH_RIGHT = new Map([
    ['{', '}'],
    ['[', ']'],
    ['(', ')'],
    ['<', '>']
]);
const RANK = new Map([
    ['}', 1197],
    [']', 57],
    [')', 3],
    ['>', 25137]
]);
const AUTO_POINTS = new Map([
    ['}', 3],
    [']', 2],
    [')', 1],
    ['>', 4]
]);

function part1(err, data) {
    let lines = data.split('\n').map((l) => l.trim());
    let stack = [];
    let points = 0;

    for (let line of lines) {
        for (let i = 0; i < line.length; i++) {
            let char = line[i];

            if (OPENING.indexOf(char) > -1) {
                stack.push(char);
            } else {
                let last = stack.pop();
                if (MATCH_RIGHT.get(last) !== char) {
                    points += RANK.get(char);
                    break;
                }
            }
        }
    }
    console.log(points);
}

function part2(err, data) {
    let lines = data.split('\n').map((l) => l.trim());
    let points = [];

    for (let line of lines) {
        let stack = [];
        let missingChars = [];
        let corruptedLine = false;

        for (let i = 0; i < line.length; i++) {
            let char = line[i];

            if (OPENING.indexOf(char) > -1) {
                stack.push(char);
            } else {
                let last = stack.pop();
                // ILLEGAL CHAR
                if (MATCH_RIGHT.get(last) !== char) {
                    corruptedLine = true;
                    break;
                }
            }
        }

        if (!corruptedLine) {
            while (stack.length !== 0) {
                let last = stack.pop();
                missingChars.push(MATCH_RIGHT.get(last));
            }

            let p = missingChars.reduce((acc, char) => acc * 5 + AUTO_POINTS.get(char), 0);
            points.push(p);
        }
    }

    points.sort((a, b) => a - b);
    console.log(points[Math.floor(points.length / 2)]);
}


function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();