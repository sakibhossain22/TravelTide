import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import objects from '../../assets/OBJECTS.png';
const SharedNav = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center">
                            <img src={objects} className="h-10 w-10" alt="Logo" />
                            <a href="/" className="ml-2 flex items-center text-2xl font-bold text-gray-800">Travel<span className="text-orange-600">Tide</span></a>
                        </div>
                        <div className="hidden lg:flex items-center gap-5 ml-auto text-md font-medium">
                            <Link to="/hotels" className="text-gray-800 hover:text-orange-600">Destinations</Link>
                            <Link to="/contact-us" className="text-gray-800 hover:text-orange-600">Contact</Link>
                            {user ? (
                                <div className="flex items-center gap-4">
                                    {user.photoURL ? (
                                        <div className="flex items-center gap-2">
                                            {/* Cart Icon */}
                                            <div className="dropdown dropdown-end">
                                                <Link to={user ? '/cart' : '/login'}>
                                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                                        <div className="indicator">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                            <span className="badge badge-sm indicator-item">8</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                               
                                            </div>
                                            {/* User Name */}
                                            <span className="text-gray-800">{user.displayName.slice(0, 13)}</span>
                                            {/* User Photo and Dropdown */}
                                            <div className="dropdown dropdown-end">
                                                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                    <div className="w-10 rounded-full">
                                                        <img alt="User Image" src={user.photoURL} />
                                                    </div>
                                                </div>
                                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                    <li>
                                                        <a className="justify-between">Profile</a>
                                                    </li>
                                                    <li onClick={() => logOutUser()}><a>Logout</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="uppercase px-2 py-1 w-8 bg-orange-400 rounded-full text-center text-gray-800">{user.displayName?.slice(0, 1)}</span>
                                            <span className="text-gray-800">{user.displayName}</span>
                                        </div>
                                    )}

                                </div>
                            ) : (
                                <Link to="/login" className="bg-[#F9A51A] text-black px-4 rounded py-1 hover:bg-[#F8B824] transition duration-300 ease-in-out">Login</Link>
                            )}
                        </div>
                        <div className="lg:hidden flex items-center">
                            <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
                    <ul className="flex flex-col items-center gap-5 text-md font-medium py-4">
                        <li><Link to="/hotels" className="text-gray-800 hover:text-orange-600">Destinations</Link></li>
                        <li><Link to="/contact-us" className="text-gray-800 hover:text-orange-600">Contact</Link></li>
                        {user ? (
                            <div className="flex flex-col items-center gap-4">
                                {user.photoURL ? (
                                    <div className="flex items-center gap-2">
                                        <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="User Avatar" />
                                        <span className="text-gray-800">{user.displayName.slice(0, 13)}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <span className="uppercase px-2 py-1 w-8 bg-orange-400 rounded-full text-center text-gray-800">{user.displayName?.slice(0, 1)}</span>
                                        <span className="text-gray-800">{user.displayName}</span>
                                    </div>
                                )}
                                <button onClick={logOutUser} className="bg-[#F9A51A] text-black px-4 rounded py-2 hover:bg-[#F8B824] transition duration-300 ease-in-out">Logout</button>
                            </div>
                        ) : (
                            <Link to="/login" className="bg-[#F9A51A] text-black px-4 rounded py-1 hover:bg-[#F8B824] transition duration-300 ease-in-out">Login</Link>
                        )}
                    </ul>
                </div>

            </nav>
        </div>
    );
};

export default SharedNav;