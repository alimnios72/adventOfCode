const fs = require('fs');

const ORIENTATION = {
    'NORTH': 0,
    'EAST': 1,
    'SOUTH': 2,
    'WEST': 3
};

const DIRECTION = {
    'R': 1,
    'L': -1
};

function findShortestDistance(error, data) {
    let movements = data.split(',').map(x => x.trim());
    let origin = { x: 0, y: 0 };
    let destination = getDestination(movements);
    let distance = taxiCabDistance(origin, destination);

    console.log(distance);
    return distance;
}

function getDestination(movements){
    let destination = { x: 0, y: 0 };
    let currentOrientation = ORIENTATION.NORTH;
    let visited = {};

    for (let m of movements) {
        let direction = m.substr(0, 1);
        let blocks = parseInt(m.substr(1), 10);

        currentOrientation = (currentOrientation + DIRECTION[direction] + 4) % 4;

        for (let i = 0; i < blocks; i++) {
            switch (currentOrientation) {
                case ORIENTATION.NORTH:
                    destination.y += 1;
                    break;
                case ORIENTATION.EAST:
                    destination.x += 1;
                    break;
                case ORIENTATION.WEST:
                    destination.x -= 1;
                    break;
                case ORIENTATION.SOUTH:
                    destination.y -= 1;
                    break;
            }

            let key = `${destination.x.toString()}-${destination.y.toString()}`;

            if (visited.hasOwnProperty(key)) {
                return destination;
            }
            visited[key] = 1;
        }
    }

    return destination;
}

function taxiCabDistance(origin, destination) {
    return Math.abs(origin.x - destination.x) + Math.abs(origin.y - destination.y);
}


function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findShortestDistance);
}

main();