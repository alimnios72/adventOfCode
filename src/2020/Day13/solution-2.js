const fs = require('fs');

function shuttleSearch(err, data) {
    let input = data.split("\n");
    let buses = input[1].split(",")
    .map((a, idx) => {
        if (!isNaN(a)) {
            return { offset: idx, value: Number(a) };
        }

        return null;
    })
    .filter(a => a != null);

    let time = 0;
    let acc = 1;
    for (let bus of buses) {
        for (let i = 0; i < bus.value; i++) {
            let next = time + (i * acc);
            if ((next + bus.offset) % bus.value === 0) {
                time = next;
                acc = acc * bus.value;
                break;
            }
        }
    }

    console.log(time);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', shuttleSearch);
}

main();