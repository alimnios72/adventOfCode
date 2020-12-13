const fs = require('fs');

function findChain(err, data) {
    let numbers = data.split("\n").map(Number).sort((a, b) => a - b);
    numbers.unshift(0);
    numbers.push(numbers.slice(-1).pop() + 3);

    let jolt1Diff = 0;
    let jolt3Diff = 0;

    for(let i = 0; i < numbers.length - 1; i++) {
        let diff = numbers[i + 1] - numbers[i];
        if (diff === 1) {
            jolt1Diff++;
        } else if (diff === 3) {
            jolt3Diff++;
        }
    }

    console.log(jolt1Diff * jolt3Diff);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findChain);
}

main();