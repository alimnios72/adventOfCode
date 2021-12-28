const fs = require('fs');

function part1(err, data) {
    let [ imageEnhancer, rawImage ] = data.split('\n\n');
    let image = rawImage.split('\n').map(line => line.split(''));
    const ITERATIONS = 2;

    for (let it = 0; it < ITERATIONS; it++) {
        image = applyEnhancement(image, imageEnhancer, it);
    }

    let litPixels = image.reduce((rowSum, row) => rowSum + row.reduce((colSum, val) => colSum + (val === '#' ? 1 : 0), 0), 0);
    console.log(litPixels)
}

function part2(err, data) {
    let [ imageEnhancer, rawImage ] = data.split('\n\n');
    let image = rawImage.split('\n').map(line => line.split(''));
    const ITERATIONS = 50;

    for (let it = 0; it < ITERATIONS; it++) {
        image = applyEnhancement(image, imageEnhancer, it);
    }

    let litPixels = image.reduce((rowSum, row) => rowSum + row.reduce((colSum, val) => colSum + (val === '#' ? 1 : 0), 0), 0);
    console.log(litPixels)
}

function applyEnhancement(image, enhancer, n) {
    let enhancedImage = [];

    for (let i = -1; i < image.length + 1; i++) {
        let enhancedRow = [];

        for (let j = -1; j < image[0].length + 1; j++) {
            enhancedRow.push(getWindowValue(image, n, i, j, enhancer));
        }
        enhancedImage.push(enhancedRow);
    }

    return enhancedImage;
}

function getWindowValue(image, n, i, j, enhancer){
    const window = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1] ];
    let binaryStr = '', decValue;

    for (let coord of window) {
        let newI = i + coord[0];
        let newJ = j + coord[1];

        if (image[newI] == null || image[newI][newJ] == null) {
            if (enhancer[0] === '#' && n % 2 === 1) binaryStr += '1';
            else binaryStr += '0';
        } else {
            binaryStr += image[newI][newJ] === '.' ? '0' : '1';
        }
    }

    decValue = parseInt(binaryStr, 2);

    return enhancer[decValue];
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();