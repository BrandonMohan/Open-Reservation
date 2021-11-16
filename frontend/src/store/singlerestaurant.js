import {csrfFetch} from './csrf';

const LOAD_ONE_RESTAURANT = "singlerestaurant/LOAD_ONE_RESTAURANT"
const EDIT_ONE_RESTAURANT = 'restaurants/EDIT_ONE_RESTAURANT'


const loadOne = (restaurant) => {
    return {
        type: LOAD_ONE_RESTAURANT,
        restaurant
    }
}

const editOne = (restaurant) => {
    return {
        type: EDIT_ONE_RESTAURANT,
        restaurant
        }
}

export const loadOneRestaurant = (restaurant) => async (dispatch) => {
    const res = await csrfFetch(`/api/restaurants/${restaurant}`)
    const oneRestaurant = await res.json();
    dispatch(loadOne(oneRestaurant));
}

export const editOneRestaurant = (payload, id) => async (dispatch) => {
    const res = await csrfFetch(`/api/restaurants/${id}`, {
        method: 'PUT',
        headers: {
             "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
    })

    if(res.ok) {
        let editRestaurant = await res.json();
        dispatch(editOne(editRestaurant))
    }
}

const initialState = {}
const singleRestaurant = (state = initialState, action) => {
    const newState = { ...state}
    switch (action.type) {
        case LOAD_ONE_RESTAURANT: {
            return {
                ...state,
                ...action.restaurant
            };
        }
        case EDIT_ONE_RESTAURANT:
            newState[action.restaurant.id] = action.restaurant;
            return newState;
        default:
        return state;
    }
}

export default singleRestaurant
