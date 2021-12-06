const fs = require('fs');
const DAYS = 18; //80

function lanternFishSimulator(err, data) {
    let initialState = data.split(',').map(Number);
    let simulation = {
        prev: new Map(),
        curr: new Map()
    }

    for (let i = 0; i < 9; i++) {
        simulation.prev.set(i, 0);
        simulation.curr.set(i, 0);
    }

    for (let num of initialState) {
        simulation.prev.set(num, simulation.prev.get(num) + 1);
    }

    for (let day = 0; day < DAYS; day++) {
        for (let i = 8; i >= 0; i--) {
            if (i === 0) {
                if (simulation.prev.get(i) > 0) {
                    simulation.curr.set(6, simulation.prev.get(i));
                    simulation.curr.set(8, simulation.prev.get(i));
                }
            } else {
                simulation.curr.set(i - 1, simulation.curr.get(i - 1) + simulation.prev.get(i));
            }
        }
        simulation.prev = new Map(simulation.curr);

        for (let i = 0; i < 9; i++) {
            simulation.curr.set(i, 0);
        }
    }

    console.log(Object.values(simulation.prev).reduce((acc, val) => {
        return acc + val;
    }, 0));
}

function main() {
    fs.readFile(`${__dirname}/input1.txt`, 'utf8', lanternFishSimulator);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', findOverlapsWithD);
}

main();