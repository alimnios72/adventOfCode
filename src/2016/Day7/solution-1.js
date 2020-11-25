const fs = require('fs');

function sumIpsWithTLS(error, data) {
    let ips = data.split('\n').map(a => a.trim());
    let ipsWithTLS = 0;

    for (let ip of ips) {
        let regexBrackets = /\[(.*?)\]/g
        let hypernets = ip.match(regexBrackets).map(s => s.replace(/(\[|\])/g, ''));
        let strs = ip.replace(regexBrackets, ',').split(',');

        if (supportsTLS(hypernets, strs)) {
            ipsWithTLS++;
        }
        
    }
    console.log(ipsWithTLS);
}

function supportsTLS(hypernets, strs) {
    for (let h of hypernets) {
        if (hasABBA(h)) {
            return false;
        }
    }

    for (let s of strs) {
        if (hasABBA(s)) {
            return true;
        }
    }

    return false;
}

function hasABBA(str) {
    for (let i = 0; i < str.length - 3; i++) {
        if (str[i] !== str[i + 1] && str[i] === str[i + 3] && str[i + 1] === str[i + 2]) {
            return true;
        }
    }
    return false;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', sumIpsWithTLS);
}

main();