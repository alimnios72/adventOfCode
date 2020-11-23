const fs = require('fs');

function findNorthPoleRoom(error, data) {
    let lines = data.split("\n");
    const re = /^([aA-zZ\-]+)\-([0-9]+)\[(.+)\]$/

    for (l of lines) {
        let [, name, id] = l.match(re);
        let decrypted = decrypt(name, parseInt(id));

        if (decrypted.indexOf('northpole') !== -1) {
            console.log(decrypted, id);
        }
    }
}

function decrypt(encrypted, shift){
    const offset = 96;
    let decrypted = '';

    for (let c of encrypted) {
        if (c === '-') {
            decrypted += ' ';
        } else {
            let index = (c.charCodeAt(0) - offset + shift) % 26;
            decrypted += String.fromCharCode(index + offset);
        }
    }

    return decrypted;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findNorthPoleRoom);
}

main();