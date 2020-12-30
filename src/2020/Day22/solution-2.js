const fs = require('fs');

function crabCombat(err, data) {
    let players = data.split("\n\n");
    let p1Deck = players[0].split("\n").filter(p => !isNaN(p)).map(Number);
    let p2Deck = players[1].split("\n").filter(p => !isNaN(p)).map(Number);

    let winner = recursiveCombat(p1Deck, p2Deck, 0);
    let winnerDeck = winner === 'p1' ? p1Deck : p2Deck;
    let score = 0;

    for (let i = 0; i < winnerDeck.length; i++) {
        score += winnerDeck[i] * (winnerDeck.length - i);
    }
    console.log(score);
}

function recursiveCombat(p1Deck, p2Deck, depth) {
    let previousRounds = new Set();

    while (p1Deck.length !== 0 && p2Deck.length !== 0) {
        let roundId = `${p1Deck.join(',')}-${p2Deck.join(',')}`;
        // If the round already exists in game, p1 wins to avoid inifinte loops
        if (previousRounds.has(roundId)) {
            return 'p1';
        }
        previousRounds.add(roundId);

        let p1Card = p1Deck.shift();
        let p2Card = p2Deck.shift();
        let winner;

        // If both players have at least the same number of cards as the one they drew, recurse
        if (p1Deck.length >= p1Card && p2Deck.length >= p2Card) {
            let p1DeckCopy = p1Deck.slice(0, p1Card);
            let p2DeckCopy = p2Deck.slice(0, p2Card);
            winner = recursiveCombat(p1DeckCopy, p2DeckCopy, depth + 1);
            if (winner === 'p1') {
                p1Deck.push(...[p1Card, p2Card])
            } else if (winner === 'p2') {
                p2Deck.push(...[p2Card, p1Card])
            }
        } else {
            if (p1Card > p2Card) {
                p1Deck.push(...[p1Card, p2Card])
            } else {
                p2Deck.push(...[p2Card, p1Card])
            }
        }
    }

    return p1Deck.length > 0 ? 'p1' : 'p2';
}



function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', crabCombat);
}

main();