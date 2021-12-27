const fs = require('fs');
const MATCHING_BEACONS = 12;

function part1(err, data) {
    let allScanners = data.split('\n\n')
        .map(block => block.split('\n')
            .filter(line => line.indexOf('scanner') === -1)
            .map(line => line.split(',').map(Number)));

    let scanner0 = allScanners[0];
    let beaconsCount = 0;

    // // Compare all scanners to scanner0
    // for (let s = 2; s < 3; s++) {
    //     // Rotate all projections in scanner
    //     for (let i = 0; i < 24; i++) {
    //         beaconsCount += compareScanners(scanner0, allScanners[s], i);
    //     }
    // }

    // console.log(beaconsCount);
    compareScanners(scanner0, allScanners[2], 7)
}

function compareScanners(scanner0, scannerN, rotation) {
    let count = {};

    // Compare current scanner to scanner0
    // for (let s0 of scanner0) {
    //     for (let s1 of scannerN) {
    //         let rotated = rotatePoint(s1, rotation);
    //         // let distance = manhattanDistance(s0, rotated);
    //         let distance = substraction(s0, rotated);
    //         count[distance] != null ? count[distance]++ : count[distance] = 1;
    //     }
    // }
    for (let s1 of scannerN) {
        for (let s0 of scanner0) {
            let rotated = rotatePoint(s0, rotation);
            // let distance = manhattanDistance(s0, rotated);
            let distance = substraction(rotated, s1);
            count[distance] != null ? count[distance]++ : count[distance] = 1;
        }
    }

    console.log(count)
    let res = Object.keys(count).filter(num => count[num] >= 3).map(k => count[k]);
    console.log(res);
    // if (res.length > 0) {
    //     return count[res[0]];
    // }

    return 0;
}

function manhattanDistance(p, q) {
    return Math.abs(q[0] - p[0]) + Math.abs(q[1] - p[1]) + Math.abs(q[2] - p[2]);
}

function substraction(p, q) {
    return `${p[0]-q[0]},${p[1]-q[1]},${p[2]-q[2]}`;
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

function part2(err, data) {
}



function main() {
    fs.readFile(`${__dirname}/input1.txt`, 'utf8', part1);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();