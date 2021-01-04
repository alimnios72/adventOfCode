const fs = require('fs');

const MAX_CYCLES = 6;

function conwayCubes(err, data) {
    let initial = data.split("\n")
    .map(a => Array.from(a));
    let activeCount = initial.reduce((acc, row) => {
        return acc + row.reduce((a, val) => {
            if (val === '#') {
                a++;
            }
            return a;
        }, 0);
        
    }, 0);
    let cycle = 0;
    let grid4D = [ [ initial ] ];

    while (cycle < MAX_CYCLES) {
        addLayers(grid4D);
        activeCount = runCycle(grid4D, activeCount);
        cycle++;
    }

    console.log(activeCount);
}
function addLayers(grid4D) {
    for (let w = 0; w < grid4D.length; w++) {
        for (let z = 0; z < grid4D[w].length; z++) {
            grid4D[w][z].map(a => {
                a.unshift('.');
                a.push('.');
                return a;
            });
            grid4D[w][z].unshift(Array(grid4D[w][z][0].length).fill('.'));
            grid4D[w][z].push(Array(grid4D[w][z][0].length).fill('.'));
        }
        let len = grid4D[w][0][0].length;
        grid4D[w].unshift(Array.from(Array(len), _ => Array(len).fill('.')));
        grid4D[w].push(Array.from(Array(len), _ => Array(len).fill('.')));
    }

    let len1 = grid4D[0][0][0].length;
    let tmp1 = [], tmp2 = [];
    for (let i = 0; i < grid4D[0].length; i++) {
        tmp1.push(Array.from(Array(len1), _ => Array(len1).fill('.')));
        tmp2.push(Array.from(Array(len1), _ => Array(len1).fill('.')));
    }
    grid4D.unshift(tmp1);
    grid4D.push(tmp2);
}

function runCycle(grid4D, activeCount) {
    let hash = {};
    for (let w = 0; w < grid4D.length; w++) {
        for (let z = 0; z < grid4D[w].length; z++) {
            for (let x = 0; x < grid4D[w][z].length; x++) {
                for (let y = 0; y < grid4D[w][z][x].length; y++) {
                    let active = checkActiveNeighbors(grid4D, x, y, z, w);
                    let key = `${w},${z},${x},${y}`;

                    if (grid4D[w][z][x][y] === '#') {
                        if (active !== 2 && active !== 3) {
                            hash[key] = '.';
                            activeCount--;
                        }
                    } else {
                        if (active === 3) {
                            hash[key] = '#';
                            activeCount++;
                        }
                    }
                }
            }
        }
    }

    updateGrid(grid4D, hash);

    return activeCount;
}

function checkActiveNeighbors(grid4D, x, y, z, w) {
    let active = 0;
    let total = 0;
    for (let h = w - 1; h <= w + 1; h++) {
        for (let i = z - 1; i <= z + 1; i++) {
            for (let j = x - 1; j <= x + 1; j++) {
                for (let k = y - 1; k <= y + 1; k++) {
                    let zeroCheck = h >= 0 && i >= 0 && j >= 0 && k >= 0;
                    let positionCheck = h === w && i === z && j === x && k === y;
                    if (!zeroCheck || positionCheck) {
                        continue;
                    }

                    let lengthCheck = h < grid4D.length && i < grid4D[h].length && j < grid4D[h][i].length && k < grid4D[h][i][j].length;
                    if (lengthCheck) {
                        total++; 
                    }
                    if (lengthCheck && grid4D[h][i][j][k] === '#') {
                        active++;
                    }
                }
            }
        }
    }
    return active;
}

function updateGrid(grid4D, hash) {
    for (let k in hash) {
        let [w, z, x, y] = k.split(',');
        grid4D[w][z][x][y] = hash[k];
    }
    hash = {};
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', conwayCubes);
}

main();