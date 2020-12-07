const fs = require('fs');

function getHighestSeatId(err, data) {
    let bPasses = data.split("\n");
    let ids = [];

    for (let pass of bPasses) {
        let row = getRow(pass.substr(0, 7), 0, 0, 127);
        let column = getColumn(pass.substr(-3), 0, 0, 7);
        let id = (row * 8) + column;
        ids.push(id);
    }

    let mySeat = findSeat(ids);
    console.log(mySeat);
}

function findSeat(ids){
    ids.sort((a, b) => a - b);

    for (let i = 1; i < ids.length - 1; i++) {
        let next = ids[ i + 1];
        if (next - ids[i] > 1) {
            return ids[i] + 1;
        }
    }

}

function getRow(str, index, low, high){
    let char = str[index];

    if (char === 'F') {
        high = low + Math.floor((high - low) / 2);
    } else if (char === 'B'){
        low = low + Math.floor((high + 1 - low) / 2);
    }

    index++;

    if (index === str.length) {
        return char === 'F' ? high : low;
    } else {
        return getRow(str, index, low, high);
    }
}

function getColumn(str, index, low, high){
    let char = str[index];

    if (char === 'L') {
        high = low + Math.floor((high - low) / 2);
    } else if (char === 'R') {
        low = low + Math.floor((high + 1 - low) / 2);
    }

    index++;

    if (index === str.length) {
        return char === 'L' ? high : low;
    } else {
        return getColumn(str, index, low, high);
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getHighestSeatId);
}

main();