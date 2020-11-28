const fs = require('fs');

function findPassword(error, data) {
    let limits = data.split("-").map(Number);
    let results = [];

    for (let i = limits[0]; i <= limits[1]; i++) {
        let str = i.toString();
        let prev = null;
        let equal = false;
        let valid = true;
        for (let c of str) {
            if (prev > c) {
                valid = false;
            }
            if (prev === c) {
                equal = true;
            }
            prev = c;
        }
        if (equal && valid) {
            results.push(i);
        }
    }
    console.log(results.length);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findPassword);
}

main();