const fs = require('fs');

const EXPECTED_BAG = 'shiny gold';

function countBags(err, data) {
    let lines = data.split("\n");
    let map = {};

    for (let line of lines) {
        let re = /^(.*) bags contain (.+)$/;
        let [, parent, contain] = line.match(re);
        let children = contain.split(',').map(a => a.trim());

        if (!map.hasOwnProperty(parent)) {
            map[parent] = [];
        }

        for (let child of children) {
            let reg = /^(\d) (.+) bag[s]?[\.]?$/;
            if (child.match(reg)) {
                let [, num, color] = child.match(reg);
                map[parent].push({
                    num: num,
                    color: color
                });
            }
        }
    }

    console.log(countAllByBagName(EXPECTED_BAG, map));
}

function countAllByBagName(name, map) {
    if (!map[name] || map[name].length === 0) {
       return 0;
    }

    let sum = 0;
    for(let c of map[name]) {
        let num = Number(c.num);
        sum += num + num * countAllByBagName(c.color, map)
    }

    return sum;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', countBags);
}

main();