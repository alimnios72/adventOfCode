const fs = require('fs');

function countValidPasswords(err, data) {
    let passwords = data.split("\n").map(a => a.trim());
    let passCount = 0;

    for (let pass of passwords) {
        let re = /(\d+)-(\d+) (.+): (.*)/;
        let [, start, end, char, test] = pass.match(re);
        let first = test[Number(start) - 1];
        let second = test[Number(end) - 1];

        if ((first === char || second === char) && first !== second) {
            passCount++;
        }
    }

    console.log(passCount);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', countValidPasswords);
}

main();