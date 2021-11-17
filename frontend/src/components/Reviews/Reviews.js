import React, {useEffect} from 'react'
import { allReviews } from '../../store/reviews'
import { useDispatch, useSelector } from 'react-redux'
import ReviewCard from './ReviewCard'
import { showModal, setCurrentModal } from '../../store/modal'
// import CreateReviewForm from './CreateReviewForm'




function ReviewsFeed() {
    const dispatch = useDispatch();
    const reviews = useSelector((state) => Object.values(state.reviews))

    useEffect(() => {
        dispatch(allReviews())
    }, [dispatch])

    return (
        <div>
            {reviews
                .map((review) => (
                    <ReviewCard key={review.id} review={review} />
                ))}
        </div>
    )
}

export default ReviewsFeed
