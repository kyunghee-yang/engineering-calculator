import { useHistory } from '../context/HistoryContext';
import type { HistoryItem } from '../context/HistoryContext';
import { useTheme } from '../context/ThemeContext';
import './HistoryPanel.css';

export const HistoryPanel = () => {
  const { history, clearHistory, removeHistoryItem, isHistoryVisible } = useHistory();
  const { theme } = useTheme();

  if (!isHistoryVisible) {
    return null;
  }

  return (
    <div className={`history-panel ${theme}-theme`}>
      <div className="history-header">
        <h3>계산 기록</h3>
        <button 
          className="clear-history-button" 
          onClick={clearHistory}
          aria-label="계산 기록 지우기"
        >
          지우기
        </button>
      </div>
      
      {history.length === 0 ? (
        <p className="no-history">계산 기록이 없습니다.</p>
      ) : (
        <ul className="history-list">
          {history.map((item: HistoryItem, index: number) => (
            <li key={index} className="history-item">
              <button 
                className="delete-history-item" 
                onClick={() => removeHistoryItem(item)}
                aria-label="기록 삭제"
              >
                &times;
              </button>
              <div className="history-expression">{item.expression}</div>
              <div className="history-result">= {item.result}</div>
              {item.timestamp && (
                <div className="history-timestamp">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
