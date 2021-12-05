const fs = require('fs');

function bingoMatches(err, data) {
    let rawData = data.split("\n");
    let draws = rawData[0].split(',').map(Number);
    let bingoBoards = parseBingoBoards(rawData.slice(2));

    for (let draw of draws) {
        for (let board of bingoBoards) {
            updateMatches(draw, board);
            if (checkWinner(board)) {
                console.log(draw * sumUnmarked(board));
                return;
            }
        }
    }
}

function last2Win(err, data) {
    let rawData = data.split("\n");
    let draws = rawData[0].split(',').map(Number);
    let bingoBoards = parseBingoBoards(rawData.slice(2));
    let winners = bingoBoards.reduce((acc, val, index) => {
        acc[index] = 1
        return acc;
    }, {});

    for (let draw of draws) {
        let b = 0;

        for (let board of bingoBoards) {
            updateMatches(draw, board);
            if (checkWinner(board)) {
                delete winners[b];
            }
            b++;

            if (Object.keys(winners).length === 0) {
                console.log(draw * sumUnmarked(board));
                return;
            }
        }
    }

    console.log(winners);
}

function parseBingoBoards(rawData) {
    let boards = [], boardInfo = {}, board = [], nums = [];

    for (let line of rawData) {
        if (line.length === 0) {
            boardInfo['board'] = board;
            boardInfo['nums'] = nums;
            boardInfo['matches'] = [];
            boards.push(boardInfo);
            boardInfo = {};
            board = [];
            nums = [];
        } else {
            let row = line.split(' ').filter((num) => num !== '').map(Number);
            nums = [...nums, ...row];
            board.push(row);
        }
    }

    return boards;
}

function updateMatches(draw, board) {
    if (board.nums.indexOf(draw) > -1) {
        board.matches.push(draw);
    }
}

function checkWinner(boardInfo) {
    if (boardInfo.matches.length < 5) return false;

    for (let i = 0; i < boardInfo.board.length; i++){
        let matches = 0;
        for (let j = 0; j < boardInfo.board[0].length; j++) {
            if (boardInfo.matches.indexOf(boardInfo.board[i][j]) > -1) {
                matches++;
            }
        }

        if (matches === 5) {
            return true;
        }
    }

    for (let j = 0; j < boardInfo.board[0].length; j++){
        let matches = 0;
        for (let i = 0; i < boardInfo.board.length; i++) {
            if (boardInfo.matches.indexOf(boardInfo.board[i][j]) > -1) {
                matches++;
            }
        }

        if (matches === 5) {
            return true;
        }
    }

    return false;
}

function sumUnmarked(boardInfo) {
    let sum = 0;

    for (let i = 0; i < boardInfo.board.length; i++){
        for (let j = 0; j < boardInfo.board[0].length; j++) {
            if (boardInfo.matches.indexOf(boardInfo.board[i][j]) === -1) {
                sum += boardInfo.board[i][j];
            }
        }

    }

    return sum;
}


function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', bingoMatches);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', last2Win);
}

main();