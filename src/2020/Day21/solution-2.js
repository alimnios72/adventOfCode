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

    let ingredientsMap = new Map();
    while (allergensMap.size > 0) {
        // Find allergen with one ingredient and use it 
        // to update map
        let ingToDelete = '';
        for (let [allergen, ingredients] of allergensMap) {
            if (ingredients.size === 1) {
                ingToDelete = ingredients.values().next().value;
                ingredientsMap.set(ingToDelete, allergen)
                allergensMap.delete(allergen);
                break;
            }
        }

        // Delete ingredient from other allergens
        for (let [, ingredients] of allergensMap) {
            ingredients.delete(ingToDelete);
        }
    }

    let sortedIngredients = new Map([...ingredientsMap.entries()].sort((a, b) => a[1] > b[1]));

    console.log(Array.from(sortedIngredients.keys()).join(','))
}

function getIntersect(curr, ingredients) {
    return Array.from(curr).filter(all => ingredients.has(all));
}

function main(){
    fs.readFile(`${__dirname}/input.txt`, 'utf8', allergenAssessment);
    // fs.readFile(`${__dirname}/input1.txt`, 'utf8', allergenAssessment);
}

main();