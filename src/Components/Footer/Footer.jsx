import objects from '../../assets/OBJECTS.png'
import social from '../../assets/Social.png'
const Footer = () => {
    return (
        <div className='bg-[#8d8d8d48] py-5 mt-10'>
            <div>
                <div className='flex gap-2 items-center justify-center mt-10'>
                    <img src={objects} alt="" />
                    <p className=" bebas-title text-xl font-medium">Travel<span className="text-orange-600"> Tide</span></p>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <p>Enjoy personalized services and exceptional hospitality.</p>
                    <img src={social} alt="" />
                </div>
            </div>
            <hr className='mt-5' />

            <p className='text-center my-5'>2024, All Rights Reserved.</p>
        </div>
    );
};

export default Footer;