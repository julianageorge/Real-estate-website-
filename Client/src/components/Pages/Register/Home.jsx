import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../../context/AuthProvider";

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        navigate('/login');
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            <p>You are logged in!</p>
            <br />
            <div className="flexGrow">
                <button onClick={logout}>Log Out</button>
            </div>
        </section>
    )
}

export default Home;