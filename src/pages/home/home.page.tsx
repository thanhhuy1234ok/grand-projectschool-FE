import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () =>{
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return (
        <div className="home-page">
            <h1>Home Page</h1>
        </div>
        );
}

export default HomePage