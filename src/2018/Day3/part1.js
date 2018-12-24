const fs = require('fs');

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', parseClaims);
}

function parseClaims(err, data) {
    entries = data.split("\n");

    for (let i = 0; i < 100; i++) {
        printClaim(entries[i])
    }
}

function printClaim(claim) {

}
main();