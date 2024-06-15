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
import Hotels from './Components/Hotels/Hotels';
import ContactUs from './Components/ContactUs/ContactUs';
import HotelDetails from './Components/HotelDetails/HotelDetails';
import Cart from './Components/Cart/Cart';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';

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
  },
  {
    path: '/cart',
    element : <PrivateRoute><Cart></Cart></PrivateRoute>
  },
  {
    path : '/hotels',
    element : <Hotels></Hotels>
  },
  {
    path : '/hotel/:uniqueId',
    element : <HotelDetails></HotelDetails>
  },
  {
    path : '/contact-us',
    element : <ContactUs></ContactUs>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)


