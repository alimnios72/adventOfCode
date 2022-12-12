const fs = require('fs');

function parseMonkeys(data) {
    return data.split('\n\n')
        .map(line => {
            let [name, start, operation, test, ifTrue, ifFalse] = line.split("\n");
            let items = start.substring(18).split(',').map(Number);

            return {
                name,
                items,
                operation: operation.substring(19),
                divisible: parseInt(test.substring(21), 10),
                ifTrue: parseInt(ifTrue.substring(29), 10),
                ifFalse: parseInt(ifFalse.substring(30), 10),
                inspections: 0
            }
        });
}

function monkeyThrowing(monkeys, rounds, div, modulo) {
    for (let i = 0; i < rounds; i++) {
        monkeys.forEach((monkey) => {
            while (monkey.items.length !== 0) {
                let item = monkey.items.shift();
                let op = monkey.operation.replace(/old/g, item);
                let worryLevel = parseInt(eval(op) / div, 10);
                if (modulo) worryLevel = worryLevel % modulo;
                let throwTo = worryLevel % monkey.divisible === 0 ? monkey.ifTrue : monkey.ifFalse;
                monkeys[throwTo].items.push(worryLevel);
                monkey.inspections++;
            }
        });
    }
    monkeys.sort((a, b) => b.inspections - a.inspections);
}

function part1(err, data) {
    const monkeys = parseMonkeys(data);
    monkeyThrowing(monkeys, 20, 3);

    console.log(monkeys[0].inspections * monkeys[1].inspections);
}

function part2(err, data) {
    const monkeys = parseMonkeys(data);
    const modulo = monkeys.reduce((a, b) => a * b.divisible, 1);
    monkeyThrowing(monkeys, 10000, 1, modulo);

    console.log(monkeys[0].inspections * monkeys[1].inspections);
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();