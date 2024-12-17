const fs = require('fs');

function part1(error, data) {
    const [ rawRules, rawpages ] = data.split('\n\n').map(b => b.split('\n'));
    const rules = new Set(rawRules);
    const pages = rawpages.map(l => l.split(','));
    let sum = 0;

    for (let page of pages) {
        let isValidPage = true;
        for (let i = 1; i < page.length; i++) {
            for (let j = 0; j < i; j++) {
                const ruleKey = `${page[j]}|${page[i]}`;
                if (!rules.has(ruleKey)) {
                    isValidPage = false;
                    i = page.length;
                    break;
                }
            }
        }
        
        if (isValidPage) {
            const mid = Math.floor(page.length / 2);
            sum += parseInt(page[mid], 10);
        }
    }

    console.log(sum);
}

function part2(error, data) {
    const [ rawRules, rawpages ] = data.split('\n\n').map(b => b.split('\n'));
    const rules = new Set(rawRules);
    const pages = rawpages.map(l => l.split(','));
    let sum = 0;

    for (let page of pages) {
        const oldPagestr = page.join('-');
        page.sort((a, b) => {
            if (rules.has(`${a}|${b}`)) return -1;
            if (rules.has(`${b}|${a}`)) return 1;
            return 0;
        });
        const newPageStr = page.join('-');
        
        if (oldPagestr !== newPageStr) {
            const mid = Math.floor(page.length / 2);
            sum += parseInt(page[mid], 10);
        }
    }

    console.log(sum);
}


function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();