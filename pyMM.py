import itertools
import operator
import argparse

class MathMosaic:
    def __init__(self, numbers, target):
        self.numbers = numbers
        self.target = target
        self.operators = [operator.add, operator.sub, operator.mul, operator.truediv]
        self.operator_symbols = ['+', '-', '*', '/']

    def find_solutions(self):
        solutions = {}
        for perm in itertools.permutations(self.numbers):
            self.process_permutation(perm, solutions)
        return solutions

    def process_permutation(self, perm, solutions):
        for concat_pattern in self.generate_concat_patterns(len(perm)):
            concatenated_numbers = self.apply_concat_pattern(perm, concat_pattern)
            self.process_concatenated_numbers(concatenated_numbers, solutions)

    def process_concatenated_numbers(self, concatenated_numbers, solutions):
        for ops in itertools.product(self.operators, repeat=len(concatenated_numbers)-1):
            expression = self.build_expression(concatenated_numbers, ops)
            if self.evaluate_expression(expression) == self.target:
                self.add_solution(concatenated_numbers, ops, expression, solutions)

    def build_expression(self, concatenated_numbers, ops):
        expression = [str(concatenated_numbers[0])]
        for num, op in zip(concatenated_numbers[1:], ops):
            expression.append(self.operator_symbols[self.operators.index(op)])
            expression.append(str(num))
        return expression

    def add_solution(self, concatenated_numbers, ops, expression, solutions):
        key = (tuple(sorted(concatenated_numbers)), tuple(sorted(self.operator_symbols[self.operators.index(op)] for op in ops)))
        if key not in solutions:
            solutions[key] = []
        solutions[key].append("".join(expression))

    def generate_concat_patterns(self, length):
        return itertools.product([True, False], repeat=length-1)

    def apply_concat_pattern(self, numbers, pattern):
        result = []
        current = str(numbers[0])
        for num, concat in zip(numbers[1:], pattern):
            if concat:
                current += str(num)
            else:
                result.append(int(current))
                current = str(num)
        result.append(int(current))
        return result

    def evaluate_expression(self, expression):
        try:
            return eval("".join(expression))
        except ZeroDivisionError:
            return None

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Find solutions to reach a target number using a list of numbers and basic arithmetic operations.")
    parser.add_argument("numbers", metavar="N", type=int, nargs="+", help="List of numbers to use")
    parser.add_argument("target", type=int, help="Target number to reach")

    args = parser.parse_args()

    mosaic = MathMosaic(args.numbers, args.target)
    solutions = mosaic.find_solutions()

    print(f"Solutions to reach {args.target} using {args.numbers}:")
    for key, value in solutions.items():
        numbers, operators = key
        print(f"Numbers: {numbers}, Operators: {operators}")
        for solution in value:
            print(f"  {solution}",end ="\t")
        print()

