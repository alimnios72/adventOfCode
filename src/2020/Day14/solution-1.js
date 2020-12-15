const fs = require('fs');

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
            memory[idx] = applyMask(currentMask, value);
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
        if (mask[i] === 'X') {
            if (i >= offset) {
                result += bin[i - offset];
            } else {
                result += '0';
            }
        } else {
            result += mask[i];
        }
    }

    return parseInt(result, 2);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', sumMemory);
}

main();