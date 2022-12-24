const fs = require('fs');

function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

function createSquares(origin, edge, divider) {
    let squares = [];
    let length = edge / divider;
    for (let x = origin.x; x < origin.x + edge; x += length) {
        for (let y = origin.y; y < origin.y + edge; y += length) {
            squares.push({
                p1: { x: x, y: y },
                p2: { x: x + length - 1, y: y },
                p3: { x: x, y: y + length - 1 },
                p4: { x: x + length -1 , y: y + length - 1},
            });
        }
    }

    return squares;
}

function isSquareInRhomb(square, rhomb) {
    for (let p in square) {
        if (manhattanDistance(square[p], rhomb.s) > rhomb.d) {
            return false;
        }
    }
    return true;
}

function part1(err, data) {
    let re = /^Sensor at x=(\-?\d+), y=(\-?\d+): closest beacon is at x=(\-?\d+), y=(\-?\d+)$/;
    let y = 2000000;
    let rowY = new Map();
    let blockedPosition = new Map();
    let map = data.split('\n')
        .map(line => {
            let [, xs, ys, xb, yb] = line.match(re);
            let info = {
                s: { x: parseInt(xs, 10), y: parseInt(ys, 10) },
                b: { x: parseInt(xb, 10), y: parseInt(yb, 10) }
            };
            if (info.s.y === y) blockedPosition.set(`${info.s.x}-${info.s.y}`, 1);
            if (info.b.y === y) blockedPosition.set(`${info.b.x}-${info.b.y}`, 1);
            return {
                ...info,
                d: manhattanDistance(info.s, info.b)
            }
        })
        .filter(line => manhattanDistance(line.s, { x: line.s.x, y }) <= line.d )
        .forEach(line => {
            let d = manhattanDistance(line.s, { x: line.s.x, y });
            if (!blockedPosition.has(`${line.s.x}-${y}`)) rowY.set(`${line.s.x}-${y}`, 1);
            for (let i = 1; i <= line.d - d; i++) {
                let left = (-1 * i) + line.s.x;
                if (!blockedPosition.has(`${left}-${y}`)) rowY.set(`${left}-${y}`, 1);
                let right = line.s.x + i;
                if (!blockedPosition.has(`${right}-${y}`)) rowY.set(`${right}-${y}`, 1);
            }
        });
    console.log(rowY.size)
}

function part2(err, data) {
    let re = /^Sensor at x=(\-?\d+), y=(\-?\d+): closest beacon is at x=(\-?\d+), y=(\-?\d+)$/;
    let edge = 4000000;
    let divider = 100;
    let rhombs = data.split('\n')
        .map(line => {
            let [, xs, ys, xb, yb] = line.match(re);
            let info = {
                s: { x: parseInt(xs, 10), y: parseInt(ys, 10) },
                b: { x: parseInt(xb, 10), y: parseInt(yb, 10) }
            };
            return {
                ...info,
                d: manhattanDistance(info.s, info.b)
            }
        });
    let squares = [{
        p1: { x: 0, y: 0 },
        p2: { x: edge, y: 0 },
        p3: { x: 0, y: edge },
        p4: { x: edge, y: edge },
    }];
    let tmp = [];

    while (true) {
        squares.forEach(square => {
            let subSquares = createSquares(square.p1, edge, edge > divider ? divider : 4);
            subSquares.forEach(subSquare => {
                if (!rhombs.some(rhomb => isSquareInRhomb(subSquare, rhomb))) {
                    tmp.push(subSquare);
                }
            });
        });

        if (tmp.length === 1) break;

        squares = tmp;
        tmp = [];
        edge /= divider;
    }
    let res = tmp.pop();
    console.log(BigInt(res.p1.x) * BigInt(4000000) + BigInt(res.p1.y));
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();