import { Fragment } from "react";

const ProductReview = ({reviews}) => {
    return (
        <Fragment>
            <div class="reviews w-75">
                <h3>Reviews:</h3>
                <hr />
                {reviews && reviews.map(review => (
                    <div key={review._id} class="review-card my-3">
                        <div class="rating-outer">
                            <div class="rating-inner" style={{width: `${review.rating/5*100}%`}}></div>
                        </div>
                        <p class="review_user">by {review.user.name}</p>
                        <p class="review_comment">{review.comment}</p>

                        <hr />
                    </div>
                ))}
            </div>
        </Fragment>
    )
}

export default ProductReview;