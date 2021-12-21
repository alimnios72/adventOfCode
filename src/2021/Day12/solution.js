const fs = require('fs');

function part1(err, data) {
    let adjList = {};
    data.split('\n')
    .map(line => {
        let [x, y] = line.split('-');
        adjList[x] ? adjList[x].push(y) : adjList[x] = [y];
        adjList[y] ? adjList[y].push(x) : adjList[y] = [x];
    });

    let findPaths = function (map, start, end, paths, currPath) {
        currPath[start] = currPath[start] + 1 || 1;
    
        if (start === end) {
            paths.push(currPath);
            return;
        }
    
        if (map[start] == null) {
            return;
        }
    
        for (let cave of map[start]) {
            if (isSmallCaveOrLimit(cave) && currPath[cave] != null) {
                continue;
            }
    
            findPaths(map, cave, end, paths, { ...currPath });
        }
    
        return paths;
    }

    let paths = findPaths(adjList, 'start', 'end', [], {});
    console.log(paths.length);
}

function part2(err, data) {
    let adjList = {};
    data.split('\n')
    .map(line => {
        let [x, y] = line.split('-');
        adjList[x] ? adjList[x].push(y) : adjList[x] = [y];
        adjList[y] ? adjList[y].push(x) : adjList[y] = [x];
    });

    let findPaths = function (map, start, end, paths, currPath) {
        currPath[start] = currPath[start] + 1 || 1;

        if (isSmallCaveOrLimit(start) && currPath[start] === 2) {
            currPath['small-cave-double-visited'] = 1;
        }
    
        if (start === end) {
            paths.push(currPath);
            return;
        }
    
        if (map[start] == null) {
            return;
        }
    
        for (let cave of map[start]) {
            if (isSmallCaveOrLimit(cave) && currPath[cave] != null) {
                if (['start', 'end'].includes(cave) || currPath['small-cave-double-visited'] === 1) {
                    continue;
                }
            }
    
            findPaths(map, cave, end, paths, { ...currPath });
        }
    
        return paths;
    }

    let paths = findPaths(adjList, 'start', 'end', [], {});
    console.log(paths.length);
}

function isSmallCaveOrLimit(char) {
    let c = char.charCodeAt(0);
    return c >= 97 && c <= 122;
}

function main() {
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();