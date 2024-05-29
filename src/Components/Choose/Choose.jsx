import img from '../../assets/Choose/house.png'
import img2 from '../../assets/Choose/location.png'
import img3 from '../../assets/Choose/price.png'
const Choose = () => {
    return (
        <div className='mx-5'>
            <h1 className="text-center text-3xl font-bold">Why Choose Us</h1>
            <p className="text-center text-gray-600 my-6">Our hotel management platform offers you a seamless booking experience, <br />personalized guest services, and exceptional hospitality. </p>
            <div className='flex gap-5 items-center justify-evenly'>
                <div className='bg-green-100 p-4 w-[500px] h-56 rounded-lg'>
                    <img className='w-16 bg-[#F9A51A] p-2 rounded' src={img} alt="" />
                    <h1 className='text-xl my-2 font-bold'>Handpicked Hotels</h1>
                    <p className='text-gray-500'>Experience luxury and comfort in our curated selection of top-rated hotels, offering personalized services and exceptional amenities for your perfect stay.</p>
                </div>
                <div className='bg-red-100 p-4 w-[500px] h-56 rounded-lg'>
                    <img className='w-16 bg-[#F9A51A] rounded' src={img3} alt="" />
                    <h1 className='text-xl my-2 font-bold'>World Class Service</h1>
                    <p className='text-gray-500'>Enjoy unparalleled hospitality with our exceptional amenities, attentive staff, and personalized experiences for a truly memorable stay.</p>
                </div>
                <div className='bg-blue-100 p-4 w-[500px] h-56 rounded-lg'>
                    <img className='w-16 bg-[#F9A51A] p-2 rounded' src={img2} alt="" />
                    <h1 className='text-xl my-2 font-bold'>Best Price Guarantee</h1>
                    <p className='text-gray-500'>Get the lowest rates with our unbeatable price match promise, ensuring you always book the best deal.</p>
                </div>
            </div>

        </div>
    );
};

export default Choose;