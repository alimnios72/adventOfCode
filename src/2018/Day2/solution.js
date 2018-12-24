const fs = require('fs');

function getCheckSum(err, data) {
    let boxes = data.split("\n");
    let count2 = 0;
    let count3 = 0;
    let checkSum;

    for(let box of boxes) {
        let boxMap = getBoxCount(box);
        if (hasXCount(boxMap, 2)) {
            count2++;
        }
        if (hasXCount(boxMap, 3)) {
            count3++;
        }
    }

    checkSum = count2 * count3;
    console.log(checkSum);
}

function getBoxCount(box){
    let map = {};
    for(let i = 0; i < box.length; i++) {
        if (!map.hasOwnProperty(box[i])) {
            map[box[i]] = 1;
        } else {
            map[box[i]]++;
        }
    }

    return map;
}

function hasXCount(map, x) {
    for (let k in map) {
        if (map[k] === x ) {
            return true;
        }
    }

    return false;
}

function getSimilarBoxes(err, data) {
    let boxes = data.split("\n");

    for(let i = 0; i < boxes.length - 1; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
            if (isSimilar(boxes[i], boxes[j])) {
                console.log(boxes[i], boxes[j]);
            }
        }
    }
}

function isSimilar(str1, str2) {
    if (str1.length !== str2.length) {
        return false;
    }

    let diff = 0;
    for (let i = 0; i < str1.length; i++) {
        if (str1[i] !== str2[i]) {
            diff++;
        }
    }

    return diff === 1 ? true : false;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf-8', getSimilarBoxes)
}

main();