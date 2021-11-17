import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { hideModal } from "../../store/modal";
import { addOneReview } from "../../store/reviews"


function CreateReviewForm() {
    const dispatch = useDispatch();
    const [review, setReview] = useState('')
    const [rating, setRating] = useState('')

    const restaurant = useSelector((state) => state.singleRestaurant)
    const user = useSelector((state) => state.session.user)


    const onSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            userId: user.id,
            restaurantId: restaurant.id,
            review,
            rating
        }

        dispatch(addOneReview(payload))
        dispatch(hideModal())
    }


    return (
        <div>

            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    required
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="What did you think?"
                />
                <input
                    type="text"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Rate the restaurant out of 5"
                />
                <button>Create Review</button>
            </form>

        </div>
    )
}

export default CreateReviewForm
