const crypto = require('crypto')

function findPassword(input) {
    let password = '________';
    let i = 0;

    while (password.indexOf('_') > -1) {
        let seed = input + i.toString();
        let hash = crypto.createHash('md5').update(seed).digest("hex");
        if (hash.substr(0, 5) === '00000' && hash.substr(5, 1) <= 7) {
            let position = parseInt(hash.substr(5, 1), 10);
            let char = hash.substr(6, 1);

            if (password[position] === '_') {
                password = setCharAt(password, position, char);
            }
        }
        i++;
    }

    console.log(password);
}

function setCharAt(str, index, chr) {
    if(index > str.length-1) return str;
    return str.substring(0,index) + chr + str.substring(index+1);
}

function main(){
    findPassword("wtnhxymk");
}

main();