import './App.css'
import Home from './components/Home';
import Navbar from './components/shared/Navbar'

function App() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-0">
      <div className="fixed top-5 flex justify-center w-full z-50">
        <Navbar />
      </div>
      <Home/>
    </div>
  )
}

export default App
