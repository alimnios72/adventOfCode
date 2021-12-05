const fs = require('fs');

function calculatePosition1(error, data) {
    let moves = data.split("\n").map((line) => line.split(' '));
    let horizontal = 0, depth = 0;

    moves.forEach((move) => {
        let [direction, units] = move;
        units = parseInt(units, 10);

        switch (direction) {
            case 'forward':
                horizontal += units;
                break;
            case 'down':
                depth += units;
                break;
            case 'up':
                depth -= units;
                break;
        }
    });
    console.log(horizontal * depth);
}

function calculatePosition2(error, data) {
    let moves = data.split("\n").map((line) => line.split(' '));
    let horizontal = 0, depth = 0, aim = 0;

    moves.forEach((move) => {
        let [direction, units] = move;
        units = parseInt(units, 10);

        switch (direction) {
            case 'forward':
                horizontal += units;
                depth += units * aim;
                break;
            case 'down':
                aim += units;
                break;
            case 'up':
                aim -= units;
                break;
        }
    });
    console.log(horizontal * depth);
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculatePosition1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculatePosition2);
}

main();