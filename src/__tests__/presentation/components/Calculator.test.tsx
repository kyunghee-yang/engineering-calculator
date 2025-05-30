import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '@/presentation/components/Calculator';

describe('Calculator Component', () => {
  test('renders calculator display and buttons', () => {
    render(<Calculator />);
    
    // Display should be present
    expect(screen.getByTestId('calculator-display')).toBeInTheDocument();
    
    // Numeric buttons
    for (let i = 0; i <= 9; i++) {
      expect(screen.getByText(i.toString())).toBeInTheDocument();
    }
    
    // Operation buttons
    expect(screen.getByText('+')).toBeInTheDocument();
    expect(screen.getByText('-')).toBeInTheDocument();
    expect(screen.getByText('×')).toBeInTheDocument();
    expect(screen.getByText('÷')).toBeInTheDocument();
    expect(screen.getByText('=')).toBeInTheDocument();
    expect(screen.getByText('C')).toBeInTheDocument();
  });

  test('should update display when digit buttons are clicked', () => {
    render(<Calculator />);
    
    const display = screen.getByTestId('calculator-display');
    
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    expect(display).toHaveTextContent('123');
  });

  test('should perform addition when + button is clicked', () => {
    render(<Calculator />);
    
    const display = screen.getByTestId('calculator-display');
    
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('3'));
    fireEvent.click(screen.getByText('='));
    
    expect(display).toHaveTextContent('5');
  });

  test('should clear display when C button is clicked', () => {
    render(<Calculator />);
    
    const display = screen.getByTestId('calculator-display');
    
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    expect(display).toHaveTextContent('123');
    
    fireEvent.click(screen.getByText('C'));
    
    expect(display).toHaveTextContent('');
  });

  test('should delete last character when DEL button is clicked', () => {
    render(<Calculator />);
    
    const display = screen.getByTestId('calculator-display');
    
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('3'));
    
    expect(display).toHaveTextContent('123');
    
    fireEvent.click(screen.getByText('DEL'));
    
    expect(display).toHaveTextContent('12');
  });

  test('should add decimal point when . button is clicked', () => {
    render(<Calculator />);
    
    const display = screen.getByTestId('calculator-display');
    
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('2'));
    fireEvent.click(screen.getByText('.'));
    fireEvent.click(screen.getByText('3'));
    
    expect(display).toHaveTextContent('12.3');
  });
});
