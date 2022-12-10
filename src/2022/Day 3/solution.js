const fs = require('fs');

function calculatePriority(char) {
    const asciiCode = char.charCodeAt(0);
    return asciiCode >= 97 ? asciiCode - 96 : asciiCode - 64 + 26;
}

function intersect(arr1, arr2) {
    const unique = new Set(arr1);
    return arr2.filter((item) => unique.has(item));
}

function part1(err, data) {
    const sum = data.split('\n')
        .map((line) => [
            line.substring(0, line.length / 2).split(''),
            line.substring(line.length - (line.length / 2)).split('')
        ])
        .map((rucksack) => intersect(rucksack[0], rucksack[1]))
        .reduce((acc, char) => acc + calculatePriority(char.pop()), 0);

    console.log(sum);
}

function part2(err, data) {
    const sum = data.split('\n')
        .reduce((group, item, ind) => (ind % 3 ? group[group.length - 1].push(item) : group.push([item])) && group, [])
        .map((group) => [ group[0].split(''), group[1].split(''), group[2].split('')])
        .map((group) => intersect(intersect(group[0], group[1]), group[2]))
        .reduce((acc, char) => acc + calculatePriority(char.pop()), 0);

    console.log(sum)
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();