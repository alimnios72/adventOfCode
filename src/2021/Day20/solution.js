const fs = require('fs');
const ITERATIONS = 2;

function part1(err, data) {
    let [ imageEnhancer, rawImage ] = data.split('\n\n');
    let image = rawImage.split('\n').map(line => line.split(''));

    for (let it = 0; it < ITERATIONS; it++) {
        image = expandImage(image, 4);
        image = applyEnhancement(image, imageEnhancer);
    }

    let litPixels = image.reduce((rowSum, row) => rowSum + row.reduce((colSum, val) => colSum + (val === '#' ? 1 : 0), 0), 0);
    // for (let row of image) {
    //     console.log(row.join(''))
    // }

    console.log(litPixels)
}

function part2(err, data) {
}

function expandImage(image, factor) {
    let expandedImage = Array.from(Array(image.length + factor * 2), () => Array(image[0].length + factor * 2).fill('.'));

    for (let i = factor; i < expandedImage.length - factor; i++) {
        for (let j = factor; j < expandedImage[i].length - factor; j++) {
            expandedImage[i][j] = image[i - factor][j - factor];
        }
    }

    return expandedImage;
}

function applyEnhancement(image, enhancer) {
    let enhancedImage = image.map(row => row.slice());

    for (let i = 0; i < image.length; i++) {
        for (let j = 0; j < image[i].length; j++) {
            enhancedImage[i][j] = getWindowValue(image, i, j, enhancer);
        }
    }

    return enhancedImage;
}

function getWindowValue(image, i, j, enhancer){
    const window = [ [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 0], [0, 1], [1, -1], [1, 0], [1, 1] ];
    let binaryStr = '', decValue;

    for (let coord of window) {
        let newI = i + coord[0];
        let newJ = j + coord[1];

        if (image[newI] == null || image[newI][newJ] == null) {
            binaryStr += '0';
        } else {
            binaryStr += image[newI][newJ] === '.' ? '0' : '1';
        }
    }

    decValue = parseInt(binaryStr, 2);

    return enhancer[decValue];
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();