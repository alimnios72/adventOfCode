const fs = require('fs');

function compare(x, y) {
    if (Number.isInteger(x)) {
        if (Number.isInteger(y)) {
            return x - y;
        } else {
            return compare([x], y);
        }
    } else {
        if (Number.isInteger(y)) {
            return compare(x, [y]);
        }
    }

    for (let i = 0; i < Math.min(x.length, y.length); i ++) {
        let res = compare(x[i], y[i]);
        if (res !== 0) {
            return res;
        }
    }

    return x.length - y.length;
}

function part1(err, data) {
    const pairs = data.split("\n\n")
        .map(pair => pair.split("\n")
            .map(single => eval(single))
        );
    let orderedPairs = [];
    let i = 0;

    pairs.forEach((pair) => {
        let [left, right] = pair;
        if (compare(left, right) < 0) {
            orderedPairs.push(i + 1);
        }
        i++;
    });

    console.log(orderedPairs.reduce((a, b) => a + b, 0))
}

function part2(err, data) {
    const pairs = data.split("\n\n")
        .map(pair => pair.split("\n")
            .map(single => eval(single))
        );
    const list = [].concat.apply([], pairs);
    list.push([[2]], [[6]]);
    list.sort(compare);
    let div1 = list.findIndex((el) => Array.isArray(el[0]) && el.length === 1 && el[0][0] === 2);
    let div2 = list.findIndex((el) => Array.isArray(el[0]) && el.length === 1 && el[0][0] === 6);
    console.log((div1 + 1) * (div2 + 1));
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();