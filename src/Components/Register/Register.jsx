import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from '../../assets/google.png';
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { reload } from "firebase/auth";
const Register = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const axiosSecure = useAxiosSecure()
    const { googleLogin, user, registerWithEmail, updateUserProfile } = useContext(AuthContext)

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                if (result?.user) {
                    navigate(location ? '/' : location.state)
                }
            })
    }
    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;
        const cpassword = form['c-password'].value;

        // Check if passwords match
        if (password !== cpassword) {
            return Swal.fire({
                icon: "error",
                title: "Passwords do not match",
                showConfirmButton: false,
                timer: 1000
            });
        }

        // Check if all fields are filled
        if (!email || !name || !password || !cpassword) {
            return Swal.fire({
                icon: "error",
                title: "Please fill all information",
                showConfirmButton: false,
                timer: 1000
            });
        }

        // Register user
        registerWithEmail(email, password)
            .then(result => {
                // Update user profile
                updateUserProfile(name)
                if(result.user) {
                    Swal.fire({
                        icon: "success",
                        title: "Registration Success",
                        showConfirmButton: false,
                        timer: 1000
                    });
                    reload()
                    navigate(location?.state ? location.state : '/')
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: "error",
                    title: "Registration error",
                    text: error.message,
                    showConfirmButton: false,
                    timer: 1000
                });
            });
    };

    return (
        <div>
            <div>

            </div>
            <div className="w-2/6 mx-auto flex flex-col items-center justify-center h-screen">
                <form onSubmit={handleRegister} className="border px-8 py-5">
                    <h1 className="text-2xl font-bold mb-8">Register Now</h1>
                    {
                        error && <p>{error}</p>
                    }
                    <input className="w-full py-3 mt-2 border-b-2 rounded-lg px-2" type="text" name="name" placeholder="Name" />
                    <input className="w-full py-3 mt-2 border-b-2 rounded-lg px-2" type="text" name="email" placeholder="E-mail" />
                    <input className="w-full py-3 mt-2 border-b-2 rounded-lg px-2" type="password" name="password" id="" placeholder="Password" />
                    <input className="w-full py-3 mt-2 border-b-2 rounded-lg px-2" type="password" name="c-password" id="" placeholder="Confirm Password" />

                    <input className="bg-orange-500 cursor-pointer mt-4 w-full text-md font-semibold py-3 rounded" type="submit" value="Register" />
                    <div className="text-sm text-center my-3">
                        <span>Already Have An Accounts ? </span>
                        <Link to={'/login'} className="text-orange-600">Login</Link>
                    </div>
                </form>
                <h1 className="text-center my-3">Or</h1>
                <div>

                    <button onClick={handleGoogleLogin} className="flex border-2 px-8 py-1 rounded-full  items-center justify-center gap-5">
                        <img className="w-10" src={googleIcon} alt="" />
                        <span> Login With Google</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Register;