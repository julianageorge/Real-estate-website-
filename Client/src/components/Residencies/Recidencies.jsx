import "./Recidencies.css";
import data from "../../utils/slider.json";
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heart from "../Heart/Heart";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthProvider";
import { getAllFavorites } from "../../api/Details";

export default function Recidencies() {
    const { auth } = useContext(AuthContext);
    const [residencies, setResidencies] = useState([]);

    useEffect(() => {

        const initialResidencies = data.map((res) => ({ ...res, isFavourite: false }));
        setResidencies(initialResidencies);


        if (auth?.email) {
            const fetchFavorites = async () => {
                try {
                    const favoritesResponse = await getAllFavorites(auth.email);
                    const favoriteIds = new Set(favoritesResponse.map(fav => fav.id.toString())); 

                    const updatedResidencies = initialResidencies.map(res => ({
                        ...res,
                        isFavourite: favoriteIds.has(res._id), 
                    }));

                    setResidencies(updatedResidencies);
                } catch (error) {
                    console.error("Error fetching favorites:", error);
                }
            };
            fetchFavorites();
        } else {
            setResidencies(initialResidencies);
        }
    }, [auth]);

    const handleToggleFavorite = (id) => {
        setResidencies((prevResidencies) =>
            prevResidencies.map((res) => {
                if (res._id === id) {
                    const newFavoriteState = !res.isFavourite;
                    return { ...res, isFavourite: newFavoriteState };
                }
                return res;
            })
        );
    };

    return (
        <section className="bg-white">
            <div className="bg-white container m-auto my-5 d-flex justify-content-between flex-wrap">
                <div className="row">
                    <div className="head">
                        <span>Best Choices</span>
                        <h3>Popular Residencies</h3>
                    </div>

                    <div className="row">
                        {residencies.map((card, index) => (
                            <div
                                className="col-md-3 mb-4 d-flex align-items-stretch my-4"
                                key={index}
                            >
                                <div
                                    className="card"
                                    style={{
                                        textDecoration: "none",
                                        borderRadius: "10px",
                                        cursor: "pointer",
                                        position: "relative",
                                    }}
                                >
                                    <div className="like" style={{ position: "absolute", top: "10px", right: "10px", zIndex: 1 }}>
                                        <Heart
                                            id={card._id}
                                            isFavourite={card.isFavourite}
                                            onToggle={handleToggleFavorite}
                                            isAuthenticated={Boolean(auth?.accessToken)}
                                            email={auth?.email}
                                        />
                                    </div>
                                    <Link to={`/properties/${card._id}`} style={{ textDecoration: 'none', borderRadius: "10px" }}>
                                        <img
                                            src={card.image}
                                            className="card-img-top w-100"
                                            alt="home"
                                        />
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="price">
                                                <span>$</span>
                                                <span>{card.price}</span>
                                            </h5>
                                            <span className="name">{card.title}</span>
                                            <span className="detail">
                                                {card.address} {card.city} {card.country}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </section>
    );
}
