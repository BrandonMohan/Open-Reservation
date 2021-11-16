import React, {useEffect} from 'react'
import { allRestaurants } from '../../store/restaurants'
import { useDispatch, useSelector } from 'react-redux'
import RestaurantCard from './RestaurantCard'

function RestaurantsFeed() {
    const dispatch = useDispatch();

    const restaurants = useSelector((state) => Object.values(state.restaurants))

    useEffect(() => {
        dispatch(allRestaurants())
    }, [dispatch])


    return (
        <div>
            <div>
                {/* <button
                    className={styles.checkinModalButton}
                    onClick={showCheckinModal}>
                    Checkin
                </button>{" "} */}
            </div>
            {restaurants
                .map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
        </div>
    );

}

export default RestaurantsFeed;
