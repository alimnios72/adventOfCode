const fs = require('fs');

const MOVES = 100;

function crabCups(err, data) {
    let game = Array.from(data).map(Number);

    for (let m = 0; m < MOVES; m++) {
        let pickUp = game.splice(1, 3);
        let currentCup = game.shift();
        let destination = findDestination(currentCup - 1, game);
        game.splice(destination + 1, 0, ...pickUp);
        game.push(currentCup);
    }

    let start = game.indexOf(1);
    let labels = '';
    for (let i = 1; i < game.length; i++) {
        let next = (i + start) % game.length;
        labels += game[next];
    }

    console.log(labels);
}

function findDestination(toFind, game) {
    let min = Math.min.apply(null, game);
    let max = Math.max.apply(null, game);
    let destination = -1;

    while (game.indexOf(toFind) === -1 && toFind > min) {
        toFind--;
    }

    destination = game.indexOf(toFind);

    if (destination !== -1) {
        return destination;
    }

    return game.indexOf(max);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', crabCups);
}

main();