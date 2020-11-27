const fs = require('fs');

function botHandling(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let bots = {};
    let output = {};
    let operations = {};
    let startingBot = -1;
    let queue = [];

    for (let l of lines) {
        if (l.indexOf('value') > -1) {
            let re = /value (\d+) goes to bot (\d+)/
            let [, val, index] = l.match(re);
            createOrUpdateBot(bots, index, val);
            if (bots[index].vals.length == 2) {
                startingBot = index;
            }
        } else {
            let re = /bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)/
            let [, bot, lType, lIndex, hType, hIndex] = l.match(re);
            operations[bot] = {
                index: bot,
                high: {
                    type: hType,
                    index: hIndex
                },
                low: {
                    type: lType,
                    index: lIndex
                }
            }
        }
    }

    // Add first operation to queue
    queue.push(operations[startingBot]);

    while (queue.length > 0) {
        let currentOp = queue.shift();
        let currentBot = bots[currentOp.index];
        let highVal = Math.max(currentBot.vals[0], currentBot.vals[1]);
        let lowVal = Math.min(currentBot.vals[0], currentBot.vals[1]);

        let hResult = giveChip(highVal, currentOp.high, bots, output)
        let lResult = giveChip(lowVal, currentOp.low, bots, output)

        if (hResult !== -1) {
            queue.push(operations[hResult]);
        }
        if (lResult !== -1) {
            queue.push(operations[lResult]);
        }
        currentBot.vals = [];
    }

    console.log(output[0] * output[1] * output[2]);
}

function giveChip(val, operation, bots, output) {
    if (operation.type === 'output') {
        output[operation.index] = val;
    } else {
        createOrUpdateBot(bots, operation.index, val);
        if (bots[operation.index].vals.length === 2) {
            return operation.index;
        }
    }

    return -1;
}

function createOrUpdateBot(bots, index, value) {
    if (!bots.hasOwnProperty(index)) {
        bots[index] = { vals: [] };
    }
    bots[index].vals.push(Number(value));
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', botHandling);
}

main();