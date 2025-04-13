import './App.css'
import Home from './components/Home'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Layout from './components/Layout'

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
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      },
      // Add more pages inside here if they also need Navbar
    ]
  },
])

function App() {
  return <RouterProvider router={appRouter} />
}

export default App
