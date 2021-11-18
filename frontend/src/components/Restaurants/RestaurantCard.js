import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import './restaurant.css'

function RestaurantCard({ restaurant }) {
    const dispatch = useDispatch();


    return (
        <div>
            <div className="listings">
                    <br></br>
                    <NavLink key={restaurant.id} to={`/restaurants/${restaurant.id}`}>
                    {restaurant.name}
                    </NavLink>
                    <br></br>
                    <img className="restaurantImage" src={restaurant.logo} alt="" />
                    <br></br>
                    {restaurant.address}
                    <br></br>
                    {restaurant.city}
                    <br></br>
                    {restaurant.state}
            </div>
        </div>
    );
}

export default RestaurantCard
