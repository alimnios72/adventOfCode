const fs = require('fs');

let layout = [];

function calculateSeats(err, data) {
    layout = data.split("\n").map(a => Array.from(a));

    while(runRound()) {}
    let occupiedSeats = layout.reduce((acc, cur) => {
        let oc = cur.filter(f => f === '#');
        return acc + oc.length;
    }, 0);

    console.log(occupiedSeats);
}

function runRound() {
    let temp = layout.map(function(arr) {
        return arr.slice();
    });

    let didChange = false;

    for (let i = 0; i < layout.length; i ++) {
        for (let j = 0; j < layout[i].length; j ++) {
            temp[i][j] = applySeatRule(layout[i][j], i, j);

            if (layout[i][j] !== temp[i][j]) {
                didChange = true;
            }
        }
    }

    layout = temp;

    return didChange;
}

function applySeatRule(seat, i, j) {
    if (seat === '.') {
        return seat;
    }

    let neighbors = [];

    for (let x = i - 1; x <= i + 1; x++) {
        for (let y = j - 1; y <= j + 1; y++) {
            if ((x >= 0 && x < layout.length) && (y >= 0 && y < layout[x].length) && !(x === i && y === j)) {
                neighbors.push(layout[x][y]);
            }
        }
    }

    let occupied = neighbors.filter(n => n === '#');
    if (seat === 'L') {
        return occupied.length > 0 ? seat : '#';
    } else if (seat === '#') {
        return occupied.length >= 4 ? 'L' : seat;
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculateSeats);
}

main();