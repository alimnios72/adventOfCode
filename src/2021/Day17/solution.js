const fs = require('fs');

function part1(err, data) {
    let [, x1, x2, y1, y2] = data.trim().match(/^.*x=(\-?[0-9]+)\.\.(\-?[0-9]+)\,\sy=(\-?[0-9]+)\.\.(\-?[0-9]+)$/);
    let target = {
        x1: parseInt(x1, 10),
        x2: parseInt(x2, 10),
        y1: parseInt(y1, 10),
        y2: parseInt(y2, 10)
    }

    let allX = getValidXVelocity(target);
    let allY = getValidYVelocity(target);
    let validVelocities = new Map();

    for (let iniX of allX) {
        for (iniY of allY) {
            simulate(target, iniX, iniY, validVelocities)
        }
    }

    let maxY = -1;
    validVelocities.forEach(val => maxY = Math.max(maxY, val));
    console.log(maxY);
}

function part2(err, data) {
    let [, x1, x2, y1, y2] = data.trim().match(/^.*x=(\-?[0-9]+)\.\.(\-?[0-9]+)\,\sy=(\-?[0-9]+)\.\.(\-?[0-9]+)$/);
    let target = {
        x1: parseInt(x1, 10),
        x2: parseInt(x2, 10),
        y1: parseInt(y1, 10),
        y2: parseInt(y2, 10)
    }

    let allX = getValidXVelocity(target);
    let allY = getValidYVelocity(target);
    let validVelocities = new Map();

    for (let iniX of allX) {
        for (iniY of allY) {
            simulate(target, iniX, iniY, validVelocities)
        }
    }

    console.log(validVelocities.size);
}

function getValidXVelocity(target) {
    let allX = [];

    for (let i = 1; i <= target.x2; i++) {
        let x = 0;
        let iniX = i;

        while (iniX !== 0 && x <= target.x2) {
            x += iniX;
            iniX--;

            if (x >= target.x1 && x <= target.x2) {
                allX.push(i);
                break;
            }
        }
    }

    return allX;
}

function getValidYVelocity(target) {
    let allY = [];

    for (let i = target.y1; i <= 100; i++) {
        let y = 0;
        let iniY = i;

        while (y >= target.y2) {
            y += iniY;
            iniY--;

            if (y <= target.y2 && y >= target.y1) {
                allY.push(i);
                break;
            }
        }
    }

    return allY;
}

function simulate(target, iniX, iniY, map) {
    let x = 0, y = 0;
    let maxY = -1;
    let inTgt = false;
    let key = `${iniX},${iniY}`;

    while (x <= target.x2 && y >= target.y1 && !inTgt) {
        x += iniX;
        y += iniY;
        maxY = Math.max(maxY, y);
        inTgt = inTarget(x, y, target);
        if (iniX !== 0) {
            iniX--;
        }
        iniY--;
    }

    if (inTgt) {
        map.set(key, maxY);
    }
}

function inTarget(x, y, target) {
    if (x >= target.x1 && x <= target.x2
        && y <= target.y2 && y >= target.y1) {
        return true;
    }

    return false;
}


function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();