import { Link } from "react-router-dom"
// import './index.css'

const Missing = () => {
    return (
        <article style={{ padding: "100px" }}>
            <h1>Error 404</h1>
            <p>Page Not Found!</p>
            <div className="flexGrow">
                <Link to="/home">Visit Our Homepage</Link>
            </div>
        </article>
    )
}

export default Missing;
