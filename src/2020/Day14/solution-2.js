const fs = require('fs');

let bitCombinations = {};

function sumMemory(err, data) {
    let instructions = data.split("\n");
    let memory = {};
    let sum = 0;

    let currentMask = '';
    for (let instr of instructions) {
        if (instr.indexOf("mask") > -1) {
            currentMask = instr.split(" = ")[1];
        } else {
            let re = /^mem\[(\d+)\] = (\d+)$/
            let [, idx, value] = instr.match(re);
            let floatingMask = applyMask(currentMask, idx);
            writeToAddresses(memory, floatingMask, Number(value));
        }
    }

    for (let k in memory) {
        sum += memory[k];
    }
    console.log(sum);
}

function applyMask(mask, value) {
    let bin = (value >>> 0).toString(2);
    let offset = mask.length - bin.length;
    let result = '';

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === 'X' || mask[i] === '1') {
            result += mask[i];
        } else {
            if (i >= offset) {
                result += bin[i - offset];
            } else {
                result += '0';
            }
        }
    }

    return result;
}

function writeToAddresses(memory, mask, value) {
    let floating = Array.from(mask).filter(m => m === 'X');
    let combinations = getBitsCombinations(floating.length);
    let addresses = getMaskedValues(mask, combinations);

    for (let address of addresses) {
        memory[address] = value;
    }
}

function getBitsCombinations(size) {
    if (bitCombinations[size]) {
        return bitCombinations[size];
    }

    let total = Math.pow(2, size);
    let combinations = Array.from(Array(total), () => new Array());
    for (let i = 1; i <= size; i++) {
        let zero = true;
        let mid = total / Math.pow(2, i);
        let k = 0;
        for (let j = 0; j < total; j++) {
            zero = k < mid;
            if (zero) {
                combinations[j].push(0);
            } else {
                combinations[j].push(1);
            }
            k++;
            k = (j + 1) % (mid * 2);
        }
    }

    bitCombinations[size] = combinations;
    return bitCombinations[size];
}

function getMaskedValues(mask, combinations) {
    let addresses = [];

    for (let combination of combinations) {
        let i = 0;
        let masked = Array.from(mask);
        for (let j = 0; j < mask.length; j++) {
            if (mask[j] === 'X') {
                masked[j] = combination[i].toString();
                i++;
            }
        }
        addresses.push(parseInt(masked.join(""), 2));
    }

    return addresses;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', sumMemory);
}

main(); 