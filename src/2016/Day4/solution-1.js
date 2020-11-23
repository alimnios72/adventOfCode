const fs = require('fs');

function sumRealRooms(error, data) {
    let lines = data.split("\n");
    const re = /^([aA-zZ\-]+)\-([0-9]+)\[(.+)\]$/
    let sum = 0;

    for (l of lines) {
        let [, name, id, checksum] = l.match(re);
        let charCount = getCharCount(name);
        let isRealRoom = true;
        let max = 99;
        let lastChar = '';

        for (let c of checksum) {
            if (charCount[c]) {
                if (charCount[c] < max) {
                    max = charCount[c];
                } else if (charCount[c] === max && lastChar.charCodeAt(0) < c.charCodeAt(0)) {
                    max = charCount[c];
                } else {
                    isRealRoom = false;
                    break;
                }
                lastChar = c;
            } else {
                isRealRoom = false;
                break;
            }
        }

        if (isRealRoom) {
            sum += parseInt(id);
        }
    }
    console.log(sum);
}

function getCharCount(name) {
    let chars = {};

    for (let c of name) {
        if (!chars.hasOwnProperty(c)) {
            chars[c] = 0;
        }
        chars[c]++;
    }

    return chars;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', sumRealRooms);
}

main();