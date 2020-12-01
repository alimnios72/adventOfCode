const fs = require('fs');

function fixExpenseReport(err, data) {
    let entries = data.split("\n").map(Number);
    const entriesSet = new Set(entries);

    for (let entry of entries) {
        let diff = 2020 - entry;
        if (entriesSet.has(diff)) {
            console.log(entry * diff);
            return;
        }
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', fixExpenseReport);
}

main();