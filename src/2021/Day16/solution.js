const fs = require('fs');
const HEX2BIN = new Map([
    ['0', '0000'] ,['1', '0001'], ['2', '0010'], ['3', '0011'], ['4', '0100'], ['5', '0101'], ['6', '0110'], ['7', '0111'],
    ['8', '1000'], ['9', '1001'], ['A', '1010'], ['B', '1011'], ['C', '1100'], ['D', '1101'], ['E', '1110'], ['F', '1111']
]);
const HEADER_SIZE = 3;
const LITERAL_VALUE = 4;

function part1(err, data) {
    let bitsTransmission = data.trim().split('')
        .map(char => HEX2BIN.get(char))
        .join('');

    let packages = readPackage(bitsTransmission, 0);
    let sum = sumVersions(packages);
    console.log(sum);
}

function part2(err, data) {
    let bitsTransmission = data.trim().split('')
    .map(char => HEX2BIN.get(char))
    .join('');

    let packages = readPackage(bitsTransmission, 0);
    let value = getPackageValues(packages);
    console.log(value);
}

function readPackage(str, start) {
    let package = {
        version: getNextNBits(str, start, HEADER_SIZE, true),
        type: getNextNBits(str, start + HEADER_SIZE, HEADER_SIZE, true),
        subpackages: []
    }
    package.isLiteral = package.type === LITERAL_VALUE;
    start += HEADER_SIZE * 2;

    if (package.isLiteral) {
        let { end, value } = getLiteralValue(str, start);
        package.value = value;
        start = end;
    } else {
        let subPackage = {};
        let lengthType = getNextNBits(str, start, 1);
        start++;
        let packagesLength = lengthType === '0' ? 15 : 11;
        let length = getNextNBits(str, start, packagesLength, true);
        start += packagesLength;

        if (lengthType === '0') {
            let end = start + length;
            while (start < end) {
                subPackage = readPackage(str, start);
                package.subpackages.push(subPackage);
                start = subPackage.end;
            }
        } else {
            for (let i = 0; i < length; i++) {
                subPackage = readPackage(str, start);
                package.subpackages.push(subPackage);
                start = subPackage.end;
            }
        }
    }

    package.end = start;

    return package;
}

function getLiteralValue(str, start) {
    let literals = '';
    let last = false;

    while (!last) {
        let segment = getNextNBits(str, start, 5)
        start += 5;
        literals += segment.substring(1);

        if (segment[0] === '0') last = true;
    }

    return { end: start, value: bits2Int(literals) }
}

function getNextNBits(str, curr, n, dec = false) {
    let bits = str.substring(curr, curr + n);
    return dec ? bits2Int(bits) : bits;
}

function bits2Int(str) {
    return parseInt(str, 2);
}

function sumVersions(package) {
    let sum = 0;
    let queue = [];
    let curPackage;

    queue.push(package);

    while (queue.length !== 0) {
        curPackage = queue.shift();
        sum += curPackage.version;

        for (let subPackage of curPackage.subpackages) {
            queue.push(subPackage);
        }
    }

    return sum;
}

function getPackageValues(package) {
    let first, second;

    switch(package.type) {
        case 0:
            // sum package
            let sum = 0;
            for (let subpackage of package.subpackages){
                if (subpackage.subpackages.length > 0) {
                    sum += getPackageValues(subpackage);
                } else {
                    sum += subpackage.value;
                }
            }
            return sum;
        case 1:
            // product package
            let product = package.subpackages.length === 0 ? 0 : 1;
            for (let subpackage of package.subpackages){
                if (subpackage.subpackages.length > 0) {
                    product *= getPackageValues(subpackage);
                } else {
                    product *= subpackage.value;
                }
            }
            return product;
        case 2:
            // minimum package
            let min = package.subpackages.length === 0 ? 0 : Infinity;
            for (let subpackage of package.subpackages){
                if (subpackage.subpackages.length > 0) {
                    min = Math.min(min, getPackageValues(subpackage));
                } else {
                    min = Math.min(min, subpackage.value);
                }
            }
            return min;
        case 3:
            // maximum package
            let max = package.subpackages.length === 0 ? 0 : -Infinity;
            for (let subpackage of package.subpackages){
                if (subpackage.subpackages.length > 0) {
                    max = Math.max(max, getPackageValues(subpackage));
                } else {
                    max = Math.max(max, subpackage.value);
                }
            }
            return max;
        case 5:
            // greater than package
            if (package.subpackages[0].subpackages.length > 0) {
                first = getPackageValues(package.subpackages[0]);
            } else {
                first = package.subpackages[0].value;
            }
            if (package.subpackages[1].subpackages.length > 0) {
                second = getPackageValues(package.subpackages[1]);
            } else {
                second = package.subpackages[1].value;
            }
            return first > second ? 1 : 0;
        case 6:
            // less than package
            if (package.subpackages[0].subpackages.length > 0) {
                first = getPackageValues(package.subpackages[0]);
            } else {
                first = package.subpackages[0].value;
            }
            if (package.subpackages[1].subpackages.length > 0) {
                second = getPackageValues(package.subpackages[1]);
            } else {
                second = package.subpackages[1].value;
            }
            return first < second ? 1 : 0;
        case 7:
            // equal package
            if (package.subpackages[0].subpackages.length > 0) {
                first = getPackageValues(package.subpackages[0]);
            } else {
                first = package.subpackages[0].value;
            }
            if (package.subpackages[1].subpackages.length > 0) {
                second = getPackageValues(package.subpackages[1]);
            } else {
                second = package.subpackages[1].value;
            }
            return first === second ? 1 : 0;
    }
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();