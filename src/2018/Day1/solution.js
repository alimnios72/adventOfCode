const fs = require('fs');
let frequencies;
let ocurrences = {};

function calculateFrequencies(error, data) {
    frequencies = data.split("\n").map(Number);
    let found = false;
    let nextFreq = 0;
    ocurrences[nextFreq] = 1;

    while (!found){
        for (let freq of frequencies){
            nextFreq += freq;
            if (ocurrences.hasOwnProperty(nextFreq)) {
                console.log("Repeated");
                console.log(nextFreq);
                found = true;
                break;
            }
            ocurrences[nextFreq] = 1
        }
    }
    
    // console.log(resultingFrequency);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', calculateFrequencies);
    // calculateFrequencies(null, "+1\n+1\n+1");
}

main();