import { Expression } from '@/domain/entities/Expression';

describe('Expression Entity', () => {
  test('should create an empty expression', () => {
    const expression = new Expression();
    expect(expression.getValue()).toBe('');
  });

  test('should create an expression with initial value', () => {
    const expression = new Expression('123');
    expect(expression.getValue()).toBe('123');
  });

  test('should append a digit to the expression', () => {
    const expression = new Expression('123');
    expression.appendDigit('4');
    expect(expression.getValue()).toBe('1234');
  });

  test('should append an operator to the expression', () => {
    const expression = new Expression('123');
    expression.appendOperator('+');
    expect(expression.getValue()).toBe('123+');
  });

  test('should not append an operator if the expression is empty', () => {
    const expression = new Expression('');
    expression.appendOperator('+');
    expect(expression.getValue()).toBe('');
  });

  test('should not append an operator if the last character is already an operator', () => {
    const expression = new Expression('123+');
    expression.appendOperator('-');
    expect(expression.getValue()).toBe('123-');
  });

  test('should clear the expression', () => {
    const expression = new Expression('123+456');
    expression.clear();
    expect(expression.getValue()).toBe('');
  });

  test('should evaluate a valid expression', () => {
    const expression = new Expression('2+3');
    const result = expression.evaluate();
    expect(result).toBe('5');
  });

  test('should handle division by zero', () => {
    const expression = new Expression('5/0');
    const result = expression.evaluate();
    expect(result).toBe('Error');
  });

  test('should append a decimal point', () => {
    const expression = new Expression('123');
    expression.appendDecimal();
    expect(expression.getValue()).toBe('123.');
  });

  test('should not append a decimal point if the current number already has one', () => {
    const expression = new Expression('123.45');
    expression.appendDecimal();
    expect(expression.getValue()).toBe('123.45');
  });

  test('should handle parentheses', () => {
    const expression = new Expression('2*(3+4)');
    const result = expression.evaluate();
    expect(result).toBe('14');
  });

  test('should delete the last character', () => {
    const expression = new Expression('123+');
    expression.deleteLast();
    expect(expression.getValue()).toBe('123');
  });
});
