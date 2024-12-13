const fs = require('fs');

function part1(error, data) {
    let reports = data
        .split('\n')
        .map((l) => l.split(' ').map(Number));

    const safeReports = reports.reduce((sum, report) => {
        let decreasing = true, increasing = true, safeDistance = true;

        for (let i = 0; i < report.length - 1; i++) {
            const diff = report[i] - report[i + 1];

            if (diff > 0) increasing = false;
            if (diff < 0) decreasing = false;
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) safeDistance = false;
        }

        if (((decreasing || increasing) && safeDistance)) sum++;

        return sum;
    }, 0);

    console.log(safeReports);
}

function part2(error, data) {
    let reports = data
    .split('\n')
    .map((l) => l.split(' ').map(Number));

const safeReports = reports.reduce((sum, report) => {
    if (isSafeReport(report)) sum++;

    return sum;
}, 0);

console.log(safeReports);
}

function isSafeReport(arr) {
    function isSafe(arr, skipIndex = -1) {
        let increasing = true, decreasing = true;

        for (let i = 0; i < arr.length - 1; i++) {
            if (i === skipIndex) continue;
            const diff = arr[i] - arr[i + 1 === skipIndex ? i + 2 : i + 1];

            if (diff > 0) increasing = false;
            if (diff < 0) decreasing = false;
            if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
        }

        return increasing || decreasing;
    }

    if (isSafe(arr)) return true;

    for (let i = 0; i < arr.length; i++) {
        if (isSafe(arr, i)) return true;
    }

    return false;
}


function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();