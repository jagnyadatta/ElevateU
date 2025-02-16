import './App.css'
import Navbar from './components/shared/Navbar'

function App() {
  const imaLogo = 'https://ucarecdn.com/ce35b28e-f586-4dc0-99a7-a7646d8ec51a/ElevateU.png';
  return (
    <>
      {/* Background Image (Covers Entire Page) */}
      <div 
        className="inset-0 w-full h-full flex items-center justify-center opacity-50 mt-40 z-19000"
        // style={{ backgroundImage: 'https://ucarecdn.com/ce35b28e-f586-4dc0-99a7-a7646d8ec51a/ElevateU.png', backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <img src={imaLogo} alt="homepage image" className='w-[50vw] md:w-[45vw] fixed mt-50' />
      </div>

      {/* Blue Overlay with Blur Effect */}
      <div className="fixed inset-0 w-full h-full bg-gray-300/20 backdrop-blur-xl z-[9]"></div>

      {/* Content Container */}
      <div className="relative flex flex-col items-center w-full min-h-screen">
        {/* Navbar (Fixed at the top) */}
        <div className="fixed top-5 flex justify-center w-full z-50">
          <Navbar />
        </div>

        {/* Main Content */}
        <div className="flex flex-col justify-center items-center text-white h-screen z-10">
          <h1 className="text-5xl font-bold">Welcome to ElevateU</h1>
          <p className="text-lg mt-4">Enhance your skills and knowledge.</p>
        </div>
        
      </div>
    </>
  )
}

export default App
