const fs = require('fs');
const DIRS = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

function part1(err, data) {
    let grid = data.split('\n')
        .map(line => line.split('').map(Number));
    
    let start = { x: 0, y: 0, f: 0 };
    let end = { x: grid.length - 1, y: grid[0].length - 1, f: 0 };

    let res = findPathAstar(grid, start, end);
    console.log(res.f);
}

function part2(err, data) {
    let grid = data.split('\n')
        .map(line => line.split('').map(Number));
    
    grid = expandGrid(grid, 5);
    let start = { x: 0, y: 0, f: 0 };
    let end = { x: grid.length - 1, y: grid[0].length - 1, f: 0 };

    let res = findPathAstar(grid, start, end);
    console.log(res.f);
}

function findPathAstar(grid, start, end) {
    let toVisit = [];
    let visited = [];

    toVisit.push(start);

    while (toVisit.length > 0) {
        let currentNode = toVisit[0];
        let currentIndex = 0;

        for (let i = 0; i < toVisit.length; i++) {
            if (toVisit[i].f < currentNode.f) {
                currentNode = toVisit[i];
                currentIndex = i;
            }
        }

        toVisit.splice(currentIndex, 1);
        visited.push(currentNode);

        if (currentNode.x === end.x && currentNode.y === end.y) {
            return currentNode;
        }

        let neighbors = getNeighbors(grid, currentNode.x, currentNode.y);

        for (let neighbor of neighbors) {

            let inClosedList = false;
            for (let item of visited) {
                if (neighbor.x === item.x && neighbor.y === item.y) {
                    inClosedList = true;
                    break;
                }
            }

            if (inClosedList) {
                continue;
            }

            neighbor.f += currentNode.f;

            let inOpenList = false;
            for (let item of toVisit) {
                if (neighbor.x === item.x && neighbor.y === item.y) {
                    inOpenList = true;
                    break;
                }
            }

            if (!inOpenList) {
                toVisit.push(neighbor);
            }
        }
    }
}

function getNeighbors(grid, x, y) {
    let neighbors = [];
    let newX, newY;

    for (let dir of DIRS) {
        newX = x + dir[0];
        newY = y + dir[1];

        if (isValid(grid, newX, newY)) neighbors.push({ x: newX, y: newY, f: grid[newX][newY] });
    }

    return neighbors;
}

function isValid(grid, x, y) {
    if (grid[x] != null && grid[x][y] != null) return true;

    return false;
}

function expandGrid(grid, times) {
    let newGrid = Array.from(Array(grid.length * times), () => new Array(grid[0].length * times).fill(0));

    for (let i = 0; i < newGrid.length; i++) {
        let len = newGrid[i].length / times;

        for (let j = 0; j < newGrid[i].length; j++) {
            if (grid[i] != null && grid[i][j] != null) {
                newGrid[i][j] = grid[i][j];
            } else {
                if (i < len) {
                    newGrid[i][j] = newGrid[i][j - len] !== 9 ? newGrid[i][j - len] + 1 : 1;
                } else {
                    newGrid[i][j] = newGrid[i - len][j] !== 9 ? newGrid[i - len][j] + 1 : 1;
                }
            }
        }
    }

    return newGrid;
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();