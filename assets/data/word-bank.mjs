const wordBank = [
    {"word": "Umbrella", "category": "Weather"},
    {"word": "Banana", "category": "Fruit"},
    {"word": "Cat", "category": "Animal"},
    {"word": "House", "category": "Building"},
    {"word": "Tree", "category": "Plant"},
    {"word": "Book", "category": "Literature"},
    {"word": "Sun", "category": "Astronomy"},
    {"word": "Dog", "category": "Animal"},
    {"word": "Car", "category": "Vehicle"},
    {"word": "Rainbow", "category": "Weather"},
    {"word": "Flower", "category": "Plant"},
    {"word": "Chair", "category": "Furniture"},
    {"word": "Bird", "category": "Animal"},
    {"word": "Moon", "category": "Astronomy"},
    {"word": "Cake", "category": "Food"},
    {"word": "Cloud", "category": "Weather"},
    {"word": "Strawberry", "category": "Fruit"},
    {"word": "Laptop", "category": "Electronic"},
    {"word": "Ocean", "category": "Geographical Feature"},
    {"word": "Mountain", "category": "Geographical Feature"}
]

/**
 * 
 * @param {string} category 
 * @returns - A random object in the specified category. 
 * - If no category is specified, returns a random object from the entire array.
 */
export const getRandomWord = (category) => {
    if(category) {
        const filtered = wordBank.filter(word => word.category === category)
        return filtered[Math.floor(Math.random() * filtered.length)]
    }
    return wordBank[Math.floor(Math.random() * wordBank.length)]
}

export default wordBank