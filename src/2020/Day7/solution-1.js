const fs = require('fs');

const EXPECTED_BAG = 'shiny gold';

function countBags(err, data) {
    // ^(.*) bags contain ((\d) (.+) bag[s]?[\,|.])+
    let lines = data.split("\n");
    let map = {};

    for (let line of lines) {
        let re = /^(.*) bags contain (.+)$/;
        let [, parent, contain] = line.match(re);
        let children = contain.split(',').map(a => a.trim());

        for (let child of children) {
            let reg = /^(\d) (.+) bag[s]?[\.]?$/;
            if (child.match(reg)) {
                let [, num, color] = child.match(reg);
                
                if (!map.hasOwnProperty(color)) {
                    map[color] = [];
                }
                map[color].push(parent);
            }
        }
    }

    console.log(countByBagName(EXPECTED_BAG, map));
}

function countByBagName(name, map) {
    let stack = map[name];
    let unique = new Set();

    while (stack.length > 0) {
        let current = stack.pop();
        unique.add(current);

        if (map[current]) {
            for(let p of map[current]) {
                stack.push(p);
            }
        }
    }

    return unique.size;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', countBags);
}

main();