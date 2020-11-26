const fs = require('fs');

function expandString(error, data) {
    const compressed = data.trim();
    let uncompressed = '';
    let operationMode = false;
    let operation = '';

    for (let c = 0; c < compressed.length; c++) {
        const char = compressed[c];

        if (char === '(') {
            operationMode = true;
        } else if (char === ')') {
            operationMode = false;
            let [len, repeat] = parseOperation(operation);
            uncompressed += expand(c, len, repeat, compressed);
            c += len;
            operation = '';
        } else {
            if (operationMode) {
                operation += char;
            } else {
                uncompressed += char;
            }
        }
    }

    console.log(uncompressed.length);
}

function parseOperation(operationStr) {
    return operationStr.split("x").map(Number);
}

function expand(index, len, repeat, str) {
    let chunk = str.substr(index + 1, len);
    let expanded = '';

    for (let i = 0; i < repeat; i++) {
        expanded += chunk;
    }

    return expanded;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', expandString);
}

main();