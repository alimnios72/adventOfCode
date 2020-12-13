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
    let x, y;

    //North
    x = i - 1;
    y = j;
    while(x >= 0) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        x--;
    }

    //NorthEast
    x = i - 1;
    y = j + 1;
    while(x >=0 && y < layout[x].length) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        x--;
        y++;
    }

    //East
    x = i;
    y = j + 1;
    while(y < layout[x].length) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        y++;
    }

    //SouthEast
    x = i + 1;
    y = j + 1;
    while(x < layout.length && y < layout[x].length) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        x++;
        y++;
    }

    //South
    x = i + 1;
    y = j;
    while(x < layout.length) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        x++;
    }

    //SouthWest
    x = i + 1;
    y = j - 1;
    while(x < layout.length && y >= 0) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        x++;
        y--;
    }

    //West
    x = i;
    y = j - 1;
    while(y >= 0) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        y--;
    }

    //NorthWest
    x = i - 1;
    y = j - 1;
    while(x >= 0 && y >= 0) {
        if (layout[x][y] !== '.') {
            neighbors.push(layout[x][y]);
            break;
        }
        x--;
        y--;
    }

    let occupied = neighbors.filter(n => n === '#');
    if (seat === 'L') {
        return occupied.length > 0 ? seat : '#';
    } else if (seat === '#') {
        return occupied.length >= 5 ? 'L' : seat;
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculateSeats);
}

main();