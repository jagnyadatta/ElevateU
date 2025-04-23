import React from 'react'
import Footer from '../shared/Footer'

function CounsellorProfile() {
  return (
    <div className='h-[100vh]'>
    <div className='h-[100vh] flex justify-center items-center bg-gradient-to-br from-blue-300 to-blue-100 '>
     <div className='h-[75%] w-[70%] bg-amber-300 flex rounded-lg'>
        <div className='bg-blue-500 w-full h-[30%] rounded-t-lg  '>
            <img  src="https://media.istockphoto.com/id/997461858/photo/attractive-young-man-in-blue-t-shirt-pointing-up-with-his-finger-isolated-on-gray-background.jpg?s=612x612&w=0&k=20&c=70pkYuhz65EqNOB9qI5JSDXNbQUwGLxKTCgsSWoy4kM=" alt="" className="w-full h-full object-cover object-top" />
        </div>
        <div>

        </div>
     </div>
    </div>
    <Footer/>
    </div>
  )
}

export default CounsellorProfile
