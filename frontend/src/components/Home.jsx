import { Button } from "./ui/button";
import personLaptop from "/image/person-laptop.png"
function Home() {
  const imaLogo = 'https://ucarecdn.com/ce35b28e-f586-4dc0-99a7-a7646d8ec51a/ElevateU.png';
  return (
    <div className="w-full flex flex-col relative items-center justify-center p-0">
      {/* Background Image (Covers Entire Page) */}
      <div className="inset-0 absolute w-full h-full flex items-center justify-center img-card opacity-25 z-10">
        <img src={imaLogo} alt="homepage image" className='w-[50vw] md:w-[45vw]' />
      </div>
        {/* Content */}
        <div className="w-full h-[100vh] grid grid-cols-2 z-20 mt-[]">
            <div className="flex flex-col items-start justify-center border-2 gap-4 border-red-400">
                <h1 className="text-black text-6xl ml-[10%]">Welcome to <span className="font-bold">ElevateU</span></h1>
                <p className="w-[670px] ml-[10%] text-[1.1rem] text-gray-400">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, quae sunt. Dicta atque repellendus molestias, repellat consectetur iure nisi saepe ex nesciunt id non suscipit provident voluptatum architecto, quod est.</p>
                <div>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium adipisci exercitationem </p>
                </div>
                <Button>Go With..</Button>
            </div>
            <div className="w-full hidden sm:flex items-end justify-end">
                <img src={personLaptop} alt="person-with-table"/>
            </div>
        </div>
        
    </div>
  )
}

export default Home
