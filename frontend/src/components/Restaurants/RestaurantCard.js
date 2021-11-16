import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './restaurant.css'

function RestaurantCard({ restaurant }) {
    const dispatch = useDispatch();


    return (
        <div>
            <div className="listings">
                    <br></br>
                    {restaurant.name}
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
