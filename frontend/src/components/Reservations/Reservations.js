import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showModal, setCurrentModal } from '../../store/modal'
import { allReservations } from '../../store/reservations'
import ReservationCard from './ReservationCard'



function ReservationsFeed() {
    const dispatch = useDispatch();
    const reservations = useSelector((state) => Object.values(state.reservations))

    useEffect(() => {
        dispatch(allReservations())
    }, [dispatch])


    return (
        <div>
            {reservations
                .map((reservation) => (
                    <ReservationCard key={reservation.id} reservation={reservation} />
                ))}
        </div>
    );




}

export default ReservationsFeed;
