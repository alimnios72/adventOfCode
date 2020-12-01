const fs = require('fs');

function fixExpenseReport(err, data) {
    let entries = data.split("\n").map(Number);
    const entriesSet = new Set(entries);
    
    for (i = 0; i < entries.length - 2; i++) {
        for (j = i + 1; j < entries.length - 1; j++) {
            let diff = 2020 - (entries[i] + entries[j]);
            if (entriesSet.has(diff)) {
                console.log(entries[i] * entries[j] * diff);
                return;
            }
        }
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', fixExpenseReport);
}

main();