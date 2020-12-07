const fs = require('fs');

function sumQuestions(err, data) {
    let groups = data.split("\n\n");
    let sum = 0;

    for (let group of groups) {
        let unique = new Set();
        let questions = group.split("\n");
        for (let question of questions) {
            for (let q of question) {
                unique.add(q);
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