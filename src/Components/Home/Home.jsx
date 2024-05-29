import Choose from "../Choose/Choose";
import Destinatios from "../Destinations/Destinatios";
import Navbar from "../Navbar/Navbar";

const Home = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Destinatios></Destinatios>
            <Choose></Choose>
        </div>
    );
};

export default Home;