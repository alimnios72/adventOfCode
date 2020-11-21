const fs = require('fs');

const KEY_PAD = [
    ['*', '*', '1', '*', '*'],
    ['*', '2', '3', '4', '*'],
    ['5', '6', '7', '8', '9'],
    ['*', 'A', 'B', 'C', '*'],
    ['*', '*', 'D', '*', '*'],
];

function findBathroomCode(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let currentIndex = [2, 0];
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
    let [i, j] = index;
    switch(direction) {
        case 'U':
            if (KEY_PAD[i - 1] && KEY_PAD[i - 1][j] && KEY_PAD[i - 1][j] !== '*') {
                index[0]--;
            }
            break;
        case 'R':
            if (KEY_PAD[i][j + 1] && KEY_PAD[i][j + 1] !== '*') {
                index[1]++;
            }
            break;
        case 'D':
            if (KEY_PAD[i + 1] && KEY_PAD[i + 1][j] && KEY_PAD[i + 1][j] !== '*') {
                index[0]++;
            }
            break;
        case 'L':
            if (KEY_PAD[i][j - 1] && KEY_PAD[i][j - 1] !== '*') {
                index[1]--;
            }
            break;
    }

    return index;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findBathroomCode);
}

main();