import "./App.css";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/shared/Layout";
import AiHomePage from "./components/AIpage/AiHomePage";
import CareerCounsellor from "./components/Career/CareerCounsellor";
import CounsellorProfile from "./components/Career/CounsellorProfile";
import CounsellorSignup from "./components/auth/CounsellorSignup";
import SignupChoice from "./components/auth/SignupChoice";
import StudentSignup from "./components/auth/StudentSignup";
import CounsellorLayout from "./components/shared/CounsellorLayout";
import CounsellorLogin from "./components/auth/CounsellorLogin";
import LoginChoice from "./components/auth/LoginChoice";
import StudentLayout from "./components/shared/StudentLayout";
import StudentLogin from "./components/auth/StudentLogin";
import AddCounsellors from "./components/Career/AddCounsellors";
import Dashboard from "./components/Home/StudentDashboard";
import ChatBox from "./check/ChatBox";
import CounsellorDashboard from "./components/Career/CounsellorDashboard";
import StudentDashboard from "./components/Home/StudentDashboard";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "aisuggest",
        element: <AiHomePage />,
      },
      {
        path: "profilecouncil/:id",
        element: <CounsellorProfile />,
      },
      {
        path: "choicesignup",
        element: <SignupChoice />,
      },
      {
        path: "choicelogin",
        element: <LoginChoice />,
      },
    ],
  },
  {
    path: "/counsellor/",
    element: <CounsellorLayout />,
    children: [
      {
        path: "all",
        element: <CareerCounsellor />,
      },
      {
        path: "signup",
        element: <CounsellorSignup />,
      },
      {
        path: "login",
        element: <CounsellorLogin />,
      },
      // {
      //   path: 'profile',
      //   element: <CounsellorProfile />
      // },
      {
        path: "bulk-insert",
        element: <AddCounsellors />,
      },
      {
        path: "dashboardcounsellor",
        element: <CounsellorDashboard />,
      },
    ],
  },
  {
    path: "/student/",
    element: <StudentLayout />,
    children: [
      {
        path: "signup",
        element: <StudentSignup />,
      },
      {
        path: "login",
        element: <StudentLogin />,
      },
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
    ],
  },
  {
    path: "/chat/:senderId/:receiverId",
    element: <ChatBox />,
  },
]);

function App() {
  return <RouterProvider router={appRouter} />;
}

export default App;
