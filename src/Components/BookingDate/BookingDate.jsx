import { Link, useLocation, useNavigate } from "react-router-dom";
import objects from '../../assets/OBJECTS.png'
import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
const BookingDate = () => {
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
                        <div className="navbar">
                            <div className="flex-1">
                                <div className='flex'>
                                    <img src={objects} className='w-' alt="" />
                                    <a className="btn btn-ghost bebas-title text-xl font-medium">Travel<span className="text-orange-600">Tide</span></a>
                                </div>
                            </div>
                            <div className="flex-none font-medium">
                                <ul className="menu flex items-center justify-center text-md gap-5 menu-horizontal px-1">
                                    <Link to="/hotels">Destination</Link>
                                    <Link to="/contact-us">Contact</Link>
                                    {
                                        user ? <div className='flex items-center justify-center gap-4'>
                                            {
                                                user?.photoURL ? <div className='flex items-center justify-center gap-2'>
                                                    <img className='w-6 rounded-full' src={user.photoURL} alt="" />
                                                    <span>{user?.displayName.slice(0, 13)}</span>
                                                </div> : <div className='flex items-center justify-center gap-2'>
                                                    <span className='uppercase px-2 py-1 w-8 bg-orange-400 rounded-full text-center '>{user?.displayName?.slice(0, 1)}</span>
                                                    <span>{user?.displayName}</span>
                                                </div>
                                            }
                                            <button className='bg-[#F9A51A] text-black px-4 rounded py-2 ' onClick={logOutUser}>Logout</button>
                                        </div>
                                            :
                                            <Link className='bg-[#F9A51A] text-black px-4 rounded py-1' to="/login">Login</Link>
                                    }
                                </ul>
                            </div>
                        </div>
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