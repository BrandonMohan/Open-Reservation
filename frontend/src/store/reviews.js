import {csrfFetch} from './csrf';
import Cookies from 'js-cookie'
const GET_REVIEWS = 'reviews/GET_REVIEWS'

const getReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    }
}

export const allReviews = () => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews`)
    const data = await res.json()
    dispatch(getReviews(data))
}


const initialState = {}
export default function reviewsReducer(state=initialState, action) {
    switch (action.type) {
        case GET_REVIEWS:
            const allReviews = {}
            Object.values(action.reviews).forEach((review) => {
                allReviews[review.id] = review
            })
            return {...state, ...allReviews}
        default:
        return state;
    }
}
