import {csrfFetch} from './csrf';

const LOAD_ONE_REVIEW = 'singleReview/LOAD_ONE_REVIEW'

const loadOne = (review) => {
    return {
        type: LOAD_ONE_REVIEW,
        review
    }
}

export const loadOneReview = (review) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review}`)
    const oneReview = await res.json()
    dispatch(loadOne(oneReview))
}

const initialState = {}
const singleReview = (state = initialState, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_ONE_REVIEW: {
            return {
                ...state,
                ...action.review
            }
        }
        default:
            return state;
    }
}

export default singleReview
