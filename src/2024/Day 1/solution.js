const fs = require('fs');

function part1(error, data) {
    let allLists = data
        .split('\n')
        .map((l) => l.split('   ').map(Number));
    let list1 = allLists.map(pair => pair[0]).sort((a, b) => a - b);
    let list2 = allLists.map(pair => pair[1]).sort((a, b) => a - b);

    const result = list1.reduce((acc, val, index) => acc + Math.abs(val - list2[index]), 0);
    console.log(result);
}

function part2(error, data) {
    let allLists = data
        .split('\n')
        .map((l) => l.split('   ').map(Number));
    let list1 = allLists.map(pair => pair[0]);
    let frequency = allLists.map(pair => pair[1]).reduce((map, item) => {
        if (!map.has(item)) {
            map.set(item, 0);
        }
        map.set(item, map.get(item) + 1);
        return map;
    }, new Map());

    const result = list1.reduce((sum, val) => sum + (val * (frequency.get(val) ?? 0)), 0);
    console.log(result);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();