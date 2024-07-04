import { Link, useLocation, useNavigate } from "react-router-dom";
import googleIcon from '../../assets/google.png';
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import Swal from "sweetalert2";
const Login = () => {
    const location = useLocation()

    const navigate = useNavigate()

    const [error, setError] = useState(null)
    const axiosSecure = useAxiosSecure()

    const { googleLogin, loginWithEmail } = useContext(AuthContext)
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);
                if (result?.user) {
                    navigate(location ? '/' : location.state)
                }
            })
    }
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value
        const password = form.password.value
        const term = form.term.checked

        if (!email) {
            return Swal.fire({
                icon: "error",
                title: "Please Input Email",
                showConfirmButton: false,
                timer: 1000
            });
        }
        if (!password) {
            return Swal.fire({
                icon: "error",
                title: "Please Input Password",
                showConfirmButton: false,
                timer: 1000
            });
        }
        if (!term) {
            return Swal.fire({
                icon: "error",
                title: "Please Accept Terms & Condition",
                showConfirmButton: false,
                timer: 1000
            });
        }
        loginWithEmail(email, password)
            .then(result => {
                console.log(result.user);
                if (result?.user) {
                    navigate(location ? '/' : location.state)
                }
            })
            .catch(error => {
                console.log(error.message);
                Swal.fire({
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            })
    };
    return (
        <div>
            <div>

            </div>
            <div className="lg:w-2/6 lg:mx-auto mx-2 flex flex-col items-center justify-center h-screen">
                <form onSubmit={handleLogin} className="border px-8 py-5">
                    <h1 className="text-2xl font-bold mb-8">Login</h1>
                    {
                        error && <p>{error}</p>
                    }
                    <input className="w-full py-3 mt-2 border-b-2 rounded-lg px-2" type="text" name="email" placeholder="Username or E-mail" />
                    <input className="w-full py-3 mt-2 border-b-2 rounded-lg px-2" type="password" name="password" id="" placeholder="Password" />
                    <span className="my-5 flex gap-2">
                        <input type="checkbox" name="term" id="term" />
                        <span id="term"> Accept Terms And Conditions</span>
                    </span>
                    <input className="bg-orange-500 text-md font-semibold w-full py-3 rounded" type="submit" value="Login" />
                    <div className="text-sm text-center my-3">
                        <span>Don't Have An Accounts ? </span>
                        <Link to={'/signup'} className="text-orange-600">Create An Account</Link>
                    </div>
                </form>
                <h1 className="text-center my-3">Or</h1>
                <div>

                    <button onClick={() => handleGoogleLogin()} className="flex border-2 px-8 py-1 rounded-full  items-center justify-center gap-5">
                        <img className="w-10" src={googleIcon} alt="" />
                        <span> Login With Google</span>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default Login;