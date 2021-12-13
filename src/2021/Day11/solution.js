const fs = require('fs');
const STEPS = 100;
const DIRECTIONS = [
    { x: -1, y: -1 },
    { x: -1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
    { x: 1, y: 0 },
    { x: 1, y: -1 },
    { x: 0, y: -1 },
]

function part1(err, data) {
    let octopuses = data.split('\n')
        .map((line) => line.split('').map(Number));
    let flashes = 0;

    for (let step = 0; step < STEPS; step++) {
        let pendingFlashes = [];
        updateGridAndFlashes(octopuses, pendingFlashes);

        while (pendingFlashes.length !== 0) {
            let coord = pendingFlashes.shift();
            flashes++;
            updateNeighborsAndGetFlashes(octopuses, coord, pendingFlashes)
        }
    }

    console.log(flashes)
}

function part2(err, data) {
    let octopuses = data.split('\n')
        .map((line) => line.split('').map(Number));
    let step = 1;

    while (true) {
        let pendingFlashes = [];
        updateGridAndFlashes(octopuses, pendingFlashes);

        while (pendingFlashes.length !== 0) {
            let coord = pendingFlashes.shift();
            updateNeighborsAndGetFlashes(octopuses, coord, pendingFlashes);
        }

        if (areAllZero(octopuses)) {
            printGrid(octopuses);
            console.log(step);
            return;
        }
        step++;
    }
}

function updateGridAndFlashes(arr, pendingFlashes) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] === 9) {
                arr[i][j] = 0;
                pendingFlashes.push([i, j])
            } else {
                arr[i][j]++;
            }
        }
    }
}

function updateNeighborsAndGetFlashes(arr, coord, flashes){
    for (let dir of DIRECTIONS) {
        let {x ,y} = dir;
        let i = coord[0] + x;
        let j = coord[1] + y;

        if (isValid(arr, i, j)) {
            if (arr[i][j] === 9) {
                arr[i][j] = 0;
                flashes.push([i, j]);
            } else if (arr[i][j] !== 0) {
                arr[i][j]++;
            }
        }
    }
}

function isValid(arr, i, j) {
    if (arr[i] == null || arr[i][j] == null) return false;

    return true;
}

function areAllZero(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[i][j] !== 0) {
                return false;
            }
        }
    }

    return true;
}

function printGrid(arr) {
    for (let a of arr) {
        console.log(a.join(' '));
    }
    console.log(' ');
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();