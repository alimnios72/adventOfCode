const fs = require('fs');

const CYCLES = [20, 60, 100, 140, 180, 220];

function part1(err, data) {
    const instructions = data.split('\n');
    let x = 1, cycle = 1;
    let signalsSum = 0;
    let currentInstruction = null;
    let delay = 0;

    while (instructions.length !== 0) {
        if (!currentInstruction) {
            currentInstruction = instructions.shift();
            delay = currentInstruction === "noop" ? 1 : 2;
        }

        delay--;
        if (delay === 0) {
            if (currentInstruction.includes("addx")) {
                x += parseInt(currentInstruction.substring(5), 10);
            }
            currentInstruction = null;
        }
        if (CYCLES.includes(cycle)) {
            signalsSum += cycle * x;
        }
        cycle++;
    }

    console.log(signalsSum);
}

function part2(err, data) {
    const instructions = data.split('\n');
    const crt = Array.from(Array(6), () => new Array(40).fill('.'));
    let cycle = 1;
    let x = 1;
    let currentInstruction = null;
    let delay = 0;

    for (let i = 0; i < crt.length; i++) {
        for (let j = 0; j < crt[0].length; j++) {
            if (!currentInstruction) {
                currentInstruction = instructions.shift();
                delay = currentInstruction === "noop" ? 1 : 2;
            }

            if (j === x - 1 || j === x || j === x + 1) {
                crt[i][j] = "#";
            }

            delay--;
            if (delay === 0) {
                if (currentInstruction.includes("addx")) {
                    x += parseInt(currentInstruction.substring(5), 10);
                }
                currentInstruction = null;
            }

            cycle++;
        }
    }

    crt.forEach(line => console.log(line.join(' ')));
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();