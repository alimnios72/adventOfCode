const fs = require('fs');

function manhattanDistance(p1, p2) {
    return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
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
    let positions = new Map();
    let grid = Array.from(Array(20), () => new Array(20).fill('.'));
    let re = /^Sensor at x=(\-?\d+), y=(\-?\d+): closest beacon is at x=(\-?\d+), y=(\-?\d+)$/;
    let map = data.split('\n')
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
        })
        .forEach(line => {
            for (let i = 0; i <= line.d; i++) {
                let y = line.s.y + i;
                for (let j = 0; j <= line.d - i; j++) {
                    let left = (-1 * j) + line.s.x;
                    let right = line.s.x + j;
                    positions.set(`${left}-${y}`, 1);
                    positions.set(`${right}-${y}`, 1);
                }
            }
            for (let i = 1; i <= line.d; i++) {
                let y = (-1 * i) + line.s.y;
                for (let j = 0; j <= line.d - i; j++) {
                    let left = (-1 * j) + line.s.x;
                    let right = line.s.x + j;
                    positions.set(`${left}-${y}`, 1);
                    positions.set(`${right}-${y}`, 1);
                }
            }
        });

    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid[0].length; i++) {
            let key = `${i}-${j}`;
            if (positions.has(key)) {
                grid[i][j] = '#';
            }
        }
    }
    console.log(grid.forEach(g => console.log(g.join(''))))
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input1.txt`, 'utf8', part2);
}

main();