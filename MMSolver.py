import itertools
import re
import random
from datetime import datetime, timedelta

# Helper function to recursively generate all possible equations
def getAEHelper(nums, ops, eq, pos):
    if pos == len(nums) - 1:
        return [eq]
    
    equations = []
    
    # Add each operator between numbers
    for op in ops:
        new_eq_with_op = eq + op + str(nums[pos + 1])
        equations.extend(getAEHelper(nums, ops, new_eq_with_op, pos + 1))
    
    # Also consider concatenating the next number directly
    new_eq_with_num = eq + str(nums[pos + 1])
    equations.extend(getAEHelper(nums, ops, new_eq_with_num, pos + 1))
    
    return equations

# Main function to generate all possible equations
def getAllEquations(nums, ops):
    unique_equations = set()
    for perm in itertools.permutations(nums):
        eq = str(perm[0])
        equations = getAEHelper(perm, ops, eq, 0)
        unique_equations.update(equations)
    return list(unique_equations)

# Function to normalize an equation by extracting and sorting numbers and operators
def normalize_equation(eq, e):
    numbers = list(map(int, re.findall(r'\d+', eq)))
    operators = re.findall(r'[\+\-\*/]', eq)
    return (int(e), tuple(sorted(numbers)), tuple(sorted(operators)))

# Turns all the equations into a dictionary with keys being the evaluation of the equations
def getAllTargets(AEs):
    ATs = {}
    for ae in AEs:
        try:
            e = eval(ae)
            norm = normalize_equation(ae, e)
            if (e - int(e) == 0):  # Check if the result is an integer
                if norm in ATs:
                    ATs[norm].append(ae)
                else:
                    ATs[norm] = [ae]
        except ZeroDivisionError:
            continue
            print(f"Division by zero is not allowed: {ae}")
        except SyntaxError:
            continue
            print(f"Syntax Error: Eval({ae})")
    return ATs

# Function to get the most frequent target values within a specific range
def getMost(ATs):
    sortedATs = dict(sorted(ATs.items()))
    most = {}
    for key, val in sortedATs.items():
        if key[0] > 0 and key[0] < 30:
            if key[0] not in most:
                most[key[0]] = []
            most[key[0]].append([key, val])
    return most

# Function to generate hints for the solutions
def getHints(v):
    hint = ''
    for x in v[1]:
        if max(x[0][1]) >= 10:
            hint += str(max(x[0][1]))
        else:
            hint += x[1][0][-2:]
        hint += " or "
    return hint[:-4]

# Function to print the most frequent target values and their solutions
def printMost(most, date, nums, oneSolution):
    sortedMost = sorted(most.items(), key=lambda x: len(x[1]), reverse=False)
    if oneSolution:
        v = sortedMost[-random.randint(1, 4)]
        print('{ "date": "', date, '", "target": ', v[0], ', "numbers": ', sorted(nums), ', "solutions": ', len(v[1]), ', "hint": "', getHints(v), '" },', sep='')
    else:
        for v in sortedMost:
            print("\n")
            for x in v:
                if isinstance(x, list):
                    print(f"# of Solutions: {len(x)}")
                    for y in x:
                        print(y)
                else:
                    print(x)
            print('\n{ "date": "', date, '", "target": ', v[0], ', "numbers": ', nums, ', "solutions": ', len(v[1]), ', "hint": "', getHints(v), '" },\n\n', sep='')

# Main function to get all solutions for a given date, numbers, and operators
def getAllSolutions(date, nums, ops=['+', '-', '*', '/'], target=0, most=False, oneSolution=False):
    AEs = getAllEquations(nums, ops)
    ATs = getAllTargets(AEs)
    if most:
        mostATs = getMost(ATs)
        printMost(mostATs, date, nums, oneSolution)
    target_solutions = {}
    for norm, eqs in ATs.items():
        for eq in eqs:
            try:
                e = eval(eq)
                if e == target:
                    if norm not in target_solutions:
                        target_solutions[norm] = []
                    target_solutions[norm].append(eq)
            except ZeroDivisionError:
                continue
            except SyntaxError:
                continue
    return target_solutions if target_solutions else "No Solutions"

# Function to print the solutions
def printSolutions(solutions):
    if isinstance(solutions, dict):
        for key, val in solutions.items():
            print(f"{key}: {val}")
    else:
        print(solutions)

# Function to generate a list of dates starting from `start_date` for `num_days`
def generate_dates(start_date: str, num_days: int) -> list:
    start_date_obj = datetime.strptime(start_date, '%Y-%m-%d')
    date_list = [(start_date_obj + timedelta(days=i)).strftime('%Y-%m-%d') for i in range(num_days)]
    return date_list

# Main function to generate new levels
def generate_levels():
    start_date = '2024-07-26'
    num_days = 159
    dates = generate_dates(start_date, num_days)
    for d in dates:
        nums = random.sample(range(2, 10), 4)
        ops = ['+', '-', '*', '/']
        target = 0
        printSolutions = True
        oneSolution = True
        solutions = getAllSolutions(d, nums, ops, target, printSolutions, oneSolution)
        # printSolutions(solutions)
        # print(f"NUMS: {nums}")

# Main function to run the solver with fixed numbers
def fixed_numbers_example(nums=[1,2,3,4],target=10):
    ops = ['+', '-', '*', '/']
    printSolutions = True
    oneSolution = False
    solutions = getAllSolutions('2024-06-26', nums, ops, target, printSolutions, oneSolution)
    # printSolutions(solutions)

# Main function to run the solver
def main():
    # Uncomment the following line to run the example usage
    generate_levels()

    # Run the fixed numbers example
    #fixed_numbers_example([2,4,6,7],25)

if __name__ == '__main__':
    main()

