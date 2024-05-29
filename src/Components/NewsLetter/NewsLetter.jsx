
const NewsLetter = () => {
    return (
        <div className="flex mx-5 py-8 items-center justify-evenly gap-5">
            <div className="border rounded-lg px-4 border-orange-600">
                <h1 className="text-3xl my-2 font-bold">Newsletter</h1>
                <p className="my-2 text-gray-600">Get your daily dose of travel news & tips. Sign up today!</p>
                <form>
                    <input className="w-full bg-gray-100 px-4 py-3 my-2" type="text" name="name" id="" placeholder="Your Name"/>
                    <input className="w-full bg-gray-100 px-4 py-3 my-2" type="email" name="name" id="" placeholder="Your E-mail"/>
                    <input className="bg-orange-600 px-6 rounded mb-4 py-3 w-full text-white" type="submit" value="Subscribe" />
                </form>
            </div>
            <img className="w-[500px] rounded-xl" src="https://imageio.forbes.com/specials-images/imageserve/65280003a36cd6aea36f399a/Maldives-hotel-beach-resort-on-tropical-Island-with-aerial-drone-view/0x0.jpg" alt="" />
        </div>
    );
};

export default NewsLetter;