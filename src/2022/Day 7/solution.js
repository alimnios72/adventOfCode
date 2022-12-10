const fs = require('fs');
const Node = require('../../utils/Node');

function isCommand(line) {
    return line[0] === '$' && (line.includes('cd') || line.includes('ls'));
}

function parseStdOutput(current, line) {
    if (line.substring(0, 3) === 'dir') {
        return new Node({
            name: line.substring(4),
            type: 'dir',
            size: 0,
            children: []
        }, current);
    } else {
        let [, size, name] = line.match(/([0-9]+) (.*)/);
        return new Node({
            name: name,
            type: 'file',
            size: parseInt(size, 10),
            parent: current,
        }, current);
    }
}

function buildDirTree(output) {
    const root = new Node({
        name: '/',
        type: 'dir',
        size: 0,
        children: []
    }, null);
    let current = root;

    for (let i = 0; i < output.length; i++) {
        let line = output[i];

        if (isCommand(line)) {
            if (line.includes('cd')) {
                const dir = line.substring(5);
                if (dir === '/') {
                    current = root;
                } else if (dir === '..') {
                    current = current.parent;
                } else {
                    for (let c = 0; c < current.data.children.length; c++) {
                        if (current.data.children[c].data.name === dir) {
                            current = current.data.children[c];
                        }
                    }
                }
            }
        } else {
            current.data.children.push(parseStdOutput(current, line));
        }
    };

    return root;
}

function updateDirSizes(root) {
    let queue = [];
    let current = root;
    queue.push(current);

    while (queue.length !== 0) {
        current = queue.shift();

        for (let child of current.data.children) {
            if (child.data.type === 'dir') {
                queue.push(child);
            } else {
                current.data.size += child.data.size;
            }
        }
    }
}

function countDirs(root, maxSize) {
    let count = 0;
    let queue = [];
    let current = root;
    queue.push(current);

    while (queue.length !== 0) {
        current = queue.shift();

        for (let child of current.data.children) {
            if (child.data.type === 'dir') {
                queue.push(child);
            }
        }

        count += current.data.size <= maxSize ? current.data.size : 0;
    }

    return count;
}

function findRemovableDir(root, neededSpace) {
    let queue = [];
    let potentialDirs = [];
    let current = root;
    queue.push(current);

    while (queue.length !== 0) {
        current = queue.shift();

        for (let child of current.data.children) {
            if (child.data.type === 'dir') {
                queue.push(child);
            }
        }

        if (current.data.size >= neededSpace) {
            potentialDirs.push(current.data.size);
        }
    }

    potentialDirs.sort((a, b) => a - b);
    return potentialDirs[0];
}

function updateNestedDirs(node) {
    if (!node.data.children) {
        return 0;
    }

    for (let child of node.data.children) {
        node.data.size += updateNestedDirs(child)
    }
    return node.data.size;
}

function part1(err, data) {
    const terminalOutput = data.split('\n');
    const dirTree = buildDirTree(terminalOutput);
    updateDirSizes(dirTree);
    updateNestedDirs(dirTree);
    console.log(countDirs(dirTree, 100000));
}

function part2(err, data) {
    const terminalOutput = data.split('\n');
    const dirTree = buildDirTree(terminalOutput);
    updateDirSizes(dirTree);
    updateNestedDirs(dirTree);
    const neededSpace = dirTree.data.size - (70000000 - 30000000);
    console.log(findRemovableDir(dirTree, neededSpace));
}

function main() {
    // fs.readFile(`${__dirname}/input.txt`, 'utf8', part1);
    fs.readFile(`${__dirname}/input.txt`, 'utf8', part2);
}

main();