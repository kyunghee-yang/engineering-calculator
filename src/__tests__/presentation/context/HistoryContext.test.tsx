import { render, screen, fireEvent } from '@testing-library/react';
import { HistoryProvider, useHistory, HistoryItem } from '../../../presentation/context/HistoryContext';

// 테스트용 컴포넌트
const TestComponent = () => {
  const { history, addToHistory, clearHistory, removeHistoryItem } = useHistory();
  
  return (
    <div>
      <div data-testid="history-count">{history.length}</div>
      <button 
        data-testid="add-button" 
        onClick={() => addToHistory({ expression: '2+3', result: '5' })}
      >
        Add to History
      </button>
      <button 
        data-testid="clear-button" 
        onClick={() => clearHistory()}
      >
        Clear History
      </button>
      <ul>
        {history.map((item: HistoryItem, index: number) => (
          <li key={index} data-testid={`history-item-${index}`}>
            {item.expression} = {item.result}
            <button 
              data-testid={`remove-item-${index}`} 
              onClick={() => removeHistoryItem(item)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

describe('HistoryContext', () => {
  test('should add items to history', () => {
    render(
      <HistoryProvider>
        <TestComponent />
      </HistoryProvider>
    );
    
    // 초기 히스토리는 비어있어야 함
    expect(screen.getByTestId('history-count').textContent).toBe('0');
    
    // 히스토리에 항목 추가
    fireEvent.click(screen.getByTestId('add-button'));
    
    // 히스토리에 항목이 추가되었는지 확인
    expect(screen.getByTestId('history-count').textContent).toBe('1');
    expect(screen.getByTestId('history-item-0').textContent).toBe('2+3 = 5');
  });
  
  test('should remove individual history item', () => {
    render(
      <HistoryProvider>
        <TestComponent />
      </HistoryProvider>
    );
    
    // 히스토리에 항목 두 개 추가
    fireEvent.click(screen.getByTestId('add-button'));
    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('history-count').textContent).toBe('2');
    
    // 첫 번째 항목 삭제
    fireEvent.click(screen.getByTestId('remove-item-0'));
    
    // 히스토리에 항목이 하나만 남아있는지 확인
    expect(screen.getByTestId('history-count').textContent).toBe('1');
  });
  
  test('should clear history', () => {
    render(
      <HistoryProvider>
        <TestComponent />
      </HistoryProvider>
    );
    
    // 히스토리에 항목 추가
    fireEvent.click(screen.getByTestId('add-button'));
    expect(screen.getByTestId('history-count').textContent).toBe('1');
    
    // 히스토리 초기화
    fireEvent.click(screen.getByTestId('clear-button'));
    
    // 히스토리가 비어있는지 확인
    expect(screen.getByTestId('history-count').textContent).toBe('0');
  });
  
  test('should persist history in localStorage', () => {
    // localStorage 모킹
    const localStorageMock = (() => {
      let store: Record<string, string> = {};
      return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => {
          store[key] = value;
        },
        clear: () => {
          store = {};
        }
      };
    })();
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    
    // 첫 번째 렌더링
    const { unmount } = render(
      <HistoryProvider>
        <TestComponent />
      </HistoryProvider>
    );
    
    // 히스토리에 항목 추가
    fireEvent.click(screen.getByTestId('add-button'));
    
    // 컴포넌트 언마운트 (localStorage에 저장되어야 함)
    unmount();
    
    // 두 번째 렌더링 (localStorage에서 불러와야 함)
    render(
      <HistoryProvider>
        <TestComponent />
      </HistoryProvider>
    );
    
    // 이전 히스토리가 유지되는지 확인
    expect(screen.getByTestId('history-count').textContent).toBe('1');
    expect(screen.getByTestId('history-item-0').textContent).toBe('2+3 = 5');
  });
});
