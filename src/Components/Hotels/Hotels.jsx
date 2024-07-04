import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { Link, useLocation } from "react-router-dom";
import objects from '../../assets/OBJECTS.png'
import { AuthContext } from "../AuthProvider/AuthProvider";
import star from '../../assets/star.png'
import SharedNav from "../SharedNav/SharedNav";
const Hotels = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const location = useLocation()
    console.log(location);
    const axiosSecure = useAxiosSecure()
    const [hotels, setHotels] = useState()

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axiosSecure.get('/hotels');
                if (location?.state?.select2) {
                    const filteredData = response.data.filter(hotel =>
                        hotel.destination.toLowerCase() === location.state.select2.toLowerCase()
                    );
                    setHotels(filteredData);
                    console.log(filteredData);
                } else {
                    setHotels(response.data);
                    console.log(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchHotels();
    }, [axiosSecure, location?.state?.select2]);


    if (!hotels) return <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
    return (
        <div>
            {/* Nav */}
            <SharedNav></SharedNav>
            {/* Hotels */}
            <div className="my-4">
                {/* map the hotels data */}
                {
                    location?.state?.select2 && <h1 className="text-xl mb-3">Hotels In <span className="font-bold">{location.state.select2}</span></h1>
                }
                <div className="mx-5 grid gap-10 lg:grid-cols-2 md:grid-cols-2 items-center justify-between">
                    {
                        hotels?.map(hotel => {
                            return <div key={hotel._id}>
                                <div className="border rounded-md">
                                    <div>
                                        <img className="rounded mb-3 h-80 w-full" src={hotel?.imageLink} alt="" />
                                    </div>
                                    <div className="px-2">
                                        <div className="border-b">
                                            <div className="flex justify-around gap-4 mb-3">
                                                {
                                                    hotel?.amenities?.map((item, idx) => {
                                                        return <div key={idx} className="bg-red-400 rounded px-2 text-white text-sm text-center">
                                                            <span className="font-semibold"><span></span>{item}</span>
                                                        </div>
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <h1 className="font-bold text-xl mb-4">{hotel?.title}</h1>
                                        <div className="mb-2">
                                            <span> <span className="font-semibold">Guests : </span>{hotel?.guests}</span>
                                            <span> <span className="font-semibold">Bed Rooms : </span>{hotel?.bedrooms}</span>
                                            <span> <span className="font-semibold">Beds : </span>{hotel?.beds}</span>
                                            <span> <span className="font-semibold">Baths : </span>{hotel?.baths}</span>
                                        </div>

                                        <div>
                                            <span className="text-xl"><span className="font-bold">Price : </span><span className="font-semibold">{hotel?.price}</span></span>
                                        </div>
                                        <h1 className="my-4 text-gray-600">{hotel?.description.slice(0, 124)}</h1>
                                        <div className="my-4 flex gap-3">
                                            <button className="w-full hover:bg-orange-300 bg-orange-400 px-6 py-2 rounded text-white font-bold">Book Now</button>
                                            <Link state={location?.state} to={`/hotel/${hotel?.uniqueId}`}>
                                                <button className="w-full hover:bg-blue-300 bg-blue-400 px-10 py-2 rounded text-white font-bold">Details</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Hotels;