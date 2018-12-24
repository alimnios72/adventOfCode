const fs = require('fs');

function getCheckSum(error, data){
    let boxes = data.split("\n");
    let counts = {};

    for (let box of boxes) {
        getMap()
        countsOcurrences()
    }
    console.log(boxes);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getCheckSum);
}

main();