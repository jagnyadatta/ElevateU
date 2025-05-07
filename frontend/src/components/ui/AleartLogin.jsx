import React from 'react'
import { Link } from 'react-router-dom';

const AleartLogin = () => {
    return (
        <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-50">
          <div className="w-[500px] bg-white p-8 rounded-xl shadow-xl text-center border border-blue-200">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Please Login</h2>
            <p className="text-gray-700 mb-6">You are not logged in!</p>
            <Link
              to="/choicelogin"
              className="inline-block bg-[#3b66ff] hover:bg-[#4f85f7] text-white px-6 py-2 rounded-md transition"
            >
              Go to Login
            </Link>
          </div>
        </div>
    );
}

export default AleartLogin;