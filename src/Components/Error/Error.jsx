import { Link } from "react-router-dom";

const Error = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <p>Something Went Wrong</p>            
            <Link className="bg-orange-600 px-6 py-3 rounded" to={'/'}>Home</Link>
        </div>
    );
};

export default Error;