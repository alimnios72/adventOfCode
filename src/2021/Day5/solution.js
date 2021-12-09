const fs = require('fs');
const GRID_SIZE = 1500;

function findOverlaps(err, data) {
    let coordinates = data.split('\n')
        .map((line) => line.split(' -> '))
        .map((coord) => [coord[0].split(',').map(Number), coord[1].split(',').map(Number)]);

    let grid = Array.from(Array(GRID_SIZE), () => new Array(GRID_SIZE).fill('.'));
    let pointOverlaps = 0;

    for (let coord of coordinates) {
        let [[x1, y1], [x2, y2]] = coord;
        let x = x1 === x2 ? 0 : (x2 - x1) / Math.abs(x2 - x1);
        let y = y1 === y2 ? 0 : (y2 - y1) / Math.abs(y2 - y1);

      if (x1 === x2 || y1 === y2) {
        while (x1 !== x2 + x || y1 !== y2 + y) {
            updateCoord(grid, y1, x1);
            x1 += x;
            y1 += y;
        }
      }

    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] >= 2) {
                pointOverlaps++;
            }
        }
    }

    console.log(pointOverlaps);
}

function findOverlapsWithD(err, data) {
    let coordinates = data.split('\n')
        .map((line) => line.split(' -> '))
        .map((coord) => [coord[0].split(',').map(Number), coord[1].split(',').map(Number)]);

    let grid = Array.from(Array(GRID_SIZE), () => new Array(GRID_SIZE).fill('.'));
    let pointOverlaps = 0;

    for (let coord of coordinates) {
        let [[x1, y1], [x2, y2]] = coord;
        let x = x1 === x2 ? 0 : (x2 - x1) / Math.abs(x2 - x1);
        let y = y1 === y2 ? 0 : (y2 - y1) / Math.abs(y2 - y1);

        while (x1 !== x2 + x || y1 !== y2 + y) {
            updateCoord(grid, y1, x1);
            x1 += x;
            y1 += y;
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if (grid[i][j] >= 2) {
                pointOverlaps++;
            }
        }
    }

    console.log(pointOverlaps);
}

function updateCoord(grid, x, y) {
    if (grid[x][y] === '.') {
        grid[x][y] = 1;
    } else {
        grid[x][y]++;
    }
}

function printGrid(grid) {
    let textGrid = grid.map((line) => line.join('')).reduce((acc, val) => {
        return acc + val + '\n';
    }, '');
    console.log(textGrid);
}


function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findOverlaps);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findOverlapsWithD);
}

main();