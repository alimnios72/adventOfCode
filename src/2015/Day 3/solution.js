const fs = require('fs');

function totalDeliveries(error, data) {
    let locations = { "0,0": 1 };
    let deliveries = 1;
    let x = 0, y = 0;

    for (let move of data) {
        switch (move) {
            case "^":
                y++;
                break;
            case ">":
                x++;
                break;
            case "v":
                y--;
                break;
            case "<":
                x--;
                break;
            default:
                break;
        }

        let location = `${x},${y}`;
        if (!locations.hasOwnProperty(location)) {
            locations[location] = 1;
            deliveries++;
        }
    }
    console.log(deliveries);
}

function roboDeliveries(error, data) {
    let locations = { "0,0": 1 };
    let santa = {
        x: 0,
        y: 0
    };
    let roboSanta = {
        x: 0,
        y: 0
    };
    let i = 0;
    let deliveries = 1;

    let movement = (person, move) => {
        switch (move) {
            case "^":
                person.y++;
                break;
            case ">":
                person.x++;
                break;
            case "v":
                person.y--;
                break;
            case "<":
                person.x--;
                break;
            default:
                break;
        }
        return `${person.x},${person.y}`;
    };

    for (let move of data) {
        let location;
        if (i % 2 === 0) {
            location = movement(santa, move);
        } else {
            location = movement(roboSanta, move);
        }

        if (!locations.hasOwnProperty(location)) {
            locations[location] = 1;
            deliveries++;
        }
        i++
    }
    console.log(deliveries);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', totalDeliveries);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', roboDeliveries);
}

main();