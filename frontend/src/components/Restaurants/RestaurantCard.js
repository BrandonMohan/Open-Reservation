import React from 'react';
import { useDispatch} from 'react-redux'
import { useHistory } from 'react-router-dom'
import './restaurant.css'
import { loadOneRestaurant } from "../../store/singlerestaurant";
import { allReviews } from "../../store/reviews";


function RestaurantCard({ restaurant }) {
    const history = useHistory()
    const dispatch = useDispatch();

    const handleRedirect = (e) => {
        dispatch(loadOneRestaurant(restaurant.id)).then(() =>

        history.push(`/restaurants/${restaurant.id}`)
        )
        dispatch(allReviews(restaurant.id));

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
