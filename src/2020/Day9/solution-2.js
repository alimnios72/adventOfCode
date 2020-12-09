const fs = require('fs');
 
const INVALID_NUM = 400480901;

function findContiguosSequence(err, data) {
    let list = data.split("\n").map(Number);

    let sequence = subArraySum(list, INVALID_NUM);
    let subArr = list.slice(sequence.start, sequence.end);
    let max = Math.max.apply(Math, subArr);
    let min = Math.min.apply(Math, subArr);
    console.log(min + max);
}

function subArraySum(arr, sum) { 
    let currSum = arr[0]; 
    let start = 0;

    for (let i = 1; i < arr.length; i++) {

        while (currSum > sum && start < i - 1) {
            currSum = currSum - arr[start];
            start++;
        } 

        if (currSum == sum) {
            let end = i - 1;
            return {start: start, end: end};
        }

        currSum = currSum + arr[i]; 
    }

    return null;
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', findContiguosSequence);
}

main();