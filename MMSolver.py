import itertools

# Helper function to recursively generate all possible equations
def getAEHelper(nums, ops, eq, used_indices):
    if len(used_indices) == len(nums):
        return [eq]
    
    equations = []
    
    # Add numbers and concatenate digits
    for i in range(len(nums)):
        if i not in used_indices:
            new_eq = eq + str(nums[i])
            new_used_indices = used_indices + [i]
            equations.extend(getAEHelper(nums, ops, new_eq, new_used_indices))
            # Add operators if not the first element
            if eq:
                for op in ops:
                    new_eq_with_op = eq + op + str(nums[i])
                    equations.extend(getAEHelper(nums, ops, new_eq_with_op, new_used_indices))
                
    return equations

# Main function to generate all possible equations
def getAllEquations(nums, ops):
    return getAEHelper(nums, ops, "", [])

#Turns all the equations into a dictionary with keys being the evaluation of the equations
def getAllTargets(AEs):
    ATs = {}
    for ae in AEs:
        try:
            e = eval(ae)
            if e in ATs:
                ATs[e].append(ae)
            else:
                ATs[e] = [ae]
        except ZeroDivisionError:
            print(f"Division by zero is not allowe: {ae}")
    return ATs


def getAllSolutions(nums,ops,target):
    AEs = getAllEquations(nums, ops)
    ATs = getAllTargets(AEs)
    return ATs[target]
   
    sortedATs = dict(sorted(ATs.items()))
    for key, val in sortedATs.items():
        print(key,val)

def main():
    nums = [2, 3, 4, 6, 7]
    ops = ['+', '-', '*', '/']
    target = 99
    print(getAllSolutions(nums,ops,target))

if __name__ == '__main__':
    main()
