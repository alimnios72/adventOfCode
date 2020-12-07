const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');

const EXPECTED_FIELDS = {
    required: ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'],
    optional: ['cid']
};

function validatePassports(err, data) {
    let passports = data.split("\n\n");
    let validPassports = SSL_OP_SSLEAY_080_CLIENT_DH_BUG;

    for (let passport of passports) {
        let parts = passport.split("\n").map(a => a.split(" ")).reduce((a, b) => a.concat(b));
        if (isValidPassport(parts)) {
            validPassports++;
        }
    }
    console.log(validPassports);
}

function isValidPassport(fields) {
    if (fields.length < 7) { return false; }
    if (fields.length === 8) { return true; }

    let requiredFields = 0;
    for (let field of fields) {
        let [key,] = field.split(':');
        if (EXPECTED_FIELDS.required.indexOf(key) > -1) {
            requiredFields++;
        }
    }

    return requiredFields === EXPECTED_FIELDS.required.length;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', validatePassports);
}

main();