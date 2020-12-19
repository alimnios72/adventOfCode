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
    let ship = { x: 0, y: 0 };
    let waypoint = { x: 10, y: 1 };
    let currentOrientation = {
        a: ORIENTATION.EAST,
        b: ORIENTATION.NORTH
    }
    let rotation;

    for (let instruction of instructions) {
        let action = instruction.substr(0, 1);
        let value = parseInt(instruction.substr(1), 10);

        switch(action) {
            case 'R':
            case 'L':
                rotation = DIRECTION[action] * (value / 90);
                let {x, y} = waypoint;
                currentOrientation.a = x >= 0 ? ORIENTATION.EAST : ORIENTATION.WEST;
                currentOrientation.b = y >= 0 ? ORIENTATION.NORTH : ORIENTATION.SOUTH;
                currentOrientation.a = (currentOrientation.a + rotation + 4) % 4;
                currentOrientation.b = (currentOrientation.b + rotation + 4) % 4;
                if (Math.abs(rotation) % 2 !== 0) {
                    let tmp = x;
                    x = y;
                    y = tmp;
                    rotateWaypoint(waypoint, currentOrientation.a, Math.abs(y));
                    rotateWaypoint(waypoint, currentOrientation.b, Math.abs(x));
                } else {
                    rotateWaypoint(waypoint, currentOrientation.a, Math.abs(x));
                    rotateWaypoint(waypoint, currentOrientation.b, Math.abs(y));
                }
                break;
            case 'F':
                moveShip(ship, waypoint, value);
                break;
            default:
                moveWayPoint(ORIENTATION[ORIENTATION_MAP[action]], waypoint, value);
                break;
        }
    }

    let distance = manhattanDistance(origin, ship);
    console.log(distance);
}

function moveShip(ship, waypoint, value) {
    ship.x += waypoint.x * value;
    ship.y += waypoint.y * value;
}

function moveWayPoint(orientation, waypoint, value) {
    switch(orientation) {
        case ORIENTATION.NORTH:
            waypoint.y += value;
            break;
        case ORIENTATION.SOUTH:
            waypoint.y -= value;
            break;
        case ORIENTATION.EAST:
            waypoint.x += value;
            break;
        case ORIENTATION.WEST:
            waypoint.x -= value;
            break;
    }
}

function rotateWaypoint(waypoint, currentOrientation, value) {
    switch(currentOrientation) {
        case ORIENTATION.NORTH:
            waypoint.y = value;
            break;
        case ORIENTATION.SOUTH:
            waypoint.y = -value;
            break;
        case ORIENTATION.EAST:
            waypoint.x = value;
            break;
        case ORIENTATION.WEST:
            waypoint.x = -value;
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