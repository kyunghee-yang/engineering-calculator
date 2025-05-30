import './App.css'
import { Calculator } from './presentation/components/Calculator'
import { ThemeProvider } from './presentation/context/ThemeContext'
import { ThemeToggle } from './presentation/components/ThemeToggle'
import { HistoryProvider } from './presentation/context/HistoryContext'
import { HistoryButton } from './presentation/components/HistoryButton'
import { HistoryPanel } from './presentation/components/HistoryPanel'

function App() {
  return (
    <ThemeProvider>
      <HistoryProvider>
        <div className="app">
          <ThemeToggle />
          <HistoryButton />
          <HistoryPanel />
          <header className="app-header">
            <h1>Engineering Calculator</h1>
          </header>
          <main>
            <Calculator />
          </main>
          <footer className="app-footer">
            <p>Built with React, TypeScript, and Clean Architecture</p>
          </footer>
        </div>
      </HistoryProvider>
    </ThemeProvider>
  )
}

export default App
