const fs = require('fs');
const MATCHING_BEACONS = 12;

function part1(err, data) {
    let allScanners = data.split('\n\n')
        .map(block => block.split('\n')
            .filter(line => line.indexOf('scanner') === -1)
            .map(line => line.split(',').map(Number)));

    let [ ocean ] = beaconMatching(allScanners);
    console.log(ocean.length);
}

function part2(err, data) {
    let allScanners = data.split('\n\n')
    .map(block => block.split('\n')
        .filter(line => line.indexOf('scanner') === -1)
        .map(line => line.split(',').map(Number)));

    let maxDistance = -1;
    let [ , scannerCoords] = beaconMatching(allScanners);

    for (let s1 of scannerCoords) {
        for (let s2 of scannerCoords) {
            maxDistance = Math.max(maxDistance, manhattanDistance(s1, s2));
        }
    }

    console.log(maxDistance);
}

function beaconMatching(allScanners) {
    let scanner0 = allScanners.shift();
    let ocean = [ ...scanner0 ];
    let oceanSet = new Set(ocean.map(coord => coord.join(',')));
    let scannerCoords = [];

    while (allScanners.length > 0) {
        let currentScanner = allScanners.shift();
        let match = false;

        for (let i = 0; i < 24; i++) {
            let count = {};

            for (let point0 of ocean) {
                for (let point1 of currentScanner) {
                    let rotated = rotatePoint(point1, i);
                    let distance = substractPoint(point0, rotated);
                    count[distance] != null ? count[distance]++ : count[distance] = 1;
                }
            }

            let matches = Object.keys(count).filter(num => count[num] >= MATCHING_BEACONS);

            if (matches.length > 0) {
                match = true;
                let [x, y, z] = matches[0].split(',').map(Number);
                scannerCoords.push([-x, -y, -z]);
                for (let point1 of currentScanner) {
                    let rotated = rotatePoint(point1, i);
                    let addition = addPoint(rotated, [-x, -y, -z]);
                    if (!oceanSet.has(addition.join(','))) {
                        ocean.push(addition);
                        oceanSet.add(addition.join(','));
                    }
                }
            }
        }

        if (!match) {
            allScanners.push(currentScanner);
        } 
    }

    return [ ocean, scannerCoords];
}

function manhattanDistance(p, q) {
    return Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) + Math.abs(q[2] - p[2]);
}

function addPoint(p, q) {
    return [ p[0] + q[0], p[1] + q[1], p[2] + q[2]]
}
function substractPoint(p, q) {
    return `${q[0]-p[0]},${q[1]-p[1]},${q[2]-p[2]}`;
}

function rotatePoint(p, rotation){
    let [x, y, z] = p;

    if (rotation == 0)
        return [x, y, z];
    if (rotation == 1)
        return [x, -z, y];
    if (rotation == 2)
        return [x, -y, -z];
    if (rotation == 3)
        return [x, z, -y];
    if (rotation == 4)
        return [-x, -y, z];
    if (rotation == 5)
        return [-x, -z, -y];
    if (rotation == 6)
        return [-x, y, -z];
    if (rotation == 7)
        return [-x, z, y];
    if (rotation == 8)
        return [y, x, -z];
    if (rotation == 9)
        return [y, -x, z];
    if (rotation == 10)
        return [y, z, x];
    if (rotation == 11)
        return [y, -z, -x];
    if (rotation == 12)
        return [-y, x, z];
    if (rotation == 13)
        return [-y, -x, -z];
    if (rotation == 14)
        return [-y, -z, x];
    if (rotation == 15)
        return [-y, z, -x];
    if (rotation == 16)
        return [z, x, y];
    if (rotation == 17)
        return [z, -x, -y];
    if (rotation == 18)
        return [z, -y, x];
    if (rotation == 19)
        return [z, y, -x];
    if (rotation == 20)
        return [-z, x, -y];
    if (rotation == 21)
        return [-z, -x, y];
    if (rotation == 22)
        return [-z, y, x];
    if (rotation == 23)
        return [-z, -y, -x];
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();