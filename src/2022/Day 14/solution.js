const fs = require('fs');

function part1(err, data) {
    const limit = 1000;
    const grid = new Map();
    const ranges = data.split('\n')
        .map(line => line.split(' -> ')
            .map(coord => coord.split(',').map(Number))
        );
    let sandCount = 0, sandStop = false;

    ranges.forEach(line => {
        let prevRange = null;
        line.forEach(range => {
            if (!prevRange) {
                prevRange = range;
            } else {
                let [x1, y1] = range;
                let [x2, y2] = prevRange;
                let j1, j2;

                if (x1 === x2) {
                    j1 = Math.min(y1, y2);
                    j2 = Math.max(y1, y2);

                    for (let i = j1; i <= j2; i++) {
                        grid.set(`${x1}-${i}`, '#');
                    }
                } else {
                    j1 = Math.min(x1, x2);
                    j2 = Math.max(x1, x2);

                    for (let i = j1; i <= j2; i++) {
                        grid.set(`${i}-${y1}`, '#');
                    }
                }

                prevRange = range;
            }
        });
    });

    while (!sandStop) {
        let curPos = [500, 0];
        let canMove = true;
        let steps = 0;
        let key;

        while (canMove && steps < limit) {
            key = `${curPos[0]}-${curPos[1] + 1}`;
            steps++;
            if (!grid.has(key)) {
                curPos = [curPos[0], curPos[1] + 1];
                continue;
            }
            key = `${curPos[0] - 1}-${curPos[1] + 1}`;
            if (!grid.has(key)) {
                curPos = [curPos[0] - 1, curPos[1] + 1];
                continue;
            }
            key = `${curPos[0] + 1}-${curPos[1] + 1}`;
            if (!grid.has(key)) {
                curPos = [curPos[0] + 1, curPos[1] + 1];
                continue;
            }
            canMove = false;
            grid.set(`${curPos[0]}-${curPos[1]}`, 'o');
        }


        if (steps === limit) {
            sandStop = true;
        } else {
            sandCount++;
        }
    }

    console.log(sandCount)
}

function part2(err, data) {
    const grid = new Map();
    const ranges = data.split('\n')
        .map(line => line.split(' -> ')
            .map(coord => coord.split(',').map(Number))
        );
    let y = -1
    let sandCount = 0, sandStop = false;

    ranges.forEach(line => {
        let prevRange = null;
        line.forEach(range => {
            if (!prevRange) {
                prevRange = range;
            } else {
                let [x1, y1] = range;
                let [x2, y2] = prevRange;
                let j1, j2;
                y = Math.max(y, y1, y2);

                if (x1 === x2) {
                    j1 = Math.min(y1, y2);
                    j2 = Math.max(y1, y2);

                    for (let i = j1; i <= j2; i++) {
                        grid.set(`${x1}-${i}`, '#');
                    }
                } else {
                    j1 = Math.min(x1, x2);
                    j2 = Math.max(x1, x2);

                    for (let i = j1; i <= j2; i++) {
                        grid.set(`${i}-${y1}`, '#');
                    }
                }

                prevRange = range;
            }
        });
    });

    let floor = y + 2;

    while (!sandStop) {
        let curPos = [500, 0];
        let canMove = true;
        let key;

        while (canMove) {
            key = `${curPos[0]}-${curPos[1] + 1}`;
            if (!grid.has(key) && curPos[1] + 1 !== floor) {
                curPos = [curPos[0], curPos[1] + 1];
                continue;
            }
            key = `${curPos[0] - 1}-${curPos[1] + 1}`;
            if (!grid.has(key) && curPos[1] + 1 !== floor) {
                curPos = [curPos[0] - 1, curPos[1] + 1];
                continue;
            }
            key = `${curPos[0] + 1}-${curPos[1] + 1}`;
            if (!grid.has(key) && curPos[1] + 1 !== floor) {
                curPos = [curPos[0] + 1, curPos[1] + 1];
                continue;
            }
            canMove = false;
            grid.set(`${curPos[0]}-${curPos[1]}`, 'o');
        }


        if (grid.has(`500-0`)) {
            sandStop = true;
        } else {
            sandCount++;
        }
    }

    console.log(sandCount + 1);
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();