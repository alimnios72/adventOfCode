const fs = require('fs');

function parseRawCrates(rawCrates, totalCrates) {
    const crates = new Array(totalCrates);

    rawCrates.forEach((line) => {
        let prev = 0;
        for (let i = 0; i < totalCrates; i ++) {
            let raw = line.substring(prev, prev + 3);
            prev += 4;

            if (raw !== '   ') {
                if (!crates[i]) crates[i] = [];
                crates[i].unshift(raw.substring(1, 2));
            }
        }
    });
    
    return crates;
}

function part1(err, data) {
    const sheet = data.split('\n\n');
    const rawCrates = sheet[0].split('\n');
    const totalCrates = rawCrates.pop().split('  ').map(Number).pop();
    const crates = parseRawCrates(rawCrates, totalCrates);
    const movements = sheet[1].split('\n')
        .map((line) => {
            const [, num, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/)
            return { num: parseInt(num), from: parseInt(from), to: parseInt(to) };
        });
    movements.forEach((move) => {
        let i = 0;
        while (i < move.num){
            crates[move.to - 1].push(crates[move.from - 1].pop());
            i++;
        }
    });
    const message = crates.reduce((prev, e) => prev + e.pop(), '');

    console.log(message);
}

function part2(err, data) {
    const sheet = data.split('\n\n');
    const rawCrates = sheet[0].split('\n');
    const totalCrates = rawCrates.pop().split('  ').map(Number).pop();
    const crates = parseRawCrates(rawCrates, totalCrates);
    const movements = sheet[1].split('\n')
        .map((line) => {
            const [, num, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/)
            return { num: parseInt(num), from: parseInt(from), to: parseInt(to) };
        });
    movements.forEach((move) => {
        let i = 0;
        let tmp = [];

        while (i < move.num){
            tmp.push(crates[move.from - 1].pop());
            i++;
        }

        while(tmp.length !== 0) {
            crates[move.to - 1].push(tmp.pop());
        }
    });
    const message = crates.reduce((prev, e) => prev + e.pop(), '');

    console.log(message);
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();