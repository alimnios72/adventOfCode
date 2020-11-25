const fs = require('fs');

const WIDTH = 50;
const HEIGHT = 6;
let DISPLAY = Array.from(Array(HEIGHT), () => new Array(WIDTH).fill('.'));

function renderDisplay(error, data) {
    let commands = data.split('\n').map(a => a.trim());
    let msg = '';

    for (let command of commands) {
        processCommand(command);
    }
   
    for (let i = 0; i < HEIGHT; i++) {
        for (let j = 0; j < WIDTH; j++) {
            if (j !==0 && j % 5 ===0) {
                msg += ' ';
            }
            msg += DISPLAY[i][j];
        }
        msg += "\n";
    }
    console.table(msg);
}

function processCommand(command) {
    if (command.indexOf('rect') > -1) {
        let re = /^rect\s(\d+)x(\d+)/;
        let [, w, h] = command.match(re).map(Number);
        drawRect(w, h);
    } else if (command.indexOf('rotate') > -1) {
        let re = /rotate (column|row) [x|y]=(\d+) by (\d+)/;
        let [, direction, index, value] = command.match(re);
        if (direction === 'column') {
            shiftColumn(Number(index), Number(value));
        } else if (direction === 'row') {
            shiftRow(Number(index), Number(value));
        }
    }
}

function drawRect(width, height) {
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            DISPLAY[i][j] = '#';
        }
    }
}

function shiftColumn(index, value) {
    let column = new Array(HEIGHT);
    for (let i = 0; i < HEIGHT; i++) {
        let newRowIdx = (i + value) % HEIGHT;
        column[newRowIdx] = DISPLAY[i][index];
    }

    for (let i = 0; i < HEIGHT; i++) {
        DISPLAY[i][index] = column[i];
    }
}

function shiftRow(index, value) {
    let row = new Array(WIDTH);

    for (let j = 0; j < WIDTH; j++) {
        let newColumnIdx = (j + value) % WIDTH;
        row[newColumnIdx] = DISPLAY[index][j];
    }

    DISPLAY[index] = row;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', renderDisplay);
}

main();