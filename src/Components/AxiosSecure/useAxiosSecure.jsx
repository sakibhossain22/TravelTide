import axios from "axios";
import { Navigate } from "react-router-dom";
const axiosSecure = axios.create({
    baseURL: `http://localhost:5000`
})
const useAxiosSecure = () => {

    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, async function (error) {
        return Promise.reject(error);
    });

    axios.interceptors.response.use( function (response) {
        return response;
    },  (error) => {
        const status = error.response.status
        if(status === 400 || status === 403){

            <Navigate to='/login'></Navigate>
        }
        return Promise.reject(error);
    });
    return axiosSecure
};

export default useAxiosSecure;