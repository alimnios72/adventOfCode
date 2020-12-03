const fs = require('fs');

function countTrees(err, data) {
    let map = data.split("\n").map(a => a.trim());
    let [x, y] = [3, 1]; // Jump
    let i = 0, j = 0;
    let treeCount = 0;

    while (i < map.length - 1) {
        i += y;
        j = (j + x) % map[i].length;
        if (map[i][j] === "#") {
            treeCount++;
        }
    }

    console.log(treeCount);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', countTrees);
}

main();