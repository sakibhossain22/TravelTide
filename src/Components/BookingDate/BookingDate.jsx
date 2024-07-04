import { Link, useLocation, useNavigate } from "react-router-dom";
import objects from '../../assets/OBJECTS.png'
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../Hooks/useCart";
const BookingDate = () => {
    const { data, refetch } = useCart();

    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    const { user, logOutUser } = useContext(AuthContext)
    const location = useLocation()
    const { title, description, bannerImage } = location.state || {}
    const navigate = useNavigate()
    const handleDes = (e) => {
        e.preventDefault();
        const form = e.target;
        const select = form.select.value;
        const select2 = form.select2.value;
        const toDate = form.toDate.value;
        const fromDate = form.fromDate.value;

        if (!select || !select2 || !toDate || !fromDate) {
            return Swal.fire({
                icon: "error",
                title: "Please fill all information",
                showConfirmButton: false,
                timer: 1000
            });
        }
        navigate('/hotels', { state: { select, select2, toDate, fromDate } });
    };

    return (
        <div>
            <div className='bg-black' style={{ backgroundImage: `url(${bannerImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className='bg-black text-white bg-opacity-50'>
                    <div>
                        <nav className="">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16 items-center">
                                    <div className="flex items-center">
                                        <img src={objects} className="h-10 w-10" alt="Logo" />
                                        <a href="/" className="ml-2 flex items-center text-2xl font-bold ">Travel<span className="text-orange-600">Tide</span></a>
                                    </div>
                                    <div className="hidden lg:flex items-center gap-5 ml-auto text-md font-medium">
                                        <Link to="/hotels" className=" hover:text-orange-600">Hotels</Link>
                                        <Link to="/contact-us" className=" hover:text-orange-600">Contact</Link>
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
                                                                        <span className="badge badge-sm indicator-item">{data?.length}</span>
                                                                        </div>
                                                                </div>
                                                            </Link>

                                                        </div>
                                                        {/* User Name */}
                                                        <span className="">{user.displayName.slice(0, 13)}</span>
                                                        {/* User Photo and Dropdown */}
                                                        <div className="dropdown dropdown-end">
                                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                                <div className="w-10 rounded-full">
                                                                    <img alt="User Image" src={user?.photoURL} />
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
                                        <button onClick={toggleMenu} className=" focus:outline-none">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
                                <ul className="flex flex-col items-center gap-5 text-md font-medium py-4">
                                    <li><Link to="/hotels" className=" hover:text-orange-600">Destinations</Link></li>
                                    <li><Link to="/contact-us" className=" hover:text-orange-600">Contact</Link></li>
                                    {user ? (
                                        <div className="flex flex-col items-center gap-4">
                                            {user.photoURL ? (
                                                <div className="flex items-center gap-2">
                                                    <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="User Avatar" />
                                                    <span className="">{user.displayName.slice(0, 13)}</span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="uppercase px-2 py-1 w-8 bg-orange-400 rounded-full text-center text-gray-800">{user.displayName?.slice(0, 1)}</span>
                                                    <span className="">{user.displayName}</span>
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
                        {/* Banner */}
                        <div className='flex items-center justify-evenly'>
                            <div className='w-1/2 p-8'>
                                <h2 className="text-5xl bebas-neue-regular font-bold mb-4 text-white uppercase">{title?.slice(0, 12)}</h2>
                                <p className="text-md text-gray-300">{description}</p>

                            </div>
                            <div className='flex items-center' style={{ height: 'calc(100vh - 68px)' }}>
                                <div className="bg-white rounded-lg px-4 py-10 text-black">
                                    <form onSubmit={handleDes}>
                                        <div>
                                            <select className="w-full font-semibold bg-[#f2f2f2] rounded px-2 py-3 my-2" name="select" id="">
                                                <option selected disabled>Select Origin</option>
                                                <option value="dhaka">Dhaka</option>
                                                <option value="mymensingh">Mymensingh</option>
                                                <option value="chattogram">Chattogram</option>
                                                <option value="barishal">Barishal</option>
                                                <option value="khulna">Khulna</option>
                                                <option value="rajshahi">Rajshahi</option>
                                                <option value="rangpur">Rangpur</option>
                                                <option value="sylhet">Sylhet</option>
                                            </select>
                                        </div>
                                        <div>
                                            <select className="w-full font-semibold bg-[#f2f2f2] rounded px-2 py-3 my-2" name="select2" id="">
                                                <option selected disabled>Select Destination</option>
                                                <option value="Cox's bazar">Cox's Bazar</option>
                                                <option value="Sreemangal">Sreemangal</option>
                                                <option value="Sundarbans">Sundarbans</option>
                                                <option value="Saint Martin's Island">Saint Martin's Island</option>
                                                <option value="Rangamati">Rangamati</option>
                                            </select>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <div>
                                                <span className="block">From</span>
                                                <input name="fromDate" className="py-2 font-semibold bg-[#f2f2f2] p-3 rounded" type="date" />
                                            </div>
                                            <div>
                                                <span className="block">To</span>
                                                <input className="py-2 font-semibold bg-[#f2f2f2] p-3 rounded" type="date" name="toDate" id="" />
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center">
                                            <input className="bg-[#F9A51A] text-center font-bold hover:bg-[#c5913d] duration-100 py-3 cursor-pointer px-2 w-full mx-auto mt-10" type="submit" value="Start Booking" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingDate;