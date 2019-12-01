const fs = require('fs');

function getWrappingPaperSize(error, data) {
    let presents = data.split("\n");
    let totalSize = 0;

    for (let present of presents) {
        let [l, w, h] = present.split("x");
        let slack = Math.min(l*w, Math.min(w*h, h*l));
        let surface = 2*l*w + 2*w*h + 2*h*l;

        totalSize += slack + surface; 
    }
    console.log(totalSize);
}

function getTotalRibbon(error, data) {
    let presents = data.split("\n");
    let totalSize = 0;

    for (let present of presents) {
        let [l, w, h] = present.split("x").map(Number);
        let bow = l*w*h;
        let ribbon = 0;

        ribbon += (l < w || l < h) ? 2*l : 0;
        if (ribbon === 0) {
            ribbon +=  2*w + 2*h
        } else {
            ribbon += (w <= h) ? 2*w : 2*h;
        }

        totalSize += ribbon + bow; 
    }
    console.log(totalSize);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getWrappingPaperSize);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getTotalRibbon);
}

main();