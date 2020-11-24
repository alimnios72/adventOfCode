const fs = require('fs');

function getCorrectedMessage(error, data) {
    let lines = data.split('\n').map(a => a.trim());
    let columns = [];
    let message = '';

    for (let line of lines) {
        for (let i = 0; i < line.length; i++) {
            let char = line[i];
            if (!columns[i]) {
                columns[i] = {};
            }

            if (!columns[i][char]) {
                columns[i][char] = 0;
            }
            columns[i][char]++;
        }
    }

    for (let chars of columns) {
        let minValue = 99;
        let minChar = '';
        for (let key in chars) {
            if (chars[key] < minValue) {
                minValue = chars[key]
                minChar = key;
            }
        }
        message += minChar;
    }

    console.log(message);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', getCorrectedMessage);
}

main();