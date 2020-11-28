const fs = require('fs');
const crypto = require('crypto')

function findHash5Zeros(error, key) {
    const prefix = "00000";

    for (let i = 0; i < 1000000; i++) {
        let coin = key + i;
        let hash = crypto.createHash('md5').update(coin).digest("hex");

        if (prefix === hash.substring(0, 5)) {
            console.log(i);
            // console.log(hash);
            return;
        }
    }
    console.log("Not found");
}

function findHash6Zeros(error, key) {
    const prefix = "000000";

    for (let i = 0; i < 10000000; i++) {
        let coin = key + i;
        let hash = crypto.createHash('md5').update(coin).digest("hex");

        if (prefix === hash.substring(0, 6)) {
            console.log(i);
            // console.log(hash);
            return;
        }
    }
    console.log("Not found");
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findHash5Zeros);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findHash6Zeros);
}

main();
