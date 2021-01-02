const fs = require('fs');

function allergenAssessment(err, data) {
    let recipe = data.split("\n");
    let allIngredients = [];
    let allergensMap = new Map();

    for (let line of recipe) {
        let parts = line.split('(contains')
        let ingredientsSet = new Set(parts[0].trim().split(' '));
        allIngredients = [...allIngredients, ...Array.from(ingredientsSet)];
        let allergens = parts[1].trim().substring(0, parts[1].length - 2).split(', ');

        for (let allergen of allergens) {
            if (!allergensMap.has(allergen)) {
                allergensMap.set(allergen, ingredientsSet);
            } else {
                let currIngredients = allergensMap.get(allergen);
                let intersection = new Set(getIntersect(currIngredients, ingredientsSet));
                allergensMap.set(allergen, intersection);
            }
        }
    }

    let uniqueIngredients = new Set();
    for (let [key, ingredients] of allergensMap) {
        for (let ingredient of ingredients.values()) {
            uniqueIngredients.add(ingredient)
        }
    }

    let safeIngredients = allIngredients.filter((ing) => !uniqueIngredients.has(ing));
    console.log(safeIngredients.length)
}

function getIntersect(curr, ingredients) {
    return Array.from(curr).filter(all => ingredients.has(all));
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', allergenAssessment);
}

main();