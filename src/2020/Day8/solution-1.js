const fs = require('fs');

function runBootCode(err, data) {
    let instructions = data.split("\n");
    let visited = new Set();
    let acc = 0;
    let i = 0;

    while (!visited.has(i)) {
        visited.add(i);
        let [code, value] = instructions[i].split(" ");

        switch(code) {
            case 'acc':
                acc += Number(value);
                i++;
                break;
            case 'jmp':
                i += Number(value);
                break;
            case 'nop':
            default:
                i++;
                break;
        }
    }

    console.log(acc);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', runBootCode);
}

main();