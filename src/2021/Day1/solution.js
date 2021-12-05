const fs = require('fs');

function increasingDepth(error, data) {
    let depths = data.split("\n").map(Number);

    let result = depths.reduce((prev, curr, index) => {
        if (index > 0 && depths[index - 1] < curr) {
            prev++;
        }
        return prev;
    }, 0);

    console.log(result);
}

function threeWindowIncreasingDepth(error, data) {
    let depths = data.split("\n").map(Number);
    let result = 0;
    let prevWindow = Infinity;

    for (let i = 0; i < depths.length - 2; i++) {
        let currWindow = depths[i] + depths[i + 1] + depths[i + 2];

        if (currWindow > prevWindow) result++;

        prevWindow = currWindow;
    }

    console.log(result);
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', increasingDepth);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', threeWindowIncreasingDepth);
}

main();