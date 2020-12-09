const fs = require('fs');

function runSerialBootCode(err, data) {
    let instructions = data.split("\n");

    for (let i = 0; i < instructions.length; i++) {
        let [code, value] = instructions[i].split(" ");

        if (code !== 'acc') {
            let original = instructions[i];

            if (code === 'nop') {
                instructions[i] = `jmp ${value}`;
            } else if (code === 'jmp') {
                instructions[i] = `nop ${value}`;
            }

            let acc = runBootCode(instructions);
            if (acc === -1) {
                instructions[i] = original;
            } else {
                console.log(acc);
                return;
            }
        }
    }
}
function runBootCode(instructions) {
    let visited = new Set();
    let acc = 0;
    let i = 0;

    while (i < instructions.length) {
        if (visited.has(i)) {
            return -1;
        }

        visited.add(i);
        let [code, value] = instructions[i].split(" ");

        switch(code) {
            case 'acc':
                acc += Number(value);
                i++;
                break;
            case 'jmp':
                i += Number(value);
                break;
            case 'nop':
            default:
                i++;
                break;
        }
    }

    return acc;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', runSerialBootCode);
}

main();