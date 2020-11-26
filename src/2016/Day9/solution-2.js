const fs = require('fs');

//TODO: improve performance
function expandStringV2(error, data) {
    const compressed = data.trim();
    let uncompressedLength = 0;

    uncompressedLength = processString(compressed);

    console.log(uncompressedLength);
}

function processString(str) {
    let len = 0;
    let operationMode = false;
    let operation = '';

    for (let c = 0; c < str.length; c++) {
        const char = str[c];

        if (char === '(') {
            operationMode = true;
        } else if (char === ')') {
            operationMode = false;
            let [l, r] = operation.split("x").map(Number);
            len += expand(c, l, r, str);
            c += l;
            operation = '';
        } else {
            if (operationMode) {
                operation += char;
            } else {
                len++;
            }
        }
    }

   return len;
}

function expand(index, len, repeat, str) {
    let chunk = str.substr(index + 1, len);
    let expanded = '';

    for (let i = 0; i < repeat; i++) {
        expanded += chunk;
    }

    if (expanded.indexOf('(') > -1) {
        return processString(expanded);
    }

    return expanded.length;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', expandStringV2);
}

main();