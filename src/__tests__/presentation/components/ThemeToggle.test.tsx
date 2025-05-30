import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../../../presentation/components/ThemeToggle';
import { ThemeProvider } from '../../../presentation/context/ThemeContext';

// Mock localStorage
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

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  }),
});

describe('ThemeToggle Component', () => {
  beforeEach(() => {
    localStorageMock.clear();
    document.documentElement.className = '';
  });

  test('renders the theme toggle button', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
  });

  test('changes theme when clicked', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByRole('button');
    
    // Initial state should be light
    expect(document.documentElement.className).toBe('light-theme');
    
    // Click to toggle to dark mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.className).toBe('dark-theme');
    
    // Click to toggle back to light mode
    fireEvent.click(toggleButton);
    expect(document.documentElement.className).toBe('light-theme');
  });

  test('loads theme from localStorage on mount', () => {
    // Set dark theme in localStorage
    localStorageMock.setItem('theme', 'dark');
    
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );
    
    // Should load dark theme from localStorage
    expect(document.documentElement.className).toBe('dark-theme');
  });
});
