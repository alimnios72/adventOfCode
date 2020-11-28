const fs = require('fs');

function findComplexPassword(error, data) {
    let limits = data.split("-").map(Number);
    let results = [];

    for (let i = limits[0]; i <= limits[1]; i++) {
        let str = i.toString();

        if (isValidPassword(str)) {
            results.push(i);
        }
    }
    console.log(results.length);
}

function isValidPassword(str) {
    let prev = str[0];
    let maxLen = 1;
    let groups = [];

    for (let c = 1; c < str.length; c++) {
        if (prev > str[c]) {
            return false;
        }

        if (prev === str[c]) {
            maxLen++;
        } else {
            groups.push(maxLen);
            maxLen = 1;
        }
        prev = str[c];
    }
    // Last group
    groups.push(maxLen);

    return groups.indexOf(2) > -1;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findComplexPassword);
    // let res = isValidPassword('111122')
    // console.log(res);
}

main();