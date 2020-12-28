const fs = require('fs');

const DAYS = 100;
let movements = { '0,0': 'w' };

function lobbyLayout(err, data) {
    let lines = data.split("\n");
    let currPos = { x: 0, y: 0 };
    let count = 0;

    for (let line of lines) {
        let i = 0;
        while (i < line.length) {
            let char = line[i];
            if (char === 'n' || char === 's') {
                move(line.substr(i, 2), currPos);
                i += 2;
            } else {
                move(char, currPos);
                i += 1;
            }
        }
        flip(currPos);
        currPos = { x: 0, y: 0 }
    }

    simulate();
    for (let m in movements) {
        if (movements[m] === 'b') {
            count++;
        }
    }

    console.log(count);
}

function simulate() {
    for (let d = 0; d < DAYS; d++) {
        flipDay();
    }
}

function move(direction, position) {
    switch (direction) {
        case 'ne':
            position.y++;
            break;
        case 'e':
            position.x++;
            break;
        case 'se':
            position.x++;
            position.y--;
            break;
        case 'sw':
            position.y--;
            break;
        case 'w':
            position.x--;
            break;
        case 'nw':
            position.x--;
            position.y++;
            break;
    }
}

function flip(position) {
    let key = `${position.x},${position.y}`;
    if (!movements.hasOwnProperty(key)) {
        movements[key] = 'b';
    } else { //Toggle
        movements[key] = movements[key] === 'w' ? 'b' : 'w';
    }
}

function flipDay() {
    let inScope = {};
    for (let m in movements) {
        inScope[m] = movements[m];
        addNeighbors(m, inScope);
    }

    let newMap = {};
    for (let i in inScope) {
        let val = toggle(i, inScope[i]);
        newMap[i] = val;
    }
    movements = null;
    movements = newMap;
}

function addNeighbors(position, hash) {
    let [x, y] = position.split(',').map(Number);

    hash[`${x - 1},${y}`] = movements[`${x - 1},${y}`] || 'w';
    hash[`${x - 1},${y + 1}`] = movements[`${x - 1},${y + 1}`] || 'w';
    hash[`${x},${y + 1}`] = movements[`${x},${y + 1}`] || 'w';
    hash[`${x + 1},${y}`] = movements[`${x + 1},${y}`] || 'w';
    hash[`${x + 1},${y - 1}`] = movements[`${x + 1},${y - 1}`] || 'w';
    hash[`${x},${y - 1}`] = movements[`${x},${y - 1}`] || 'w';
}

function toggle(position, state) {
    let [x, y] = position.split(',').map(Number);
    let neighbors = [];

    neighbors.push(movements[`${x - 1},${y}`]);
    neighbors.push(movements[`${x - 1},${y + 1}`]);
    neighbors.push(movements[`${x},${y + 1}`]);
    neighbors.push(movements[`${x + 1},${y}`]);
    neighbors.push(movements[`${x + 1},${y - 1}`]);
    neighbors.push(movements[`${x},${y - 1}`]);

    let bCount = neighbors.map(t => t != null ? t : 'w')
    .reduce((acc, val) => {
        if (val === 'b') {
            acc++;
        }
        return acc;
    }, 0);

    if (state === 'b' && (bCount === 0 || bCount > 2)) {
        state = 'w';
    } else if (state === 'w' && bCount === 2) {
        state = 'b';
    }

    return state;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', lobbyLayout);
}

main();