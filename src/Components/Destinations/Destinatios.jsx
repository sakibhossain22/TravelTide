import img from '../../assets/Destination/1.png'
import img2 from '../../assets/Destination/2.png'
import img3 from '../../assets/Destination/3.png'
import img4 from '../../assets/Destination/4.png'
import img5 from '../../assets/Destination/5.png'
const Destinatios = () => {
    return (
        <div className='my-5'>
            <h1 className="text-center text-3xl font-bold">Choose Your Destination</h1>
            <p className="text-center text-gray-600 my-6">Effortlessly find and book your perfect stay at top destinations worldwide. <br />Enjoy personalized services and exceptional hospitality.</p>
            <div>
                <div className='flex items-center justify-evenly'>
                    <div className='relative w-[500px] h-62'>
                        <img className='w-full h-full' src={img} alt="" />
                        <div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center'>
                            <span className='text-white text-2xl'>Maldives</span>
                        </div>
                    </div>
                    <div className='relative w-[500px] h-62'>
                        <img className='w-full h-full' src={img2} alt="" />
                        <div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center'>
                            <span className='text-white text-2xl'>Sri Lanka</span>
                        </div>
                    </div>
                </div>
                <div className='flex mt-5 items-center justify-evenly'>
                    <div className='relative w-96 h-62'>
                        <img className='w-full h-full' src={img3} alt="" />
                        <div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center'>
                            <span className='text-white text-2xl'>Bangladesh</span>
                        </div>
                    </div>
                    <div className='relative w-96 h-52'>
                        <img className='w-full h-full' src={img4} alt="" />
                        <div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center'>
                            <span className='text-white text-2xl'>Sundarban</span>
                        </div>
                    </div>
                    <div className='relative w-96 h-62 '>
                        <img className='w-full h-full' src={img5} alt="" />
                        <div className='absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center'>
                            <span className='text-white text-2xl'>Bandarban</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Destinatios;