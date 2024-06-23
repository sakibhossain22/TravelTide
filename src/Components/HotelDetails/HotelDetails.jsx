import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import star from '../../assets/star.png';
import { FaBath, FaWifi } from "react-icons/fa";
import { TbAirConditioning } from "react-icons/tb";
import { FaBed, FaKitchenSet } from "react-icons/fa6";
import { BiUser } from "react-icons/bi";
import { MdRoofing } from "react-icons/md";
import SharedNav from "../SharedNav/SharedNav";
import { AuthContext } from "../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import moment from "moment";

const HotelDetails = () => {
    const { user, logOutUser } = useContext(AuthContext);
    const location = useLocation()
    const {toDate, fromDate } = location.state || {}
    console.log(toDate, fromDate);
    const axiosSecure = useAxiosSecure();
    const { uniqueId } = useParams();
    const [hotel, setHotel] = useState(null);
    const [hotels, setHotels] = useState(null);
    const iconsAmenities = [
        {
            icon: <FaWifi></FaWifi>
        },
        {
            icon: <TbAirConditioning></TbAirConditioning>
        },
        {
            icon: <FaKitchenSet></FaKitchenSet>
        }
    ]
    const hotelPrice = {
        price: hotel?.price.slice(1, 3), // Example price as a string
        discount: 20 // Example discount percentage
    };

    const priceNumber = parseFloat(hotelPrice.price);
    const discountedPrice = priceNumber - (priceNumber * (hotelPrice.discount / 100));


    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axiosSecure.get(`/hotel/${uniqueId}`);
                setHotel(response.data);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            }
        };
        if (uniqueId) {
            fetchHotelDetails();
        }
    }, [axiosSecure, uniqueId]);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axiosSecure.get('/hotels');
                setHotels(response.data);
            } catch (error) {
                console.error('Error fetching hotels:', error);
            }
        };
        fetchHotels();
    }, [axiosSecure]);

    const handleBookRoom = async (room) => {
        const roomData = { ...room,toDate : toDate, fromDate : fromDate , user: user?.email, orderDate : moment().format('ll') };
        try {
            const response = await axiosSecure.post('/cart', roomData);
            console.log(response.data);
            if (response?.data?.insertedId) {
                return Swal.fire({
                    icon: "success",
                    title: "Successfully Added To Cart",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            console.error('Error booking room:', error);
            if(error.response.status === 400) {
                return Swal.fire({
                    icon: "error",
                    title: "Your Already Booked This Room",
                    showConfirmButton: false,
                    timer: 1500
                  });
            } else {
                return Swal.fire({
                    icon: "error",
                    title: error.message,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    };


    return (
        <div className="min-h-screen bg-gray-100">
            {/* Nav */}
            <SharedNav></SharedNav>
            {/* Hotel Details */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3">
                <div className="">
                    {/* Left Section */}
                    <div className="lg:grid gap-5 grid-cols-12">
                        <div className="mb-6 col-span-4">
                            <img className="w-full rounded-lg lg:h-screen object-cover mb-4 shadow-md" src={hotel?.imageLink} alt="Hotel" />
                        </div>

                        {/* Hotel Info */}

                        <div className="bg-white px-4 py-2 rounded-lg shadow-md col-span-8">
                            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900">{hotel?.title}</h2>
                            <div className="lg:flex gap-5 items-center justify-between">
                                <div>
                                    <h1 className="text-xl font-bold mb-2">Room Details</h1>
                                    <div className="grid grid-cols-2 gap-2 mb-6">
                                        <div className="flex items-center">
                                            <span className="font-semibold flex gap-2 items-center mr-2 text-gray-800">
                                                <BiUser className=" text-orange-400 text-2xl"></BiUser><span>Guests:</span>
                                            </span>
                                            <span className="text-gray-900">{hotel?.guests}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold flex gap-2 items-center mr-2 text-gray-800">
                                                <MdRoofing className="text-orange-400 text-2xl"></MdRoofing>
                                                <span>Bed Rooms:</span>
                                            </span>
                                            <span className="text-gray-900">{hotel?.bedrooms}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold flex gap-2 items-center mr-2 text-gray-800">
                                                <FaBed className="text-orange-400 text-2xl"></FaBed>
                                                <span>Beds :</span>
                                            </span>
                                            <span className="text-gray-900">{hotel?.beds}</span>
                                        </div>
                                        <div className="flex items-center">
                                            <span className="font-semibold flex gap-2 items-center mr-2 text-gray-800">
                                                <FaBath className="text-orange-400 text-2xl"></FaBath>
                                                <span>Bath :</span>
                                            </span>
                                            <span className="text-gray-900">{hotel?.baths}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Amenities */}
                                <div className="mb-6">
                                    <h1 className="text-xl font-bold mb-2">Features</h1>
                                    <div className="flex">
                                        {
                                            iconsAmenities.map((icon, idx) => {
                                                const amenity = hotel?.amenities[idx];
                                                return (
                                                    <div key={idx} className="flex gap-2 items-center">
                                                        <div>
                                                            <span className="text-xl text-orange-400">{icon.icon}</span>
                                                        </div>
                                                        {amenity && (
                                                            <div className="py-1 flex items-center">
                                                                <span className="text-gray-800 font-bold mr-3">{amenity}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    {/* Rating */}
                                    <div className="flex items-center gap-3 ">
                                        <h1 className="font-bold text-xl">Rating :</h1>
                                        <div className="flex items-center gap-2">
                                            <img className="w-5" src={star} alt="Star" />
                                            <span className="text-gray-800">{hotel?.rating} / {hotel?.reviews} Ratings</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className="lg:flex items-center justify-between gap-5">
                                {/* Bed Type */}
                                <div>
                                    <h1 className="text-xl font-bold mb-2">Bed Type</h1>
                                    <div className="flex items-center justify-center gap-5">
                                        <FaBed className="text-6xl"></FaBed>
                                        <span className="block">
                                            <span>Queen Size Bed Comfy Fit For 2 People</span>
                                            <h1 className="text-gray-400">Able To Spread Out</h1>
                                        </span>
                                    </div>
                                </div>
                                {/* Calcelations Rules */}
                                <div>
                                    <h1 className="text-xl font-bold mb-2">Booking & Cancellation Rules</h1>
                                    <h4 className="font-semibold">Booking Status : <span className="font-bold text-green-600">{hotel?.bookingStatus === 'available' ? 'Available' : 'Booked'}</span></h4>
                                    <h4 className="font-semibold">Cancellation : <span className="font-bold text-green-600">{hotel?.cancellationFlexibility === 'available' ? 'Available' : 'Not Available'}</span></h4>
                                </div>
                            </div>


                            {/* Description */}
                            <p className="mt-4 text-gray-800">{hotel?.description}</p>
                            <h1 className="font-bold text-2xl mb-1">Pricing Plan</h1>
                            <div className="lg:flex justify-center items-center gap-4">
                                <div className="flex-1">
                                    {/* Discount */}
                                    <div>
                                        <span className="text-xl font-semibold">Booking.com -------- </span>
                                        <span className="text-xl delete font-bold">USD <del>{hotel?.price}</del></span>
                                    </div>
                                    {/* Book Now */}
                                    <div>
                                        <span className="text-xl font-semibold">HotelStore.com ------ </span>
                                        <span className="text-xl font-bold text-green-700">USD {discountedPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <div>
                                    <button onClick={() => handleBookRoom(hotel)} className="bg-[#FF5733] w-full my-2 py-5 text-white px-12 text-xl  rounded-lg hover:bg-[#FF8C66] transition duration-300 ease-in-out">Book Now</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Right Section (Related Hotels) */}
                    {/* <div className="lg:col-span-4 hidden">
                        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-6 text-gray-900">Related Hotels</h2>
                        <div className="grid gap-6">
                            {!hotels ? (
                                <div className="h-screen flex items-center justify-center">
                                    <span className="loading loading-bars loading-lg"></span>
                                </div>
                            ) : (
                                hotels.slice(0, 6).map((hotel) => (
                                    <div key={hotel._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 ease-in-out">
                                        <img className="w-full h-48 object-cover object-center rounded-t-lg" src={hotel.imageLink} alt={hotel.title} />
                                        <div className="p-4">

                                            <div className="flex justify-between items-center">
                                                <h3 className="font-semibold mb-2 text-gray-900">{hotel.title.slice(0, 30)}</h3>
                                                <NavLink to={`/hotel/${hotel.uniqueId}`}>
                                                    <button className="bg-[#FF5733] text-white px-6 py-2 rounded-lg hover:bg-[#FF8C66] transition duration-300 ease-in-out">
                                                        View
                                                    </button>
                                                </NavLink>
                                                <span className="text-gray-500">{hotel.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div> */}
                </div>
            </main >
        </div >
    );
};

export default HotelDetails;
