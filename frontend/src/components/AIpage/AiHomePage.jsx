import React from 'react'
// import CareerSuggestionPage from './CareerSuggestionPage'
import AiChatPage from './AiChatPage'

const AiHomePage = () => {
  return (
    <>
        <div className='flex items-center mt-20 justify-center font-bold text-[18px] sm:text-2xl text-[#3b66ff]'>
            AI Suggestion for Career
        </div>
        {/* <CareerSuggestionPage/> */}
        <AiChatPage/>
    </>
  )
}

export default AiHomePage