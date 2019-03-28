const fs = require('fs');

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf-8', readInput)
}

function readInput(err, data) {
    let claims = data.split("\n");
    let fabric = createEmptyFabric();

    for (let i = 0; i < claims.length; i++) {
        let claim = parseClaim(claims[i]);
        addClaim(fabric, claim);
    }
    printFabric(fabric);
    let overlap = getOverlapArea(fabric);
    console.log(overlap);
}

function createEmptyFabric() {
    const maxX = 1000;
    const maxY = 1000;
    let fabric = [];

    for (let i = 0; i < maxX; i++) {
        fabric[i] = []
        for (let j = 0; j < maxY; j++) {
            fabric[i][j] = ".";
        }
    }

    return fabric;
}

function parseClaim(claim) {
    let exp = /#([0-9]*) @ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)/
    let [full, id, offsetX, offsetY, x, y] = claim.match(exp)
    return {
        id: id,
        offsetX: parseInt(offsetX),
        offsetY: parseInt(offsetY),
        x: parseInt(x),
        y: parseInt(y)
    }
}

function addClaim(fb, cl) {
    console.log(cl.offsetX, cl.x)
    for (let i = cl.offsetX; i < (cl.offsetX + cl.x); i++) {
        for (let j = cl.offsetY; j < (cl.offsetY + cl.y); j++) {
            if (fb[i][j] === "_") {
                fb[i][j] = "X";
            } else {
                fb[i][j] = "_";
            }
        }
    }
}

// ToDo: write to file
function printFabric(fb) {
    for (let i = 0; i < fb.length; i++) {
        let line = fb[i].join("");
        console.log(line)
    }
}

function getOverlapArea(fb) {
    let area = 0;
    for (let i = 0; i < fb.length; i++) {
        for (let j = 0; j < fb[i].length; j ++) {
            if (fb[i][j] === "X") {
                area++;
            }
        }
    }

    return area
}

main();