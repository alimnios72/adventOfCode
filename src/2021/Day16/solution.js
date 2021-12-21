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
    console.log(packages);
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
        let lengthType = getNextNBits(str, start, 1);
        start++;
        let packagesLength = lengthType === '0' ? 15 : 11;
        let length = getNextNBits(str, start, packagesLength, true);

        if (lengthType === '0') {
            package.subpackages.push(readPackage(str, start));
        } else {
            for (let i = 0; i < length; i++) {
                package.subpackages.push(readPackage(str, start))
            }
        }
    }

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

/**
{
    version: number;
    type: number;
    isLiteral: boolean;
    value?: number;
    subPackets: [
        {
            version: number;
            type: number;
            isLiteral: boolean;
            value?: number;
        }
    ]
}
 */

function part2(err, data) {
}

function main() {
    fs.readFile(`${__dirname}/input1.txt`, 'utf8', part1);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();