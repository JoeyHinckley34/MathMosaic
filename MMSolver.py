import itertools
import re

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
def normalize_equation(eq):
    numbers = list(map(int, re.findall(r'\d+', eq)))
    operators = re.findall(r'[\+\-\*/]', eq)
    return (tuple(sorted(numbers)), tuple(sorted(operators)))

# Turns all the equations into a dictionary with keys being the evaluation of the equations
def getAllTargets(AEs):
    ATs = {}
    for ae in AEs:
        try:
            e = eval(ae)
            norm = normalize_equation(ae)
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

def getAllSolutions(nums, ops, target):
    AEs = getAllEquations(nums, ops)
    ATs = getAllTargets(AEs)
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
   
def main():
    nums = [5,8,3,4]
    ops = ['+', '-', '*', '/']
    target = 100
    solutions = getAllSolutions(nums, ops, target)
    if isinstance(solutions, dict):
        for key, val in solutions.items():
            print(f"{key}: {val}")
    else:
        print(solutions)

if __name__ == '__main__':
    main()
