const fs = require('fs');

function part1(error, data) {
    const term = 'XMAS';
    const neighbors = [
        [ [0, -1], [0, -2], [0, -3] ],
        [ [1, -1], [2, -2], [3, -3] ],
        [ [1, 0], [2, 0], [3, 0] ],
        [ [1, 1], [2, 2], [3, 3] ],
        [ [0, 1], [0, 2], [0, 3] ],
        [ [-1, 1], [-2, 2], [-3, 3] ],
        [ [-1, 0], [-2, 0], [-3, 0] ],
        [ [-1, -1], [-2, -2], [-3, -3] ],
    ];
    const matrix = data.split('\n').map(l => l.split(''));
    let sum = 0;

    const visitNeighbors = (i, j) => {
        for (let direction of neighbors) {
            let sub = 'X';
            for (let coord of direction) {
                if (!matrix[i + coord[0]] || !matrix[i + coord[0]][j + coord[1]]) {
                    sub += '.';
                } else {
                    sub += matrix[i + coord[0]][j + coord[1]];
                }
            }

            if (sub === term) sum++;
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 'X') {
                visitNeighbors(i, j)
            }
        }
    }
    console.log(sum);
}

function part2(error, data) {
    const neighbors = [
        [ [-1, -1], [0, 0], [1, 1] ],
        [ [1, -1], [0, 0], [-1, 1] ],
    ];
    const matrix = data.split('\n').map(l => l.split(''));
    let sum = 0;

    const visitNeighbors = (i, j) => {
        let isX = true;
        for (let direction of neighbors) {
            let sub = '';
            for (let coord of direction) {
                if (!matrix[i + coord[0]] || !matrix[i + coord[0]][j + coord[1]]) {
                    sub += '.';
                } else {
                    sub += matrix[i + coord[0]][j + coord[1]];
                }
            }

            if (sub !== 'MAS' && sub !== 'SAM') isX = false;
        }

        if (isX) sum++;
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 'A') {
                visitNeighbors(i, j)
            }
        }
    }
    console.log(sum);
}


function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();