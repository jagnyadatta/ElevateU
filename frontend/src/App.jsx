import './App.css'
import Home from './components/Home/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/shared/Layout'
import AiHomePage from './components/AIpage/AiHomePage'
import CareerCounsellor from './components/Career/CareerCounsellor'
import CounsellorProfile from './components/Career/CounsellorProfile'
import CounsellorSignup from './components/auth/CounsellorSignup'
import SignupChoice from './components/auth/SignupChoice'
import StudentSignup from './components/auth/StudentSignup'
import CounsellorLayout from './components/shared/CounsellorLayout'
import CounsellorLogin from './components/auth/CounsellorLogin'
import LoginChoice from './components/auth/LoginChoice'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'aisuggest',
        element: <AiHomePage />
      },
      {
        path: 'careerzone',
        element: <CareerCounsellor/>
      },
      {
        path: 'profilecouncil',
        element: <CounsellorProfile/>
      },
      {
        path: "choicesignup",
        element: <SignupChoice/>
      },
      {
        path: "choicelogin",
        element: <LoginChoice/>
      }
    ]
  },
  {
    path: "/counsellor/",
    element: <CounsellorLayout/>,
    children:[
      {
        path: 'signup',
        element: <CounsellorSignup />
      },
      {
        path: 'login',
        element: <CounsellorLogin />
      },
    ]
  },
  {
    path: "/student/signup",
    element: <StudentSignup/>
  },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App
