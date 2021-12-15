const fs = require('fs');

function part1(err, data) {
    let charCount = getCharCount(data, 10);
    let diff = substractChars(charCount);

    console.log(diff)
}

function part2(err, data) {
    let charCount = getCharCount(data, 40);
    let diff = substractChars(charCount);

    console.log(diff);
}

function getCharCount(data, steps) {
    let parts = data.split('\n\n');
    let template = parts[0];
    let rules = parts[1].split('\n')
        .map(line => line.split(' -> '))
        .reduce((map, item) => map.set(item[0], item[1]), new Map());

    let pairs = new Map();
    let countMap = new Map();

    for (let i = 0; i < template.length - 1; i++) {
        updateMap(pairs, template[i] + template[i + 1], 1);
    }

    for (let step = 0; step < steps; step++) {
        let newPairs = new Map();

        pairs.forEach((count, pair) => {
            let insertion = rules.get(pair);
            updateMap(newPairs, pair[0] + insertion, count);
            updateMap(newPairs, insertion + pair[1], count);
        });

        pairs = newPairs;
    }

    pairs.forEach((count, pair) => {
        updateMap(countMap, pair[0], count);
    });
    updateMap(countMap, template[template.length - 1], 1);

    return countMap;
}

function updateMap(map, key, val) {
    if (!map.has(key)) {
        map.set(key, 0);
    }
    map.set(key, map.get(key) + val);
}

function substractChars(map) {
    let ordered = Array.from(map).sort((a, b) => a[1] - b[1]);

    return ordered[ordered.length - 1][1] - ordered[0][1];
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();