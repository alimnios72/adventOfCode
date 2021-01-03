const fs = require('fs');

function ticketTranslation(err, data) {
    let parts = data.split("\n\n");
    let rules = parts[0].split("\n");
    let nearbyTickets = parts[2].split("\n")
    .filter((a, i) => i > 0)
    .reduce((acc, val) => acc.concat(val, ','), '')
    .slice(0, -1)
    .split(',')
    .map(Number);

    let ranges = [];
    let errors = 0;

    for (let rule of rules) {
        let re = /^.+: (\d+)-(\d+) or (\d+)-(\d+)$/
        let [, r1, r2, r3, r4] = rule.match(re);
        ranges.push([r1, r2].map(Number));
        ranges.push([r3, r4].map(Number));
    }

    for (let ticket of nearbyTickets) {
        let inRange = false;
        for (let range of ranges) {
            if (ticket >= range[0] && ticket <= range[1]) {
                inRange = true;
            }
        }

        if (!inRange) {
            errors += ticket;
        }
    }

    console.log(errors);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', ticketTranslation);
}

main();