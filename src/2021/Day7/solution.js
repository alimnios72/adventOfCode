const fs = require('fs');

function part1(err, data) {
    let positions = data.split(',').map(Number);
    let minFuel = Infinity;

    for (let i = 0; i < positions.length; i++) {
        let fuel = 0;
        for (let j = 0; j < positions.length; j++) {
            fuel += Math.abs(positions[i] - positions[j]);
        }
        minFuel = Math.min(minFuel, fuel);
    }

    console.log(minFuel);
}

function part2(err, data) {
    let positions = data.split(',').map(Number);
    let minFuel = Infinity;
    let min = Math.min.apply(Math, positions);
    let max = Math.max.apply(Math, positions);

    for (let j = min; j < max; j++) {
        let fuel = 0, n;
        for (let i = 0; i < positions.length; i++) {
            n = Math.abs(positions[i] - j);
            fuel += n * (n + 1) / 2;
        }
        minFuel = Math.min(minFuel, fuel);
    }

    console.log(minFuel);
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();