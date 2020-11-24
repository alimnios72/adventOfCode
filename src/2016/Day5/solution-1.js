const crypto = require('crypto')

function findPassword(input) {
    let password = '';
    let i = 0;

    while (password.length < 8) {
        let seed = input + i.toString();
        let hash = crypto.createHash('md5').update(seed).digest("hex");
        if (hash.substr(0, 5) === '00000') {
            password += hash.substr(5, 1);
        }
        i++;
    }

    console.log(password);
}

function main(){
    findPassword("wtnhxymk");
}

main();