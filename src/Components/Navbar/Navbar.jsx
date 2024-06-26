import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useContext, useState } from 'react';
import './style.css'
import objects from '../../assets/OBJECTS.png'
import { AuthContext } from '../AuthProvider/AuthProvider';

const Navbar = () => {
    const { user, logOutUser } = useContext(AuthContext)
    const place = [
        {
            id: 1,
            title: "Cox's Bazar",
            description: "Cox's Bazar is a coastal town in southeastern Bangladesh, known for having the longest natural sea beach in the world. It is a popular tourist destination, attracting visitors with its stunning beach, beautiful sunsets, and vibrant local culture. The town also offers various activities such as surfing, swimming, and boat rides to nearby islands.",
            bannerImage: "https://cloud-1de12d.b-cdn.net/media/iW=715&iH=462&oX=0&oY=0&cW=715&cH=462/c7971ee32d599058b59e224d72294799/image.jpg"
        },
        {
            id: 2,
            title: "Sreemangal",
            description: "Sreemangal is a town in northeastern Bangladesh, famous for its tea gardens, rainforests, and diverse wildlife. It is often referred to as the 'Tea Capital of Bangladesh'. Visitors can enjoy scenic views of endless tea plantations, explore the Lawachara National Park, and experience the unique culture of the indigenous Khasi and Garo tribes. The area is also known for its peaceful environment and lush greenery.",
            bannerImage: "https://teabazarbd.com/wp-content/uploads/2023/02/best-tea-of-sreemangal-tea-bazar-bd-1024x576.webp",
            rectangleImage: "https://example.com/images/sreemangal-rectangle.jpg"
        },
        {
            id: 3,
            title: "Sundarbans",
            description: "The Sundarbans is the largest mangrove forest in the world, located in the delta region of Bangladesh and India. Known for its unique ecosystem, the Sundarbans is home to the Bengal tiger, spotted deer, and various species of birds, reptiles, and marine life. It is a UNESCO World Heritage site and offers opportunities for wildlife spotting, boat tours through the dense mangrove channels, and exploration of its rich biodiversity.",
            bannerImage: "https://www.sundarbantigerroarresort.com/wp-content/uploads/2020/10/Sundarban-Tiger-Roar-5.jpg"
        },
        {
            id: 4,
            title: "Saint Martin's Island",
            description: "Saint Martin's Island is a small island in the northeastern part of the Bay of Bengal, known for its clear blue waters, coral reefs, and serene beaches. It is the only coral island in Bangladesh and offers a tranquil escape with activities like snorkeling, scuba diving, and exploring the vibrant marine life. The island's laid-back atmosphere, fresh seafood, and beautiful landscapes make it a favorite among travelers seeking relaxation.",
            bannerImage: "https://a.cdn-hotels.com/gdcs/production105/d283/fe692f6d-a1b6-47c6-b2c0-39056ed2d7b7.jpg"
        },
        {
            id: 5,
            title: "Rangamati",
            description: "Rangamati is a district in southeastern Bangladesh, renowned for its picturesque landscapes, lakes, and indigenous culture. Nestled among the hills of the Chittagong Hill Tracts, Rangamati offers breathtaking views of Kaptai Lake, lush forests, and serene waterfalls. Visitors can engage with the local indigenous communities, explore the Hanging Bridge, and enjoy boating on the tranquil lake. The area's natural beauty and cultural diversity provide a unique and enriching experience.",
            bannerImage: "https://www.musafir.com.bd/images/places/Sajek-Valley.jpg"
        }
    ];

    const [activeId, setActiveId] = useState(place[0]);

    const RightArrow = () => {
        const activeIndex = place.findIndex(place => place.id === activeId.id);
        if (activeIndex !== -1 && activeIndex < place.length - 1) {
            setActiveId(place[activeIndex + 1]);
        } else {
            console.log("No next item found or activeId.id is not in the place array");
        }
    };

    const LeftArrow = () => {
        const activeIndex = place.findIndex(place => place.id === activeId.id);
        if (activeIndex > 0) {
            setActiveId(place[activeIndex - 1]);
        } else {
            console.log("No previous item found or activeId.id is not in the place array");
        }
    };

    return (
        <div className='bg-black' style={{ backgroundImage: `url(${activeId.bannerImage})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundPosition: 'center' }}>
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
                            <Link to="/hotels">Destination</Link>
                            <Link to="contact-us">Contact</Link>
                            {
                                user ? <div className='flex items-center justify-center gap-4'>
                                    {
                                        user?.photoURL ? <div className='flex items-center justify-center gap-2'>
                                            <img className='w-6 rounded-full' src={user.photoURL} alt="" />
                                            <span>{user?.displayName.slice(0,13)}</span>
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
                <div className='flex items-center'>
                    <div className='w-1/2 p-8'>
                        <h2 className="text-5xl bebas-neue-regular font-bold mb-4 text-white uppercase">{activeId.title.slice(0, 12)}</h2>
                        <p className="text-md text-gray-300">{activeId.description.slice(0, 220) + "....."}</p>
                        <div className='mt-5'>
                            <Link state={activeId} to={'/booking-date'} className='bg-[#F9A51A] text-black px-6 rounded-sm font-semibold py-2'>Booking</Link>
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
                            {place.map((places) => (
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
                            <div onClick={RightArrow} className="swiper-button-next"></div>
                            <div onClick={LeftArrow} className="swiper-button-prev"></div>
                        </Swiper>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
