import { useContext, useEffect, useState } from "react";
import SharedNav from "../SharedNav/SharedNav";
import useAxiosSecure from "../AxiosSecure/useAxiosSecure";
import { AuthContext } from "../AuthProvider/AuthProvider";
import nodata from '../../assets/nodata.json';
import Lottie from "lottie-react";
import { BiTrash } from "react-icons/bi";
import useCart from "../Hooks/useCart";
import Swal from "sweetalert2";

const Cart = () => {
    const axiosSecure = useAxiosSecure();
    const { data, refetch } = useCart();
    const [hotels, setHotels] = useState([]);
    const { user } = useContext(AuthContext);
    const [total, setTotal] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [platformFee, setPlatformFee] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (data) {
            setHotels(data);
        }
    }, [data]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            const prices = hotels?.map(hotel => {
                const priceString = hotel?.price?.split('/')[0]; // Extract the part before the slash
                const newPrice = priceString?.split('$')[1]; // Extract the part after the dollar sign
                const price = parseFloat(newPrice); // Convert it to a number
                return price;
            });

            // Calculate the total price
            const total = prices?.reduce((acc, curr) => acc + curr, 0) || 0;
            setTotal(total);

            // Add 10% tax
            const tax = total * 0.10; // 10% of the total
            setTaxes(tax);

            // Subtract 5% discount
            const newDiscount = total * 0.05; // 5% of the total
            setDiscount(newDiscount);

            const platFee = 1.12;
            setPlatformFee(platFee);

            const servFee = 5;
            setServiceFee(servFee);

            setBalance((total + tax + platFee + servFee) - newDiscount);
        };

        calculateTotalPrice();
    }, [hotels]);

    const handleCartDelete = async (id) => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result?.isConfirmed) {
                    axiosSecure.delete(`/cart/${id}`)
                        .then(res => {
                            console.log(res.data);
                            if (res.data.deletedCount > 0) {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Room has been deleted.",
                                    icon: "success"
                                });
                                refetch();
                            }
                        });
                }
            });

        } catch (error) {
            console.error('Error deleting the item:', error);
        }
    };

    if (!data?.length) return (
        <div className="flex h-full items-center justify-center">
            <Lottie animationData={nodata} />
        </div>
    );

    return (
        <div>
            <SharedNav />
            {/* Cart Items */}
            <div className="my-5 gap-4 mx-3 grid grid-cols-12">
                {/* Hotel */}
                <div className="col-span-8 h-screen overflow-y-auto pr-4" style={{ height: 'calc(100vh - 120px)' }}>
                    {hotels?.map((hotel) => (
                        <div key={hotel?._id} className="bg-gray-200 mb-4 rounded-lg shadow-md transition duration-300 ease-in-out transform flex items-center justify-center">
                            <div className="lg:flex-1 flex md:flex-1">
                                <img className="w-32 h-40 rounded" src={hotel?.imageLink} alt={hotel?.title} />
                                <div>
                                    <h1 className="lg:text-xl md:text-2xl mx-2 font-semibold mb-2">{hotel?.title}</h1>
                                    <div className="flex gap-4 mb-3">
                                        {hotel?.amenities?.map((item, idx) => (
                                            <div key={idx} className="rounded px-2 text-sm text-center">
                                                <span className="font-semibold">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                    {hotel?.toDate ? (
                                        <p className="mx-2 font-bold">
                                            Check in: <span className="font-semibold">{hotel?.toDate} To {hotel?.fromDate}</span>
                                        </p>
                                    ) : (
                                        <p className="mx-2 font-bold">
                                            Check In: <span className="font-semibold">{hotel?.orderDate}</span>
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="mx-5 flex flex-col items-center">
                                <span className="text-lg font-semibold">1 Night</span>
                                <p className="text-[#FF5733] text-xl font-bold mb-2">{hotel?.price?.slice(0, 3) + '.00'}</p>
                                <button onClick={() => handleCartDelete(hotel?._id)}>
                                    <BiTrash className="text-2xl text-center"></BiTrash>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                {/* CheckOut */}
                <div className="col-span-4">
                    <div className="sticky top-0 px-5">
                        <h1 className="text-xl font-bold my-4">Checkout Summary</h1>
                        <form>
                            <input className="border mb-4 w-full px-4 py-2 rounded" type="text" placeholder="Enter Promo Code" />
                        </form>
                        <div>
                            <div className="flex bg-gray-100 px-2 py-1 items-center justify-between gap-4">
                                <h1 className="text-gray-500 font-semibold">Item Total</h1>
                                <span className="font-extrabold">${total.toFixed(2)}</span>
                            </div>
                            <div className="flex px-2 py-1 items-center justify-between gap-4">
                                <h1 className="text-gray-500 font-semibold">Taxes</h1>
                                <span className="font-extrabold">${taxes.toFixed(2)}</span>
                            </div>
                            <div className="flex bg-gray-100 px-2 py-1 items-center justify-between gap-4">
                                <h1 className="text-gray-500 font-semibold">Discount</h1>
                                <span className="font-extrabold">${discount.toFixed(2)}</span>
                            </div>
                            <div className="flex px-2 py-1 items-center justify-between gap-4">
                                <h1 className="text-gray-500 font-semibold">Platform Fee</h1>
                                <span className="font-extrabold">${platformFee.toFixed(2)}</span>
                            </div>
                            <div className="flex bg-gray-100 px-2 py-1 items-center justify-between gap-4">
                                <h1 className="text-gray-500 font-semibold">Service Fee</h1>
                                <span className="font-extrabold">${serviceFee.toFixed(2)}</span>
                            </div>
                            <hr className="mt-2" />
                            <div className="flex items-center justify-between gap-4">
                                <h1 className="text-xl font-bold my-4">Total Payable</h1>
                                <h1 className="font-extrabold">${balance.toFixed(2)}</h1>
                            </div>
                            <hr />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold my-4">Select Payment Mode</h1>
                            <div className="flex mb-2 items-center gap-5">
                                <input type="radio" id="stripe" />
                                <span className="font-bold">Stripe</span>
                            </div>
                        </div>
                        <hr className="my-2" />
                        <div>
                            <button className="bg-orange-400 my-2 font-bold w-full text-xl rounded-md py-2">Complete Payment</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
