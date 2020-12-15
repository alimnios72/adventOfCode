const fs = require('fs');

function shuttleSearch(err, data) {
    let input = data.split("\n");
    let earliestDepart = Number(input[0]);
    let buses = input[1].split(",").filter(b => !isNaN(b)).map(Number);
    let minWait = Number.MAX_SAFE_INTEGER;
    let busId = 0;

    for (let id of buses) {
        let remain = earliestDepart % id;
        if (remain === 0) {
            busId = id;
            minWait = 0;
            break;
        }

        if ((id - remain) < minWait) {
            busId = id;
            minWait = id - remain;
        }
    }

    console.log(busId * minWait);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', shuttleSearch);
}

main();