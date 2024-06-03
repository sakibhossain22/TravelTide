import { Link, useLocation } from "react-router-dom";
import objects from '../../assets/OBJECTS.png'
const BookingDate = () => {
    const location = useLocation()
    const { title, description, bannerImage } = location.state || {}
    console.log(bannerImage);
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
                                    <Link to="#">Destination</Link>
                                    <Link to="#">Contact</Link>
                                    <Link className='bg-[#F9A51A] text-black px-4  py-2' to="/login">Login</Link>
                                </ul>
                            </div>
                        </div>
                        {/* Banner */}
                        <div className='flex items-center justify-evenly'>
                            <div className='w-1/2 p-8'>
                                <h2 className="text-5xl bebas-neue-regular font-bold mb-4 text-white uppercase">{title.slice(0, 12)}</h2>
                                <p className="text-md text-gray-300">{description}</p>

                            </div>
                            <div className='flex items-center' style={{ height: 'calc(100vh - 68px)' }}>
                                <div className="bg-white rounded-lg px-4 py-10 text-black">
                                    <form>
                                        <div>
                                            <select className="w-full font-semibold bg-[#f2f2f2] rounded px-2 py-3 my-2" name="" id="">
                                                <option  selected disabled>Select Origin</option>
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
                                            <select className="w-full font-semibold bg-[#f2f2f2] rounded px-2 py-3 my-2" name="" id="">
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
                                                <input className="py-2 font-semibold bg-[#f2f2f2] p-3 rounded" type="date" />
                                            </div>
                                            <div>
                                                <span className="block">To</span>
                                                <input className="py-2 font-semibold bg-[#f2f2f2] p-3 rounded" type="date" name="" id="" />
                                            </div>
                                        </div>
                                        <input className="bg-[#F9A51A] hover:bg-[#c5913d] duration-100 py-3 cursor-pointer px-2 w-full mt-10" type="submit" value="Start Booking" />
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