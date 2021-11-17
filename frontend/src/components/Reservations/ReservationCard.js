import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './reservation.css'


function ReservationCard({ reservation }) {
    const dispatch = useDispatch();


    return (
        <div>
            <div className="reservations">
                    <br></br>
                    {reservation.User.username}
                    <br></br>
                    {reservation.date}
                    <br></br>
            </div>
        </div>
    );
}

export default ReservationCard
