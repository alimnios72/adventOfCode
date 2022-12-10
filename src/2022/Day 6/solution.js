const fs = require('fs');

function findMarkerStart(signal, window) {
    let startMarkerFound = false;
    let index = window;

    while (!startMarkerFound && index < signal.length) {
        let sequence = signal.substring(index - window, index);
        let unique = new Set(sequence);
        if (unique.size === window) {
            startMarkerFound = true;
        }
        else {
            index++;
        }
    }

    return index;
}

function part1(err, data) {
    console.log(findMarkerStart(data, 4))
}

function part2(err, data) {
    console.log(findMarkerStart(data, 14))
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();