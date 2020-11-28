const fs = require('fs');

function shortestDistance(error, data) {
    let wires = data.split("\n");
    let collisions = [];
    let map = {};
    let position = { x: 0, y: 0, moves: 0 };
    let wireNum = 0;

    for (let wire of wires) {
        let paths = wire.split(",");
        for (let path of paths) {
            walk(position, map, path, collisions, wireNum);
        }
        position.x = 0;
        position.y = 0;
        position.moves = 0;
        wireNum++;
    }

    let min = 999999;
    for (let collision of collisions) {
        let [x, y] = collision.split(',').map(Number);
        let manhatan = Math.abs(0 - x) + Math.abs(0 - y);
        min = Math.min(min, manhatan);
    }
    console.log(min);
}

function shortestMoves(error, data) {
    let wires = data.split("\n");
    let collisions = [];
    let map = {};
    let position = { x: 0, y: 0, moves: 0 };
    let wireNum = 0;

    for (let wire of wires) {
        let paths = wire.split(",");
        for (let path of paths) {
            walk(position, map, path, collisions, wireNum);
        }
        position.x = 0;
        position.y = 0;
        position.moves = 0;
        wireNum++;
    }

    let min = 999999;
    for (let collision of collisions) {
        let [x, y, m] = collision.split(',').map(Number);
        min = Math.min(min, m);
    }
    console.log(min);
}

function walk(pos, map, path, collisions, wire) {
    let direction = path.substring(0, 1);
    let steps = Number(path.substring(1));

    for (let i = 0; i < steps; i ++) {
        switch (direction) {
            case 'R':
                pos.x++;
                break;
            case 'U':
                pos.y++;
                break;
            case 'L':
                pos.x--;
                break;
            case 'D':
                pos.y--;
                break;
            default:
                break;
        }
        pos.moves++;
        let key = `${pos.x},${pos.y}`;
        if (!map.hasOwnProperty(key)) {
            map[key] = {
                wire: wire,
                moves: pos.moves
            };
        } else if (map[key].wire !== wire) {
            key += "," + (parseInt(map[key].moves) + parseInt(pos.moves));
            collisions.push(key);
        }
    }
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', shortestDistance);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', shortestMoves);
}

main();