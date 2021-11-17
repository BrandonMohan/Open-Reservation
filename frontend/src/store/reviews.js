import {csrfFetch} from './csrf';
import Cookies from 'js-cookie'
const GET_REVIEWS = 'reviews/GET_REVIEWS'
const DELETE_ONE_REVIEW = 'reviews/DELETE_ONE_REVIEW'
const ADD_ONE_REVIEW = 'reviews/ADD_ONE_REVIEW'
const EDIT_ONE_REVIEW = 'reviews/EDIT_ONE_REVIEW'

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

const removeReview = (review) => {
    return {
        type: DELETE_ONE_REVIEW,
        review
    }
}

const addReview = (review) => {
    return {
        type: ADD_ONE_REVIEW,
        review
    }
}

const editOne = (review) => {
    return {
        type: EDIT_ONE_REVIEW,
        review
    }
}

export const allReviews = (id) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/restaurants/${id}`)
    const data = await res.json()
    dispatch(getReviews(data))
}

export const deleteReview = (id) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    })
        dispatch(removeReview(id))
    }

export const addOneReview = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })

    if(response.ok) {
        const review = await response.json()
        dispatch(addReview(review))
        return review
    }
}

export const editOneReview = (payload) => async dispatch => {
    const { id } = payload
    const res = await csrfFetch(`/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    })

    if(res.ok) {
        let editReview = await res.json();
        dispatch(editOne(editReview))
    }
}


const initialState = {}
export default function reviewsReducer(state=initialState, action) {
    const newState = { ...state}
    switch (action.type) {
        case GET_REVIEWS:
            const allReviews = {}
            Object.values(action.reviews).forEach((review) => {
                allReviews[review.id] = review
            })
            return {...state, ...allReviews}
        case DELETE_ONE_REVIEW: {
            const newState = {...state}
            delete newState[action.review]
            return newState
        }
        case ADD_ONE_REVIEW:
            return {
                ...state,
                [action.review.id]: action.review
            }
        case EDIT_ONE_REVIEW:
            newState[action.review.id] = action.review
            return newState;
        default:
        return state;
    }
}
