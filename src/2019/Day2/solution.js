const fs = require('fs');

function programAlarm(error, data) {
    let opCodes = data.split(",").map(Number);
    console.log(runProgram(opCodes, 12, 2));
}

function produceOutput(error, data) {
    let opCodes = data.split(",").map(Number);
    const expected = 19690720;

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            let result = runProgram(opCodes.slice(0), i, j)

            if (expected === result) {
                console.log(100 * i + j);
                return;
            }
        }
    }
    console.log("Not Found");
}

function runProgram(opCodes, noun, verb) {
    const step = 4;
    let o = 0, stop = false;

    // Initialize
    opCodes[1] = noun;
    opCodes[2] = verb;

    while (o < opCodes.length && !stop) {
        let [operation, pos1, pos2, store] = [
            opCodes[o],
            opCodes[o + 1],
            opCodes[o + 2],
            opCodes[o + 3]
        ];

        if (operation === 1) {
            opCodes[store] = opCodes[pos1] + opCodes[pos2];
        } else if (operation === 2) {
            opCodes[store] = opCodes[pos1] * opCodes[pos2];
        } else if (operation === 99) {
            stop = true;
        }

        o += step;
    }

    return opCodes[0];
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', programAlarm);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', produceOutput);
}

main();