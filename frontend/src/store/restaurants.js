import {csrfFetch} from './csrf';
const GET_RESTAURANTS = 'restaurants/GET_RESTAURANTS'
const GET_ONE_RESTAURANT = 'restaurants/GET_ONE_RESTAURANT'
const ADD_ONE_RESTAURANT = 'restaurants/ADD_ONE_RESTAURANT'
const DELETE_ONE_RESTAURANT = 'restaurants/DELETE_ONE_RESTAURANT'

const getRestaurants = (restaurants) => {
    return {
        type: GET_RESTAURANTS,
        restaurants
    }
}

const getOne = (restaurant) => {
    return {
        type: GET_ONE_RESTAURANT,
        restaurant
    }
}

const addOne = (restaurant) => {
    return {
        type: ADD_ONE_RESTAURANT,
        restaurant
    }
}

const removeRestaurant = (restaurant) => {
    return {
        type: DELETE_ONE_RESTAURANT,
        restaurant
    }
}



export const allRestaurants = (restaurants) => async(dispatch)=> {
    const res = await csrfFetch('/api/restaurants')
    const data = await res.json();
    dispatch(getRestaurants(data));
}

export const getOneRestaurant = (restaurant) => async (dispatch) =>{
    const res = await csrfFetch(`/api/restaurants/${restaurant}`)
    const oneRestaurant = await res.json();
    dispatch(getOne(oneRestaurant));
}

export const addOneRestaurant = (payload) => async (dispatch) => {
    const { address, city, state, name, logo, ownerId } = payload;
    const data = new FormData();
    data.append("address", address);
    data.append("city", city);
    data.append("state", state);
    data.append("name", name);
    data.append("ownerId", ownerId);
    if (logo) data.append("logo", logo);

    const response = await csrfFetch(`/api/restaurants`, {
        method: 'POST',
        headers: {
            'Content-Type': "multipart/form-data",
        },
        body: data
    })

    if(response.ok) {
        const restaurant = await response.json();
        dispatch(addOne(restaurant.restaurant))
        // return restaurant
    }
}

export const deleteRestaurant = (restaurant) => async dispatch => {
    const res = await csrfFetch(`/api/restaurants/${restaurant}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json'}
    })
    dispatch(removeRestaurant(restaurant))
    return res
}



const initialState = {}
export default function restaurantReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RESTAURANTS:
            const allRestaurants = {}
            Object.values(action.restaurants).forEach((restaurant)=> {
                allRestaurants[restaurant.id] = restaurant;
            })
            return { ...state, ...allRestaurants}
        case GET_ONE_RESTAURANT:
            return { ...state, restaurant: action.payload };
        case ADD_ONE_RESTAURANT:
            return {
                ...state,
                [action.restaurant.id]: action.restaurant
            }
        case DELETE_ONE_RESTAURANT: {
            const newState = { ...state };
            delete newState[action.restaurant];
            return newState;
        }
        default:
            return state;
    }
}
