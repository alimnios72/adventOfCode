const fs = require('fs');
const LinkedList = require('../../utils/LinkedList');

const MOVES = 10000000;
const TOTAL_CUPS = 1000000;

const FACTOR = Math.floor(MOVES / 16); //remove

function crabCups(err, data) {
    let input = Array.from(data).map(Number);
    let max = Math.max.apply(null, input);

    let game = new LinkedList();
    let hash = new Map();
    for (let num of input) {
        hash.set(num, game.insert(num));
    }
    for (let i = max + 1; i <= TOTAL_CUPS; i++) {
        hash.set(i, game.insert(i));
    }


    for (let m = 0; m < MOVES; m++) {
        let currentCup = game.deleteAt(0);
        hash.delete(currentCup);
        let pickUp = [];
        pickUp[0] = game.deleteAt(0);
        hash.delete(pickUp[0]);
        pickUp[1] = game.deleteAt(0);
        hash.delete(pickUp[1]);
        pickUp[2] = game.deleteAt(0);
        hash.delete(pickUp[2]);

        let destination = findDestination(pickUp, currentCup - 1, hash);

        destination = game.insertAfter(destination, pickUp[0]);
        hash.set(pickUp[0], destination);
        destination = game.insertAfter(destination, pickUp[1]);
        hash.set(pickUp[1], destination);
        destination = game.insertAfter(destination, pickUp[2]);
        hash.set(pickUp[2], destination);

        hash.set(currentCup, game.insert(currentCup));


        if ((m + 1) % FACTOR === 0) {
            console.log(`Reached ${(m+1)/MOVES*100}%`);
        }
    }

    let start = hash.get(1);
    let first = start.next;
    let second = first.next;
    console.log(first.data, second.data, first.data * second.data);
}

function findDestination(pickUp, toFind, hash) {
    let localMax = TOTAL_CUPS;
    let localMin = 1;
    let tmp = pickUp.slice();
    tmp.push(toFind + 1);
    for (let p of tmp.sort()) {
        if (p === localMin) {
            localMin++;
        }
    }
    for (let p of tmp.sort().reverse()) {
        if (p === localMax) {
            localMax--;
        }
    }

    while (!hash.has(toFind) && toFind > localMin) {
        toFind--;
    }

    let destination = hash.get(toFind);

    if (destination) {
        return destination;
    }

    return hash.get(localMax);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', crabCups);
}

main();