import Choose from "../Choose/Choose";
import Destinatios from "../Destinations/Destinatios";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import NewsLetter from "../NewsLetter/NewsLetter";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Destinatios></Destinatios>
            <Choose></Choose>
            <NewsLetter></NewsLetter>
            <Footer></Footer>
        </div>
    );
};

export default Home;