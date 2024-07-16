import React from "react";
import ReactDOM from "react-dom/client";
import { PDFViewer } from "@react-pdf/renderer";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";
import Introduction from "./modules/introPage/Introduction";
import ErrorPage from "./modules/errorPage/ErrorPage";
import HomePage from "./modules/homePage/screens/HomePage";
import ClassesPage from "./modules/classesPage/screens/ClassesPage";
import ClassDetailRoot from "./modules/classesPage/components/ClassDetailRoot";
import ClassDashboard from "./modules/classesPage/screens/ClassDashboard";
import ClassAttendant from "./modules/classesPage/screens/ClassAttendant";
import ClassPeriodicTest from "./modules/classesPage/screens/ClassPeriodicTest";
import ClassHomework from "./modules/classesPage/screens/ClassHomework";
import ClassesAdd from "./modules/classesPage/components/ClassesAdd";
import StudentsPage from "./modules/studentsPage/screens/StudentsPage";
import ClassesRoot from "./modules/classesPage/components/ClassesRoot";
import NewStudent from "./modules/studentsPage/screens/NewStudent";
import StudentDetails from "./modules/studentsPage/screens/StudentDetails";
import Login from "./modules/loginPage/Login";
import NewTeacher from "./modules/teachersPage/NewTeacher";
import TeachersPage from "./modules/teachersPage/screens/TeachersPage";
import TeacherDetail from "./modules/teachersPage/screens/TeacherDetail";
import { store } from "./store";
import { Provider } from "react-redux";
import { Counter } from "./features/counter/Counter";
import { AuthProvider } from "./modules/loginPage/AuthContext";
import ForgotPassword from "./modules/loginPage/ForgotPassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Introduction />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "counter",
        element: <Counter />,
        errorElement: <ErrorPage />,
      },
      {
        path: "classes",
        element: <ClassesRoot />,
        children: [
          {
            index: true,
            path: "",
            element: <ClassesPage />,
            errorElement: <ErrorPage />,
          },
          {
            path: "add",
            element: <ClassesAdd />,
            errorElement: <ErrorPage />,
          },
          {
            path: ":classId",
            element: <ClassDetailRoot />,
            children: [
              {
                index: true,
                element: <ClassDashboard />,
                errorElement: <ErrorPage />,
              },
              {
                path: "dashboard",
                element: <ClassDashboard />,
                errorElement: <ErrorPage />,
              },
              {
                path: "attendant",
                element: <ClassAttendant />,
                errorElement: <ErrorPage />,
              },
              {
                path: "periodic-test",
                element: <ClassPeriodicTest />,
                errorElement: <ErrorPage />,
              },
              {
                path: "homework",
                element: <ClassHomework />,
                errorElement: <ErrorPage />,
              },
            ],
          },
        ],
      },
      {
        path: "students",
        element: <StudentsPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "newteacher",
        element: <NewTeacher />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/new",
        element: <NewStudent />,
        errorElement: <ErrorPage />,
      },
      {
        path: "students/:studentId",
        element: <StudentDetails />,
        errorElement: <ErrorPage />,
      },
      {
        path: "teachers",
        element: <TeachersPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "teachers/:id",
        element: <TeacherDetail />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider store={store}>
    <RouterProvider router={router} />
  </AuthProvider>
);
