const fs = require('fs');

function printTotalFuel(error, data) {
    let modules = data.split("\n").map(Number);
    let totalFuel = 0;

    for (let mass of modules) {
        totalFuel += Math.floor(mass / 3) - 2;
    }
    console.log(totalFuel);
}

function printAdditionalFuel(error, data) {
    let modules = data.split("\n").map(Number);
    let totalFuel = 0;

    for (let mass of modules) {
        let fuel = mass;
        while (fuel > 0) {
            fuel = Math.floor(fuel / 3) - 2;
            if (fuel > 0) {
                totalFuel += fuel;
            }
        }
    }
    console.log(totalFuel);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', printTotalFuel);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', printAdditionalFuel);
}

main();