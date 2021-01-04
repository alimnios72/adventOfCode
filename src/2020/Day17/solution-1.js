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
    let grid3D = [ initial ];

    while (cycle < MAX_CYCLES) {
        addLayers(grid3D);
        activeCount = runCycle(grid3D, activeCount);
        cycle++;
    }

    console.log(activeCount);
}
function addLayers(grid3D) {
    for (let z = 0; z < grid3D.length; z++) {
        grid3D[z].map(a => {
            a.unshift('.');
            a.push('.');
            return a;
        });
        grid3D[z].unshift(Array(grid3D[z][0].length).fill('.'));
        grid3D[z].push(Array(grid3D[z][0].length).fill('.'));
    }

    let len = grid3D[0][0].length;

    grid3D.unshift(Array.from(Array(len), _ => Array(len).fill('.'))); 
    grid3D.push(Array.from(Array(len), _ => Array(len).fill('.'))); 
}

function runCycle(grid3D, activeCount) {
    let hash = {};
    for (let z = 0; z < grid3D.length; z++) {
        for (let x = 0; x < grid3D[z].length; x++) {
            for (let y = 0; y < grid3D[z][x].length; y++) {
                let active = checkActiveNeighbors(grid3D, x, y, z);

                if (grid3D[z][x][y] === '#') {
                    if (active !== 2 && active !== 3) {
                        hash[`${z},${x},${y}`] = '.';
                        activeCount--;
                    }
                } else {
                    if (active === 3) {
                        hash[`${z},${x},${y}`] = '#';
                        activeCount++;
                    }
                }
            }
        }
    }

    updateGrid(grid3D, hash);

    return activeCount;
}

function checkActiveNeighbors(grid3D, x, y, z) {
    let active = 0;
    for (let i = z - 1; i <= z + 1; i++) {
        for (let j = x - 1; j <= x + 1; j++) {
            for (let k = y - 1; k <= y + 1; k++) {
                let zeroCheck = i >= 0 && j >= 0 && k >= 0;
                let positionCheck = i === z && j === x && k === y;
                if (!zeroCheck || positionCheck) {
                    continue;
                }

                let lengthCheck = i < grid3D.length && j < grid3D[i].length && k < grid3D[i][j].length;
                if (lengthCheck && grid3D[i][j][k] === '#') {
                    active++;
                }
            }
        }
    }

    return active;
}

function updateGrid(grid3D, hash) {
    for (let k in hash) {
        let [z, x, y] = k.split(',');
        grid3D[z][x][y] = hash[k];
    }
    hash = {};
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', conwayCubes);
}

main();