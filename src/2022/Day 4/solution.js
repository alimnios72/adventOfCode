const fs = require('fs');

function isContained(a1, a2) {
    return a2[0] >= a1[0] && a2[1] <= a1[1] ||
        a1[0] >= a2[0] && a1[1] <= a2[1];
}

function overlaps(a1, a2) {
    return (a2[0] >= a1[0] && a2[0] <= a1[1] || a2[1] >= a1[0] && a2[1] <= a1[1]) ||
        (a1[0] >= a2[0] && a1[0] <= a2[1] || a1[1] >= a2[0] && a1[1] <= a2[1]);
}

function part1(err, data) {
    const pairs = data.split('\n')
        .map((line) => {
            const [s1, s2] = line.split(',');
            return [
                s1.split('-').map(Number),
                s2.split('-').map(Number)
            ];
        })
        .filter((assg) => isContained(assg[0], assg[1]));

    console.log(pairs.length);
}

function part2(err, data) {
    const pairs = data.split('\n')
        .map((line) => {
            const [s1, s2] = line.split(',');
            return [
                s1.split('-').map(Number),
                s2.split('-').map(Number)
            ];
        })
        .filter((assg) => overlaps(assg[0], assg[1]));

    console.log(pairs.length)
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();