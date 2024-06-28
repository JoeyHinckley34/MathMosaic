import json
from pyMM import MathMosaic

def categorize_solutions(solutions):
    categorized = {}
    for key, expressions in solutions.items():
        numbers, operators = key
        numbers_str = str(numbers)
        operators_str = str(operators)
        if numbers_str not in categorized:
            categorized[numbers_str] = {}
        categorized[numbers_str][operators_str] = expressions
    return categorized

def update_levels_with_solutions(levels_file):
    with open(levels_file, 'r') as file:
        levels_data = json.load(file)

    for level in levels_data['dailyLevel']:
        numbers = level['numbers']
        target = level['target']
        mosaic = MathMosaic(numbers, target)
        solutions = mosaic.find_solutions()
        categorized_solutions = categorize_solutions(solutions)
        level['categorizedSolutions'] = categorized_solutions

    with open(levels_file, 'w') as file:
        json.dump(levels_data, file, indent=4)

if __name__ == "__main__":
    update_levels_with_solutions('math-mosaic/src/levels.json')