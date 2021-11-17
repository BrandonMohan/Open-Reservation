import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import './reviews.css';

function ReviewCard({ review }) {
    const dispatch = useDispatch();
    const restaurant = useSelector((state) => state.singleRestaurant)



    return (
        <div>
            <div className="reviewcard">
                    <br></br>
                    {review.review}
                    <br></br>
                    {review.rating}
                    <br></br>
                    {restaurant.name}
            </div>
        </div>
    );
}

export default ReviewCard
