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
   
}

function findPathAstar(grid, start, end) {
    let openList = [];
    let closedList = [];

    openList.push(start);

    while (openList.length > 0) {
        let currentNode = openList[0];
        let currentIndex = 0;

        for (let i = 0; i < openList.length; i++) {
            if (openList[i].f < currentNode.f) {
                currentNode = openList[i];
                currentIndex = i;
            }
        }

        openList.splice(currentIndex, 1);
        closedList.push(currentNode);

        if (currentNode.x === end.x && currentNode.y === end.y) {
            return currentNode;
        }

        let neighbors = getNeighbors(grid, currentNode.x, currentNode.y);

        for (let neighbor of neighbors) {

            let inClosedList = false;
            for (let item of closedList) {
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
            for (let item of openList) {
                if (neighbor.x === item.x && neighbor.y === item.y) {
                    inOpenList = true;
                    break;
                }
            }

            if (!inOpenList) {
                openList.push(neighbor);
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

function findPathRecursive(grid, start, end, curPath, paths) {
    curPath['totalRisk'] += grid[start.x][start.y];

    if (start.x === end.x && start.y === end.y) {
        paths.push(curPath);
        return;
    }

    let neighbors = getNeighbors(grid, start.x, start.y);

    for (let neighbor of neighbors) {
        let [x, y] = neighbor.split('-');
        x = parseInt(x, 10);
        y = parseInt(y, 10);

        if ((start.x < x && start.y < y) || (start.x == x && start.y < y) || (start.x < x && start.y == y)) {
            findPath(grid, {x, y}, end, Object.assign({}, curPath), paths)
        }
    }

    return paths;
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();