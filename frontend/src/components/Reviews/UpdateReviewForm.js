import {  useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editOneReview } from '../../store/reviews';
import { hideModal } from '../../store/modal'




const EditReviewForm = () => {
    const dispatch = useDispatch();
    const [newReview, setReview] = useState('');
    const [rating, setRating] = useState('');
    const userId = useSelector((state) => state.session?.user?.id)
    const restaurantId = useSelector((state) => state.singleRestaurant.id)
    const reviewId = useSelector((state) => state.singleReview)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload ={
            id: reviewId.id,
            userId: userId,
            restaurantId: restaurantId,
            review: newReview,
            rating
        }
         dispatch(editOneReview(payload))
         dispatch(hideModal())
    }

    return (
        <div>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    required
                    value={newReview}
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

export default EditReviewForm
