const fs = require('fs');

function ticketTranslation(err, data) {
    let parts = data.split("\n\n"); //[, ticket, nearby]
    let rules = parts[0].split("\n");
    let myTicket = parts[1].split("\n")
    .filter((a, i) => i > 0)
    .reduce((acc, val) => acc.concat(val, ''), '')
    .split(',')
    .map(Number);

    let nearbyTickets = parts[2].split("\n")
    .filter((a, i) => i > 0)
    .map(a => a.split(',').map(Number));

    let fields = {};
    let fieldsSet = new Set();

    for (let rule of rules) {
        let re = /^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/
        let [, field, r1, r2, r3, r4] = rule.match(re);
        field = field.replace(' ', '_');
        fields[field] = [ [r1, r2].map(Number), [r3, r4].map(Number)];
        fieldsSet.add(field);
    }

    // Find invalid tickets
    let invalidTickets = new Set();
    for (let i = 0; i < nearbyTickets.length; i++) {
        for (let j = 0; j < nearbyTickets[i].length; j++) {
            let ticket = nearbyTickets[i][j];
            let inRange = false;
            for (let f in fields) {
                if (isInRange(ticket, fields[f])) {
                    inRange = true;
                }
            }

            if (!inRange) {
                invalidTickets.add(`${i}-${j}`);
            }
        }
    }

    // Look for candidates of valid fields
    let positions = [];
    for (let j = 0; j < nearbyTickets[0].length; j++) {
        let possibleFields = new Set(fieldsSet);
        for (let i = 0; i < nearbyTickets.length; i++) {
            let ticket = nearbyTickets[i][j];
            let key = `${i}-${j}`;
            if (invalidTickets.has(key)) {
                continue;
            }

            for (let f in fields) {
                if (!isInRange(ticket, fields[f])) {
                    possibleFields.delete(f);
                }
            }
        }
        positions[j] = possibleFields;
    }

    // Assign a field to each position
    let finalPositions = new Map();
    while (finalPositions.size !== positions.length) {
        let fieldToDelete = '';
        for (let p = 0; p < positions.length; p++) {
            let possibleFields = positions[p];
            // Final position of field is found
            if (possibleFields.size === 1) {
                fieldToDelete = possibleFields.values().next().value;
                finalPositions.set(p, fieldToDelete);
                break;
            }
        }
        for (let p = 0; p < positions.length; p++) {
            let possibleFields = positions[p];
            possibleFields.delete(fieldToDelete);
        }
    }

    let product = 1;
    for (let [pos, field] of finalPositions.entries()) {
        if (field.indexOf('departure') > -1) {
            product *= myTicket[pos];
        }
    }
    console.log(product);
}

function isInRange(val, field) {
    for (let range of field) {
        if (val >= range[0] && val <= range[1]) {
            return true;
        }
    }

    return false;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', ticketTranslation);
    // fs.readFile(`${__dirname}/input1.txt`, 'utf8', ticketTranslation);
}

main();