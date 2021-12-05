const fs = require('fs');

function calculatePowerConsumption(error, data) {
    let binaries = data.split("\n");
    let output = '';
    
    for (let y = 0; y < binaries[0].length; y++) {
        let ones = 0, zeros = 0;

        for (let x = 0; x < binaries.length; x++) {
            if (binaries[x][y] === '1') {
                ones++;
            } else {
                zeros++;
            }
        }

        output += ones > zeros ? '1' : '0';
    }

    let gammaRate = parseInt(output, 2);
    let epsilonRate = ~gammaRate & (Math.pow(2, binaries[0].length) - 1);
    console.log(gammaRate * epsilonRate);
}

function calculateLifeSupportRating(error, data) {
    let binaries = data.split("\n");

    let oxygenRating = getLifeSupport(binaries, (ones, zeros) => ones >= zeros ? '1' : '0');
    let co2Rating = getLifeSupport(binaries, (ones, zeros) => ones >= zeros ? '0' : '1');

    console.log(oxygenRating * co2Rating);
}

function getLifeSupport(nums, compareFun) {
    let position = 0;

    while (nums.length > 1 && position < nums[0].length) {
        let ones = 0, zeros = 0;
        let select = '', tmp = [];

        for (let x = 0; x < nums.length; x++) {
            if (nums[x][position] === '1') {
                ones++;
            } else {
                zeros++;
            }
        }

        select = compareFun(ones, zeros);

        for (let x = 0; x < nums.length; x++) {
            if (nums[x][position] === select) {
                tmp.push(nums[x]);
            }
        }
        position++;
        nums = tmp;
    }

    return parseInt(nums[0], 2);
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculatePowerConsumption);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculateLifeSupportRating);
}

main();