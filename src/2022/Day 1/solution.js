const fs = require('fs');

function getCaloriesCount(data) {
    return data.split('\n\n')
        .map((line) => line.split(`\n`)
            .reduce((acc, cal) => acc + parseInt(cal), 0)
        ).sort((a, b) => a - b);
}

function part1(err, data) {
    const caloriesCount = getCaloriesCount(data);

    console.log(caloriesCount.pop());
}

function part2(err, data) {
    const caloriesCount = getCaloriesCount(data);
    const top3ElfsSum = caloriesCount.slice(-3).reduce((acc, item) => acc + item);

    console.log(top3ElfsSum)
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();