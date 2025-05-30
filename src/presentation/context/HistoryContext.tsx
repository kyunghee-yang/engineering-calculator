import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

// 계산 기록 항목 타입 정의
export interface HistoryItem {
  expression: string;
  result: string;
  timestamp?: number;
}

// 히스토리 컨텍스트 타입 정의
interface HistoryContextType {
  history: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
  removeHistoryItem: (item: HistoryItem) => void;
  clearHistory: () => void;
  isHistoryVisible: boolean;
  toggleHistoryVisibility: () => void;
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

interface HistoryProviderProps {
  children: ReactNode;
}

export const HistoryProvider = ({ children }: HistoryProviderProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  // localStorage에서 히스토리 불러오기
  useEffect(() => {
    const savedHistory = localStorage.getItem('calculatorHistory');
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (error) {
        console.error('Failed to parse calculator history:', error);
      }
    }
  }, []);

  // 히스토리 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  // 히스토리에 항목 추가
  const addToHistory = (item: HistoryItem) => {
    const newItem = {
      ...item,
      timestamp: Date.now()
    };
    setHistory(prevHistory => [newItem, ...prevHistory]);
  };

  // 개별 히스토리 항목 삭제
  const removeHistoryItem = (itemToRemove: HistoryItem) => {
    setHistory(prevHistory => 
      prevHistory.filter(item => 
        // timestamp가 있으면 timestamp로 비교, 없으면 expression과 result로 비교
        item.timestamp !== itemToRemove.timestamp || 
        (item.expression !== itemToRemove.expression && item.result !== itemToRemove.result)
      )
    );
  };

  // 히스토리 초기화
  const clearHistory = () => {
    setHistory([]);
  };

  // 히스토리 표시 여부 토글
  const toggleHistoryVisibility = () => {
    setIsHistoryVisible(prev => !prev);
  };

  return (
    <HistoryContext.Provider value={{ 
      history, 
      addToHistory,
      removeHistoryItem, 
      clearHistory,
      isHistoryVisible,
      toggleHistoryVisibility
    }}>
      {children}
    </HistoryContext.Provider>
  );
};

// 히스토리 컨텍스트 사용을 위한 훅
export const useHistory = (): HistoryContextType => {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};
