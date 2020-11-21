const fs = require('fs');

const KEY_PAD = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

function findBathroomCode(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let currentIndex = [1, 1];
    let bathCode = [];

    for (let line of lines) {
        for (let c of line) {
            currentIndex = move(currentIndex, c)
        }
        bathCode.push(KEY_PAD[currentIndex[0]][currentIndex[1]]);
    }

    console.log(bathCode);
}

function move(index, direction) {
    switch(direction) {
        case 'U':
            index[0] = Math.max(0, index[0] - 1);
            break;
        case 'R':
            index[1] = Math.min(2, index[1] + 1);
            break;
        case 'D':
            index[0] = Math.min(2, index[0] + 1);
            break;
        case 'L':
            index[1] = Math.max(0, index[1] - 1);
            break;
    }

    return index;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findBathroomCode);
}

main();