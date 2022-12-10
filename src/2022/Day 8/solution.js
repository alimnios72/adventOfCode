const fs = require('fs');

function checkNeighbors(grid, i, j) {
    let isVisible = true;
    let current = grid[i][j];
    let x, y;

    // check left
    x = i, y = j - 1;
    while(y >= 0) {
        let prev = grid[x][y];
        if (prev >= current) {
            isVisible = false;
            break;
        }
        y--;
    }
    if (isVisible) return true;

    // check right
    isVisible = true;
    x = i, y = j + 1;
    while(y < grid[0].length) {
        let prev = grid[x][y];
        if (prev >= current) {
            isVisible = false;
            break;
        }
        y++;
    }
    if (isVisible) return true;

    // check top
    x = i - 1, y = j;
    isVisible = true;
    while(x >= 0) {
        let prev = grid[x][y];
        if (prev >= current) {
            isVisible = false;
            break;
        }
        x--;
    }
    if (isVisible) return true;

    // check bottom
    isVisible = true;
    x = i + 1, y = j;
    while(x < grid.length) {
        let prev = grid[x][y];
        if (prev >= current) {
            isVisible = false;
            break;
        }
        x++;
    }

    return isVisible;
}

function getScenicScore(grid, i, j) {
    let current = grid[i][j];
    let x, y;

    // check left
    let scoreLeft = 0;
    x = i, y = j - 1;
    while(y >= 0) {
        let prev = grid[x][y];
        scoreLeft++;
        y--;
        if (prev >= current) break;
    }

    // check right
    let scoreRight = 0;
    x = i, y = j + 1;
    while(y < grid[0].length) {
        let prev = grid[x][y];
        scoreRight++;
        y++;
        if (prev >= current) break;
    }

    // check top
    let scoreTop = 0;
    x = i - 1, y = j;
    while(x >= 0) {
        let prev = grid[x][y];
        scoreTop++;
        x--;
        if (prev >= current) break;
    }

    // check bottom
    let scoreBottom = 0;
    x = i + 1, y = j;
    while(x < grid.length) {
        let prev = grid[x][y];
        scoreBottom++;
        x++;
        if (prev >= current) break;
    }

    return scoreLeft * scoreRight * scoreTop * scoreBottom;
}

function part1(err, data) {
    const grid = data.split('\n')
        .map(line => line.split('').map(Number));
    let visibleCount = (grid.length * 2) + (grid[0].length - 2) * 2;;
    let visibles = new Map();

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            let isVisible = checkNeighbors(grid, i, j);
            visibleCount += isVisible ? 1 : 0
            if (isVisible) visibles.set(`${i}-${j}`, 1);
        }
    }
    console.log(visibleCount)
}

function part2(err, data) {
    const grid = data.split('\n')
        .map(line => line.split('').map(Number));
    const scores = [];

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[0].length - 1; j++) {
            scores.push(getScenicScore(grid, i, j));
        }
    }

    scores.sort((a, b) => a - b);
    console.log(scores.pop());
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();