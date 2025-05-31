import './App.css'
import GlobalProvider from './contexts/global/GlobalContext'
import AppContent from './AppContent'

function App() {
  return (
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  )
}

export default App
