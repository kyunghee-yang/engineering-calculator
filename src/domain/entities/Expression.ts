import { evaluate } from 'mathjs';

/**
 * Expression entity represents a mathematical expression that can be manipulated and evaluated.
 */
export class Expression {
  private expression: string;

  constructor(initialValue: string = '') {
    this.expression = initialValue;
  }

  /**
   * Get the current expression value
   */
  getValue(): string {
    return this.expression;
  }

  /**
   * Append a digit to the expression
   */
  appendDigit(digit: string): void {
    this.expression += digit;
  }

  /**
   * Append an operator to the expression
   */
  appendOperator(operator: string): void {
    if (this.expression === '') {
      return;
    }

    const lastChar = this.expression.slice(-1);
    if (['+', '-', '*', '/', '^'].includes(lastChar)) {
      // Replace the last operator
      this.expression = this.expression.slice(0, -1) + operator;
    } else {
      this.expression += operator;
    }
  }

  /**
   * Append a decimal point to the expression
   */
  appendDecimal(): void {
    if (this.expression === '') {
      this.expression = '0.';
      return;
    }

    // Check if the current number already has a decimal point
    const parts = this.expression.split(/[+\-*/^()]/);
    const currentNumber = parts[parts.length - 1];
    
    if (!currentNumber.includes('.')) {
      this.expression += '.';
    }
  }

  /**
   * Clear the expression
   */
  clear(): void {
    this.expression = '';
  }

  /**
   * Delete the last character from the expression
   */
  deleteLast(): void {
    if (this.expression.length > 0) {
      this.expression = this.expression.slice(0, -1);
    }
  }

  /**
   * Evaluate the expression and return the result
   */
  evaluate(): string {
    try {
      if (this.expression === '') {
        return '';
      }
      
      const result = evaluate(this.expression);
      
      // Convert to string and handle special cases
      if (result === Infinity || result === -Infinity) {
        return 'Error';
      }
      
      return result.toString();
    } catch (error) {
      return 'Error';
    }
  }
}
