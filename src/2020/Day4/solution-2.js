const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const fs = require('fs');

const EXPECTED_FIELDS = {
    byr: { type: 'range', values: [1920, 2002], isRequired: true },
    iyr: { type: 'range', values: [2010, 2020], isRequired: true },
    eyr: { type: 'range', values: [2020, 2030], isRequired: true },
    hgt: { type: 'complex', values: {
        regex: /^(\d+)(cm|in)?$/,
        range1: [150, 193],
        range2: [59, 76]
    }, isRequired: true },
    hcl: { type: 'regex', values: /^#[0-9a-f]{6}$/, isRequired: true },
    ecl: { type: 'regex', values: /(amb|blu|brn|gry|grn|hzl|oth)/, isRequired: true },
    pid: { type: 'regex', values: /^[0-9]{9}$/, isRequired: true },
    cid: { type: 'optional', values: '', isRequired: false }
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

    let validFields = 0;
    for (let field of fields) {
        let [key, val] = field.split(':');
        if (validate(key, val)&& EXPECTED_FIELDS[key].isRequired) {
            validFields++;
        }
    }

    return validFields >= 7;
}

function validate(key, val) {
    let rule = EXPECTED_FIELDS[key];
    let isValid = false;

    switch (rule.type) {
        case 'range':
            isValid = rule.values[0] <= val && rule.values[1] >= val;
            break;
        case 'regex':
            isValid = rule.values.test(val);
            break;
        case 'complex':
            let [,height, unit] = String(val).match(rule.values.regex);
            height = Number(height);

            if (unit === 'cm') {
                isValid = rule.values.range1[0] <= height && rule.values.range1[1] >= height;
            } else if (unit === 'in'){
                isValid = rule.values.range2[0] <= height && rule.values.range2[1] >= height;
            }
            break;
        case 'optional':
        default:
            isValid = true;
            break;
    }

    return isValid;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', validatePassports);
}

main();