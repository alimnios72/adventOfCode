const fs = require('fs');

function sumIpsWithSSL(error, data) {
    let ips = data.split('\n').map(a => a.trim());
    let ipsWithSSL = 0;

    for (let ip of ips) {
        let regexBrackets = /\[(.*?)\]/g
        let hypernets = ip.match(regexBrackets).map(s => s.replace(/(\[|\])/g, ''));
        let strs = ip.replace(regexBrackets, ',').split(',');

        if (supportsSSL(hypernets, strs)) {
            ipsWithSSL++;
        }
        
    }
    console.log(ipsWithSSL);
}

function supportsSSL(hypernets, strs) {
    for (let str of strs) {
        for (let i = 0; i < str.length - 2; i++) {
            if (str[i] !== str[i + 1] && str[i] === str[i + 2]) {
                let aba = `${str.substr(i, 3)}`;
                let bab = `${aba[1]}${aba[0]}${aba[1]}`
                for (let h of hypernets) {
                    if (h.indexOf(bab) > -1) {
                        return true;
                    }
                }
            }
        }
    }

    return false;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', sumIpsWithSSL);
}

main();