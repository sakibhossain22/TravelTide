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
    const [menuOpen, setMenuOpen] = useState(false);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
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
                <nav className="">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <img src={objects} className="h-10 w-10" alt="Logo" />
                                <a href="/" className="ml-2 flex items-center text-2xl font-bold ">Travel<span className="text-orange-600">Tide</span></a>
                            </div>
                            <div className="hidden lg:flex items-center gap-5 ml-auto text-md font-medium">
                                <Link to="/hotels" className=" hover:text-orange-600">Destinations</Link>
                                <Link to="/contact-us" className=" hover:text-orange-600">Contact</Link>
                                {user ? (
                                    <div className="flex items-center gap-4">
                                        {user.photoURL ? (
                                            <div className="flex items-center gap-2">
                                                {/* Cart Icon */}
                                                <div className="dropdown dropdown-end">
                                                    <Link to={user ? '/cart' : '/login'}>
                                                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                                            <div className="indicator">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                                                {/* <span className="badge badge-sm indicator-item">8</span> */}
                                                            </div>
                                                        </div>
                                                    </Link>

                                                </div>
                                                {/* User Name */}
                                                <span className="">{user.displayName.slice(0, 13)}</span>
                                                {/* User Photo and Dropdown */}
                                                <div className="dropdown dropdown-end">
                                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                        <div className="w-10 rounded-full">
                                                            <img alt="User Image" src={user?.photoURL} />
                                                        </div>
                                                    </div>
                                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li>
                                                            <a className="justify-between">Profile</a>
                                                        </li>
                                                        <li onClick={() => logOutUser()}><a>Logout</a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="uppercase px-2 py-1 w-8 bg-orange-400 rounded-full text-center text-gray-800">{user.displayName?.slice(0, 1)}</span>
                                                <span className="text-gray-800">{user.displayName}</span>
                                            </div>
                                        )}

                                    </div>
                                ) : (
                                    <Link to="/login" className="bg-[#F9A51A] text-black px-4 rounded py-1 hover:bg-[#F8B824] transition duration-300 ease-in-out">Login</Link>
                                )}
                            </div>
                            <div className="lg:hidden flex items-center">
                                <button onClick={toggleMenu} className=" focus:outline-none">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`lg:hidden ${menuOpen ? 'block' : 'hidden'}`}>
                        <ul className="flex flex-col items-center gap-5 text-md font-medium py-4">
                            <li><Link to="/hotels" className=" hover:text-orange-600">Destinations</Link></li>
                            <li><Link to="/contact-us" className=" hover:text-orange-600">Contact</Link></li>
                            {user ? (
                                <div className="flex flex-col items-center gap-4">
                                    {user.photoURL ? (
                                        <div className="flex items-center gap-2">
                                            <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="User Avatar" />
                                            <span className="">{user.displayName.slice(0, 13)}</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="uppercase px-2 py-1 w-8 bg-orange-400 rounded-full text-center text-gray-800">{user.displayName?.slice(0, 1)}</span>
                                            <span className="">{user.displayName}</span>
                                        </div>
                                    )}
                                    <button onClick={logOutUser} className="bg-[#F9A51A] text-black px-4 rounded py-2 hover:bg-[#F8B824] transition duration-300 ease-in-out">Logout</button>
                                </div>
                            ) : (
                                <Link to="/login" className="bg-[#F9A51A] text-black px-4 rounded py-1 hover:bg-[#F8B824] transition duration-300 ease-in-out">Login</Link>
                            )}
                        </ul>
                    </div>

                </nav>
                {/* Banner */}
                <div className='lg:flex items-center'>
                    <div className='lg:w-1/2 lg:p-8 p-2'>
                        <h2 className="lg:text-5xl text-3xl md:text-4xl lg:bebas-neue-regular font-bold mb-4 uppercase">{activeId?.title.slice(0, 12)}</h2>
                        <p className="text-base ">{activeId?.description.slice(0, 220) + "....."}</p>
                        <div className='mt-5'>
                            <Link state={activeId} to={'/booking-date'} className='bg-[#F9A51A] text-black px-6 rounded-sm font-semibold py-2'>Booking</Link>
                        </div>
                    </div>
                    <div className='lg:w-1/2 lg:px-0 px-2 flex items-center' style={{ height: 'calc(100vh - 68px)' }}>
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
