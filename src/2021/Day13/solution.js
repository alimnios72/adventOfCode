const fs = require('fs');

function part1(err, data) {
    let parts = data.split('\n\n');
    let points = parts[0].split('\n')
        .map(line => line.split(',').map(Number))
        .reduce((map, item) => {
            let [x, y] = item;
            map.set(`${x}-${y}`, [x, y]);
            return map;
        }, new Map());
    let folds = parts[1].split('\n')
        .map(line => line.split(' ').pop())
        .map(coord => {
            let [axis, num] = coord.split('=');
            return [axis, parseInt(num, 10)]
        });

    let [axis, fold] = folds.shift();

    for (let val of points.values()) {
        let oldKey = `${val[0]}-${val[1]}`;

        if (axis === 'y' && val[1] > fold) {
            let newY = fold - (val[1] - fold);
            let newKey = `${val[0]}-${newY}`;

            points.set(newKey, [val[0], newY]);
            points.delete(oldKey);
        } else if (axis === 'x' && val[0] > fold) {
            let newX = fold - (val[0] - fold);
            let newKey = `${newX}-${val[1]}`;

            points.set(newKey, [newX, val[1]]);
            points.delete(oldKey);
        }
    }

    console.log(points.size);
}

function part2(err, data) {
    let parts = data.split('\n\n');
    let points = parts[0].split('\n')
        .map(line => line.split(',').map(Number))
        .reduce((map, item) => {
            let [x, y] = item;
            map.set(`${x}-${y}`, [x, y]);
            return map;
        }, new Map());
    let folds = parts[1].split('\n')
        .map(line => line.split(' ').pop())
        .map(coord => {
            let [axis, num] = coord.split('=');
            return [axis, parseInt(num, 10)]
        });

    for (let fold of folds) {
        let [axis, num] = fold;

        for (let val of points.values()) {
            let oldKey = `${val[0]}-${val[1]}`;
    
            if (axis === 'y' && val[1] > num) {
                let newY = num - (val[1] - num);
                let newKey = `${val[0]}-${newY}`;
    
                points.set(newKey, [val[0], newY]);
                points.delete(oldKey);
            } else if (axis === 'x' && val[0] > num) {
                let newX = num - (val[0] - num);
                let newKey = `${newX}-${val[1]}`;
    
                points.set(newKey, [newX, val[1]]);
                points.delete(oldKey);
            }
        }
    }

    printGrid(40, points);
}

function printGrid(size, points) {
    let grid = Array.from(Array(size), () => new Array(size).fill('.'));

    for (let val of points.values()) {
        let [x, y] = val;
        grid[y][x] = '#';
    }

    for (let i = 0; i < grid.length; i++) {
        console.log(grid[i].join(' '));
    }
}

function main() {
    // fs.readFile(`${__dirname}/input1.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();