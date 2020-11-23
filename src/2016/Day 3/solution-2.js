const fs = require('fs');

function findTrueTriangles(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let triangleCount = 0;

    for (let i = 0; i < lines.length; i += 3) {
        const re = /\s+/
        let [r1, r2, r3] = lines.slice(i, i + 3);
        r1 = r1.split(re).map(Number);
        r2 = r2.split(re).map(Number);
        r3 = r3.split(re).map(Number);

        for (let t = 0; t < r1.length; t++) {
            if (isTrueTriangle(r1[t], r2[t], r3[t])) {
                triangleCount++;
            }
        }
    }
    console.log(triangleCount);
}

function isTrueTriangle(a, b, c) {
    return (a + b) > c && (a + c) > b && (b + c) > a;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findTrueTriangles);
}

main();