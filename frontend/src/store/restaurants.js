import {csrfFetch} from './csrf';
import Cookies from 'js-cookie'
const GET_RESTAURANTS = 'restaurants/GET_RESTAURANTS'

const getRestaurants = (restaurants) => {
    return {
        type: GET_RESTAURANTS,
        restaurants
    }
}

export const allRestaurants = (restaurants) => async(dispatch)=> {
    const res = await csrfFetch('/api/restaurants')
    const data = await res.json();
    dispatch(getRestaurants(data));
}

const initialState = {}
export default function restaurantReducer(state = initialState, action) {
    const newState = { ...state }
    switch (action.type) {
        case GET_RESTAURANTS:
            const allRestaurants = {}
            Object.values(action.restaurants).forEach((restaurant)=> {
                allRestaurants[restaurant.id] = restaurant;
            })
            return { ...state, ...allRestaurants}
        default:
            return state;
    }
}
