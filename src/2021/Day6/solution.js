const fs = require('fs');

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findOverlaps);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findOverlapsWithD);
}

main();