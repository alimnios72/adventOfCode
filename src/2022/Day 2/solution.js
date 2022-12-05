const fs = require('fs');

const SHAPE_SCORE = {
    'X': 1,
    'Y': 2,
    'Z': 3
};

const RULES = {
    'A': {
        'X': 'draw',
        'Z': 'lose',
        'Y': 'win'
    },
    'B': {
        'Y': 'draw',
        'X': 'lose',
        'Z': 'win'
    },
    'C': {
        'Z': 'draw',
        'Y': 'lose',
        'X': 'win'
    },
    'X': {
        'A': 'draw',
        'C': 'win',
        'B': 'lose'
    },
    'Y': {
        'B': 'draw',
        'A': 'win',
        'C': 'lose'
    },
    'Z': {
        'C': 'draw',
        'B': 'win',
        'A': 'lose'
    }
}

function getRoundScore(p1, p2) {
    let score = 0;

    switch (RULES[p2][p1]) {
        case 'win':
            score = 6;
            break;
        case 'draw':
            score = 3;
            break;
        case 'lose':
        default:
            score = 0;
            break;
    }

    return score + SHAPE_SCORE[p2];
}

function neededHand(p1, p2) {
    let needTo = p2 === 'X' ? 'lose' : p2 === 'Y' ? 'draw' : 'win';
    let hand1 = RULES[p1];

    for (let h in hand1) {
        if (hand1[h] === needTo) {
            return h;
        }
    }

    return;
}

function part1(err, data) {
    let totalScore = data.split('\n')
        .reduce((acc, item) => {
            const [p1, p2] = item.split(' ');
            return acc + getRoundScore(p1, p2);
        }, 0);

    console.log(totalScore);
}

function part2(err, data) {
    let totalScore = data.split('\n')
    .reduce((acc, item) => {
        let [p1, p2] = item.split(' ');
        p2 = neededHand(p1, p2);
        return acc + getRoundScore(p1, p2);
    }, 0);

console.log(totalScore);
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();