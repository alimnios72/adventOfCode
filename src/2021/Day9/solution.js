const fs = require('fs');

function part1(err, data) {
    let heightMap = data.split('\n')
        .map((line) => line.trim().split('').map(Number));
    let lowPoints = [];

    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[0].length; j++) {
            let curr = heightMap[i][j];
            let lessThanUp = curr < getCoordinateValue(heightMap, i - 1, j);
            let lessThanRight = curr < getCoordinateValue(heightMap, i, j + 1);
            let lessThanDown = curr < getCoordinateValue(heightMap, i + 1, j);
            let lessThanLeft = curr < getCoordinateValue(heightMap, i, j - 1);

            if (lessThanUp && lessThanRight && lessThanDown && lessThanLeft) {
                lowPoints.push(curr);
            }
        }
    }

    let sum = lowPoints.reduce((acc, val) => acc + (1 + val), 0);
    console.log(sum);
}

function part2(err, data) {
    let heightMap = data.split('\n')
        .map((line) => line.trim().split('').map(Number));
    let basinSizes = [];

    for (let i = 0; i < heightMap.length; i++) {
        for (let j = 0; j < heightMap[0].length; j++) {
            let basin;
            let curr = heightMap[i][j];
            let lessThanUp = curr < getCoordinateValue(heightMap, i - 1, j);
            let lessThanRight = curr < getCoordinateValue(heightMap, i, j + 1);
            let lessThanDown = curr < getCoordinateValue(heightMap, i + 1, j);
            let lessThanLeft = curr < getCoordinateValue(heightMap, i, j - 1);

            if (lessThanUp && lessThanRight && lessThanDown && lessThanLeft) {
                basin = getBasinSize(heightMap, i, j);
                basinSizes.push(basin);
            }
        }
    }

    basinSizes.sort((a, b) => b - a);

    let result = basinSizes[0] * basinSizes[1] * basinSizes[2];
    console.log(result);
}

function getBasinSize(arr, i, j) {
    let stack = [ [i, j] ];
    let x, y;
    let visited = new Map();

    while (stack.length !== 0) {
        let coord = stack.pop();
        visited.set(`${coord[0]}-${coord[1]}`, 1);

        x = coord[0] - 1;
        y = coord[1];
        let up = getCoordinateValue(arr, x, y);
        if (up !== 9 && up !== Infinity && !visited.has(`${x}-${y}`)) {
            stack.push([x, y]);
        }

        x = coord[0];
        y = coord[1] + 1;
        let right = getCoordinateValue(arr, x, y);
        if (right !== 9 && right !== Infinity && !visited.has(`${x}-${y}`)) {
            stack.push([x, y]);
        }

        x = coord[0] + 1;
        y = coord[1];
        let down = getCoordinateValue(arr, x, y);
        if (down !== 9 && down !== Infinity && !visited.has(`${x}-${y}`)) {
            stack.push([x, y]);
        }

        x = coord[0];
        y = coord[1] - 1;
        let left = getCoordinateValue(arr, x, y);
        if (left !== 9 && left !== Infinity && !visited.has(`${x}-${y}`)) {
            stack.push([x, y]);
        }
    }

    return visited.size;
}

function getCoordinateValue(arr, i, j) {
    if (arr[i] == null || arr[i][j] == null) {
        return Infinity;
    }

    return arr[i][j];
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();