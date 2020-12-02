const fs = require('fs');

function countValidPasswords(err, data) {
    let passwords = data.split("\n").map(a => a.trim());
    let passCount = 0;

    for (let pass of passwords) {
        let count = 0;
        let re = /(\d+)-(\d+) (.+): (.*)/;
        let [, start, end, char, test] = pass.match(re);

        for (let c of test) {
            if (c === char) {
                count++;
            }
        }

        if (count >= Number(start) && count <= Number(end)) {
            passCount++;
        }
    }

    console.log(passCount);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', countValidPasswords);
}

main();