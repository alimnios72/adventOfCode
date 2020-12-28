const fs = require('fs');

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

    for (let m in movements) {
        if (movements[m] === 'b') {
            count++;
        }
    }

    console.log(count);
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

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', lobbyLayout);
}

main();