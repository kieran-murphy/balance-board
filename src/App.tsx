import './App.css'
import { NetWorthProvider } from "./context/NetWorthContext";
import NetWorthTracker from './components/NetWorthTracker'

function App() {
  return (
    <>
    <NetWorthProvider>
      <NetWorthTracker />
    </NetWorthProvider>
    </>
  )
}

export default App
