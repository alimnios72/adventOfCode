const fs = require('fs');

function euclideanDistance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function moveKnot(move, headPosition, tailPosition) {
    const delta = euclideanDistance(headPosition, tailPosition);

    if (delta >= 2) {
        // if diagonal
        if (headPosition.x !== tailPosition.x && headPosition.y !== tailPosition.y) {
            tailPosition.x += headPosition.x > tailPosition.x ? 1 : -1;
            tailPosition.y += headPosition.y> tailPosition.y ? 1 : -1;
        } else {
            switch(move.direction) {
                case 'U':
                    tailPosition.y++;
                    break;
                case 'R':
                    tailPosition.x++;
                    break;
                case 'D':
                    tailPosition.y--;
                    break;
                case 'L':
                    tailPosition.x--;
                    break;
            }
        }
    }

    return tailPosition;
}

function part1(err, data) {
    const movements = data.split('\n')
        .map(line => {
            const [direction, distance] = line.split(' ');
            return {
                direction,
                distance: parseInt(distance, 10)
            }
        });
    let tailPosition = { x: 0, y: 0 };
    let headPosition = { x: 0, y: 0 };
    let positionsVisited = [];
    positionsVisited.push(`0-0`);

    movements.forEach((move) => {
        for (let i = 0; i < move.distance; i++) {
            switch(move.direction) {
                case 'U':
                    headPosition.y++;
                    break;
                case 'R':
                    headPosition.x++;
                    break;
                case 'D':
                    headPosition.y--;
                    break;
                case 'L':
                    headPosition.x--;
                    break;
            }
            tailPosition = moveKnot(move, headPosition, tailPosition);
            positionsVisited.push(`${tailPosition.x}-${tailPosition.y}`);
        }
    });

    const uniquePositions = new Set(positionsVisited);
    console.log(uniquePositions.size);
}

function part2(err, data) {
    const movements = data.split('\n')
        .map(line => {
            const [direction, distance] = line.split(' ');
            return {
                direction,
                distance: parseInt(distance, 10)
            }
        });

    let headPosition = { x: 0, y: 0 };
    let knots = new Array(9).fill().map(u => ({ x: 0, y: 0 }));
    let positionsVisited = [];
    positionsVisited.push(`0-0`);

    movements.forEach((move) => {
        for (let i = 0; i < move.distance; i++) {
            switch(move.direction) {
                case 'U':
                    headPosition.y++;
                    break;
                case 'R':
                    headPosition.x++;
                    break;
                case 'D':
                    headPosition.y--;
                    break;
                case 'L':
                    headPosition.x--;
                    break;
            }
            let currentHead = { ...headPosition };
            knots.forEach(knot => {
                currentHead = moveKnot(move, currentHead, knot);
            });
            tailPosition = knots[knots.length - 1];
            positionsVisited.push(`${tailPosition.x}-${tailPosition.y}`);
        }
        console.log(knots)
    });

    //Verificar == D 3 ==
    const uniquePositions = new Set(positionsVisited);
    console.log(uniquePositions.size);
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input1.txt`, 'utf8', part2);
}

main();