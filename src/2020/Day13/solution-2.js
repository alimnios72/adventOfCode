const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');

function shuttleSearch(data, min) {
    let input = data.split("\n");
    let buses = input[1].split(",")
    .map((a, idx) => {
        if (!isNaN(a)) {
            return { offset: idx, value: Number(a) };
        }

        return null;
    })
    .filter(a => a != null);

    let found = false;
    let first = buses.shift();
    let i = ((min + first.value) - (min % first.value)) - first.value;
    while (!found) {
        let count = 0;
        i += first.value;
        for (let j = 0; j < buses.length; j++) {
            if (((i % buses[j].value) + buses[j].offset) === buses[j].value) {
                count++;
            } else {
                break;
            }
        }
        if (count == buses.length) {
            found = true;
        }
        
        if (i > Number.MAX_SAFE_INTEGER) {
            console.error("Result is larger than integer");
            break;
        }
    }
    console.log(i);
}

function main(){
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', (err, data) => shuttleSearch(data, 100000000000000));
    fs.readFile(`${__dirname}/input1.txt`, 'utf8', (err, data) => shuttleSearch(data, 1));
}

main();