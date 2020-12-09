const fs = require('fs');

const PREAMBLE = 25;

function findInvalidNumber(err, data) {
    let list = data.split("\n").map(Number);

    for (let i = 0; i < list.length - PREAMBLE; i++) {
        let next = list[i + PREAMBLE];
        let pream = list.slice(i, i + PREAMBLE);
        let unique = new Set(pream);
        let found = false;

        for (let j = 0; j < pream.length; j++) {
            let diff = next - pream[j];
            if (unique.has(diff)) {
                found = true;
            }
        }

        if (!found) {
            console.log(next);
            return;
        }
    }

}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findInvalidNumber);
}

main();