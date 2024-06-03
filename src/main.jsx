import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import MainLayout from './Components/MainLayout/MainLayout';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Error from './Components/Error/Error';
import Register from './Components/Register/Register';
import BookingDate from './Components/BookingDate/BookingDate';
import AuthProvider from './Components/AuthProvider/AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <Error></Error>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/signup',
    element: <Register></Register>
  },
  {
    path: '/booking-date',
    element: <BookingDate></BookingDate>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)


