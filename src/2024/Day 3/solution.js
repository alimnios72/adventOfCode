const fs = require('fs');

function part1(error, data) {
    const regex = /mul\(\d{1,3},\d{1,3}\)/g;
    const matches = data.match(regex);
    const numbers = matches.map(match => {
        const [, num1, num2] = match.match(/mul\((\d{1,3}),(\d{1,3})\)/);
        return [parseInt(num1, 10), parseInt(num2, 10)];
    });
    const result = numbers.reduce((sum, val) => sum + (val[0] * val[1]), 0);
    console.log(result);
}

function part2(error, data) {
    const regex = /mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g;
    const matches = data.match(regex);
    const operations = matches.map(match => {
        const regMatch = match.match(/mul\((\d{1,3}),(\d{1,3})\)/);
        if (!regMatch) return match;
        const [, num1, num2] = regMatch;
        return [parseInt(num1, 10), parseInt(num2, 10)];
    });
    let enabled = true;
    const result = operations.reduce((sum, val) => {
        if (val === "do()" || val === "don't()") {
            enabled = val === "do()";
            return sum;
        }
        if (enabled) return sum + (val[0] * val[1]);
        return sum;
    }, 0);
    console.log(result);
}


function main(){
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();