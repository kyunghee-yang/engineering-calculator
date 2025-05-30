import { useState, useEffect, useRef } from 'react';
import { Expression } from '@/domain/entities/Expression';
import { useHistory } from '../context/HistoryContext';
import './Calculator.css';

export const Calculator = () => {
  const [expression, setExpression] = useState(new Expression());
  const [displayValue, setDisplayValue] = useState('');
  const [lastResult, setLastResult] = useState('');
  const { addToHistory } = useHistory();
  
  // 버튼 참조를 위한 ref 객체
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  
  // ref 콜백 함수 - 반환값이 없도록 void로 설정
  const setButtonRef = (key: string) => (el: HTMLButtonElement | null) => {
    buttonRefs.current[key] = el;
  };

  const handleDigitClick = (digit: string) => {
    // If we just showed a result, start a new calculation
    if (lastResult) {
      const newExpression = new Expression(digit);
      setExpression(newExpression);
      setDisplayValue(newExpression.getValue());
      setLastResult('');
    } else {
      expression.appendDigit(digit);
      setDisplayValue(expression.getValue());
    }
  };

  const handleOperatorClick = (operator: string) => {
    // If we have a result, use it as the first operand
    if (lastResult) {
      const newExpression = new Expression(lastResult);
      newExpression.appendOperator(operator);
      setExpression(newExpression);
      setDisplayValue(newExpression.getValue());
      setLastResult('');
    } else {
      expression.appendOperator(operator);
      setDisplayValue(expression.getValue());
    }
  };

  const handleDecimalClick = () => {
    // If we have a result, start a new decimal number
    if (lastResult) {
      const newExpression = new Expression('0.');
      setExpression(newExpression);
      setDisplayValue(newExpression.getValue());
      setLastResult('');
    } else {
      expression.appendDecimal();
      setDisplayValue(expression.getValue());
    }
  };

  const handleEqualsClick = () => {
    const expressionValue = expression.getValue();
    const result = expression.evaluate();
    setDisplayValue(result);
    setLastResult(result);
    
    // 계산 결과가 오류가 아닌 경우에만 히스토리에 추가
    if (result !== 'Error' && expressionValue) {
      addToHistory({
        expression: expressionValue,
        result: result
      });
    }
  };

  const handleClearClick = () => {
    expression.clear();
    setDisplayValue('');
    setLastResult('');
  };

  const handleDeleteClick = () => {
    if (lastResult) {
      // If we have a result, clear everything
      handleClearClick();
    } else {
      expression.deleteLast();
      setDisplayValue(expression.getValue());
    }
  };
  
  // 키보드 이벤트 처리
  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    
    // 숫자 키 (0-9)
    if (/^[0-9]$/.test(key)) {
      handleDigitClick(key);
      // 버튼 클릭 효과 추가
      if (buttonRefs.current[key]) {
        const button = buttonRefs.current[key];
        button?.classList.add('active-key');
        setTimeout(() => {
          button?.classList.remove('active-key');
        }, 100);
      }
    }
    
    // 연산자 키
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
      handleOperatorClick(key);
      // 버튼 클릭 효과 추가
      const operatorMap: { [key: string]: string } = {
        '+': '+',
        '-': '-',
        '*': '*',
        '/': '/'
      };
      const button = buttonRefs.current[operatorMap[key]];
      if (button) {
        button.classList.add('active-key');
        setTimeout(() => {
          button.classList.remove('active-key');
        }, 100);
      }
    }
    
    // 소수점
    else if (key === '.' || key === ',') {
      handleDecimalClick();
      if (buttonRefs.current['.']) {
        const button = buttonRefs.current['.'];
        button?.classList.add('active-key');
        setTimeout(() => {
          button?.classList.remove('active-key');
        }, 100);
      }
    }
    
    // Enter 키 (계산)
    else if (key === 'Enter' || key === '=') {
      handleEqualsClick();
      if (buttonRefs.current['=']) {
        const button = buttonRefs.current['='];
        button?.classList.add('active-key');
        setTimeout(() => {
          button?.classList.remove('active-key');
        }, 100);
      }
    }
    
    // Backspace 키 (삭제)
    else if (key === 'Backspace') {
      handleDeleteClick();
      if (buttonRefs.current['DEL']) {
        const button = buttonRefs.current['DEL'];
        button?.classList.add('active-key');
        setTimeout(() => {
          button?.classList.remove('active-key');
        }, 100);
      }
    }
    
    // Escape 키 (초기화)
    else if (key === 'Escape') {
      handleClearClick();
      if (buttonRefs.current['C']) {
        const button = buttonRefs.current['C'];
        button?.classList.add('active-key');
        setTimeout(() => {
          button?.classList.remove('active-key');
        }, 100);
      }
    }
  };
  
  // 키보드 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lastResult]); // lastResult가 변경될 때마다 이벤트 리스너 재등록

  return (
    <div className="calculator">
      <div className="calculator-display" data-testid="calculator-display">
        {displayValue}
      </div>
      <div className="calculator-keys">
        {/* 첫번째 행 */}
        <button 
          ref={setButtonRef('C')} 
          onClick={() => handleClearClick()}
          className="span-2"
        >
          C
        </button>
        <button 
          ref={setButtonRef('DEL')} 
          onClick={() => handleDeleteClick()}
        >
          DEL
        </button>
        <button 
          ref={setButtonRef('/')} 
          onClick={() => handleOperatorClick('/')} 
          className="operator"
        >
          ÷
        </button>
        
        {/* 두번째 행 */}
        <button 
          ref={setButtonRef('7')} 
          onClick={() => handleDigitClick('7')}
        >
          7
        </button>
        <button 
          ref={setButtonRef('8')} 
          onClick={() => handleDigitClick('8')}
        >
          8
        </button>
        <button 
          ref={setButtonRef('9')} 
          onClick={() => handleDigitClick('9')}
        >
          9
        </button>
        <button 
          ref={setButtonRef('*')} 
          onClick={() => handleOperatorClick('*')} 
          className="operator"
        >
          ×
        </button>
        
        {/* 세번째 행 */}
        <button 
          ref={setButtonRef('4')} 
          onClick={() => handleDigitClick('4')}
        >
          4
        </button>
        <button 
          ref={setButtonRef('5')} 
          onClick={() => handleDigitClick('5')}
        >
          5
        </button>
        <button 
          ref={setButtonRef('6')} 
          onClick={() => handleDigitClick('6')}
        >
          6
        </button>
        <button 
          ref={setButtonRef('-')} 
          onClick={() => handleOperatorClick('-')} 
          className="operator"
        >
          -
        </button>
        
        {/* 네번째 행 */}
        <button 
          ref={setButtonRef('1')} 
          onClick={() => handleDigitClick('1')}
        >
          1
        </button>
        <button 
          ref={setButtonRef('2')} 
          onClick={() => handleDigitClick('2')}
        >
          2
        </button>
        <button 
          ref={setButtonRef('3')} 
          onClick={() => handleDigitClick('3')}
        >
          3
        </button>
        <button 
          ref={setButtonRef('+')} 
          onClick={() => handleOperatorClick('+')} 
          className="operator"
        >
          +
        </button>
        
        {/* 다섯번째 행 */}
        <button 
          ref={setButtonRef('0')} 
          onClick={() => handleDigitClick('0')}
        >
          0
        </button>
        <button 
          ref={setButtonRef('.')} 
          onClick={() => handleDecimalClick()}
        >
          .
        </button>
        <button 
          ref={setButtonRef('=')} 
          onClick={() => handleEqualsClick()} 
          className="equals span-2"
        >
          =
        </button>
      </div>
    </div>
  );
};
