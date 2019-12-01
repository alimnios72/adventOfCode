const fs = require('fs');

function calculateFloor(error, data) {
    let floor = 0;

    for (let char of data) {
        if (char === "(") {
            floor++;
        } else if (char === ")") {
            floor--;
        }
    }
    console.log(floor);
}

function calculateBasement(error, data) {
    let floor = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i] === "(") {
            floor++;
        } else if (data[i] === ")") {
            floor--;
        }
        
        if (floor === -1) {
            console.log(i + 1);
            break;
        }
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculateFloor);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculateBasement);
}

main();