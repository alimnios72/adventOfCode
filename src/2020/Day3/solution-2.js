const fs = require('fs');

function checkSlopes(err, data) {
    let map = data.split("\n").map(a => a.trim());

    let a = countTrees(1, 1, map);
    let b = countTrees(3, 1, map);
    let c = countTrees(5, 1, map);
    let d = countTrees(7, 1, map);
    let e = countTrees(1, 2, map);

    console.log(a * b * c * d * e);
}

function countTrees(x, y, map) {
    let i = 0, j = 0;
    let treeCount = 0;

    while (i < map.length - 1) {
        i += y;
        j = (j + x) % map[i].length;
        if (map[i][j] === "#") {
            treeCount++;
        }
    }

    return treeCount;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', checkSlopes);
}

main();