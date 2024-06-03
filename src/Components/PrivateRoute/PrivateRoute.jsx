/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";


const PrivateRoute = ({ children }) => {
    const location = useLocation()
    console.log(location);
    const { user, loading } = useContext(AuthContext)
    if (loading) {
        return <div className="flex items-center justify-center">
            <img src="https://i.ibb.co/61Z0WZ5/giphy.gif" alt="" />
        </div>
    }
    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to='/login'></Navigate>
};

export default PrivateRoute;