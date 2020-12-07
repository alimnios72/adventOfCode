const fs = require('fs');

function sumQuestions(err, data) {
    let groups = data.split("\n\n");
    let sum = 0;

    for (let group of groups) {
        let unique = new Set();
        let person = group.split("\n");
        for (let p = 0; p < person.length; p++) {
            if (p === 0) {
                for (let q of person[p]) {
                    unique.add(q);
                }
            } else {
                for (let it = unique.values(), val = null; val = it.next().value;) {
                    if (person[p].indexOf(val) === -1) {
                        unique.delete(val);
                    }
                }
            }
        }
        sum += unique.size;
    }

    console.log(sum);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', sumQuestions);
}

main();