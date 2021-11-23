import React from 'react';
import { useDispatch, } from 'react-redux';
import { useHistory } from 'react-router-dom'
import './restaurant.css'

function RestaurantCard({ restaurant }) {
    const dispatch = useDispatch();
    const history = useHistory()

    const handleRedirect = (e) => {
        history.push(`/restaurants/${restaurant.id}`)
    }


    return (
        <div>
            <div className="listings" onClick={handleRedirect}>
                    <br></br>
                    <div className="resName">
                    {restaurant.name}
                    </div>
                    <br></br>
                    <img className="restaurantImage" src={restaurant.logo} alt="" />
                    <br></br>
                    <div className="cardText">
                        <div className="resAddress">
                    {restaurant.address}
                    </div>
                    <br></br>
                    <div className="resCity">
                    {restaurant.city}
                    </div>
                    <br></br>
                    <div className="resState">
                    {restaurant.state}
                    </div>
                    </div>
            </div>
        </div>
    );
}

export default RestaurantCard
