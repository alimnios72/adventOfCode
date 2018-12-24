const fs = require('fs');

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf-8', parseClaims)
}

function parseClaims(err, data) {
    let claims = data.split("\n");
    
    for (let i = 0; i < claims; i++) {
        
    }
    // for (let i = 0; i < 100; i++) {
    //     printClaim(claims[i]);
    // }
}

function printClaim(claim) {
    let exp = /#([0-9]*) @ ([0-9]*),([0-9]*): ([0-9]*)x([0-9]*)/
    let [full, id, offsetX, offsetY, x, y] = claim.match(exp)
    console.log (offsetX)
}

main();