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

function getCoordinateValue(arr, i, j) {
    if (arr[i] == null || arr[i][j] == null) {
        return Infinity;
    }

    return arr[i][j];
}

function part2(err, data) {

}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();