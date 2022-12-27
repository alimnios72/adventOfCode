const fs = require('fs');

function parseHeights(data) {
    let heights = data.split("\n")
        .map((line, i) => line.split("")
            .map((elev, j) => {
                if (elev === 'S') {
                    start = { x: i, y: j };
                    return Infinity;
                } else if (elev === 'E') {
                    end = { x: i, y: j };
                    return 'z'.charCodeAt(0);
                } else {
                    return elev.charCodeAt(0);
                }
            })
        );

    return [heights, start, end];
}

function findShortestPath(heightMap, end) {
    let visited = heightMap.map((line) => line.map(() => false));
    let shortestPaths = heightMap.map((line) => line.map(() => Infinity));
    shortestPaths[end.x][end.y] = 0;

    let queue = [end];

    while (queue.length > 0) {
        let current = queue.shift();
        visited[current.x][current.y] = true;

        let neighbours = [
            { x: current.x, y: current.y - 1 },
            { x: current.x, y: current.y + 1 },
            { x: current.x - 1, y: current.y },
            { x: current.x + 1, y: current.y },
        ];

        neighbours = neighbours.filter((neighbour) => {
            if (!heightMap[neighbour.x]) return false;
            return !!heightMap[neighbour.x][neighbour.y];
        });

        neighbours.forEach((neighbour) => {
            let currHeight = heightMap[current.x][current.y];
            let nextHeight = heightMap[neighbour.x][neighbour.y];

            if (currHeight >= nextHeight - 1) {
                let shortestDist = shortestPaths[neighbour.x][neighbour.y] + 1;
                let currShortestDist = shortestPaths[current.x][current.y];
                shortestPaths[current.x][current.y] = Math.min(currShortestDist, shortestDist);
            }

            if (!visited[neighbour.x][neighbour.y] && currHeight <= nextHeight + 1) {
                queue.push(neighbour);
                visited[neighbour.x][neighbour.y] = true;
            }
        });
    }

    return shortestPaths;
}

function part1(err, data) {
    let [heightMap, start, end] = parseHeights(data);
    let shortestPaths = findShortestPath(heightMap, end);
    console.log(shortestPaths[start.x][start.y])
}

function part2(err, data) {
    let [heightMap, , end] = parseHeights(data);
    let shortestPaths = findShortestPath(heightMap, end);
    let min = Infinity;

    heightMap.forEach((line, x) => {
        line.forEach((height, y) => {
            if (height === 97) min = Math.min(min, shortestPaths[x][y]);
        });
    });

    console.log(min);
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();