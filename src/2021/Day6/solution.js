const fs = require('fs');
const TIMER = 9;

function part1(err, data) {
    console.log(lanternFishSimulator(data, 80));
}

function part2(err, data) {
    console.log(lanternFishSimulator(data, 256));
}

function lanternFishSimulator(data, days) {
    let initialState = data.split(',').map(Number);
    let simulation = {
        curr: new Map(Array.from(Array(TIMER), (_val, index) => [index, 0])),
        next: new Map(Array.from(Array(TIMER), (_val, index) => [index, 0]))
    }

    for (let num of initialState) {
        simulation.curr.set(num, simulation.curr.get(num) + 1);
    }

    for (let day = 1; day <= days; day++) {
        for (let i = TIMER - 1; i >= 0; i--) {
            if (i === 0) {
                if (simulation.curr.get(i) > 0) {
                    simulation.next.set(6, simulation.next.get(6) + simulation.curr.get(i));
                    simulation.next.set(8, simulation.next.get(8) + simulation.curr.get(i));
                }
            } else {
                simulation.next.set(i - 1, simulation.next.get(i - 1) + simulation.curr.get(i));
            }
        }

        simulation.curr = new Map(simulation.next);
        simulation.next = new Map(Array.from(Array(TIMER), (_val, index) => [index, 0]));
    }

    return [ ...simulation.curr.values() ].reduce((acc, val) => acc + val, 0);
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();