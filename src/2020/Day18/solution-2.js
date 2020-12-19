const fs = require('fs');

const OPERATORS = ['+', '-', '*', '/'];

function operationOrder(err, data) {
    let lines = data.split("\n");
    let totalSum = 0;

    for (let line of lines) {
        let numStack = [];
        let operatorStack = [];

        for (let char of line) {
            if (char !== ' ' && !isNaN(char)) {
                numStack.push(parseInt(char, 10));
            } else if (char === '(') {
                operatorStack.push(char);
            } else if (char === ')') {
                while (operatorStack[operatorStack.length - 1] !== '(') {
                    evaluate(numStack, operatorStack);
                }
                operatorStack.pop();
            } else if (OPERATORS.indexOf(char) > -1){
                while (operatorStack.length !== 0 && precedence(char) <= precedence(operatorStack[operatorStack.length - 1])) {
                    evaluate(numStack, operatorStack);
                }
                operatorStack.push(char);
            }
        }

        while (operatorStack.length !== 0) {
            evaluate(numStack, operatorStack);
        }
        let res = numStack.pop();
        totalSum += res;
    }

    console.log(totalSum);
}

function precedence(char){
    switch(char) {
        case '+':
        case '-':
            return 2;
        case '*':
        case '/':
            return 1;
    }

    return -1;
}

function evaluate(numStack, operatorStack) {
    let num1 = numStack.pop();
    let num2 = numStack.pop();
    let operator = operatorStack.pop();
    let result;

    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num2 - num1;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            result = num2 / num1;
            break;
        default:
            break;
    }

    numStack.push(result);
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', operationOrder);
}

main();