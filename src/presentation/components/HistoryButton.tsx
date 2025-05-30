import { useHistory } from '../context/HistoryContext';
import './HistoryButton.css';

export const HistoryButton = () => {
  const { toggleHistoryVisibility, isHistoryVisible } = useHistory();
  
  return (
    <button 
      className="history-button" 
      onClick={toggleHistoryVisibility}
      aria-label={isHistoryVisible ? "계산 기록 닫기" : "계산 기록 보기"}
    >
      {isHistoryVisible ? '기록 닫기' : '기록 보기'}
    </button>
  );
};
