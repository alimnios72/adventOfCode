const fs = require('fs');

function findTrueTriangles(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let triangleCount = 0;

    for (let l of lines) {
        const re = /\s+/
        let sides = l.split(re).map(Number);
        let [a, b, c] = sides;

        if ((a + b) > c && (a + c) > b && (b + c) > a) {
            triangleCount++;
        }
    }
    console.log(triangleCount);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findTrueTriangles);
}

main();