const fs = require('fs');

function getCorrectedMessage(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let columns = [];
    let maxVals = [];
    let message = '';

    for (let line of lines) {
        for (let i = 0; i < line.length; i++) {
            if (!columns[i] || !maxVals[i]) {
                columns[i] = {};
                maxVals[i] = { maxLetter: '', maxValue: 0 };
            }
            
            if (!columns[i][line[i]]) {
                columns[i][line[i]] = 0;
            }
            columns[i][line[i]]++;

            if (columns[i][line[i]] > maxVals[i].maxValue) {
                maxVals[i].maxValue = columns[i][line[i]];
                maxVals[i].maxLetter = line[i];
            }
        }
    }

    for (let m of maxVals) {
        message += m.maxLetter;
    }
    console.log(message);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getCorrectedMessage);
}

main();