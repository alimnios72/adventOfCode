const fs = require('fs');

function findChain(err, data) {
    let adapters = data.split("\n").map(Number).sort((a, b) => a - b);
    let highestVoltage = adapters.slice(-1).pop() + 3;
    adapters.unshift(0);
    adapters.push(highestVoltage);
    let paths = new Map();

    // Create and initialize paths map
    adapters.reduce((map, val, idx) => map.set(val, idx === 0 ? 1 : 0), paths);

    for (let [key, value] of paths.entries()) {
        for (let i = 1; i <= 3; i++) {
            let path = key + i;
            if (paths.has(path)) {
                paths.set(path, paths.get(path) + value);
            }
        }
    }

    console.log(paths.get(highestVoltage));
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findChain);
}

main();