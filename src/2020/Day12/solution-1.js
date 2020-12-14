const fs = require('fs');

const ORIENTATION = {
    'NORTH': 0,
    'EAST': 1,
    'SOUTH': 2,
    'WEST': 3
};

const ORIENTATION_MAP = {
    'N': 'NORTH',
    'S': 'SOUTH',
    'E': 'EAST',
    'W': 'WEST'
}

const DIRECTION = {
    'R': 1,
    'L': -1
};

function getShipDistance(err, data) {
    let instructions = data.split("\n");
    let origin = { x: 0, y: 0 };
    let destination = { x: 0, y: 0 };
    let currentOrientation = ORIENTATION.EAST;

    for (let instruction of instructions) {
        let action = instruction.substr(0, 1);
        let value = parseInt(instruction.substr(1), 10);
        let rotation = 0;

        switch(action) {
            case 'R':
            case 'L':
                rotation = DIRECTION[action] * (value / 90);
                currentOrientation = (currentOrientation + rotation + 4) % 4;
                break;
            case 'F':
                move(currentOrientation, value, destination);
                break;
            default:
                move(ORIENTATION[ORIENTATION_MAP[action]], value, destination);
                break;
        }
    }

    let distance = manhattanDistance(origin, destination);
    console.log(distance);
}

function move(orientation, value, destination) {
    switch(orientation) {
        case ORIENTATION.NORTH:
            destination.y += value;
            break;
        case ORIENTATION.SOUTH:
            destination.y -= value;
            break;
        case ORIENTATION.EAST:
            destination.x += value;
            break;
        case ORIENTATION.WEST:
            destination.x -= value;
            break;
    }
}

function manhattanDistance(origin, destination) {
    return Math.abs(origin.x - destination.x) + Math.abs(origin.y - destination.y);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getShipDistance);
}

main();