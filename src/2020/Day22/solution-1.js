const fs = require('fs');

function crabCombat(err, data) {
    let players = data.split("\n\n");
    let p1Deck = players[0].split("\n").filter(p => !isNaN(p)).map(Number);
    let p2Deck = players[1].split("\n").filter(p => !isNaN(p)).map(Number);

    while (p1Deck.length !== 0 && p2Deck.length !== 0) {
        let p1Card = p1Deck.shift();
        let p2Card = p2Deck.shift();

        if (p1Card > p2Card) {
            p1Deck.push(p1Card);
            p1Deck.push(p2Card);
        } else {
            p2Deck.push(p2Card);
            p2Deck.push(p1Card);
        }
    }

    let score = 0;
    let winnerDeck = p1Deck.length > 0 ? p1Deck : p2Deck;

    for (let i = 0; i < winnerDeck.length; i++) {
        score += winnerDeck[i] * (winnerDeck.length - i);
    }
    console.log(score);
}



function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', crabCombat);
}

main();