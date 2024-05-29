/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';
import './style.css'
import objects from '../../assets/OBJECTS.png'
const Navbar = () => {

    const place = [
        {
            id: 1,
            title: "Cox's Bazar",
            description: "Cox's Bazar is a coastal town in southeastern Bangladesh, known for having the longest natural sea beach in the world.",
            bannerImage: "https://cloud-1de12d.b-cdn.net/media/iW=715&iH=462&oX=0&oY=0&cW=715&cH=462/c7971ee32d599058b59e224d72294799/image.jpg",
            rectangleImage: "https://example.com/images/coxs-bazar-rectangle.jpg"
        },
        {
            id: 2,
            title: "Sreemangal",
            description: "Sreemangal is a town in northeastern Bangladesh, famous for its tea gardens, rainforests, and diverse wildlife.",
            bannerImage: "https://teabazarbd.com/wp-content/uploads/2023/02/best-tea-of-sreemangal-tea-bazar-bd-1024x576.webp",
            rectangleImage: "https://example.com/images/sreemangal-rectangle.jpg"
        },
        {
            id: 3,
            title: "Sundarbans",
            description: "The Sundarbans is the largest mangrove forest in the world, located in the delta region of Bangladesh and India, known for its unique ecosystem and Bengal tigers.",
            bannerImage: "https://www.sundarbantigerroarresort.com/wp-content/uploads/2020/10/Sundarban-Tiger-Roar-5.jpg",
            rectangleImage: "https://example.com/images/sundarbans-rectangle.jpg"
        },
        {
            id: 4,
            title: "Saint Martin's Island",
            description: "Saint Martin's Island is a small island in the northeastern part of the Bay of Bengal, known for its clear blue waters, coral reefs, and serene beaches.",
            bannerImage: "https://a.cdn-hotels.com/gdcs/production105/d283/fe692f6d-a1b6-47c6-b2c0-39056ed2d7b7.jpg",
            rectangleImage: "https://example.com/images/saint-martins-rectangle.jpg"
        },
        {
            id: 5,
            title: "Rangamati",
            description: "Rangamati is a district in southeastern Bangladesh, renowned for its picturesque landscapes, lakes, and indigenous culture.",
            bannerImage: "https://www.musafir.com.bd/images/places/Sajek-Valley.jpg",
            rectangleImage: "https://example.com/images/rangamati-rectangle.jpg"
        }
    ];
    const [activeId, setActiveId] = useState(place[0])

    return (
        <div className='bg-black' style={{ backgroundImage: `url(${activeId.bannerImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
            {/* Navbar */}
            <div className='bg-black text-white bg-opacity-60'>
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
                            <Link className='bg-[#F9A51A] text-black px-4  py-2' to="#">Login</Link>
                        </ul>
                    </div>
                </div>
                {/* Banner */}
                <div className='flex items-center'>
                    <div className='w-1/2 p-8'>
                        <h2 className="text-5xl bebas-neue-regular font-bold mb-4 text-white uppercase">{activeId.title.slice(0, 12)}</h2>
                        <p className="text-md text-gray-300">{activeId.description}</p>
                        <div className='mt-5'>
                            <Link className='bg-[#F9A51A] text-black px-6 rounded-sm font-semibold py-2' to="#">Booking</Link>
                        </div>
                    </div>
                    <div className='w-1/2 flex items-center' style={{ height: 'calc(100vh - 68px)' }}>
                        <Swiper
                            slidesPerView={3}
                            spaceBetween={30}
                            navigation={{
                                nextEl: '.swiper-button-next',
                                prevEl: '.swiper-button-prev',
                            }}
                            modules={[Pagination, Navigation]}
                            freeMode={false}
                            className="mySwiper"
                        >
                            {place.map((places, index) => (
                                <SwiperSlide key={places.id}>
                                    <div
                                        onClick={() => setActiveId(places)}
                                        className={`bg-cover rounded-xl w-48 bg-center h-80 ${activeId.id === places.id ? 'border-4 border-blue-500' : ''
                                            }`}
                                        style={{ backgroundImage: `url(${places.bannerImage})` }}
                                    >
                                        <div className="h-full flex items-end justify-center p-4 bg-gradient-to-t from-black to-transparent rounded-xl">
                                            <div className="text-white">
                                                <h2 className="font-bold text-md uppercase">{places.title.slice(0, 12)}</h2>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                            <div className="swiper-button-next"></div>
                            <div className="swiper-button-prev"></div>
                        </Swiper>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
